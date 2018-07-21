//==============================================================||
//	AUTOR: JEFERSON LUCAS
//	DATA DE CRIAÇÃO: 21/07/2018
//  DATA DE MODIFICAÇÃO: 21/07/2018
//  VERSÃO: 1.5.0-BETA
//	DESCRIÇÃO: CORE PARA CADASTRO/CONSULTA/FILTRO/VISUALIZAÇÃO
//	/EDIÇÃO E EXCLUSÃO DE RESERVAS DE PROFESSORES E ALUNOS
//==============================================================||
//==============================================================||
//	1 - CLASSES DO APP
//
//	1.1 - RESERVA
//
//	CLASSE PAI / RESERVA
	class Reserva {
		constructor(nome, equipamento, horaA, dataEUA) {
			this.nome 			= nome;
			this.equipamento 	= equipamento;
			this.horaA			= horaA;
			this.dataEUA 			= dataEUA; 
		}
	//	VALIDAR DADOS DE RESERVA
		validaDadosReserva() {
		//	VALIDAR OS DADOS DA RESERVA
			for (let r in this){
			//	VERIFICA SE O VALOR É INDEFINIDO/VAZIO/NULO
				if (this[r] === undefined || this[r] === "" || this[r] === null){
				//	RETORNA FALSO
					return false;
				}
			}
		//	RETORNA VERDADEIRO
			return true
		}
	}
///
//	CLASSE FILHO / RESERVA DO PROFESSOR
	class ReservaProfessor extends Reserva {
		constructor(nome, equipamento, horaA, dataEUA, sala, horaB) {
			super(nome, equipamento, horaA, dataEUA);
			this.sala = sala;
			this.horaB = horaB;
		}
	}
//
//	CLASSE FILHO / RESERVA DO ALUNO
	class ReservaAluno extends Reserva {
		constructor(nome, equipamento, horaA, dataEUA, matricula, numeroSerie) {
			super(nome, equipamento, horaA, dataEUA);
			this.matricula = matricula;
			this.numeroSerie = numeroSerie;
		}
	}
//
//==============================================================||
//==============================================================||
//	2 - FUNÇÕES DO APP
//	FUNÇÃO CADASTRAR A RESERVA DO PROFESSOR
	function cadastrarReservaProfessor() {
	//	RESGATANDO O VALOR DA RESERVA	
		let nome 		= document.getElementById('professor');
		let equipamento = document.getElementById('equipamento');
		let sala 		= document.getElementById('sala');
		let horaA 		= document.getElementById('horaA');
		let horaB 		= document.getElementById('horaB');
		let dataEUA 	= document.getElementById('data');
	//
	//	INSTÂNCIA DA RESERVA DO PROFESSOR
		reservaProfessor  = new ReservaProfessor(nome.value, equipamento.value, horaA.value, dataEUA.value, sala.value, horaB.value)
	//
	//	DEBUG
		console.log(reservaProfessor);
	//
	//	VALIDAÇÃO
		if(reservaProfessor.validaDadosReserva()){
		//
		//	DIALOG DE SUCESSO
			$('#modalCadastraReservaSucesso').modal('show');
		//
		// 	GRAVA AS INFORMAÇÕES DA RESERVA NA CLASSE BANCODEDADOS
		//	bancodedados.gravarProfessor(reserva);
		//
		//	CONVERTE A DATA NO FORMATO EUA PARA O BR
			var diaBR = dataEUA.value.substr(8,2);
			var mesBR = "/"+dataEUA.value.substr(5,2);
			var anoBR = "/"+dataEUA.value.substr(0,4);
			var dataBR = diaBR+mesBR+anoBR;
		//
			document.getElementById('modal_titulo_success').innerHTML 		= '<i class="fas fa-check-circle"></i> Sucesso!';
			document.getElementById('modal_titulo_div_success').className  	= 'modal-header text-white bg-success';
			document.getElementById('modal_conteudo_success').innerHTML 	= 'A reserva do professor(a) <span class="text-success"><b>'+reservaProfessor.nome+'</b></span> foi cadastrada com <span class="text-success"><b>sucesso!</b></span><br>'
			document.getElementById('modal_conteudo_success').innerHTML	   += '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Equipamento</th><th scope="col">Local</th><th scope="col">Horário</th><th scope="col">Data</th></tr></thead><tbody><tr><th class="font-weight-normal">'+reservaProfessor.equipamento+'</th><td>'+reservaProfessor.sala+'</td><td>'+reservaProfessor.horaA+'/'+reservaProfessor.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
			document.getElementById('modal_btn_success').innerHTML 			= 'Voltar';
			document.getElementById('modal_btn_success').className 			= 'btn btn-outline-success';
		//
		//	LIMPA OS VALORES
			nome.value 			= "";
			equipamento.value 	= "";
			sala.value 			= "";
			horaA.value 		= "";
			horaB.value 		= "";
			dataEUA.value 		= "";
		//
		} else {
		//	DIALOG DE ERRO
			$('#modalCadastraReservaErro').modal('show');
		//
			document.getElementById('modal_titulo_erro').innerHTML 		= '<i class="fas fa-times-circle"></i> Erro!';
			document.getElementById('modal_titulo_div_erro').className  = 'modal-header text-white bg-danger';
			document.getElementById('modal_conteudo_erro').innerHTML 	= 'Erro ao efetuar seu <span class="text-danger"><b>cadastro</b></span>. Por favor verifique se todos os campo foram inseridos corretamente.';
			document.getElementById('modal_btn_erro').innerHTML 		= 'Corrigir';
			document.getElementById('modal_btn_erro').className 		= 'btn btn-outline-danger';
		//
		}
	}
//
//	FUNÇÃO CADASTRAR A RESERVA DO ALUNO
	function cadastrarReservaAluno() {
	//	RESGATANDO O VALOR DA RESERVA	
		let nome 		= document.getElementById('aluno');
		let matricula 	= document.getElementById('matricula');
		let equipamento = document.getElementById('equipamento');		
		let numeroSerie = document.getElementById('serie');
		let horaA 		= document.getElementById('horaA');
		let dataEUA 	= document.getElementById('data');
	//
	//	INSTÂNCIA DA RESERVA DO ALUNO
		reservaAluno  = new ReservaAluno(nome.value, equipamento.value, horaA.value, dataEUA.value, matricula.value, numeroSerie.value)
	//
	//	DEBUG
		console.log(reservaAluno);
	//
		//	VALIDAÇÃO
		if(reservaAluno.validaDadosReserva()){
		//
		//	DIALOG DE SUCESSO
			$('#modalCadastraReservaSucesso').modal('show');
		//
		// 	GRAVA AS INFORMAÇÕES DA RESERVA NA CLASSE BANCODEDADOS
		//	bancodedados.gravarProfessor(reserva);
		//
		//	CONVERTE A DATA NO FORMATO EUA PARA O BR
			var diaBR = dataEUA.value.substr(8,2);
			var mesBR = "/"+dataEUA.value.substr(5,2);
			var anoBR = "/"+dataEUA.value.substr(0,4);
			var dataBR = diaBR+mesBR+anoBR;
		//
			document.getElementById('modal_titulo_success').innerHTML 		= '<i class="fas fa-check-circle"></i> Sucesso!';
			document.getElementById('modal_titulo_div_success').className  	= 'modal-header text-white bg-success';
			document.getElementById('modal_conteudo_success').innerHTML 	= 'A reserva do aluno(a) <span class="text-success"><b>'+reservaAluno.nome+'</b></span> foi cadastrada com <span class="text-success"><b>sucesso!</b></span><br>'
			document.getElementById('modal_conteudo_success').innerHTML	   += '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Matrícula</th><th scope="col">Equipamento</th><th scope="col">Nº série</th><th scope="col">Data e horário</th></tr></thead><tbody><tr><th class="font-weight-normal">'+reservaAluno.matricula+'</th><td>'+reservaAluno.equipamento+'</td><td>'+reservaAluno.numeroSerie+'</td><td>'+dataBR+' - '+reservaAluno.horaA+'</td></tr></tbody>';
			document.getElementById('modal_btn_success').innerHTML 			= 'Voltar';
			document.getElementById('modal_btn_success').className 			= 'btn btn-outline-success';
		//
		//	LIMPA OS VALORES
			nome.value 			= "";
			matricula.value 	= "";
			equipamento.value 	= "";
			numeroSerie.value 	= "";
			horaA.value			= "";
			dataEUA.value 		= "";
		//
		} else {
		//	DIALOG DE ERRO
			$('#modalCadastraReservaErro').modal('show');
		//
			document.getElementById('modal_titulo_erro').innerHTML 		= '<i class="fas fa-times-circle"></i> Erro!';
			document.getElementById('modal_titulo_div_erro').className  = 'modal-header text-white bg-danger';
			document.getElementById('modal_conteudo_erro').innerHTML 	= 'Erro ao efetuar seu <span class="text-danger"><b>cadastro</b></span>. Por favor verifique se todos os campo foram inseridos corretamente.';
			document.getElementById('modal_btn_erro').innerHTML 		= 'Corrigir';
			document.getElementById('modal_btn_erro').className 		= 'btn btn-outline-danger';
		//
		}
	}
//
	function carregaListaReservasProfessores() {}
	function carregaListasReservasAlunos() {}

//	2.4 - ATUALIZA A PÁGINA
//
 	function atualiza() {
 	//	ATUALIZA A PÁGINA
 		window.location.reload();
	}
//
//	2.5 - IMPRIME AS RESERVAS
//
	function imprimeReserva() {
	//
	//	VARIÁVEL RECEBE O CONTEÚDO DA DIV TABELA
        let imprime = document.getElementById('conteudo-imprecao').innerHTML;
    //	UMA NOVA JANELA ABRE E É SETADA EM UMA VARIÁVEL
        telaImpressao = window.open('about:blank');
    //	IMPRESÃO DO CONTEÚDO
        telaImpressao.document.write(imprime);
        telaImpressao.window.print();
        telaImpressao.window.close();
     }
//
//=============================================================||
//=============================================================||
//	3 - FUNÇÕES BOOTSTRAP
//
//	3.1 - POPOVER
//
	$(function () {
  		$('[data-toggle="popover"]').popover();
	})
//
//	3.2 - TOOLTIP
//
	$(function () {
  		$('[data-toggle="tooltip"]').tooltip();
	})
//==============================================================||
//==============================================================||