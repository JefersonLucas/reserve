//==============================================================//
//	AUTOR: JORGE SANT ANA
//	DATA DE CRIAÇÃO: 17/06/2018
//	DATA DE MODIFICAÇÃO: 17/06/2018
//	VERSÃO: 0.0.1
//	DESCRIÇÃO: CADASTRO/CONSULTA/IMPRESÃO DE RESULTADO
//==============================================================//
//==============================================================//
//	1 -CLASSE DESPESA
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
//==============================================================//
//==============================================================//
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
		console.log(reserva)
		gravar(reserva)
	}
//==============================================================//
//==============================================================//
//	3 - GRAVAR DESPESA
//
	function gravar(d){
	//	CONVERTE VALORES E ENVIA PARA O LOCALSTRORAGE 
		localStorage.setItem('reserva', JSON.stringify(d))
	}
//==============================================================//
