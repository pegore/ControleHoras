"use stricts";
(function () {
    AdicionarEventos();
})();

function AdicionarEventos() {
    CarregarDados(event);
    setInterval(AtualizaData, 1000);
};
function AtualizaData() {
    document.getElementById('txtHoraAtual').value = new Date().toLocaleString();
}
function CarregarDados(event) {
    dados = {
        PrimeiraMarcacao: "07:30:00",
        SegundaMarcacao: "12:00:00",
        TerceiraMarcacao: "13:12:00",
        QuartaMarcacao: "17:30:00"
    }
    PreencheCamposElemento(document.getElementById('divMarcacoesDiarias'), dados);
}

/**
 * Preenche um formulário com o objeto Javascript, e retorna o próprio formulário
 *
 * @author Lino Pegoretti
 * @param {HTMLFormElement} elementoHtml
 * @param {Object} objeto
 * @returns {HTMLFormElement}
 */
function PreencheCamposElemento(elementoHtml, objeto) {
    debugger;
    var campos = elementoHtml.getElementsByTagName('input');
    for (var i = 0; i < campos.length; i++) {
        campos[i].value = objeto[campos[i].name] || '';
    }
    return elementoHtml;
}

/**
 * Captura os dados de um formulário HTML e retorna um objeto com os dados 
 * desse formulário
 * 
 * @author Lino Pegoretti
 * @param {HTMLFormElement} elementoHtml 
 * @returns {Object}
 *  
 */
function CapturaCamposElemento(elementoHtml) {
    debugger;
    var objRetorno = {};
    for (var i = 0; i < elementoHtml.elements.length; i++) {
        var campo = elementoHtml[i];
        if (campo.name != "") {
            objRetorno[campo.name] = campo.value === "" ? null : campo.value;
        }
    }
    return objRetorno;
}