/**
 * Created by wagner on 20/07/17.
 */
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
            },
            error: displaySummary
        });
    } else {
        displaySummary();
    }
})();
