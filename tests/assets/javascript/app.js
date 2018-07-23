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
//
	class BancodeDados {
		constructor(){
		//	RECEBE O ID E SETA EM UMA VARIÁVEL
			let idAluno 	= localStorage.getItem('idAluno');
			let idProfessor = localStorage.getItem('idProfessor');
		//	SE O ID FOR NULL
			if (idAluno === null) {
			//	SETA UM NOVO ID/CHAVE/VALOR
				localStorage.setItem('idAluno', 0);
			}
			if (idProfessor === null) {
			//	SETA UM NOVO ID/CHAVE/VALOR
				localStorage.setItem('idProfessor', 0);
			}
		}
		getProximoId(nome) {

			let idAluno 	= parseInt(localStorage.getItem('idAluno')); 
			let idProfessor = parseInt(localStorage.getItem('idProfessor'));

			//
			if (nome == "Professor") {
			//	VERIFICAÇÃO
				if(idAluno > idProfessor) {
				//	ESTRUTURA FOR PARA RETORNAR NOVO VALOR DE ID
					for(let i = 0; i <= idAluno; i++) {
						var proximoId = i + 1;
					}
				//	VALOR DE RETORNO
					return proximoId;
				//
				} else if(idProfessor > idAluno) {
				//	VALOR DE RETORNO
					var proximoId = (idProfessor + 1);
				//	RETORNO DO NOVO VALOR DE ID
					return proximoId;
				//
				} else if(idProfessor == idAluno) {
				//	VALOR DE RETORNO
					var proximoId = (idProfessor + 1);
				//	RETORNO DO NOVO VALOR DE ID
					return proximoId;
				}
				else {
				//	RETORNO DO VALOR DE ID
					return 0;
				//
				}
			//
			} 
			else if(nome == "Aluno") {
			//	VERIFICAÇÃO
				if(idProfessor > idAluno) {
				//	ESTRUTURA FOR PARA RETORNAR NOVO VALOR DE ID
					for(let i = 0; i <= idProfessor; i++){
						var proximoId = i + 1;
					}
				//	RETORNO DO NOVO VALOR DE ID
					return proximoId;
				//	
				} else if(idAluno > idProfessor) {
				//	VALOR DE RETORNO
					let proximoId = (idAluno + 1);
				//	
					return proximoId;
				//
				} else if(idAluno == idProfessor) {
				//	VALOR DE RETORNO
					let proximoId = (idAluno + 1);
				//	
					return proximoId;
				//
				} else {
				//	RETORNO DO VALOR DE ID
					return 0;
				//
				}
				//				
			}
		}
		gravar(r, n) {
		//	VALOR DA getProximoId ATRIBUÍDO A UMA VARIÁVEL ID
			let id = this.getProximoId(n);
		//
		//	CONVERTE VALORES E SETA PARA O LOCALSTRORAGE 
			localStorage.setItem(id, JSON.stringify(r))
		//
		//	ATUALIZA O ID COM A INFORMAÇÃO DO NOVO ID DA FUNÇÃO getProximoId()
			localStorage.setItem(`id${n}`, id)
		}
		recuperaReservaProfessor() {
			
			let reservas = Array()

			let id = localStorage.getItem("idProfessor");

			for(let i = 0; i <= id; i++){
				let reserva = JSON.parse(localStorage.getItem(i));
			
				if(reserva === null || reserva.nome === undefined || reserva.equipamento === undefined || reserva.sala === undefined || reserva.horaA === undefined || reserva.horaB === undefined || reserva.dataEUA === undefined) {
					continue;
				}
				reserva.id = i;
				reservas.push(reserva);
			}
			return reservas;
		}
		recuperaReservaAluno() {

			let reservas = Array()

			let id = localStorage.getItem("idAluno");

			for(let i = 0; i <= id; i++){
				let reserva = JSON.parse(localStorage.getItem(i));
			
				if(reserva === null || reserva.nome === undefined || reserva.matricula === undefined || reserva.equipamento === undefined || reserva.numeroSerie === undefined || reserva.horaA === undefined || reserva.dataEUA === undefined) {
					continue;
				}
				reserva.id = i;
				reservas.push(reserva);
			}
			return reservas;
		}
	//	MÉTODO REMOVER RESERVAS
		removerReserva(id) {
			localStorage.removeItem(id);
		}
	}
//
//	VARIÁVEL GLOBAL BANCO DE DADOS
	let bancodedados = new BancodeDados();
//
//==============================================================||
//==============================================================||
//	2 - FUNÇÕES DO APP
//
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
			bancodedados.gravar(reservaProfessor, "Professor");
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
			bancodedados.gravar(reservaAluno, "Aluno");
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
//	LISTA DE RESERVAS DOS PROFESSORES
	function ListaReservasProfessores() {
	//	DECLARAÇÃO DO ARRAY RESERVAS
		let reservas = Array();
	//	SETANDO O VALOR DO ARRAY NA VARIÁVEL
		reservas = bancodedados.recuperaReservaProfessor();
	//	SELECIONANDO O ELEMENTO TBODY
		let listaReservas = document.getElementById("listaProfessores");
	//
	//	LISTANTO A RESERVA
 		reservas.forEach(function(p) {
 		//
 		//	CRIANDO A LINHA (TR)
 			let linha =	listaReservas.insertRow();
 		//
 		//	CRIAR AS COLUNAS (TD)
 			linha.insertCell(0).innerHTML = p.nome;
 			linha.insertCell(1).innerHTML = p.equipamento;
 			linha.insertCell(2).innerHTML = p.sala;
 			linha.insertCell(3).innerHTML = p.horaA+"/"+p.horaB;
			//
			//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
				let diaBR = p.dataEUA.substr(8,2);
				let mesBR = "/"+p.dataEUA.substr(5,2);
				let anoBR = "/"+p.dataEUA.substr(0,4);
			//	VARIÁVEL NO FORMATO BR		
				let dataBR = diaBR+mesBR+anoBR;
			//
		//	DATA EXIBIDA NO FORMATO BR
			linha.insertCell(4).innerHTML = dataBR;
		//
 		//	BOTAO DE VIZUALIZAÇÃO
 		//
 			let ver 		= document.createElement("button");
 			ver.className 	= 'btn btn-outline-primary btn-sm';
 			ver.title 		= "Vizualizar";
 			ver.innerHTML 	= '<i class="far fa-eye"></i>';
 			ver.id 			= `id_ver_${p.id}`;
 		//
 		//	NO CLICAR DO BOTÃO OS DETALHES DA RESERVA SERÁ EXIBIDO EM UM MODAL
 			ver.onclick = function() {
 			//	MODAL DE VIZUALIÇÃO
 				$('#modalVizualizaReserva').modal('show');
			//
				document.getElementById('modal-titulo-ver').innerHTML 		= '<i class="fas fa-eye"></i> Informações';
				document.getElementById('modal-titulo-div-ver').className  	= 'modal-header text-white bg-primary';
				document.getElementById('modal-conteudo-ver').innerHTML 	= 'Detalhes da reserva do(a) professor(a) <span class="text-primary"><b>'+p.nome+'</b></span>';
				document.getElementById('modal-conteudo-ver').innerHTML   	+= '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Equipamento</th><th scope="col">Local</th><th scope="col">Horário</th><th scope="col">Data</th></tr></thead><tbody><tr><th class="font-weight-normal">'+p.equipamento+'</th><td>'+p.sala+'</td><td>'+p.horaA+'/'+p.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
				document.getElementById('modal-btn-ver').innerHTML 			= 'Voltar';
				document.getElementById('modal-btn-ver').className 			= 'btn btn-outline-primary';
			//
 			}
 		//
 		//	BOTAO DE EDIÇÃO
 		//
 			let editar 			= document.createElement("button");
 			editar.className 	= 'btn btn-outline-success btn-sm';
 			editar.title 		= "Editar";
 			editar.innerHTML 	= '<i class="fas fa-pencil-alt"></i>';
 			editar.id 			= `id_editar_${p.id}`;
 		//
 			editar.onclick = function() {
 			//
 			//	VERIFICAÇÃO
 				let = resposta = prompt("Deseja EDITAR a reserva do(a) "+p.nome+"? R: Sim ou Não","Não");
 			//
 			//	VALIDAÇÃO DE VERIFICAÇÃO
 				if(resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
 				//
 				//	NOVOS VALORES SERÃO RECEBIDOS
 					let nome 			= prompt("Nome do(a) Professor(a):", p.nome);
 					let equipamento 	= prompt("Descrição do equipamento:",p.equipamento);
 					let sala 			= prompt("Nome do sala:",p.sala);
 					let horaA 			= prompt("Início da aula:",p.horaA);
 					let horaB 			= prompt("Término da aula:",p.horaB);
 					let dataBr 			= prompt("Data da aula:",dataBR);
 				//
 				//	MODAL DE EDIÇÃO
 					$('#modalEditaReserva').modal('show');
				//
					document.getElementById('modal-titulo-editar').innerHTML 		= '<i class="fas fa-pencil-alt"></i> Editar';
					document.getElementById('modal-titulo-div-editar').className  	= 'modal-header text-white bg-success';
					document.getElementById('modal-dialog-editar').className  		= 'modal-dialog border border-success rounded alert-success';
					document.getElementById('modal-conteudo-editar').innerHTML 		= 'A reserva do(a) professor(a) <span class="text-success"><b>'+nome+'</b></span> foi alterada com <span class="text-success"><b>sucesso!</b></span>'
					document.getElementById('modal-conteudo-editar').innerHTML     += '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Equipamento</th><th scope="col">Local</th><th scope="col">Horário</th><th scope="col">Data</th></tr></thead><tbody><tr><th class="font-weight-normal">'+equipamento+'</th><td>'+sala+'</td><td>'+horaA+'/'+horaB+'</td><td>'+dataBr+'</td></tr></tbody>';
					document.getElementById('modal-btn-editar').innerHTML 			= 'Voltar';
					document.getElementById('modal-btn-editar').className 			= 'btn btn-outline-success';
				//
				//	FORMATAR O ID
					let id = this.id.replace('id_editar_','');
				//	REMOVE A RESERVA
					bancodedados.removerReserva(id);
				//
				//	COMVERSÃO DO CALENDÁRIO NO FORMATO BR PARA EUA
					let anoEUA = dataBr.substr(6,4);
					let mesEUA = "-"+dataBr.substr(3,2);
					let diaEUA = "-"+dataBr.substr(0,2);
				//	VARIÁVEL DO CALENDÁRIO NO FORMATO EUA
					let dataEUA = anoEUA+mesEUA+diaEUA;
				//
				//	CRIAÇÃO DE UMA NOVA INSTÂNCIA RESERVA
					let reservaProfessor = new ReservaProfessor(nome, equipamento, horaA, dataEUA, sala, horaB);
				//
				//	GRAVA AS INFORMAÇÕES NO BANCO DE DADOS
					bancodedados.gravar(reservaProfessor, "Professor");
				//
 				}
 			}

 		//
 		//	BOTAO DE EXCLUSÃO
 		//
 			excluir = document.createElement("button");
 			excluir.className 	= 'btn btn-outline-danger btn-sm';
 			excluir.title 		= 'Excluir';
 			excluir.innerHTML 	= '<i class="fa fa-trash-alt"></i>';
 			excluir.id 			= `id_excluir_${p.id}`;
 		//
 		//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO
 			linha.insertCell(5).append(ver," ", editar, " ", excluir);
 		//
		})
	}
//
//	LISTA DE RESERVAS DOS ALUNOS
	function ListasReservasAlunos() {
	//	DECLARAÇÃO DO ARRAY RESERVAS
		let reservas = Array();
	//	SETANDO O VALOR DO ARRAY NA VARIÁVEL
		reservas = bancodedados.recuperaReservaAluno();
	//	SELECIONANDO O ELEMENTO TBODY
		let listaReservas = document.getElementById("listaAlunos");
	//
	//	LISTANTO A RESERVA
 		reservas.forEach(function(a) {
 		//
 		//	CRIANDO A LINHA (TR)
 			let linha =	listaReservas.insertRow();
 		//
 		//	CRIAR AS COLUNAS (TD)
 			linha.insertCell(0).innerHTML = a.nome;
 			linha.insertCell(1).innerHTML = a.matricula;
 			linha.insertCell(2).innerHTML = a.equipamento;
 			linha.insertCell(3).innerHTML = a.numeroSerie;
			//
			//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
				let diaBR = a.dataEUA.substr(8,2);
				let mesBR = "/"+a.dataEUA.substr(5,2);
				let anoBR = "/"+a.dataEUA.substr(0,4);
			//	VARIÁVEL NO FORMATO BR		
				let dataBR = diaBR+mesBR+anoBR;
			//
		//	DATA EXIBIDA NO FORMATO BR
 			linha.insertCell(4).innerHTML = dataBR +" - "+ a.horaA;
		//
 		//	BOTAO DE VIZUALIZAÇÃO
 		//
 			let ver = document.createElement("button");
 			ver.className = 'btn btn-outline-primary btn-sm';
 			ver.title = "Vizualizar";
 			ver.innerHTML = '<i class="fa fa-eye"></i>';
 			ver.id = `id_professor_${a.id}`;
 		//
 		//	NO CLICAR DO BOTÃO OS DETALHES DA RESERVA SERÁ EXIBIDO EM UM MODAL
 			ver.onclick = function() {
 			//	MODAL DE VIZUALIÇÃO
 				$('#modalVizualizaReserva').modal('show');
			//
				document.getElementById('modal-titulo-ver').innerHTML 		= '<i class="fas fa-eye"></i> Informações';
				document.getElementById('modal-titulo-div-ver').className  	= 'modal-header text-white bg-primary';
				document.getElementById('modal-conteudo-ver').innerHTML 	= 'Detalhes da reserva do(a) aluno(a) <span class="text-primary"><b>'+a.nome+'</b></span>';
				document.getElementById('modal-conteudo-ver').innerHTML   	+= '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Matrícula</th><th scope="col">Equipamento</th><th scope="col">Nº série</th><th scope="col">Data e hora</th></tr></thead><tbody><tr><th class="font-weight-normal">'+a.matricula+'</th><td>'+a.equipamento+'</td><td>'+a.numeroSerie+'</td><td>'+dataBR+' - '+a.horaA+'</td></tr></tbody>';
				document.getElementById('modal-btn-ver').innerHTML 			= 'Voltar';
				document.getElementById('modal-btn-ver').className 			= 'btn btn-outline-primary';
			//
 			}
 		 //
 		//	BOTAO DE EDIÇÃO
 		//
 			let editar 			= document.createElement("button");
 			editar.className 	= 'btn btn-outline-success btn-sm';
 			editar.title 		= "Editar";
 			editar.innerHTML 	= '<i class="fas fa-pencil-alt"></i>';
 			editar.id 			= `id_editar_${a.id}`;
 		//
 		//
 		//	BOTAO DE EXCLUSÃO
 		//
 			excluir = document.createElement("button");
 			excluir.className 	= 'btn btn-outline-danger btn-sm';
 			excluir.title 		= 'Excluir';
 			excluir.innerHTML 	= '<i class="fa fa-trash-alt"></i>';
 			excluir.id 			= `id_excluir_${a.id}`;
 		//
 		//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO/EDIÇÃO/EXCLUSÃO
 			linha.insertCell(5).append(ver," ", editar, " ", excluir);
 		//
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
	function imprimeReservas() {
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