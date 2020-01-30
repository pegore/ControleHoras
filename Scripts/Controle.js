"use stricts";
(function () {
	AdicionarEventos();
})();

function AdicionarEventos(e) {


};

// /**
//  * Função JQuery para verificar e adicionar páginas abertas
//  * 
//  * @author Lino Pegoretti
//  *  
//  */
// ($ => $(document).ready(() => {

// 	$("#includeMenu").load("menu.html");
// 	carregarPaginaInicial();
// 	window.onhashchange = () => carregarPaginaInicial();
// 	var fnRetornoAjax = conteudo => {
// 		var txtUrlCrypt = btoa(txtUrlEnvio);
// 		window.location.href = `${txtUrl}#${txtUrlCrypt}`;
// 		$(txtElementoDOM).html(conteudo);
// 	};
// 	$(document.body).on('click', '#includeMenu ul.collapse li > a',
// 		/**
// 		 * Evento que visa abrir páginas dentro de um div específico
// 		 * 
// 		 * @param {Event} - e
// 		 * @returns {Boolean}
// 		 */
// 		e => {
// 			e.preventDefault();
// 			e.stopImmediatePropagation();
// 			var self = e.currentTarget;
// 			$(self).parents('#includeMenu').find('ul.collapse > li').removeClass('active').find('i.fa.fa-caret-left').remove();
// 			$liPrincipal = $(self).parent('li');
// 			$liPrincipal.addClass('active');
// 			$(self).append('<i class="fa fa-caret-left"></i>');
// 			// -- Abrir página via ajax na div de id conteudo
// 			abrirPagina(self.href, '#conteudo');
// 			debugger;
// 			return false;
// 		}).on('click', 'a.abrir', e => {
// 			e.preventDefault();
// 			e.stopImmediatePropagation();
// 			abrirPagina(e.currentTarget.href, '#conteudo');
// 			return false;
// 		}).on('click', 'a.link-editar', e => {
// 			e.preventDefault();
// 			e.stopImmediatePropagation();
// 			console.log(e.currentTarget.attributes);
// 			var nrId = parseInt(e.currentTarget.getAttribute('data-id') || '0');
// 			var txtServico = e.currentTarget.getAttribute('data-servico');
// 			var txtKey = e.currentTarget.getAttribute('data-key');
// 			abrirPagina(e.currentTarget.href, '#conteudo');
// 			setTimeout(() => $('#conteudo form').each((index, formulario) => {
// 				enviarAjax(`/cenpe/${txtServico}/${nrId}`,
// 					'GET', {
// 					txtKey: nrId
// 				},
// 					resultado => setFormCampos(formulario, resultado),
// 					resultado => console.error(resultado));
// 			}), 500);
// 			return false;
// 		});
// }))(jQuery);

/**
        * Carrega a pagina principal do sistema
        * 
        * @param {Event} - e
        * @returns {Boolean}
        */
function carregarPaginaInicial() {
	var bloqueio = window.bloqueio || false;
	if (!bloqueio) {
		var txtUrl = getUrl();
		if (txtUrl.length > 0)
			abrirPagina(txtUrl, '#conteudo');
		else
			abrirPagina('dashBoard.html', '#conteudo');
	}
	window.bloqueio = false;
}

/**
 *
 * Carrega uma página em um elemento html por ajax
 *
 * @author Lino Pegoretti
 * @param {String}
 *            txtUrlEnvio url de destino
 * @param {String}
 *            txtElementoDOM id ou class da tag de destino da página, isto é,
 *            onde a página deverá ser carregada
 */
function abrirPagina(txtUrlEnvio, txtElementoDOM) {
	try {
		var nrFim = window.location.href.indexOf('#') || 0;
		var txtUrl = window.location.href || '';
		if (nrFim !== -1)
			txtUrl = txtUrl.substr(0, nrFim);
		var fnRetornoAjax = (resultado, status, xhr) => {
			if ('error' == status) {
				$(txtElementoDOM).html(resultado);
				console.error(xhr);
			}
		};
		var txtUrlCrypt = btoa(txtUrlEnvio);
		window.bloqueio = true;
		window.location.href = `${txtUrl}#${txtUrlCrypt}`;
		$(txtElementoDOM).html("");
		$(txtElementoDOM).load(txtUrlEnvio, fnRetornoAjax);
	} catch (ex) {
		console.debug(ex);
	}
}

/**
 *
 * Envia objeto json para o restful via ajax
 *
 * @author Lino Pegoretti
 * @param {String}
 *            prUrl
 * @param {String}
 *            prMethod
 * @param {Object}
 *            prDados
 * @param {Function}
 *            prDoneCallBack
 * @param {Function}
 *            prFailCallBack
 * @returns {jqXHR}
 */
function enviarAjax(prUrl, prMethod, prDados, prDoneCallBack, prFailCallBack) {
	var prUrl = prUrl || '';
	var prMethod = prMethod || 'GET';
	var prDados = prMethod != 'GET' ? JSON.stringify(prDados) : '';
	var prDoneCallBack = prDoneCallBack || ((resultado) => {
		alert('Requisição enviada com sucesso para a URI: ' + prURL);
		console.log(resultado);
	});
	var prFailCallBack = prFailCallBack || ((resultado) => {
		alert('URI não encontrada: ' + prURL);
		console.error(resultado);
	});
	return $.ajax({
		url: prUrl,
		type: prMethod.toUpperCase(),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Cache-Control': 'no-cache',
			'X-Requested-With': 'XMLHttpRequest',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Accept',
			'Access-Control-Max-Age': '1'
		},
		dataType: 'json',
		crossDomain: false,
		data: prDados,
		statusCode: {
			200: () => {
				alert('200 - WebService encontrado, dados carregados');
			},
			404: () => {
				alert('404 - WebService não encontrado');
			},
			415: () => {
				alert('415 - Método não suportado');
			},
			500: () => {
				alert('500 - Ocorreu um erro interno');
			}
		}
	}).done(prDoneCallBack).fail(prFailCallBack);
}

/**
 *
 * Retorna os dados preenchidos no formulário em formato JSON
 *
 * @author Lino Pegoretti
 * @param {HTMLForm} prForm
 * @returns {JSON}
 */
function getFormCampos(prForm) {
	var n = 0;
	var objRetorno = {};
	while (prForm[n]) {
		var campo = prForm[n];
		var valor = null;
		if ($.isNumeric(campo.value)) {
			valor = Number(campo.value);
		} else if (campo.value !== "") {
			valor = campo.value;
		}
		objRetorno[campo.name] = campo.value === "" ? null : campo.value;
		n++;
	}
	return objRetorno;
}

/**
 *
 * Preenche um formulário com o objeto JSON, e retorna o próprio formulário
 *
 * @author Lino Pegoretti
 * @param {HTMLForm}
 *            prForm
 * @param {JSON}
 *            prJSON
 * @returns {HTMLForm}
 */
function setFormCampos(prForm, prJSON) {
	var n = 0;
	while (prForm[n]) {
		var txtNome = prForm[n].name;
		prForm[n].value = prJSON[txtNome] || '';
		n++;
	}
	return prForm;
}

/**
 * Função para retornar a url atual
 *
 * @author Lino Pegoretti
 * @returns
 */
function getUrl() {
	var nrFim = window.location.href.indexOf('#') || 0;
	var txtUrl = '';
	if (nrFim !== -1) {
		txtUrl = window.location.href.substr(nrFim + 1);
		return atob(txtUrl);
	} else {
		return '';
	}
}