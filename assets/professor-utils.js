/**
 * Created by wagner on 20/07/17.
 */

const absoluteUrl = new RegExp('^(?:(?:[a-z]+:)?/)?/', 'i');

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
        const showDemoPath = scriptPath + '/show-demo.html';

        function iframeInsert($demo, codigoHtml) {
            $demo.attr('src', showDemoPath)
                .on('load', function () {
                    var demoContents = $demo.contents();
                    demoContents.find('body').html(codigoHtml);
                    if (isPrinting()) {
                        $demo.height(demoContents.height());
                    }
                });
        }

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
                iframeInsert($demo, codigoHtml);
            } else {
                $demo.html(codigoHtml);
            }
            //endregion

            // region Código entre <pre><code>
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
            // endregion
        });

        if (!isPrinting()) {
            $('embed[type="image/svg+xml"]')
                .on('load', function () {
                    var svgPath = this.getAttribute('src').replace(/\/[^/]+$/, '');
                    var svg = this.getSVGDocument();

                    $(svg).find('image:not([xlink\\:href^=data\\:])')
                        .each(function () {
                            // noinspection JSPotentiallyInvalidUsageOfThis
                            var href = this.getAttribute('xlink:href');
                            if (!absoluteUrl.test(href)) {
                                this.setAttribute('xlink:href', svgPath + '/' + href);
                            }
                        });

                    var $embed = $(this);
                    var $svgRoot = $(svg.rootElement)
                        .width($embed.width())
                        .height($embed.height());

                    $embed.replaceWith($svgRoot);
                });
        }
    }

    $(function () {
        $('pre > code [step]').each(function () {
            var $this = $(this);
            $this.addClass('fragment');

            var number = parseInt(this.getAttribute('step'));
            if (number >= 0) {
                this.setAttribute('data-fragment-index', number.toString());
            }

            var rel = $.trim(this.getAttribute('rel'));
            switch (rel) {
                case 'keep':
                    break;
                case 'current':
                    $this.addClass('current-visible');
                    break;
                default:
                    $this.addClass('highlight-current-blue');
            }
        });

        $('.sites dd>a').each(function () {
            $(this).after(' <small>' + this.href + '</small>');
        });

        $('.show-dialog > a.open').click(function (event) {
            event.preventDefault();
            $(this.getAttribute('href')).dialog('open');
        });
    });

    // Ações para quando os slides estiverem carregados
    Reveal.addEventListener('ready', function (readyEvent) {
        // Redimensiona iframe
        var resizeIframe = function () {
            var $iframe = $(this);
            $iframe.height($iframe.contents().height());
        };

        // Ativa emojis
        var activateEmojis = function () {
            twemoji.parse(this, {
                folder: 'svg',
                ext: '.svg'
            });
        };

        // Ativa jQuery-UI dialogs
        var createDialogs = function () {
            var $dialog = $(this).find('dialog');
            if ($dialog.length === 0) {
                return;
            }

            $dialog.each(function () {
                var $thisDialog = $(this);
                var openLink;

                // Definição do link
                var text = $thisDialog.attr('data-link');
                if (!text) {
                    var anchor = $thisDialog.find('> a[data-link]').first();
                    if (anchor.length > 0) {
                        openLink = anchor.attr('href', '#');
                    }
                }
                if (!openLink) {
                    openLink = $('<a href="#"></a>').html(text || "Clique aqui");
                }

                // Comportamento do link
                openLink.click(function (event) {
                    event.preventDefault();
                    $thisDialog.dialog('open');
                });

                // Adiciona link para abrir e ativa UI
                $thisDialog.before(openLink)
                    .dialog({
                        modal: true,
                        closeOnEscape: false,
                        autoOpen: false,
                        width: 800
                    });
            });
        };

        var slideActions = function () {
            activateEmojis.call(this);
            createDialogs.call(this);
        };

        // Redimensiona todos os iframe.demo corretamente
        $(readyEvent.currentSlide)
            .data('processado', true)
            .each(slideActions)
            .find('iframe.demo').on('load', resizeIframe);

        // Ações caso esteja imprimindo
        if (isPrinting()) {
            // Abre todos os details
            [].forEach.call(document.getElementsByTagName('details'),
                function (e) {
                    e.open = true;
                });
            activateEmojis.call(document);
        }

        // Redimensiona todos os iframe.demo corretamente
        Reveal.addEventListener('slidechanged', function (event) {
            var $currentSlide = $(event.currentSlide);

            if (!$currentSlide.data('processado')) {
                $currentSlide
                    .data('processado', true)
                    .each(slideActions)
                    .find('iframe.demo').each(resizeIframe);
            }
        });
    });
})();
