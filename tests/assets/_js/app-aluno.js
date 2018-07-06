//==============================================================||
//	AUTOR: JEFERSON LUCAS
//	DATA DE CRIAÇÃO: 05/07/2018
//  DATA DE MODIFICAÇÃO: 05/07/2018
//  VERSÃO: 1.5.0-BETA
//	DESCRIÇÃO: CORE PARA CADASTRO/CONSULTA/FILTRO/VISUALIZAÇÃO
//	/EDIÇÃO E EXCLUSÃO DE RESERVAS DE ALUNOS
//==============================================================||
//==============================================================||
//==============================================================||
//	1 - CLASSES DO APP
//
//	1.1 - RESERVA ALUNO
//
	class ReservaAluno {

	//	DEFINIÇÃO DOS VALORES NO CONSTRUCTOR
		constructor(aluno, matricula, equipamento, numeroSerie, hora, dataEUA){
		//	INSTANCIAÇÃO DO OBJETO RESERVA
			this.aluno 			= aluno
			this.matricula 		= matricula
			this.equipamento 	= equipamento
			this.numeroSerie 	= numeroSerie
			this.hora 			= hora
			this.dataEUA 		= dataEUA
		}
	}
//
//==============================================================||
//==============================================================||
//	2 - FUNÇÕES DO APP DO ALUNO
//
//	2.1 - CADASTRA A RESERVA DE ALUNO
//
	function cadastrarReservaAluno() {
	//
	//	RECUPERA OS VALORES A PARTIR DO ID E REFERENCIA EM UMA VARIÁVEL
		let aluno 		= document.getElementById("aluno");
		let matricula 	= document.getElementById("matricula");
		let equipamento = document.getElementById("equipamento");
		let numeroSerie = document.getElementById("serie");
		let hora 		= document.getElementById("hora");
		let dataEUA 	= document.getElementById("data");

		let reserva = new ReservaAluno(aluno.value, matricula.value, equipamento.value, numeroSerie.value, hora.value, dataEUA.value);

		console.log(reserva)

	}
//