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
		constructor(dia, professor, equipamento, sala){
		//	INSTANCIAÇÃO DO OBJETO DESPESA
			this.dia 			= dia
			this.professor 		= professor
			this.equipamento 	= equipamento
			this.sala 			= sala
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
		gravar(d){
		//	VALOR DA REFERÊNCIAÇÃO DO getProximoId ATRIBUÍDO A UMA VARIÁVEL ID
			let id = this.getProximoId()
		//
		//	CONVERTE VALORES E SETA PARA O LOCALSTRORAGE 
			localStorage.setItem(id, JSON.stringify(d))
		//
		//	ATUALIZA O ID COM A INFORMAÇÃO DO NOVO ID DA FUNÇÃO getProximoId()
			localStorage.setItem('id', id)
		}
	}
	//
	//	CRIAÇÃO DE UMA INSTÂCIA DESPESA ATRIBUIDA EM UMA VARIÁVEL
		let bancodedados = new BancodeDados()
//==============================================================||
//==============================================================||
//	2 - CADASTRA A DESPESA
//
	function cadastrarReserva() {

	//	RECUPERA OS VALORES A PARTIR DO ID E REFERENCIA EM UMA VARIÁVEL
		let dia 		= document.getElementById('dia')
		let professor 	= document.getElementById('professor')
		let equipamento = document.getElementById('equipamento')
		let sala 		= document.getElementById('sala')

	//	CRIAÇÃO DE UMA INSTÂCIA DESPESA ATRIBUIDA EM UMA VARIÁVEL
		let reserva = new Reserva(
		//	PARÂMETROS DA DESPESA
			dia.value, 
			professor.value, 
			equipamento.value, 
			sala.value
		)
		bancodedados.gravar(reserva)
	}
//==============================================================||