/**
 * Created by wagner on 20/07/17.
 */

/* Printing and PDF exports */
(function () {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '../../assets/reveal.js/css/print/'
        + (window.location.search.match(/print-pdf/gi) ? 'pdf.css' : 'paper.css');
    document.getElementsByTagName('head')[0].appendChild(link);
})();

/* Read parameters from URL */
function urlParam(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/* Change current theme by other */
function changeTheme(name) {

}

/* Replace current theme by the passed in the URL */
(function () {
    var scripts = document.getElementsByTagName('script');
    var scriptPath = scripts[scripts.length - 1].src.replace(/\/[^/]+$/, '');

    var reallyChangeTheme = function (name) {
        if (name) {
            document.getElementById('theme').href = scriptPath + '/reveal.js/css/theme/' + name + '.css';
        }
    };

    var themeFromUrl = urlParam('theme');
    reallyChangeTheme(themeFromUrl);

    if (!themeFromUrl) {
        changeTheme = reallyChangeTheme;
    }
})();
