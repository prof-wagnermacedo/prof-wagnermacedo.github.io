/**
 * Created by wagner on 20/07/17.
 */

/* Carrega a apresentação ou mostra índice */
(function () {
    var displaySummary = function () {
        $.get('Z', function (response) {
            var summary = $('#slides').find('div');

            if (response > 9) {
                summary.css('font-size', '0.7em');
            }

            if (response > 12) {
                var n = parseInt(response / 12) + 1;
                summary.css('columns', n.toString());
            }

            for (var i = 1; i <= response; i++) {
                summary.append('<div><a href="' + i + '.html">Aula ' + i + '</a>');
            }
        });
    };

    var q = urlParam('aula');
    if (q) {
        $.ajax({
            url: q + '.html',
            success: function (response) {
                $('#slides').html(
                    $(response).filter('#aula').html()
                );
                postLoadAula();
            },
            error: displaySummary
        });
    } else {
        displaySummary();
    }
})();

/* Helper para demonstrar HTML */
function postLoadAula() {
    $('.revisao').each(function () {
        var $this = $(this);
        var $demo = $this.find('.demo');
        var $codigo = $this.find('.codigo');

        //region Coloca o HTML em $demo
        var html;

        if ($demo.hasClass('par')) {
            html = $codigo.html().trim().split(/[\r\n]+/)
                .map(function (item) {
                    return $('<p></p>').html(item);
                });
        } else {
            html = $codigo.html();
        }

        if ($demo.is('iframe')) {
            $demo.contents().find('body')
                .append(html,
                    '<style>' +
                    'body { margin: 5px; font-size: 1.9em; }' +
                    'body * { margin: 0; }' +
                    '</style>');
        }
        else {
            $demo.html(html);
        }
        //endregion

        // Código entre <pre><code>
        $codigo.wrapInner('<pre><code class="html" data-trim></code></pre>');
    });
}

// Redimensiona todos os iframe.demo corretamente
Reveal.addEventListener('ready', function (readyEvent) {
    // Para o slide inicializado aqui
    $(readyEvent.currentSlide)
        .find('iframe.demo')
        .each(function () {
            var $iframe = $(this);
            this.contentWindow.addEventListener('resize', function () {
                $iframe.height($iframe.contents().height());
            });
        });

    // Para todos os outros slides
    Reveal.addEventListener('slidechanged', function (event) {
        if (readyEvent.currentSlide !== event.currentSlide) {
            $(event.currentSlide)
                .find('iframe.demo')
                .each(function () {
                    var $iframe = $(this);
                    $iframe.height($iframe.contents().height());
                });
        }
    });
});
