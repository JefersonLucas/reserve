//==============================================================||
//	AUTOR: JEFERSON LUCAS
//	DATA DE CRIAÇÃO: 05/07/2018
//  DATA DE MODIFICAÇÃO: 06/07/2018
//  VERSÃO: 1.5.0-BETA
//	DESCRIÇÃO: CORE PARA CADASTRO/CONSULTA/FILTRO/VISUALIZAÇÃO
//	/EDIÇÃO E EXCLUSÃO DE RESERVAS DE ALUNOS
//==============================================================||
//==============================================================||
//	1 - CLASSES DO APP ALUNO
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
	//	MÉTODO VALIDAÇÃO DOS DADOS
		validarDadosAluno() {
		//	MÉTODE DE VALIDAR OS DADOS DA RESERVA
			for (let i in this){
			//	VERIFICA SE O VALOR É INDEFINIDO/VAZIO/NULO
				if (this[i] === undefined || this[i] === "" || this[i] === null){
				//	SE O VALOR FOR INDEFINIDO/VAZIO/NULO RETORNA FALSO
					return false;
				}
			}
		//	RETORNA VERDADEIRO CASO OS DADOS FOR VÁLIDOS
			return true
		}
	}
//
//	1.2 BANCO DE DADOS
//
	class BancodeDadosAluno {
	//	MÉTODO CONSTRUCTOR RECEBE O ID
		constructor(){
		//	RECEBE O ID E SETA EM UMA VARIÁVEL
			let id = localStorage.getItem("idAluno");
		//	SE O ID FOR NULL ELE RECEBERÁ 0
			if (id === null) {
				localStorage.setItem("idAluno", 0)
			}
		}
	//	MÉTODO VERIFICA SE JÁ EXISTE UM ID
		getProximoId(){
		//	RECUPERA O ITEM NO LOCALSTORAGE
			let proximoId = localStorage.getItem("idAluno");
		//	RETORNA O ID CONVERTIDO PARA INTEIRO E RECEBE + 1
			let idProfessor = localStorage.getItem("idProfessor");
			let idAluno = localStorage.getItem("idAluno");

			for (idAluno = 1; idAluno != idProfessor ; idAluno++){
				
				console.log(idAluno);

				return parseInt(proximoId) + idAluno; 
			}
		}
	//	MÉTODO GRAVAR REGISTROS NO LOCALSTORAGE
		gravarAluno(a){
		//	VALOR DA REFERÊNCIAÇÃO DO getProximoId ATRIBUÍDO A UMA VARIÁVEL id
			let idAluno = this.getProximoId();
		//
		//	CONVERTE VALORES E SETA PARA O LOCALSTORAGE
			localStorage.setItem(idAluno, JSON.stringify(a));
		//
		//	ATUALIZA O ID COM A INFORMAÇÃO DO NOVO ID DA FUNÇÃO getProximoId()
			localStorage.setItem("idAluno", idAluno);
		}
	//	MÉTODO PARA RECUPERAR OS REGISTROS DAS RESERVAS DOS ALUNOS NO LOCALSTORAGE
		recuperaTodosRegistrosAlunos(){
		//	ARRAY DE RESERVAS
			let reservasAlunos = Array();
		//
		//	RECUPERA O ID ATUAL E SETA EM UMA VARIÁVEL
			let idAluno = localStorage.getItem("idAluno");
		//
		//	RECUPERA TODOS OS ITENS DO LOCALSTORAGE COM A ESTRUTURA DE REPETIÇÃO
			for(let i = 1; i <= idAluno; i++){
			//	RECUPERA A RESERVA
				let reservaAluno = JSON.parse(localStorage.getItem(i));
			//
			//	VERIFICA SE UMA RESERVA FOI EXCLUÍDA
				if(reservaAluno === null){
					continue;
				}
			//	A RESERVA RECEBE UM ID
				reservaAluno.id = i;
			//	PUSH DO ARRAY DE RESERVAS DOS ALUNOS
				reservasAlunos.push(reservaAluno)
			}
		//	RETORNO DO ARRAY DE RESERVA DOS ALUNOS
			return reservasAlunos;
		}
		
	}
//
//==============================================================||
//==============================================================||
//	INSTÂNCIA GLOBAL BANCODEDADOS ATRÍBUIDA EM UMA VARIÁVEL
//
	let bancodedados = new BancodeDadosAluno();
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
	//
		let reserva = new ReservaAluno(aluno.value, matricula.value, equipamento.value, numeroSerie.value, hora.value, dataEUA.value);
	//
		console.log(reserva);
	//	VERIFICAÇÃO DA VALIDAÇÃO DOS DADOS
		if(reserva.validarDadosAluno()) {
		//	MODAL DE SUCESSO
		//
		// 	GRAVA AS INFORMAÇÕES DA RESERVA NA CLASSE BANCODEDADOS
			bancodedados.gravarAluno(reserva);
		//
		//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
			var diaBR = dataEUA.value.substr(8,2);
			var mesBR = "/"+dataEUA.value.substr(5,2);
			var anoBR = "/"+dataEUA.value.substr(0,4);
		//	VARIÁVEL COM A DATA NO FORMATO BR
			var dataBR = diaBR+mesBR+anoBR;
		//
			document.getElementById('modal_titulo_success').innerHTML 		= '<i class="fas fa-check-circle"></i> Sucesso!';
			document.getElementById('modal_titulo_div_success').className  	= 'modal-header text-white bg-success';
			document.getElementById('modal_conteudo_success').innerHTML 	= 'A reserva do aluno(a) <span class="text-success"><b>'+reserva.aluno+'</b></span> foi cadastrada com <span class="text-success"><b>sucesso!</b></span><br>'
			document.getElementById('modal_conteudo_success').innerHTML	   += '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Matrícula</th><th scope="col">Equipamento</th><th scope="col">Nº Série</th><th scope="col">Data e Horário</th></tr></thead><tbody><tr><th class="font-weight-normal">'+reserva.matricula+'</th><td>'+reserva.equipamento+'</td><td>'+reserva.numeroSerie+'</td><td>'+dataBR+' - '+reserva.hora+'</td></tr></tbody>';
			document.getElementById('modal_btn_success').innerHTML 			= 'Voltar';
			document.getElementById('modal_btn_success').className 			= 'btn btn-outline-success';
		//
		//	ZERA OS VALORES
			aluno.value 		= "";
			matricula.value 	= "";
			equipamento.value 	= "";
			numeroSerie.value 	= "";
			hora.value 			= "";
			dataEUA.value 		= "";

		//
			$('#modalCadastraReservaSucesso').modal('show');
		//
		} else {
		//	MODAL DE ERRO
			document.getElementById('modal_titulo_erro').innerHTML 		= '<i class="fas fa-times-circle"></i> Erro!';
			document.getElementById('modal_titulo_div_erro').className  = 'modal-header text-white bg-danger';
			document.getElementById('modal_conteudo_erro').innerHTML 	= 'Erro ao efetuar seu <span class="text-danger"><b>cadastro</b></span>. Por favor verifique se todos os campo foram inseridos corretamente.';
			document.getElementById('modal_btn_erro').innerHTML 		= 'Corrigir';
			document.getElementById('modal_btn_erro').className 		= 'btn btn-outline-danger';
		//
			$('#modalCadastraReservaErro').modal('show');
		}
		//
	}
//
//	2.2 - CARREGA A LISTA DE CONSULTA
//
	function carregaListasReservasAlunos() {
	//	DECLARAÇÃO DO ARRAY DE RESERVAS DO ALUNO
		let reservasAlunos = Array();
	//	SETANDO O VALOR DO ARRAY EM UMA VARIÁVEL
		reservasAlunos = bancodedados.recuperaTodosRegistrosAlunos();
	//	SELECIONANDO O ELEMENTO TBODY DA TABELA DE RESERVAS
		let listaAlunos = document.getElementById("listaAlunos")
	//
	//	LISTANDO A RESERVA
		reservasAlunos.forEach(function(a) {
		//
		//	CRIANDO A LINHA DE RESERVA (TR)
			let linha = listaAlunos.insertRow();
		//	CRIANDO AS COLUNAS DE RESERVA (TD)
			linha.insertCell(0).innerHTML = a.aluno;
			linha.insertCell(1).innerHTML = a.matricula;
			linha.insertCell(2).innerHTML = a.equipamento;
			linha.insertCell(3).innerHTML = a.numeroSerie;
			linha.insertCell(4).innerHTML = a.dataEUA+" - "+a.hora;
		//
		//	CRIAÇÃO DO BOTÃO DE VIZUALIZAÇÃO
		//
 		let ver 		= document.createElement("button");
 		ver.className 	= 'btn btn-outline-primary btn-sm';
 		ver.title 		= 'Vizualizar';
 		ver.innerHTML	= '<i class="far fa-eye"></i>';
 		ver.id			= `id_aluno_${a.id}`;
 	//
 	//	QUANDO CLICAR NO BOTÃO OS DETALHES DA RESERVA SERÁ EXIBIDO E UM MODAL DE VIZUALIZAÇÃO VAI APARECER
 		ver.onclick = function () {
 		//	MODAL DE VIZUALIZAÇÃO
			$('#modalVizualizaReserva').modal('show');
		//
			document.getElementById('modal-titulo-ver').innerHTML 		= '<i class="fas fa-eye"></i> Informações';
			document.getElementById('modal-titulo-div-ver').className  	= 'modal-header text-white bg-primary';
			document.getElementById('modal-conteudo-ver').innerHTML 	= 'Detalhes da reserva do(a) aluno(a) <span class="text-primary"><b>'+p.professor+'</b></span>';
			document.getElementById('modal-conteudo-ver').innerHTML   	+= '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Equipamento</th><th scope="col">Local</th><th scope="col">Horário</th><th scope="col">Data</th></tr></thead><tbody><tr><th class="font-weight-normal">'+p.equipamento+'</th><td>'+p.sala+'</td><td>'+p.horaA+'/'+p.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
			document.getElementById('modal-btn-ver').innerHTML 			= 'Voltar';
			document.getElementById('modal-btn-ver').className 			= 'btn btn-outline-primary';
		//
		}
		//


			linha.insertCell(5).append(ver);
			
			})
	}
//
//	2.4 - ATUALIZA A PÁGINA
//
 	function atualiza() {
 	//	ATUALIZA A PÁGINA
 		window.location.reload();
	}
//
//	2.5 - IMPRIME AS RESERVAS
//
	function imprimeReservasProfessor() {
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