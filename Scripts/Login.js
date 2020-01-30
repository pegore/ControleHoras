"use stricts";
(function () {
    AdicionarEventos();
})();

function AdicionarEventos(e) {
    var $btnLogin = document.getElementById('btnLogin');
    $btnLogin.addEventListener('click', function (e) {
        ValidarLogin(e);
    });    
};

function ValidarLogin(e) {
    window.location.href = "principal.html";
}
