//AIzaSyB3WERHL96fbaBSQBV1XyKEJO3mcSyNuQI
$(document).ready(function() {
	//Loop para trazer e filtrar as baladas do Lista.Json
	console.log(baladas);
	var filtroEstilos = [];
	for (var i = 0; i < baladas.length; i++) {
		var item = baladas[i];

		var htmlItem = 	'<a href="detalhe.html?idCasa='+item.idCasa+'&idFesta='+item.idFesta+'" class="item-lista '+item.diaSemana+' '+item.genero[0]+' '+item.genero[1]+' '+item.genero[2]+'">' +
		'<div class="card horizontal card-lista">' +
		'<div class="card-stacked">' +
		'<div class="card-content">' +
		'<div class="card-image left">' +
		'<img src="imagens/'+item.idCasa+'/'+item.logo+'" alt="'+item.nome+'">' +
		'</div>' +
		'<h2>'+item.nome+'</h2>' +
		'<h3>'+item.festa+'</h3>' +
		'</div>' +
		'<div class="card-content">' +
		'<p><span>O que toca?</span> '+item.genero+'</p>' +
		'<p><span>Com lista:</span> '+item.comLista+'</p>' +
		'<p><span>Sem lista:</span> '+item.semLista+'</p>' +
		'</div>' +
		'<div class="card-action">' +
		'<div class="icone">' +
		'<i class="material-icons icone-'+item.tipo+' left">check</i>' +
		'<span>'+item.tipo+'</span>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</a>';

		/* LISTA AS FESTAS */
		$(".lista-cards .tab-conteudo").append(htmlItem);

		/* SEPARA AS FESTAS POR DIAS */
		function filtraDias() {
			if($("#tab-seg").find(".Segunda-Feira")){
				$("#tab-seg .Segunda-Feira").show()
			}
			if($("#tab-ter").find(".Terca-Feira")){
				$("#tab-ter .Terca-Feira").show()
			}
			if($("#tab-qua").find(".Quarta-Feira")){
				$("#tab-qua .Quarta-Feira").show()
			}
			if($("#tab-qui").find(".Quinta-Feira")){
				$("#tab-qui .Quinta-Feira").show()
			}
			if($("#tab-sex").find(".Sexta-Feira")){
				$("#tab-sex .Sexta-Feira").show()
			}
			if($("#tab-sab").find(".Sabado")){
				$("#tab-sab .Sabado").show()
			}
			if($("#tab-dom").find(".Domingo")){
				$("#tab-dom .Domingo").show()
			}
		}filtraDias();

		/*FILTRO ESTILO - PT1*/
		var map = item.genero.map(function(g) {
			return '<li class="item-filtro"><input type="checkbox" class="filled-in" id="check-'+g+'" /><label for="check-'+g+'">'+g+'</label></li>'

		});

		map.forEach(function(el){
			filtroEstilos.push(el);
			return true
		});
		/**/
	}
	/*FILTRO ESTILO - PT2*/
	var filtrosFiltrados = filtroEstilos.filter(function(estilo, pos){
		return filtroEstilos.indexOf(estilo) == pos;
	});

	$("#estilos").append(filtrosFiltrados)
	/*ACABA O FILTRO ESTILO*/





	//Menu de navegação do usuário
	$(".nav-usuario").sideNav();

			// Menu dos filtro
			$('.nav-filtro').sideNav({
				edge: 'right'
			});

			//Configuração das tabs de dia
			$('ul.tab-principal').tabs({
				//swipeable: true
			});

			//função para a busca
			$(".btn-abre-busca").click(function() {
				$(".header-busca").show()
				$(".header-busca input").focus()
				$(".header-principal").hide()
			})
			$(".btn-fecha-busca").click(function() {
				$(".header-busca").hide()
				$(".header-principal").show()
			})
			$(".header-busca input").focusout(function() {
				$(".header-busca").hide()
				$(".header-principal").show()
			})
			///////////////////////////


			//if($(".tab-casa .blocoCasa"))

		});
/////////////// FIM DO JQUERY ////////////////

// Função de Loading
function onReady(callback) {
	var intervalID = window.setInterval(checkReady, 1000);
	function checkReady() {
		if (document.getElementsByTagName('body')[0] !== undefined) {
			window.clearInterval(intervalID);
			callback.call(this);
		}
	}
}

function show(id, value) {
	document.getElementById(id).style.display = value ? 'block' : 'none';
}

onReady(function () {
	show('app', true);
	show('loading', false);
});
///////////////////


/* 	REGEX DA URL  */
function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/* Código muito doido pra trazer as informações da festa clicada na lista inicial da home */
var idCasa = getParameterByName('idCasa');
var casa = casas.filter(function(casa){
	if (casa.idCasa == idCasa) {
		return casa;
	}
})[0];

//document.getElementById('blocoCasa').setAttribute("class", balada.idCasa + " resumo row");
document.getElementById('capaCasa').innerHTML = "<img src='imagens/"+casa.idCasa+"/casa/"+casa.capa+"'>"
document.getElementById('nomeCasa').innerHTML = casa.nome;
document.getElementById('ruaFesta').innerHTML = casa.rua;
document.getElementById('ruaCasa').innerHTML = casa.rua;
document.getElementById('siteCasa').innerHTML = casa.site;
document.getElementById('telefoneCasa').innerHTML = casa.telefone;
document.getElementById('emailCasa').innerHTML = casa.email;
document.getElementById('enderecoMapa').src = casa.mapa;

document.getElementById('descricaoCasaLinha1').innerHTML = casa.descricao.linha1;
document.getElementById('descricaoCasaLinha2').innerHTML = casa.descricao.linha2;
document.getElementById('descricaoCasaLinha3').innerHTML = casa.descricao.linha3;
document.getElementById('descricaoCasaLinha4').innerHTML = casa.descricao.linha4;
document.getElementById('descricaoCasaLinha5').innerHTML = casa.descricao.linha5;
document.getElementById('descricaoCasaLinha6').innerHTML = casa.descricao.linha6;
document.getElementById('descricaoCasaLinha7').innerHTML = casa.descricao.linha7;
document.getElementById('descricaoCasaLinha8').innerHTML = casa.descricao.linha8;
document.getElementById('descricaoCasaLinha9').innerHTML = casa.descricao.linha9;
document.getElementById('descricaoCasaLinha10').innerHTML = casa.descricao.linha10;
document.getElementById('descricaoCasaLinha11').innerHTML = casa.descricao.linha11;
document.getElementById('descricaoCasaLinha12').innerHTML = casa.descricao.linha12;
document.getElementById('descricaoCasaLinha13').innerHTML = casa.descricao.linha13;
document.getElementById('descricaoCasaLinha14').innerHTML = casa.descricao.linha14;
document.getElementById('descricaoCasaLinha15').innerHTML = casa.descricao.linha15;
document.getElementById('descricaoCasaLinha16').innerHTML = casa.descricao.linha16;
document.getElementById('descricaoCasaLinha17').innerHTML = casa.descricao.linha17;
document.getElementById('descricaoCasaLinha18').innerHTML = casa.descricao.linha18;
document.getElementById('descricaoCasaLinha19').innerHTML = casa.descricao.linha19;
document.getElementById('descricaoCasaLinha20').innerHTML = casa.descricao.linha20;


/* Código muito doido pra trazer as informações da casa clicada na lista inicial da home */
var idFesta = getParameterByName('idFesta');
var balada = baladas.filter(function(balada){
	if (balada.idFesta == idFesta) {
		return balada;
	}
})[0];

document.getElementById('nomeFesta').innerHTML = balada.festa;
document.getElementById('capaFesta').innerHTML = "<img src='imagens/"+balada.idCasa+"/capas/"+balada.capa+"'>"
document.getElementById('diaSemanaFesta').innerHTML = balada.diaSemana;
document.getElementById('diaMesFesta').innerHTML = balada.diaMes;
document.getElementById('mesFesta').innerHTML = balada.mes;
document.getElementById('horaInicioFesta').innerHTML = balada.horaInicio;
document.getElementById('horaFimFesta').innerHTML = balada.horaFim;
document.getElementById('tipoFesta').innerHTML = balada.genero.estiloMusical;
document.getElementById('comLista').innerHTML = balada.comLista;
document.getElementById('semLista').innerHTML = balada.semLista;
document.getElementById('tipoVip').innerHTML = balada.vip;
document.getElementById('aniversario').innerHTML = balada.aniversario;
document.getElementById('descricaoFestaLinha1').innerHTML = balada.descricao.linha1;
document.getElementById('descricaoFestaLinha2').innerHTML = balada.descricao.linha2;
document.getElementById('descricaoFestaLinha3').innerHTML = balada.descricao.linha3;
document.getElementById('descricaoFestaLinha4').innerHTML = balada.descricao.linha4;
document.getElementById('descricaoFestaLinha5').innerHTML = balada.descricao.linha5;
document.getElementById('descricaoFestaLinha6').innerHTML = balada.descricao.linha6;
document.getElementById('descricaoFestaLinha7').innerHTML = balada.descricao.linha7;
document.getElementById('descricaoFestaLinha8').innerHTML = balada.descricao.linha8;
document.getElementById('descricaoFestaLinha9').innerHTML = balada.descricao.linha9;
document.getElementById('descricaoFestaLinha10').innerHTML = balada.descricao.linha10;
document.getElementById('descricaoFestaLinha11').innerHTML = balada.descricao.linha11;
document.getElementById('descricaoFestaLinha12').innerHTML = balada.descricao.linha12;
document.getElementById('descricaoFestaLinha13').innerHTML = balada.descricao.linha13;
document.getElementById('descricaoFestaLinha14').innerHTML = balada.descricao.linha14;
document.getElementById('descricaoFestaLinha15').innerHTML = balada.descricao.linha15;
document.getElementById('descricaoFestaLinha16').innerHTML = balada.descricao.linha16;
document.getElementById('descricaoFestaLinha17').innerHTML = balada.descricao.linha17;
document.getElementById('descricaoFestaLinha18').innerHTML = balada.descricao.linha18;
document.getElementById('descricaoFestaLinha19').innerHTML = balada.descricao.linha19;
document.getElementById('descricaoFestaLinha20').innerHTML = balada.descricao.linha20;
