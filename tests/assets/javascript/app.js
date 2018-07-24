//==============================================================||
//	AUTOR: JEFERSON LUCAS
//	DATA DE CRIAÇÃO: 21/07/2018
//  DATA DE MODIFICAÇÃO: 24/07/2018
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
		gravar(reserva, nome) {
		//	VALOR DA getProximoId ATRIBUÍDO A UMA VARIÁVEL ID
			let id = this.getProximoId(nome);
		//
		//	CONVERTE VALORES E SETA PARA O LOCALSTRORAGE 
			localStorage.setItem(id, JSON.stringify(reserva))
		//
		//	ATUALIZA O ID COM A INFORMAÇÃO DO NOVO ID DA FUNÇÃO getProximoId()
			localStorage.setItem(`id${nome}`, id)
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
	//	MÉTODO DE PESQUISAR E FILTRAR OS DADOS DA RESERVA
		pesquisaReserva(reserva, nome) {
		//	VERIFICAÇÃO
			if(nome == "Professor") {
			//
			//	ARRAY DAS RESERVAS FILTRADAS
				let reservasFiltradas = Array();
			//	ARRAY RECEBE O MÉTODO DE RECUPERAR OS REGISTROS
				reservasFiltradas = this.recuperaReservaProfessor();
			//
			//	FILTRO DO PROFESSOR
				if(reserva.nome != "") {
					reservasFiltradas = reservasFiltradas.filter(p => p.nome == reserva.nome);
				}
				if(reserva.equipamento != "") {
					reservasFiltradas = reservasFiltradas.filter(p => p.equipamento == reserva.equipamento);
				}
				if(reserva.sala != "") {
					reservasFiltradas = reservasFiltradas.filter(p => p.sala == reserva.sala);
				}
				if(reserva.horaA != "") {
					reservasFiltradas = reservasFiltradas.filter(p => p.horaA == reserva.horaA);
				}
				if(reserva.horaB != "") {
					reservasFiltradas = reservasFiltradas.filter(p => p.horaB == reserva.horaB);
				}
				if(reserva.dataEUA != "") {
					reservasFiltradas = reservasFiltradas.filter(p => p.dataEUA == reserva.dataEUA);
				}
			//	RETORNA O FILTRO
				return reservasFiltradas;
			//
			} else if (nome == "Aluno") {
			//
			//	ARRAY DAS RESERVAS FILTRADAS
				let reservasFiltradas = Array();
			//	ARRAY RECEBE O MÉTODO DE RECUPERAR OS REGISTROS
				reservasFiltradas = this.recuperaReservaAluno();
			//
			//	FILTRO DO PROFESSOR
				if(reserva.nome != "") {
					reservasFiltradas = reservasFiltradas.filter(a => a.nome == reserva.nome);
				}
				if(reserva.matricula != "") {
					reservasFiltradas = reservasFiltradas.filter(a => a.equipamento == reserva.matricula);
				}
				if(reserva.equipamento != "") {
					reservasFiltradas = reservasFiltradas.filter(a => a.sala == reserva.equipamento);
				}
				if(reserva.numeroSerie != "") {
					reservasFiltradas = reservasFiltradas.filter(a => a.horaA == reserva.numeroSerie);
				}
				if(reserva.horaA != "") {
					reservasFiltradas = reservasFiltradas.filter(a => a.horaB == reserva.horaA);
				}
				if(reserva.dataEUA != "") {
					reservasFiltradas = reservasFiltradas.filter(a => a.dataEUA == reserva.dataEUA);
				}
			//	RETORNA O FILTRO
				return reservasFiltradas;
			//
			}
		//
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
		reserva = new ReservaProfessor(nome.value, equipamento.value, horaA.value, dataEUA.value, sala.value, horaB.value);
	//
	//	VALIDAÇÃO
		if(reserva.validaDadosReserva()){
		//
		//	DIALOG DE SUCESSO
			$('#modalCadastraReservaSucesso').modal('show');
		//
		// 	GRAVA AS INFORMAÇÕES DA RESERVA NA CLASSE BANCODEDADOS
			bancodedados.gravar(reserva, "Professor");
		//
		//	CONVERTE A DATA NO FORMATO EUA PARA O BR
			var diaBR = dataEUA.value.substr(8,2);
			var mesBR = "/"+dataEUA.value.substr(5,2);
			var anoBR = "/"+dataEUA.value.substr(0,4);
			var dataBR = diaBR+mesBR+anoBR;
		//
			document.getElementById('modal-titulo-success').innerHTML 		= '<i class="fas fa-check-circle"></i> Sucesso!';
			document.getElementById('modal-titulo-div-success').className  	= 'modal-header text-white bg-success';
			document.getElementById('modal-conteudo-success').innerHTML 	= 'A reserva do professor(a) <span class="text-success"><b>'+reserva.nome+'</b></span> foi cadastrada com <span class="text-success"><b>sucesso!</b></span><br>'
			document.getElementById('modal-conteudo-success').innerHTML    += '<br><br><table class="table text-center" ><thead><tr class="text-center bg-success"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-clock" title="Horário"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+reserva.equipamento+'</th><td>'+reserva.sala+'</td><td>'+reserva.horaA+'/'+reserva.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
			document.getElementById('modal-btn-success').innerHTML 			= 'Voltar';
			document.getElementById('modal-btn-success').className 			= 'btn btn-outline-success';
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
			document.getElementById('modal-titulo-erro').innerHTML 		= '<i class="fas fa-times-circle"></i> Erro!';
			document.getElementById('modal-titulo-div-erro').className  = 'modal-header text-white bg-danger';
			document.getElementById('modal-conteudo-erro').innerHTML 	= 'Erro ao efetuar seu <span class="text-danger"><b>cadastro</b></span>. Por favor verifique se todos os campo foram inseridos corretamente.';
			document.getElementById('modal-btn-erro').innerHTML 		= 'Corrigir';
			document.getElementById('modal-btn-erro').className 		= 'btn btn-outline-danger';
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
		reserva  = new ReservaAluno(nome.value, equipamento.value, horaA.value, dataEUA.value, matricula.value, numeroSerie.value)
	//
	//	VALIDAÇÃO
		if(reserva.validaDadosReserva()){
		//
		//	MODAL DE SUCESSO
			$('#modalCadastraReservaSucesso').modal('show');
		//
		// 	GRAVA AS INFORMAÇÕES DA RESERVA NA CLASSE BANCODEDADOS
			bancodedados.gravar(reserva, "Aluno");
		//
		//	CONVERTE A DATA NO FORMATO EUA PARA O BR
			var diaBR = dataEUA.value.substr(8,2);
			var mesBR = "/"+dataEUA.value.substr(5,2);
			var anoBR = "/"+dataEUA.value.substr(0,4);
			var dataBR = diaBR+mesBR+anoBR;
		//
			document.getElementById('modal-titulo-success').innerHTML 		= '<i class="fas fa-check-circle"></i> Sucesso!';
			document.getElementById('modal-titulo-div-success').className  	= 'modal-header text-white bg-success';
			document.getElementById('modal-conteudo-success').innerHTML 	= 'A reserva do aluno(a) <span class="text-success"><b>'+reserva.nome+'</b></span> foi cadastrada com <span class="text-success"><b>sucesso!</b></span><br>'
			document.getElementById('modal-conteudo-success').innerHTML	   += '<br><br><table class="table text-center"><thead><tr class="text-center bg-success"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i> - <i class="fas fa-clock" title="Horário"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+reserva.matricula+'</th><td>'+reserva.equipamento+'</td><td>'+reserva.numeroSerie+'</td><td>'+dataBR+' - '+reserva.horaA+'</td></tr></tbody>';
			document.getElementById('modal-btn-success').innerHTML 			= 'Voltar';
			document.getElementById('modal-btn-success').className 			= 'btn btn-outline-success';
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
		//	MODAL DE ERRO
			$('#modalCadastraReservaErro').modal('show');
		//
			document.getElementById('modal-titulo-erro').innerHTML 		= '<i class="fas fa-times-circle"></i> Erro!';
			document.getElementById('modal-titulo-div-erro').className  = 'modal-header text-white bg-danger';
			document.getElementById('modal-conteudo-erro').innerHTML 	= 'Erro ao efetuar seu <span class="text-danger"><b>cadastro</b></span>. Por favor verifique se todos os campo foram inseridos corretamente.';
			document.getElementById('modal-btn-erro').innerHTML 		= 'Corrigir';
			document.getElementById('modal-btn-erro').className 		= 'btn btn-outline-danger';
		//
		}
	//
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
 			ver.id 			= `id-ver-${p.id}`;
 		//
 		//
 			ver.onclick = function() {
 			//	MODAL DE VIZUALIÇÃO
 				$('#modalVizualizaReserva').modal('show');
			//
				document.getElementById('modal-titulo-ver').innerHTML 		= '<i class="fas fa-eye"></i> Informações';
				document.getElementById('modal-titulo-div-ver').className  	= 'modal-header text-white bg-primary';
				document.getElementById('modal-conteudo-ver').innerHTML 	= 'Detalhes da reserva do(a) professor(a) <span class="text-primary"><b>'+p.nome+'</b></span>:';
				document.getElementById('modal-conteudo-ver').innerHTML    += '<br><br><table class="table text-center"><thead><tr class="text-center bg-primary"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-clock" title="Horário"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+p.equipamento+'</th><td>'+p.sala+'</td><td>'+p.horaA+'/'+p.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
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
 			editar.id 			= `id-editar-${p.id}`;
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
 					$('#modalAlteraReserva').modal('show');
				//
					document.getElementById('modal-titulo-altera').innerHTML 		= '<i class="fas fa-pencil-alt"></i> Editar';
					document.getElementById('modal-titulo-div-altera').className  	= 'modal-header text-white bg-success';
					document.getElementById('modal-dialog-altera').className  		= 'modal-dialog border border-success rounded alert-success';
					document.getElementById('modal-conteudo-altera').innerHTML 		= 'A reserva do(a) professor(a) <span class="text-success"><b>'+nome+'</b></span> foi alterada com <span class="text-success"><b>sucesso!</b></span>'
					document.getElementById('modal-conteudo-altera').innerHTML     += '<br><br><table class="table text-center"><thead><tr class="text-center bg-success"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-clock" title="Horário"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+equipamento+'</th><td>'+sala+'</td><td>'+horaA+'/'+horaB+'</td><td>'+dataBr+'</td></tr></tbody>';
					document.getElementById('modal-btn-altera').innerHTML 			= 'Voltar';
					document.getElementById('modal-btn-altera').className 			= 'btn btn-outline-success';
				//
				//	FORMATAR O ID
					let id = this.id.replace('id-editar-','');
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
					let reserva = new ReservaProfessor(nome, equipamento, horaA, dataEUA, sala, horaB);
				//
				//	GRAVA AS INFORMAÇÕES NO BANCO DE DADOS
					bancodedados.gravar(reserva, "Professor");
				//
 				}
 			}
 		//
 		//	BOTAO DE EXCLUSÃO
 		//
 			excluir 			= document.createElement("button");
 			excluir.className 	= 'btn btn-outline-danger btn-sm';
 			excluir.title 		= 'Excluir';
 			excluir.innerHTML 	= '<i class="fa fa-trash-alt"></i>';
 			excluir.id 			= `id-excluir-${p.id}`;
 		//
 			excluir.onclick = function() {
 		 	//
			//	PRONPT DE VERIFICAÇÃO
				let resposta = prompt("Deseja EXCLUIR a reserva do(a) "+p.nome+"? R: Sim ou Não", "Não");
			//	VALIDAÇÃO DE EXCLUSÃO
				if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
				//
				//	DIALOG DE EXCLUSÃO
					$('#modalAlteraReserva').modal('show')
				//
					document.getElementById('modal-titulo-altera').innerHTML 		= '<i class="fa fa-trash-alt"></i> Excluir';
					document.getElementById('modal-titulo-div-altera').className  	= 'modal-header text-white bg-danger';
					document.getElementById('modal-dialog-altera').className  		= 'modal-dialog border border-danger rounded alert-danger';
					document.getElementById('modal-conteudo-altera').innerHTML 		= 'A reserva do(a) professor(a) <span class="text-danger"><b>'+p.nome+'</b></span> irá ser <span class="text-danger"><b>excluida!</b></span>';
					document.getElementById('modal-conteudo-altera').innerHTML     += '<br><br><table class="table text-center"><thead><tr class="text-center bg-danger"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-clock" title="Horário"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+p.equipamento+'</th><td>'+p.sala+'</td><td>'+p.horaA+'/'+p.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
					document.getElementById('modal-btn-altera').innerHTML 			= 'Voltar';
					document.getElementById('modal-btn-altera').className 			= 'btn btn-outline-danger';
				//
				//	FORMATAR O ID
					let id = this.id.replace('id-excluir-','');
				//	REMOVE A RESERVA
 					bancodedados.removerReserva(id);
 				}
 			}
 		//
 		//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO
 			linha.insertCell(5).append(ver," ", editar," ", excluir);
 		//
		})
	}
//
//
	function pesquisarReservaProfessor() {
	//	RECUPERANDO OS VALORES DOS CAMPOS
		let nome 		= document.getElementById('professor').value;
		let equipamento = document.getElementById('equipamento').value;
		let sala 		= document.getElementById('sala').value;
		let horaA 		= document.getElementById('horaA').value;
		let horaB 		= document.getElementById('horaB').value;
		let dataEUA 	= document.getElementById('data').value;
	//
	//	PASANDO VALORES PARA UMA NOVA INSTÂNCIA
		let reserva = new ReservaProfessor(nome, equipamento, horaA, dataEUA, sala, horaB);
	//	INTÂNCIA DA RESERVA SENDO PASSADA PRO MÉTODO DE PESQUISA
		let reservas = bancodedados.pesquisaReserva(reserva, "Professor");
	//	SELECIONANDO O ELEMENTO DA TABELA
		let listaReservas = document.getElementById("listaProfessores");
	//	LIMPANDO TABELA
		listaReservas.innerHTML = "";
	//
	//	VALIDAÇÃO DA PESQUISA
		if(nome == "" && equipamento == "" && horaA == "" && dataEUA == "" && sala == "" && horaB == "") {
		//	MODAL DE ERRO
			$('#modalValidaReserva').modal('show');
		//
			document.getElementById('modal-titulo').innerHTML 		= '<i class="fas fa-times-circle"></i> Erro!';
			document.getElementById('modal-titulo-div').className  	= 'modal-header text-white bg-danger';
			document.getElementById('modal-conteudo').innerHTML 	= 'Erro ao efetuar sua <span class="text-danger"><b>perquisa</b></span>. Por favor verifique se algum campo não foi inseridos corretamente.';
			document.getElementById('modal-btn').innerHTML 			= 'Corrigir';
			document.getElementById('modal-btn').className 			= 'btn btn-outline-danger';
		//
		} else {
		//
		//	LISTANDO A PESQUISA
			reservas.forEach(function(p) {
			//
			//	CRIANDO A LINHA
				let linha = listaReservas.insertRow();
			//
			//	CRIAR AS COLUNAS
				linha.insertCell(0).innerHTML = p.nome;
				linha.insertCell(1).innerHTML = p.equipamento;
				linha.insertCell(2).innerHTML = p.sala;
				linha.insertCell(3).innerHTML = p.horaA+"/"+p.horaB;
				//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
					let diaBR = p.dataEUA.substr(8,2);
					let mesBR = "/"+p.dataEUA.substr(5,2);
					let anoBR = "/"+p.dataEUA.substr(0,4);
				//	VALOR COM A DATA NO FORMATO BR
					let dataBR = diaBR+mesBR+anoBR;
			//	DATA EXIBIDA NO FORMATO BR
				linha.insertCell(4).innerHTML = dataBR;
			//
 			//	BOTAO DE VIZUALIZAÇÃO
 			//
 				let ver 		= document.createElement("button");
 				ver.className 	= 'btn btn-outline-primary btn-sm';
 				ver.title 		= "Vizualizar";
 				ver.innerHTML 	= '<i class="far fa-eye"></i>';
 				ver.id 			= `id-ver-${p.id}`;
 			//
 			//
 				ver.onclick = function() {
 				//	MODAL DE VIZUALIÇÃO
 					$('#modalVizualizaReserva').modal('show');
				//
					document.getElementById('modal-titulo-ver').innerHTML 		= '<i class="fas fa-eye"></i> Informações';
					document.getElementById('modal-titulo-div-ver').className  	= 'modal-header text-white bg-primary';
					document.getElementById('modal-conteudo-ver').innerHTML 	= 'Detalhes da reserva do(a) professor(a) <span class="text-primary"><b>'+p.nome+'</b></span>:';
					document.getElementById('modal-conteudo-ver').innerHTML   	+= '<br><br><table class="table text-center"><thead><tr class="text-center bg-primary"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></th><th scope="col" class="text-white"><i class="fas fa-clock" title="Horário"></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+p.equipamento+'</th><td>'+p.sala+'</td><td>'+p.horaA+'/'+p.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
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
 				editar.id 			= `id-editar-${p.id}`;
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
 						$('#modalAlteraReserva').modal('show');
					//
						document.getElementById('modal-titulo-altera').innerHTML 		= '<i class="fas fa-pencil-alt"></i> Editar';
						document.getElementById('modal-titulo-div-altera').className  	= 'modal-header text-white bg-success';
						document.getElementById('modal-dialog-altera').className  		= 'modal-dialog border border-success rounded alert-success';
						document.getElementById('modal-conteudo-altera').innerHTML 		= 'A reserva do(a) professor(a) <span class="text-success"><b>'+nome+'</b></span> foi alterada com <span class="text-success"><b>sucesso!</b></span>'
						document.getElementById('modal-conteudo-altera').innerHTML     += '<br><br><table class="table text-center"><thead><tr class="text-center bg-success"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></th><th scope="col" class="text-white"><i class="fas fa-clock" title="Horário"></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+equipamento+'</th><td>'+sala+'</td><td>'+horaA+'/'+horaB+'</td><td>'+dataBr+'</td></tr></tbody>';
						document.getElementById('modal-btn-altera').innerHTML 			= 'Voltar';
						document.getElementById('modal-btn-altera').className 			= 'btn btn-outline-success';
					//
					//	FORMATAR O ID
						let id = this.id.replace('id-editar-','');
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
 				excluir 			= document.createElement("button");
 				excluir.className 	= 'btn btn-outline-danger btn-sm';
 				excluir.title 		= 'Excluir';
 				excluir.innerHTML 	= '<i class="fa fa-trash-alt"></i>';
 				excluir.id 			= `id-excluir-${p.id}`;
 			//
 				excluir.onclick = function() {
 		 		//
				//	PRONPT DE VERIFICAÇÃO
					let resposta = prompt("Deseja EXCLUIR a reserva do(a) "+p.nome+"? R: Sim ou Não", "Não");
				//	VALIDAÇÃO DE EXCLUSÃO
					if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
					//
					//	DIALOG DE EXCLUSÃO
						$('#modalAlteraReserva').modal('show')
					//
						document.getElementById('modal-titulo-altera').innerHTML 		= '<i class="fa fa-trash-alt"></i> Excluir';
						document.getElementById('modal-titulo-div-altera').className  	= 'modal-header text-white bg-danger';
						document.getElementById('modal-dialog-altera').className  		= 'modal-dialog border border-danger rounded alert-danger';
						document.getElementById('modal-conteudo-altera').innerHTML 		= 'A reserva do(a) professor(a) <span class="text-danger"><b>'+p.nome+'</b></span> irá ser <span class="text-danger"><b>excluida!</b></span>';
						document.getElementById('modal-conteudo-altera').innerHTML     += '<br><br><table class="table text-center"><thead><tr class="text-center bg-danger"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></th><th scope="col" class="text-white"><i class="fas fa-clock" title="Horário"></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+p.equipamento+'</th><td>'+p.sala+'</td><td>'+p.horaA+'/'+p.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
						document.getElementById('modal-btn-altera').innerHTML 			= 'Voltar';
						document.getElementById('modal-btn-altera').className 			= 'btn btn-outline-danger';
					//
					//	FORMATAR O ID
						let id = this.id.replace('id-excluir-','');
					//	REMOVE A RESERVA
 						bancodedados.removerReserva(id);
 					}
 				}
 			//
 			//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO
 				linha.insertCell(5).append(ver," ", editar," ", excluir);
 			//
			//
			})
		//
		}
		//
	//
	}
	//
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
 			ver.id = `id-ver-${a.id}`;
 		//
 		//	NO CLICAR DO BOTÃO OS DETALHES DA RESERVA SERÁ EXIBIDO EM UM MODAL
 			ver.onclick = function() {
 			//	MODAL DE VIZUALIÇÃO
 				$('#modalVizualizaReserva').modal('show');
			//
				document.getElementById('modal-titulo-ver').innerHTML 		= '<i class="fas fa-eye"></i> Informações';
				document.getElementById('modal-titulo-div-ver').className  	= 'modal-header text-white bg-primary';
				document.getElementById('modal-conteudo-ver').innerHTML 	= 'Detalhes da reserva do(a) aluno(a) <span class="text-primary"><b>'+a.nome+'</b></span>:';
				document.getElementById('modal-conteudo-ver').innerHTML   	+= '<br><br><table class="table text-center"><thead><tr class="text-center bg-primary"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i> - <i class="fas fa-clock" title="Horário"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+a.matricula+'</th><td>'+a.equipamento+'</td><td>'+a.numeroSerie+'</td><td>'+dataBR+' - '+a.horaA+'</td></tr></tbody>';
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
 			editar.id 			= `id-editar-${a.id}`;
 		//
 			editar.onclick = function() {
 			//
 			//	VERIFICAÇÃO
 				let = resposta = prompt("Deseja EDITAR a reserva do(a) "+a.nome+"? R: Sim ou Não","Não");
 			//
 			//	VALIDAÇÃO DE VERIFICAÇÃO
 				if(resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
 				//
 				//	NOVOS VALORES SERÃO RECEBIDOS
 					let nome 			= prompt("Nome do(a) Aluno(a):",a.nome); 					
 					let matricula		= prompt("Matrícula:",a.matricula);
 					let equipamento 	= prompt("Descrição do equipamento:",a.equipamento);
 					let numeroSerie		= prompt("Nº de série:",a.numeroSerie);
 					let horaA 			= prompt("Início da aula:",a.horaA);
 					let dataBr 			= prompt("Data da aula:",dataBR);
 				//
 				//	MODAL DE EDIÇÃO
 					$('#modalAlteraReserva').modal('show');
				//
					document.getElementById('modal-titulo-altera').innerHTML 		= '<i class="fas fa-pencil-alt"></i> Editar';
					document.getElementById('modal-titulo-div-altera').className  	= 'modal-header text-white bg-success';
					document.getElementById('modal-dialog-altera').className  		= 'modal-dialog border border-success rounded alert-success';
					document.getElementById('modal-conteudo-altera').innerHTML 		= 'A reserva do(a) aluno(a) <span class="text-success"><b>'+nome+'</b></span> foi alterada com <span class="text-success"><b>sucesso!</b></span>'
					document.getElementById('modal-conteudo-altera').innerHTML     += '<br><br><table class="table text-center"><thead><tr class="text-center bg-success"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i> - <i class="fas fa-clock" title="Horário"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+matricula+'</th><td>'+equipamento+'</td><td>'+numeroSerie+'</td><td>'+dataBr+'-'+horaA+'</td></tr></tbody>';
					document.getElementById('modal-btn-altera').innerHTML 			= 'Voltar';
					document.getElementById('modal-btn-altera').className 			= 'btn btn-outline-success';
				//
				//	FORMATAR O ID
					let id = this.id.replace('id-editar-','');
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
					reservaAluno  = new ReservaAluno(nome, equipamento, horaA, dataEUA, matricula, numeroSerie);
				//
				//	GRAVA AS INFORMAÇÕES NO BANCO DE DADOS
					bancodedados.gravar(reservaAluno, "Aluno");
				//
 				}
 			}
 		//
 		//
 		//	BOTAO DE EXCLUSÃO
 		//
 			excluir 			= document.createElement("button");
 			excluir.className 	= 'btn btn-outline-danger btn-sm';
 			excluir.title 		= 'Excluir';
 			excluir.innerHTML 	= '<i class="fa fa-trash-alt"></i>';
 			excluir.id 			= `id-excluir-${a.id}`;
 		//
 			excluir.onclick = function() {
 		 	//
			//	PRONPT DE VERIFICAÇÃO
				let resposta = prompt("Deseja EXCLUIR a reserva do(a) "+a.nome+"? R: Sim ou Não", "Não");
			//	VALIDAÇÃO DE EXCLUSÃO
				if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
				//
				//	DIALOG DE EXCLUSÃO
					$('#modalAlteraReserva').modal('show')
				//
					document.getElementById('modal-titulo-altera').innerHTML 		= '<i class="fa fa-trash-alt"></i> Excluir';
					document.getElementById('modal-titulo-div-altera').className  	= 'modal-header text-white bg-danger';
					document.getElementById('modal-dialog-altera').className  		= 'modal-dialog border border-danger rounded alert-danger';
					document.getElementById('modal-conteudo-altera').innerHTML 		= 'A reserva do(a) professor(a) <span class="text-danger"><b>'+a.nome+'</b></span> irá ser <span class="text-danger"><b>excluida!</b></span>';
					document.getElementById('modal-conteudo-altera').innerHTML     += '<br><br><table class="table text-center"><thead><tr class="text-danger bg-danger"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i> - <i class="fas fa-clock" title="Horário"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+a.matricula+'</th><td>'+a.equipamento+'</td><td>'+a.numeroSerie+'</td><td>'+dataBR+'-'+a.horaA+'</td></tr></tbody>';
					document.getElementById('modal-btn-altera').innerHTML 			= 'Voltar';
					document.getElementById('modal-btn-altera').className 			= 'btn btn-outline-danger';
				//
				//	FORMATAR O ID
					let id = this.id.replace('id-excluir-','');
				//	REMOVE A RESERVA
 					bancodedados.removerReserva(id);
 				}
 			}
 		//
 		//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO/EDIÇÃO/EXCLUSÃO
 			linha.insertCell(5).append(ver," ", editar," ", excluir);
 		//
		})
		//
//
	}
//
	function pesquisarReservaAluno() {
	//	RESGATANDO O VALOR DA RESERVA	
		let nome 		= document.getElementById('aluno').value;
		let matricula 	= document.getElementById('matricula').value;
		let equipamento = document.getElementById('equipamento').value;		
		let numeroSerie = document.getElementById('serie').value;
		let horaA 		= document.getElementById('horaA').value;
		let dataEUA 	= document.getElementById('data').value;
	//
	//	INSTÂNCIA DA RESERVA DO ALUNO
		reserva  = new ReservaAluno(nome, equipamento, horaA, dataEUA, matricula, numeroSerie);
	//	INTÂNCIA DA RESERVA SENDO PASSADA PRO MÉTODO DE PESQUISA
		let reservas = bancodedados.pesquisaReserva(reserva, "Aluno");
	//	SELECIONANDO O ELEMENTO DA TABELA
		let listaReservas = document.getElementById("listaAlunos");
	//	LIMPANDO TABELA
		listaReservas.innerHTML = "";
	//
	//	VALIDAÇÃO DA PESQUISA
		if(nome == "" && equipamento == "" && horaA == "" && dataEUA == "" && matricula == "" && numeroSerie == "") {
		//	MODAL DE ERRO
			$('#modalValidaReserva').modal('show');
		//
			document.getElementById('modal-titulo').innerHTML 		= '<i class="fas fa-times-circle"></i> Erro!';
			document.getElementById('modal-titulo-div').className  	= 'modal-header text-white bg-danger';
			document.getElementById('modal-conteudo').innerHTML 	= 'Erro ao efetuar sua <span class="text-danger"><b>perquisa</b></span>. Por favor verifique se algum campo não foi inseridos corretamente.';
			document.getElementById('modal-btn').innerHTML 			= 'Corrigir';
			document.getElementById('modal-btn').className 			= 'btn btn-outline-danger';
		//
		} else {
		//
		//	LISTANDO A PESQUISA
			reservas.forEach(function(a) {
			//
			//	CRIANDO A LINHA
				let linha = listaReservas.insertRow();
			//
			//	CRIAR AS COLUNAS
				linha.insertCell(0).innerHTML = a.nome;
				linha.insertCell(1).innerHTML = a.matricula;
				linha.insertCell(2).innerHTML = a.equipamento;
				linha.insertCell(3).innerHTML = a.numeroSerie;
				//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
					let diaBR = a.dataEUA.substr(8,2);
					let mesBR = "/"+a.dataEUA.substr(5,2);
					let anoBR = "/"+a.dataEUA.substr(0,4);
				//	VALOR COM A DATA NO FORMATO BR
					let dataBR = diaBR+mesBR+anoBR;
			//	DATA EXIBIDA NO FORMATO BR
				linha.insertCell(4).innerHTML = dataBR+" - "+a.horaA;
			//
 			//	BOTAO DE VIZUALIZAÇÃO
 			//
 				let ver 		= document.createElement("button");
 				ver.className	= 'btn btn-outline-primary btn-sm';
 				ver.title 		= "Vizualizar";
 				ver.innerHTML 	= '<i class="fa fa-eye"></i>';
 				ver.id 			= `id-ver-${a.id}`;
 			//
 			//	NO CLICAR DO BOTÃO OS DETALHES DA RESERVA SERÁ EXIBIDO EM UM MODAL
 				ver.onclick = function() {
 				//	MODAL DE VIZUALIÇÃO
 					$('#modalVizualizaReserva').modal('show');
				//
					document.getElementById('modal-titulo-ver').innerHTML 		= '<i class="fas fa-eye"></i> Informações';
					document.getElementById('modal-titulo-div-ver').className  	= 'modal-header text-white bg-primary';
					document.getElementById('modal-conteudo-ver').innerHTML 	= 'Detalhes da reserva do(a) aluno(a) <span class="text-primary"><b>'+a.nome+'</b></span>';
					document.getElementById('modal-conteudo-ver').innerHTML   	+= '<br><br><table class="table text-center"><thead><tr class="text-center bg-primary"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i> - <i class="fas fa-clock" title="Horário"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+a.matricula+'</th><td>'+a.equipamento+'</td><td>'+a.numeroSerie+'</td><td>'+dataBR+' - '+a.horaA+'</td></tr></tbody>';
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
 				editar.id 			= `id-editar-${a.id}`;
 			//
 				editar.onclick = function() {
 				//
 				//	VERIFICAÇÃO
 					let = resposta = prompt("Deseja EDITAR a reserva do(a) "+a.nome+"? R: Sim ou Não","Não");
 				//
 				//	VALIDAÇÃO DE VERIFICAÇÃO
 					if(resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
 					//
 					//	NOVOS VALORES SERÃO RECEBIDOS
 						let nome 			= prompt("Nome do(a) Aluno(a):",a.nome); 					
 						let matricula		= prompt("Matrícula:",a.matricula);
 						let equipamento 	= prompt("Descrição do equipamento:",a.equipamento);
 						let numeroSerie		= prompt("Nº de série:",a.numeroSerie);
 						let horaA 			= prompt("Início da aula:",a.horaA);
 						let dataBr 			= prompt("Data da aula:",dataBR);
 					//
 					//	MODAL DE EDIÇÃO
 						$('#modalAlteraReserva').modal('show');
					//
						document.getElementById('modal-titulo-altera').innerHTML 		= '<i class="fas fa-pencil-alt"></i> Editar';
						document.getElementById('modal-titulo-div-altera').className  	= 'modal-header text-white bg-success';
						document.getElementById('modal-dialog-altera').className  		= 'modal-dialog border border-success rounded alert-success';
						document.getElementById('modal-conteudo-altera').innerHTML 		= 'A reserva do(a) aluno(a) <span class="text-success"><b>'+nome+'</b></span> foi alterada com <span class="text-success"><b>sucesso!</b></span>'
						document.getElementById('modal-conteudo-altera').innerHTML     += '<br><br><table class="table text-center"><thead><tr class="text-center bg-success"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i> - <i class="fas fa-clock" title="Horário"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+matricula+'</th><td>'+equipamento+'</td><td>'+numeroSerie+'</td><td>'+dataBr+'-'+horaA+'</td></tr></tbody>';
						document.getElementById('modal-btn-altera').innerHTML 			= 'Voltar';
						document.getElementById('modal-btn-altera').className 			= 'btn btn-outline-success';
					//
					//	FORMATAR O ID
						let id = this.id.replace('id-editar-','');
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
						reservaAluno  = new ReservaAluno(nome, equipamento, horaA, dataEUA, matricula, numeroSerie);
					//
					//	GRAVA AS INFORMAÇÕES NO BANCO DE DADOS
						bancodedados.gravar(reservaAluno, "Aluno");
					//
 					}
 				}
 			//
 			//
 			//	BOTAO DE EXCLUSÃO
 			//
 				excluir 			= document.createElement("button");
 				excluir.className 	= 'btn btn-outline-danger btn-sm';
 				excluir.title 		= 'Excluir';
 				excluir.innerHTML 	= '<i class="fa fa-trash-alt"></i>';
 				excluir.id 			= `id-excluir-${a.id}`;
 			//
 				excluir.onclick = function() {
 			 	//
				//	PRONPT DE VERIFICAÇÃO
					let resposta = prompt("Deseja EXCLUIR a reserva do(a) "+a.nome+"? R: Sim ou Não", "Não");
				//	VALIDAÇÃO DE EXCLUSÃO
					if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
					//
					//	DIALOG DE EXCLUSÃO
						$('#modalAlteraReserva').modal('show')
					//
						document.getElementById('modal-titulo-altera').innerHTML 		= '<i class="fa fa-trash-alt"></i> Excluir';
						document.getElementById('modal-titulo-div-altera').className  	= 'modal-header text-white bg-danger';
						document.getElementById('modal-dialog-altera').className  		= 'modal-dialog border border-danger rounded alert-danger';
						document.getElementById('modal-conteudo-altera').innerHTML 		= 'A reserva do(a) professor(a) <span class="text-danger"><b>'+a.nome+'</b></span> irá ser <span class="text-danger"><b>excluida!</b></span>';
						document.getElementById('modal-conteudo-altera').innerHTML     += '<br><br><table class="table text-center"><thead><tr class="text-center bg-danger"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i> - <i class="fas fa-clock" title="Horário"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+a.matricula+'</th><td>'+a.equipamento+'</td><td>'+a.numeroSerie+'</td><td>'+dataBR+'-'+a.horaA+'</td></tr></tbody>';
						document.getElementById('modal-btn-altera').innerHTML 			= 'Voltar';
						document.getElementById('modal-btn-altera').className 			= 'btn btn-outline-danger';
					//
					//	FORMATAR O ID
						let id = this.id.replace('id-excluir-','');
					//	REMOVE A RESERVA
 						bancodedados.removerReserva(id);
 					}
 				}
 			//
 			//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO/EDIÇÃO/EXCLUSÃO
 				linha.insertCell(5).append(ver," ", editar," ", excluir);
 			//
			})
			//
		//
		}
		//
	//
	}
	//
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