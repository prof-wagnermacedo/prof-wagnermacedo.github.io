$(function () {
    twemoji.parse(document, {
        folder: 'svg',
        ext: '.svg'
    })
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
