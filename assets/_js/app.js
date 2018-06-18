//==============================================================||
//	AUTOR: JEFERSON LUCAS
//	DATA DE CRIAÇÃO: 17/06/2018
//	DATA DE MODIFICAÇÃO: 17/06/2018
//	VERSÃO: 0.0.1
//	DESCRIÇÃO: CADASTRO/CONSULTA/IMPRESÃO DE RESULTADO
//==============================================================||
//==============================================================||
//	1 - CLASSE DESPESA
//
	class Reserva {

	//	DEFINIÇÃO DOS VALORES NO CONSTRUCTOR
		constructor(professor, equipamento, sala, inicio, fim, dia){
		//	INSTANCIAÇÃO DO OBJETO DESPESA
			this.professor 		= professor
			this.equipamento 	= equipamento
			this.sala 			= sala
			this.inicio 		= inicio
			this.fim 			= fim		
			this.dia 			= dia
		}
	//	VALIDAÇÃO DOS DADOS
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
//==============================================================||
//==============================================================||
//	2 - CLASSE BANCO DE DADOS
//
	class BancodeDados {
	//	METODO CONSTRUCTOR RECEBE O ID
		constructor(){
		//	RECEBE O ID E SETA EM UMA VARIÁVEL
			let id = localStorage.getItem('id')
		//	SE O ID FOR NULL ELE RECEBERÁ 0
			if (id === null) {
				localStorage.setItem('id', 0)
			}
		}
	//	VERIFICA SE JÁ EXISTE UM ID
		getProximoId(){
		//	RECUPERA O ITEM NO LOCALSTORAGE
			let proximoId = localStorage.getItem('id')
		//	RETORNA O ID CONVERTIDO PARA INTEIRO E RECEBE + 1 
			return parseInt(proximoId) + 1
		}
	//	GRAVAR REGISTROS NO LOCALSTRORAGE 
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
	//	PESQUISA E FILTRA OS DADOS DA RESERVA
		pesquisar(reserva) {
		//	VARIÁVEL ARRAY
			let reservasFiltradas = Array()
		//	VARIÁVEL RECEBE O MÉTODO DE RECUPERAR TODOS OS REGISTROS
			reservasFiltradas = this.recuperaTodosRegistros()

			console.log(reservasFiltradas)
			console.log(reserva)

		//	FILTRO PROFESSOR
			if(reserva.professor != '') {
				console.log('Filtro professor')
				reservasFiltradas = reservasFiltradas.filter(r => r.professor == reserva.professor)
			}
		//	FILTRO EQUIPAMENTO
			if(reserva.equipamento != '') {
				console.log('Filtro equipamento')
				reservasFiltradas = reservasFiltradas.filter(r => r.equipamento == reserva.equipamento)
			}		
		//	FILTRO SALA
			if(reserva.sala != '') {
				console.log('Filtro sala')
				reservasFiltradas = reservasFiltradas.filter(r => r.sala == reserva.sala)
			}		
		//	FILTRO INICIO
			if(reserva.inicio != '') {
				console.log('Filtro inicio')
				reservasFiltradas = reservasFiltradas.filter(r => r.inicio == reserva.inicio)
			}
		//	FILTRO FIM
			if(reserva.fim != '') {
				console.log('Filtro fim')
				reservasFiltradas = reservasFiltradas.filter(r => r.fim == reserva.fim)
			}
		//	FILTRO DIA
			if(reserva.dia != '') {
				console.log('Filtro dia')
				reservasFiltradas = reservasFiltradas.filter(r => r.dia == reserva.dia)
			}
		//	RETORVA O FILTRO
			return reservasFiltradas
		}
	//	REMOVER RESERVAS
		remover(id) {
			localStorage.removeItem(id)
		}
	}
	//
	//	CRIAÇÃO DE UMA INSTÂCIA RESERVA ATRIBUIDA EM UMA VARIÁVEL
		let bancodedados = new BancodeDados()
//==============================================================||
//==============================================================||
//	3 - CADASTRA A RESERVA
//
	function cadastrarReserva() {

	//	RECUPERA OS VALORES A PARTIR DO ID E REFERENCIA EM UMA VARIÁVEL
		let professor 	= document.getElementById('professor')
		let equipamento = document.getElementById('equipamento')
		let sala 		= document.getElementById('sala')
		let inicio 		= document.getElementById('inicio')
		let fim 		= document.getElementById('fim')
		let dia 		= document.getElementById('dia')

	//	CRIAÇÃO DE UMA INSTÂCIA RESERVA ATRIBUIDA EM UMA VARIÁVEL
		let reserva = new Reserva(
		//	PARÂMETROS DA RESERVA
			professor.value, 
			equipamento.value, 
			sala.value,
			inicio.value,
			fim.value,			
			dia.value
		)
	//	VERIFICAÇÃO DA VALIDAÇÃO DOS DADOS
		if(reserva.validarDados()) {
		// 	GRAVA AS INFORMAÇÕES DA RESERVA NA CLASSE BANCODEDADOS
			bancodedados.gravar(reserva)
		//
		//	DIALOG DE SUCESSO
			document.getElementById('modal_titulo').innerHTML 		= 'Reserva cadastrada com sucesso!'
			document.getElementById('modal_titulo_div').className  	= 'modal-header text-succes'
			document.getElementById('modal_conteudo').innerHTML 	= 'A reserva foi cadastrada com sucesso!'
			document.getElementById('modal_btn').innerHTML 			= 'Voltar'
			document.getElementById('modal_btn').className 			= 'btn btn-success'
		//
		//	ZERA OS VALORES
			professor.value 	= ''
			equipamento.value 	= ''
			sala.value 			= ''
			inicio.value 		= ''
			fim.value 			= ''	
			dia.value 			= ''
		//
			$('#modalRegistraReserva').modal('show')
		} else {
		//	DIALOG DE ERRO
			document.getElementById('modal_titulo').innerHTML 		= 'Erro no cadastro da reserva!'
			document.getElementById('modal_titulo_div').className  	= 'modal-header text-danger'
			document.getElementById('modal_conteudo').innerHTML 	= 'Erro na gravação, verifique se todos os campo foram inseridos corretamente!'
			document.getElementById('modal_btn').innerHTML 			= 'Voltar e corrigir'
			document.getElementById('modal_btn').className 			= 'btn btn-danger'

			$('#modalRegistraReserva').modal('show')
		}
	}
//==============================================================||
//==============================================================||
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
 		linha.insertCell(0).innerHTML = r.professor
 		linha.insertCell(1).innerHTML = r.equipamento
 		linha.insertCell(2).innerHTML = r.sala
 		linha.insertCell(3).innerHTML = r.inicio
 		linha.insertCell(4).innerHTML = r.fim
 		linha.insertCell(5).innerHTML = r.dia
 	//
 	//	CRIAR BOTAO DE EXCLUSÃO
 		let btn = document.createElement("button")
 		btn.className = 'btn btn-danger'
 		btn.innerHTML = '<i class="fas fa-times"></i>'
 		btn.id = `id_reserva_${r.id}`
 		btn.onclick = function() {
 		//	FORMATAR O ID
 			let id = this.id.replace('id_reserva_','')
 		//	REMOVE A RESERVA
 			bancodedados.remover(id)
 		//	ATUALIZA A PÁGINA
 			window.location.reload()
 		}
 		linha.insertCell(6).append(btn)

 		console.log(r)

 		})
	}
//==============================================================||
//==============================================================||
//	FILTRAR RESERVAS
//
	function pesquisarReserva() {
	//	RECUPERANDO O VALOR DO CAMPOS
		let professor 	= document.getElementById('professor').value
		let equipamento = document.getElementById('equipamento').value
		let sala 		= document.getElementById('sala').value
		let inicio 		= document.getElementById('inicio').value
		let fim 		= document.getElementById('fim').value
		let dia 		= document.getElementById('dia').value
	//
	//	PASSANDO VALORES PARA VARIÁVEL
		let reserva = new Reserva(professor, equipamento, sala, inicio, fim, dia)
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
 		linha.insertCell(0).innerHTML = r.professor
 		linha.insertCell(1).innerHTML = r.equipamento
 		linha.insertCell(2).innerHTML = r.sala
 		linha.insertCell(3).innerHTML = r.inicio
 		linha.insertCell(4).innerHTML = r.fim
 		linha.insertCell(5).innerHTML = r.dia

 		})
	}
//==============================================================||