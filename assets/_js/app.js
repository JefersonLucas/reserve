//==============================================================||
//	AUTOR: JEFERSON LUCAS
//	DATA DE CRIAÇÃO: 17/06/2018
//  DATA DE MODIFICAÇÃO: 29/06/2018
//  VERSÃO: 1.2.1 BETA
//	DESCRIÇÃO: CORE PARA CADASTRO/CONSULTA/FILTRO/VISUALIZAÇÃO/
//	EDIÇÃO E EXCLUSÃO DE RESERVAS
//==============================================================||
//==============================================================||
//	1 - CLASSES DO APP
//
//	RESERVA
//
	class Reserva {

	//	DEFINIÇÃO DOS VALORES NO CONSTRUCTOR
		constructor(responsavel, equipamento, sala, inicio, fim, dia){
		//	INSTANCIAÇÃO DO OBJETO RESERVA
			this.responsavel 	= responsavel
			this.equipamento 	= equipamento
			this.sala 			= sala
			this.inicio 		= inicio
			this.fim 			= fim
			this.dia 			= dia
		}
	//	MÉTODO VALIDAÇÃO DOS DADOS
		validarDados() {
		//	METÓDO FOR PARA RECUPERAR OS VALORES E SETAR EM UMA VARIÁVEL
			for(let i in this) {
			//	VERIFICA SE O VALOR É INDEFINIDO/VAZIO/NULO
				if(this[i] == undefined ||  this[i] == '' || this[i] == null) {
				//	SE O VALOR FOR INDEFINIDO/VAZIO/NULO RETORNA FALSO
					return false
				} 
			}
		//	RETORNA VERDADEIRO CASO OS DADOS FOR VÁLIDOS
			return true
		}
	}
//
//	BANCO DE DADOS
//
	class BancodeDados {
	//	MÉTODO CONSTRUCTOR RECEBE O ID
		constructor(){
		//	RECEBE O ID E SETA EM UMA VARIÁVEL
			let id = localStorage.getItem('id')
		//	SE O ID FOR NULL ELE RECEBERÁ 0
			if (id === null) {
				localStorage.setItem('id', 0)
			}
		}
	//	MÉTODO VERIFICA SE JÁ EXISTE UM ID
		getProximoId(){
		//	RECUPERA O ITEM NO LOCALSTORAGE
			let proximoId = localStorage.getItem('id')
		//	RETORNA O ID CONVERTIDO PARA INTEIRO E RECEBE + 1 
			return parseInt(proximoId) + 1
		}
	//	MÉTODO GRAVAR REGISTROS NO LOCALSTRORAGE 
		gravar(r){
		//	VALOR DA REFERÊNCIAÇÃO DO getProximoId ATRIBUÍDO A UMA VARIÁVEL ID
			let id = this.getProximoId()
		//
		//	CONVERTE VALORES E SETA PARA O LOCALSTRORAGE 
			localStorage.setItem(id, JSON.stringify(r))
		//
		//	ATUALIZA O ID COM A INFORMAÇÃO DO NOVO ID DA FUNÇÃO getProximoId()
			localStorage.setItem('id', id)
		}		
	//	MÉTODO RECUPERA OS REGISTROS NO LOCALSTORAGE
		recuperaTodosRegistros() {
		//	ARRAY DE RESERVAS
			let reservas = Array()
		//
		//	RECUPERA O ID ATUAL E SETE EM UMA VARIÁVEL
			let id = localStorage.getItem('id')
		//
		//	RECUPERA TODAS AS RESERVAS EM LOCALSTORAGE
			for(let i = 1; i <= id; i ++) {
			//	RECUPERAR A RESERVA
				let reserva = JSON.parse(localStorage.getItem(i))
			//
			//	VERIFICA SE ALGUMA RESERVA É NULA
				if(reserva === null) {
				//	SE A RESERVA FOR NULA CONTINUA O LAÇO
					continue
				}
			//	A RESERVA RECEBE UM ID
				reserva.id = i
			//	PUSH DO ARRAY RESERVA
				reservas.push(reserva)
			}
		//	RETORNA O ARRAY RESERVA
			return reservas
		}
	//	MÉTODO PESQUISA E FILTRA OS DADOS DA RESERVA
		pesquisar(reserva) {
		//	VARIÁVEL ARRAY
			let reservasFiltradas = Array()
		//	VARIÁVEL RECEBE O MÉTODO DE RECUPERAR TODOS OS REGISTROS
			reservasFiltradas = this.recuperaTodosRegistros()
		//
		//	FILTRO PROFESSOR
			if(reserva.responsavel != '') {
				reservasFiltradas = reservasFiltradas.filter(r => r.responsavel == reserva.responsavel)
			}
		//	FILTRO EQUIPAMENTO
			if(reserva.equipamento != '') {
				reservasFiltradas = reservasFiltradas.filter(r => r.equipamento == reserva.equipamento)
			}		
		//	FILTRO SALA
			if(reserva.sala != '') {
				reservasFiltradas = reservasFiltradas.filter(r => r.sala == reserva.sala)
			}		
		//	FILTRO INICIO
			if(reserva.inicio != '') {
				reservasFiltradas = reservasFiltradas.filter(r => r.inicio == reserva.inicio)
			}
		//	FILTRO FIM
			if(reserva.fim != '') {
				reservasFiltradas = reservasFiltradas.filter(r => r.fim == reserva.fim)
			}
		//	FILTRO DIA
			if(reserva.dia != '') {
				reservasFiltradas = reservasFiltradas.filter(r => r.dia == reserva.dia)
			}
		//	RETORVA O FILTRO
			return reservasFiltradas
		}
	//	MÉTODO REMOVER RESERVAS
		remover(id) {
			localStorage.removeItem(id)
		}
//		
	}
//
//
//==============================================================||
//==============================================================||
//	INSTÂCIA GLOBAL BANCODEDADOS ATRIBUIDA EM UMA VARIÁVEL
//
	let bancodedados = new BancodeDados()
//
//==============================================================||
//==============================================================||
//	2 - FUNÇÕES DO APP
//
//	CADASTRA A RESERVA
//
	function cadastrarReserva() {

	//	RECUPERA OS VALORES A PARTIR DO ID E REFERENCIA EM UMA VARIÁVEL
		let responsavel = document.getElementById('responsavel')
		let equipamento = document.getElementById('equipamento')
		let sala 		= document.getElementById('sala')
		let inicio 		= document.getElementById('inicio')
		let fim 		= document.getElementById('fim')
		let dataEua		= document.getElementById('dia').value

		var diaBr = dataEua.substr(8,2)
		var mesBr = dataEua.substr(5,2)
		var anoBr = dataEua.substr(0,4)
		
		let dia = diaBr+"/"+mesBr+"/"+anoBr
		
	//	CRIAÇÃO DE UMA INSTÂCIA RESERVA ATRIBUIDA EM UMA VARIÁVEL
		let reserva = new Reserva(
		//	PARÂMETROS DA RESERVA
			responsavel.value, 
			equipamento.value, 
			sala.value,
			inicio.value,
			fim.value,			
			dia
		)
	//	VERIFICAÇÃO DA VALIDAÇÃO DOS DADOS
		if(reserva.validarDados()) {
		//	DIALOG DE SUCESSO
		//
		// 	GRAVA AS INFORMAÇÕES DA RESERVA NA CLASSE BANCODEDADOS
			bancodedados.gravar(reserva)
		//
			document.getElementById('modal_titulo_success').innerHTML 		= '<i class="fas fa-check-circle"></i> Sucesso!'
			document.getElementById('modal_titulo_div_success').className  	= 'modal-header text-success'
			document.getElementById('modal_conteudo_success').innerHTML 	= 'A reserva do(a) <span class="text-success"><b>'+reserva.responsavel+'</b></span> foi cadastrada com <span class="text-success"><b>sucesso!</b></span><br>'
			document.getElementById('modal_conteudo_success').innerHTML	   += '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Equipamento</th><th scope="col">Local</th><th scope="col">Horário</th><th scope="col">Data</th></tr></thead><tbody><tr><th class="font-weight-normal">'+reserva.equipamento+'</th><td>'+reserva.sala+'</td><td>'+reserva.inicio+' / '+reserva.fim+'</td><td>'+reserva.dia+'</td></tr></tbody>'
			document.getElementById('modal_btn_success').innerHTML 			= 'Voltar'
			document.getElementById('modal_btn_success').className 			= 'btn btn-success'
		//
		//	ZERA OS VALORES
			responsavel.value 	= ''
			equipamento.value 	= ''
			sala.value 			= ''
			inicio.value 		= ''
			fim.value 			= ''
			dia.value 			= ''
		//
			$('#modalCadastraReservaSucesso').modal('show')
		} else {
		//	DIALOG DE ERRO
			document.getElementById('modal_titulo_erro').innerHTML 		= '<i class="fas fa-times-circle"></i> Erro!'
			document.getElementById('modal_titulo_div_erro').className  = 'modal-header text-danger'
			document.getElementById('modal_conteudo_erro').innerHTML 	= 'Houve algum erro ao efetuar o cadastro. Por favor! verifique se todos os campo foram inseridos corretamente.'
			document.getElementById('modal_btn_erro').innerHTML 		= 'Corrigir'
			document.getElementById('modal_btn_erro').className 		= 'btn btn-danger'

			$('#modalCadastraReservaErro').modal('show')
		}
	}
//
//	CARREGA A LISTA DE RESERVAS
//
	function carregaListaReservas() {
	//	DECLARAÇÃO DO ARRAY RESERVAS
		let reservas = Array()
	//	SETANDO O VALOR DO ARRAY NA VARIÁVEL
		reservas = bancodedados.recuperaTodosRegistros()
	//	SELECIONANDO O ELEMENTO TBODY
		let listaReservas = document.getElementById('listaReservas')
	//
	//	LISTANTO A DESPESA
 		reservas.forEach(function(r) {
 	//
 	//	CRIANDO A LINHA (TR)
 		let linha =	listaReservas.insertRow()
 	//
 	//	CRIAR AS COLUNAS (TD)
 		linha.insertCell(0).innerHTML = r.responsavel
 		linha.insertCell(1).innerHTML = r.equipamento
 		linha.insertCell(2).innerHTML = r.sala
 		linha.insertCell(3).innerHTML = r.inicio+'/'+r.fim
 		linha.insertCell(4).innerHTML = r.dia
 	//
 		})
	}
//
//	FILTRAR RESERVAS
//
	function pesquisarReserva() {
	//	RECUPERANDO O VALOR DO CAMPOS
		let responsavel = document.getElementById('responsavel').value
		let equipamento = document.getElementById('equipamento').value
		let sala 		= document.getElementById('sala').value
		let inicio 		= document.getElementById('inicio').value
		let fim 		= document.getElementById('fim').value
		let dataEua		= document.getElementById('dia').value

	//	VALIDAÇÃO DE PESQUISA FILTRO
		if(responsavel == '' && equipamento  == '' && sala == '' && inicio == '' && fim == '' && dataEua == '') {
		
		//	DIALOG DE ERRO
			$('#modalValidaReserva').modal('show')

			document.getElementById('modal_titulo').innerHTML 		= '<i class="fas fa-times-circle"></i> Erro!'
			document.getElementById('modal_titulo_div').className  	= 'modal-header text-danger'
			document.getElementById('modal_conteudo').innerHTML 	= 'Houve algum erro ao efetuar seu filtro. Por favor! verifique se algum campo não foi inseridos corretamente.'
			document.getElementById('modal_btn').innerHTML 			= 'Corrigir'
			document.getElementById('modal_btn').className 			= 'btn btn-danger'

 		} else {

 	//	RECUPERANDO O VALOR DO CAMPOS
		let responsavel = document.getElementById('responsavel').value
		let equipamento = document.getElementById('equipamento').value
		let sala 		= document.getElementById('sala').value
		let inicio 		= document.getElementById('inicio').value
		let fim 		= document.getElementById('fim').value
		let dataEua		= document.getElementById('dia').value

 		var diaBr = dataEua.substr(8,2)
		var mesBr = "/"+dataEua.substr(5,2)
		var anoBr = "/"+dataEua.substr(0,4)

		var dia = diaBr+mesBr+anoBr

		console.log(dia)

 	//	PASSANDO VALORES PARA VARIÁVEL
		let reserva = new Reserva(responsavel, equipamento, sala, inicio, fim, dia)
	
	//	RESULTADO DA PESQUISA DO FILTRO PASSADO PARA A VARIÁVEL
		let reservas = bancodedados.pesquisar(reserva)
	
	//	SELECIONANDO O ELEMENTO TBODY
		let listaReservas = document.getElementById('listaReservas')
	
	//	LIMPANDO CONTEÚDO DA TABELA DE RESERVA
		listaReservas.innerHTML = ''

 	//	LISTANTO A DESPESA 		
 		reservas.forEach(function(r) {
 	//
 	//	CRIANDO A LINHA (TR)
 		let linha =	listaReservas.insertRow()
 	//
 	//	CRIAR AS COLUNAS (TD)
 		linha.insertCell(0).innerHTML = r.responsavel
 		linha.insertCell(1).innerHTML = r.equipamento
 		linha.insertCell(2).innerHTML = r.sala
 		linha.insertCell(3).innerHTML = r.inicio+'/'+r.fim
 		linha.insertCell(4).innerHTML = r.dia
 	//
 	//	CRIAÇÃO DO BOTAO DE VIZUALIZAÇÃO
 		let view 		= document.createElement("button")
 		view.className 	= 'btn btn-outline-primary btn-sm'
 		view.title 		= 'Vizualizar'
 		view.innerHTML	= '<i class="fas fa-eye"></i>'
 		view.id			= `id_reserva_${r.id}`
 	//
 	//	QUANDO CLICAR NO BOTÃO OS DETALHES DA RESERVA SERÁ EXIBIDO E UM MODAL DE VIZUALIZAÇÃO VAI APARECER
 		view.onclick = function () {
 		//	DIALOG DE VIZUALIZAÇÃO
			$('#modalVizualizaReserva').modal('show')
		//
			document.getElementById('modal-titulo-view').innerHTML 		= '<i class="fas fa-eye"></i> Informações'
			document.getElementById('modal-titulo-div-view').className  = 'modal-header text-primary'
			document.getElementById('modal-conteudo-view').innerHTML 	= 'Detalhes da reserva do responsável: <span class="text-primary"><b>'+r.responsavel+'</b></span>'
			document.getElementById('modal-conteudo-view').innerHTML   += '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Equipamento</th><th scope="col">Local</th><th scope="col">Horário</th><th scope="col">Data</th></tr></thead><tbody><tr><th class="font-weight-normal">'+r.equipamento+'</th><td>'+r.sala+'</td><td>'+r.inicio+' / '+r.fim+'</td><td>'+r.dia+'</td></tr></tbody>'
			document.getElementById('modal-btn-view').innerHTML 		= 'Voltar'
			document.getElementById('modal-btn-view').className 		= 'btn btn-primary'
		//
			}
		//
 	//
 	//	CRIAÇÃO DO BOTAO DE EDIÇÃO
 		let edit 		= document.createElement("button")
 		edit.className 	= 'btn btn-outline-success btn-sm'
 		edit.title 		= 'Editar'
 		edit.innerHTML	= '<i class="fas fa-pencil-alt"></i>'
 		edit.id			= `id_reserva_${r.id}`
 	//
 	//	QUANDO CLICAR NO BOTÃO UMA VALIDAÇÃO DA EDIÇÃO IRÁ APARECER
 		edit.onclick = function () {
 			//
			//	VARIÁVEL DE VERIFICAÇÃO
			let resposta = prompt("Deseja realmente continuar? R: Sim ou Não")
			//
			//	VALIDAÇÃO
			if (resposta == 'sim'|| resposta == 'Sim' || resposta == 's' || resposta == 'S') { 
			//	FORMATAR O ID
				let id = this.id.replace('id_reserva_','')
			//	REMOVE A RESERVA
 				bancodedados.remover(id)
 			//	NOVOS VALORES SÃO RECEBIDOS
				let responsavel = prompt("Nome do Responsável, ex.: José.")
				let equipamento = prompt("Descrição do equipamento, ex.: Data Show S10.")
				let sala 		= prompt("Nome da sala, ex: Anatomia III.")
				let inicio 		= prompt("Início da aula, ex.: hh:mm.")
				let fim 		= prompt("Término da aula, ex.: hh:mm.")
				let dia 		= prompt("Dia da aula, ex.: aaaa-mm-dd.")
			//
			//	CRIAÇÃO DE UMA INSTÂCIA RESERVA ATRIBUIDA EM UMA VARIÁVEL
				let reserva = new Reserva(responsavel, equipamento, sala, inicio, fim, dia)
			//
			// 	GRAVA AS INFORMAÇÕES DA RESERVA NA CLASSE BANCODEDADOS
				bancodedados.gravar(reserva)
			//
			//	ATUALIZA A PÁGINA
				window.location.reload()
			}
		//
		}
		//
 	//
 	//	CRIAÇÃO BOTAO DE EXCLUSÃO
 		let dell 		= document.createElement("button")
 		dell.className 	= 'btn btn-outline-danger btn-sm'
 		dell.title 		= 'Excluir'
 		dell.innerHTML 	= '<i class="fa fa-trash-alt"></i>'
 		dell.id 		= `id_reserva_${r.id}`
 	//
 	//	QUANDO CLICAR NO BOTÃO A RESERVA SERÁ EXCLUÍDA E UM MODAL SERÁ EXIBIDO
 		dell.onclick = function () {
 		//	DIALOG DE EXCLUSÃO
			$('#modalExcluiReserva').modal('show')
		//
			document.getElementById('modal-titulo-del').innerHTML 		= '<i class="fas fa-pincel-times"></i> Excluir'
			document.getElementById('modal-titulo-div-del').className  	= 'modal-header text-danger'
			document.getElementById('modal-conteudo-del').innerHTML 	= 'A seguinte reserva irá ser <span class="text-danger"><b>excluida</b></span>:'
			document.getElementById('modal-conteudo-del').innerHTML    += '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Responsável</th><th scope="col">Equipamento</th><th scope="col">Local</th></tr></thead><tbody><tr><th>'+r.responsavel+'</th><td>'+r.equipamento+'</td><td>'+r.sala+'</td></tr></tbody>'
			document.getElementById('modal-btn-del').innerHTML 			= 'Confirmar'
			document.getElementById('modal-btn-del').className 			= 'btn btn-danger'
		//
		//	FORMATAR O ID
			let id = this.id.replace('id_reserva_','')
		//	REMOVE A RESERVA
 			bancodedados.remover(id)
 		//
			}
		//
	//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO EDIÇÃO E EXCLUSÃO
		linha.insertCell(5).append(view,' ', edit,' ',dell)
	//
 		})
 	//
 		}
 	//
	}
//
//	ATUALIZA A PÁGINA
//
 	function atualiza() {
 	//	ATUALIZA A PÁGINA
 		window.location.reload()
	}
//
//	IMPRIME AS RESERVAS
//
	function imprimeReservas() {
	//
	//	VARIÁVEL RECEBE O CONTEÚDO DA DIV TABELA
        let imprime = document.getElementById('conteudo-imprecao').innerHTML
    //	UMA NOVA JANELA ABRE E É SETADA EM UMA VARIÁVEL
        telaImpressao = window.open('about:blank')
    //	IMPRESÃO DO CONTEÚDO
        telaImpressao.document.write(imprime)
        telaImpressao.window.print()
        telaImpressao.window.close()
     }
//
//=============================================================||
//=============================================================||
//	3 - FUNÇÕES BOOTSTRAP
//
//	POPOVER
//
	$(function () {
  		$('[data-toggle="popover"]').popover()
	})
//
//	TOOLTIP
//
	$(function () {
  		$('[data-toggle="tooltip"]').tooltip()
	})
//==============================================================||
//==============================================================||