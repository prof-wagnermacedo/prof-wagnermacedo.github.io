$(function () {
    twemoji.parse(document, {
        folder: 'svg',
        ext: '.svg'
    });

    $('[data-hi]').each(function () {
        const dataHi = this.getAttribute('data-hi');

        $(this).find('pre.highlight > code')
            .addClass('hi-code')
            .on('afterlining', function () {
                this.removeAttribute('data-lining');

                const $code = $(this);
                $code.find('.line').html((_, oldHtml) => {
                    if (oldHtml.match(/^[\s]+$/)) {
                        return '<br>';
                    }
                    return oldHtml.replace(/[\r\n]+/g, '');
                });

                dataHi.split(',').forEach(spec => {
                    let [lower, upper] = spec.split('-', 2).map(e => parseInt(e));

                    if (upper === undefined) {
                        upper = lower;
                    }

                    for (let i = lower; i <= upper; i++) {
                        $code.find(`.line[index="${i}"]`).addClass('hi-line');
                    }
                });
            })
            .each(function () {
                lining(this);
            });
    });
});

function doCourse() {
    // Recolhe as respostas respondidas
    $('.resposta').each(function () {
        var self = $(this);
        if (self.height() > 150) {
            self.addClass("resposta-collapse");
            self.after("<div class='show-more'><a>Mostrar mais</a></div>");
        }
    });

    // Expande respostas ao clicar no link "Mostrar mais"
    $(".show-more").click(function () {
        var self = $(this);
        self.prev().removeClass("resposta-collapse");
        self.remove();
    });

    // Também expande ao clicar na área da resposta
    $(".resposta-collapse").click(function () {
        var self = $(this);
        self.removeClass("resposta-collapse");
        self.next().remove();
    });
}

function prefixWithNumber(selector) {
    $(selector).html(function (index, oldHtml) {
        return (index + 1) + '. ' + oldHtml;
    });
}
