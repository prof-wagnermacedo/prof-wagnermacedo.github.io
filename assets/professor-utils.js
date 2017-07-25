/**
 * Created by wagner on 20/07/17.
 */

/* Carrega a apresentação ou mostra índice */
(function () {
    var scripts = document.getElementsByTagName('script');
    var scriptPath = scripts[scripts.length - 1].src.replace(/\/[^/]+$/, '');

    var isPrinting = function () {
        return window.location.search.match(/print-pdf/gi);
    };

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

    /* Helper para demonstrar HTML */
    function postLoadAula() {
        $('.revisao').each(function () {
            var $this = $(this);
            var $demo = $this.find('.demo');
            var $codigo = $this.find('.codigo');

            //region Coloca o HTML em $demo
            var codigoFonte = $codigo.html();
            var codigoHtml = codigoFonte;

            if ($codigo[0].hasAttribute('data-noescape')) {
                var doc = new DOMParser().parseFromString(codigoHtml, 'text/html');
                codigoHtml = doc.documentElement.textContent;
            }

            if ($demo.hasClass('par')) {
                codigoHtml = codigoFonte.trim().split(/[\r\n]+/)
                    .map(function (item) {
                        return $('<div></div>').html(item);
                    });
            }

            if ($demo.is('iframe')) {
                $demo.attr('src', scriptPath + '/show-demo.html')
                    .on('load', function () {
                        var demoContents = $demo.contents();
                        demoContents.find('body').html(codigoHtml);
                        if (isPrinting()) {
                            $demo.height(demoContents.height());
                        }
                    });
            } else {
                $demo.html(codigoHtml);
            }
            //endregion

            // Código entre <pre><code>
            var $code = $('<code class="html" data-trim></code>');

            // Escapa código, a não ser quando houver 'noescape'
            if (!$codigo[0].hasAttribute('data-noescape')) {
                codigoFonte = codigoFonte.replace(/&(?=(?:[a-zA-Z]+|#[0-9]+);)/g, '&amp;');
            }

            // Copia todos os atributos data-* para a tag code
            $.each($codigo[0].attributes, function () {
                if (this.name.match(/^data-/)) {
                    $code.attr(this.name, '');
                }
            });

            $codigo.html($code.html(codigoFonte)
                .wrap('<pre></pre>')
                .parent());
        });
    }

    // Ações para quando os slides estiverem carregados
    Reveal.addEventListener('ready', function (readyEvent) {
        // Abre todos os details, se isPrinting
        if (isPrinting()) {
            [].forEach.call(document.getElementsByTagName('details'),
                function (e) {
                    e.open = true;
                });
        }

        // Redimensiona todos os iframe.demo corretamente
        $(readyEvent.currentSlide)
            .find('iframe.demo')
            .each(function () {
                var $iframe = $(this);
                $iframe.on('load', function () {
                    $iframe.height($iframe.contents().height());
                });
            });

        // Redimensiona todos os iframe.demo corretamente
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
})();
