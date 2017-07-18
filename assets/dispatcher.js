/**
 * Created by wagner on 18/07/17.
 */
$(function () {
    aula = $('#aula').html();

    $.get('index.html',
        function (response) {
            document.open('text/html', 'replace');
            document.write(response);
            document.close();
        });
});
