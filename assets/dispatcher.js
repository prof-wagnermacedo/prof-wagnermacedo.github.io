/**
 * Created by wagner on 18/07/17.
 */
(function () {
    document.querySelector('body').innerText = 'Carregando...';
    var q = window.location.pathname.split(/[\\/]/).pop().replace(/.html$/, '');
    window.location = 'index.html?aula=' + q;
})();
