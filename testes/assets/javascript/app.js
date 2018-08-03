//==============================================================||
//	AUTOR: JEFERSON LUCAS
//	DATA DE CRIAÇÃO: 21/07/2018
//  DATA DE MODIFICAÇÃO: 28/07/2018
//  VERSÃO: 1.6.0-BETA
//	DESCRIÇÃO: CORE PARA CADASTRO/CONSULTA/FILTRO/VISUALIZAÇÃO
//	/EDIÇÃO E EXCLUSÃO DE RESERVAS DE PROFESSORES E ALUNOS
//==============================================================||
//==============================================================||
//	1 - CLASSES DO APP
//
//	1.0.0 - CLASSE PAI / RESERVA
	class Reserva {
		constructor(nome, equipamento, status) {
			this.nome 			= nome;
			this.equipamento 	= equipamento;
			this.status			= status; 
		}
	//	1.0.1 - VALIDAR DADOS DE RESERVA
		validarDados() {
		//	VALIDAR OS DADOS DA RESERVA
			for (let r in this){
			//	VERIFICA SE O VALOR É INDEFINIDO/VAZIO/NULO
				if(this[r] === "" || this[r] === null || this[r] === undefined){
				//	RETORNA FALSO
					return false;
				}
			}
		//	RETORNA VERDADEIRO
			return true;
		}
	}
///
//	1.2.0 - CLASSE FILHO / RESERVA DO PROFESSOR
	class ReservaProfessor extends Reserva {
		constructor(nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {
		//	ACESSO AO ATRIBUTO PAI RESERVA
			super(nome, equipamento, status);
			this.sala 	= sala;
			this.dataA 	= dataA;
			this.dataB 	= dataB;
			this.horaA 	= horaA;
			this.horaB 	= horaB;
			this.horaC	= horaC;
			this.horaD 	= horaD;
		}
	}
//
//	1.3.0 - CLASSE FILHO / RESERVA DO ALUNO
	class ReservaAluno extends Reserva {
		constructor(nome, equipamento, status, matricula, serial, dataA, horaA, dataB, horaB, horaC) {
		//	ACESSO AO ATRIBUTO PAI RESERVA
			super(nome, equipamento, status);
			this.matricula 	= matricula;
			this.serial 	= serial;
			this.dataA 		= dataA;
			this.dataB 		= dataB;
			this.horaA 		= horaA;
			this.horaB 		= horaB;
			this.horaC 		= horaC;
		}
	}
//
//	CLASSE FUNCIONÁRIO
	class Funcionario {
		constructor(nome, dataA, horaA, versao) {
			this.nome 	= nome;
			this.dataA 	= dataA;
			this.horaA 	= horaA;
			this.versao = versao;
		}
		validarFuncionario() {
			for(let f in this){
				if(this[f] === "" || this[f] === null || this[f] === undefined){
					return false;
				}
			}
			return true;
		}
	}	
//
//	1.4.0 - CLASSE BANCO DE DADOS
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
	//	1.4.1 - PEGAR UM NO ID
		getProximoId(nome) {
		//	PEGO O ID DO ALUNO E PROFESSOR E CONVERTE PARA INTEIRO
			let idAluno 	= parseInt(localStorage.getItem('idAluno')); 
			let idProfessor = parseInt(localStorage.getItem('idProfessor'));
			let proximoId 	= null;
		//
		//	SE O NOME FOR DO PROFESSOR
			if (nome == "Professor") {
			//	VERIFICAÇÃO
				if(idAluno > idProfessor) {
				//	ESTRUTURA FOR PARA RETORNAR NOVO VALOR DE ID
					for(let i = 0; i <= idAluno; i++) {
						proximoId = i + 1;
					}
				//	VALOR DE RETORNO
					return proximoId;
				//
				} else if(idProfessor > idAluno) {
				//	VALOR DE RETORNO
					proximoId = (idProfessor + 1);
				//	RETORNO DO NOVO VALOR DE ID
					return proximoId;
				//
				} else if(idProfessor == idAluno) {
				//	VALOR DE RETORNO
					proximoId = (idProfessor + 1);
				//	RETORNO DO NOVO VALOR DE ID
					return proximoId;
				}
				else {
				//	CASO NÃO TENHA VALOR RETORNO 0
					return 0;
				//
				}
			} 
		//	SE O NOME FOR DO ALUNO
			else if(nome == "Aluno") {
			//	VERIFICAÇÃO
				if(idProfessor > idAluno) {
				//	ESTRUTURA FOR PARA RETORNAR NOVO VALOR DE ID
					for(let i = 0; i <= idProfessor; i++){
						proximoId = i + 1;
					}
				//	RETORNO DO NOVO VALOR DE ID
					return proximoId;
				//	
				} else if(idAluno > idProfessor) {
				//	VALOR DE RETORNO
					proximoId = (idAluno + 1);
				//	
					return proximoId;
				//
				} else if(idAluno == idProfessor) {
				//	VALOR DE RETORNO
					proximoId = (idAluno + 1);
				//	
					return proximoId;
				//
				} else {
				//	CASO NÃO TENHA VALOR RETORNO 0
					return 0;
				//
				}
				//				
			}
		//
		}
	//	1.4.2 - GRAVAR RESERVA
		gravar(reserva, nome) {
		//	VALOR DA getProximoId ATRIBUÍDO A UMA VARIÁVEL ID
			let id = this.getProximoId(nome);
		//
		//	CONVERTE VALORES E SETA PARA O LOCALSTRORAGE 
			localStorage.setItem(id, JSON.stringify(reserva));
		//
		//	ATUALIZA O ID COM A INFORMAÇÃO DO NOVO ID DA FUNÇÃO getProximoId()
			localStorage.setItem(`id${nome}`, id);
		}
		gravarFuncionario(funcionario) {
			let id = 0;
			localStorage.setItem(id, JSON.stringify(funcionario));
			localStorage.setItem("idFuncionario", id);
		}
	//	1.4.3 - RECUPERAR DADOS DA RESERVA DO PROFESSOR
		recuperaReservaProfessor() {
		//	DEFINIÇÃO DE UM ARRAY DE RESERVAS
			let reservas = Array();
		//	PEGANDO O ID DO PROFESSOR NO LOCAL STORAGE
			let id = localStorage.getItem("idProfessor");
		//	ESTRUTURA FOR PRA EXTRAIR OS IDS DAS RESERVAS 
			for(let i = 0; i <= id; i++){
			//	CONVERTENDO AS RESERVAS EM JSON 
				let reserva = JSON.parse(localStorage.getItem(i));
			//	CASO ALGUM ITEM DA RESERVA SEJA INDEFINIDO CONTINUA E IGNORA A RESERVA
				if(reserva === null || reserva.nome === undefined || reserva.equipamento === undefined || reserva.status === undefined || reserva.sala === undefined || reserva.dataA === undefined || reserva.dataB === undefined || reserva.horaA === undefined || reserva.horaB === undefined) {
					continue;
				}
			//	ID DA RESERVA RECEBE O VALOR DE I
				reserva.id = i;
			//	INSERÇÃO DAS RESERVAS NO ARRAY RESERVAS
				reservas.push(reserva);
			}
		//	RETORNA AS RESERVAS
			return reservas;
		}
	//	1.4.4 - RECUPERAR DADOS DA RESERVA DO ALUNO
		recuperaReservaAluno() {
		//	DEFINIÇÃO DE UM ARRAY DE RESERVAS
			let reservas = Array();
		//	PEGANDO O ID DO ALUNO NO LOCAL STORAGE
			let id = localStorage.getItem("idAluno");
		//	ESTRUTURA FOR PRA EXTRAIR OS IDS DAS RESERVAS 
			for(let i = 0; i <= id; i++){
			//	CONVERTENDO AS RESERVAS EM JSON 
				let reserva = JSON.parse(localStorage.getItem(i));
			//	CASO ALGUM ITEM DA RESERVA SEJA INDEFINIDO CONTINUA E IGNORA A RESERVA
				if(reserva === null || reserva.nome === undefined || reserva.equipamento === undefined || reserva.matricula === undefined || reserva.serial === undefined) {
					continue;
				}
			//	ID DA RESERVA RECEBE O VALOR DE I
				reserva.id = i;
			//	INSERÇÃO DAS RESERVAS NO ARRAY RESERVAS
				reservas.push(reserva);
			}
		//	RETORNA AS RESERVAS
			return reservas;
		}
		recuperaFuncionario() {
		//		
			let funcionarios = Array();
		//
			let id = localStorage.getItem("idFuncionario");
		//
			for(let i = 0; i <= id; i++) {
				let funcionario = JSON.parse(localStorage.getItem(i));
				if(funcionario === null){
					continue;
				}
				funcionario.id = i;
				funcionarios.push(funcionario);
			}
			return funcionarios;
		//
		}
	//	1.4.5 - PESQUISAR E FILTRAR OS DADOS DA RESERVA
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
				if(reserva.dataA != "") {
					reservasFiltradas = reservasFiltradas.filter(p => p.dataA == reserva.dataA);
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
					reservasFiltradas = reservasFiltradas.filter(a => a.matricula == reserva.matricula);
				}
				if(reserva.equipamento != "") {
					reservasFiltradas = reservasFiltradas.filter(a => a.equipamento == reserva.equipamento);
				}
				if(reserva.serial != "") {
					reservasFiltradas = reservasFiltradas.filter(a => a.serial == reserva.serial);
				}
				if(reserva.dataA != "") {
					reservasFiltradas = reservasFiltradas.filter(p => p.dataA == reserva.dataA);
				}
			//	RETORNA O FILTRO
				return reservasFiltradas;
			//
			}
		//
		}
		versaoApp() {
		//	PEGA VERSÃO ATUAL GRAVADO NO LOCAL STORAGE
			let versao = localStorage.getItem("versao");
		//	SE NÃO HOUVER OU VERSÃO FOR ANTIGA
			if(versao === null || versao === "1.5.0-beta") {
			//	SETA UMA COM O VALOR DA NOVA VERSÃO
				localStorage.setItem("versao","1.6.0-beta");
			}
		}
		retornaVersao() {
			let versao = localStorage.getItem("versao");
			return versao;
		}	
	//	1.4.6 - REMOVER RESERVAS
		removerReserva(id) {
			localStorage.removeItem(id);
		}
	}
//
//==============================================================||
//
//	1.5.0 - VARIÁVEl GLOBAl
//
	let bancodedados = new BancodeDados();
//
//==============================================================||
//	2 - FUNÇÕES DO APP
//
//	2.0.0 - FUNÇÃO CADASTRAR A RESERVA DO PROFESSOR
	function cadastrarReservaProfessor() {
	//	RESGATANDO O VALOR DA RESERVA	
		let nome 		= document.getElementById('professor');
		let equipamento = document.getElementById('equipamento');
		let status 		= "Aguardando";
		let sala 		= document.getElementById('sala');
		let dataA 		= document.getElementById('dataA');
		let horaA 		= document.getElementById('horaA');
		let dataB 		= "00/00/0000"
		let horaB 		= document.getElementById('horaB');
		let horaC 		= "00:00:00";
		let horaD 		= "00:00:00";
	//	INSTÂNCIA DA RESERVA DO PROFESSOR
		reserva = new ReservaProfessor(nome.value, equipamento.value, status, sala.value, dataA.value, horaA.value, dataB, horaB.value, horaC, horaD);
	//	VALIDAÇÃO
		if(reserva.validarDados()){
		// 	GRAVA AS INFORMAÇÕES DA RESERVA NA CLASSE BANCODEDADOS
			bancodedados.gravar(reserva, "Professor");
		//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
			let diaA = reserva.dataA.substr(8,2);
			let mesA = "/"+reserva.dataA.substr(5,2);
			let anoA = "/"+reserva.dataA.substr(0,4);
			dataA = diaA+mesA+anoA;
		//	MODAL DE SUCESSO
			modalCadastarProfessorSucesso(reserva.nome, reserva.equipamento, reserva.status ,reserva.sala, dataA, reserva.horaA, reserva.dataB, reserva.horaB);
		//	LIMPA OS VALORES
			nome.value 			= "";
			equipamento.value 	= "";
			sala.value 			= "";
			dataA.value 		= "";
			horaA.value 		= "";
			horaB.value 		= "";
		//
		} else {
		//	MODAL DE ERRO
			modalCadastroErro();
		//
		}
	}
//
//	2.1.0 - FUNÇÃO CADASTRAR A RESERVA DO ALUNO
	function cadastrarReservaAluno() {
	//	RESGATANDO O VALOR DA RESERVA
		let nome 		= document.getElementById('aluno');
		let equipamento = document.getElementById('equipamento');
		let matricula 	= document.getElementById('matricula');
		let serial 		= document.getElementById('serial');
		let dataA 		= document.getElementById('dataA');
		let horaA  		= document.getElementById('horaA');
		let status 		= null;
		let horaB 		= null;
		let dataB 		= null;
		let horaC 		= "00:00:00";

		let time = new Date();
		
		let horas = time.getHours();
		let minutos = time.getMinutes();

		horas 	= horas   < 10 ? horas 	 = "0"+horas 	: horas; 
		minutos = minutos < 10 ? minutos = "0"+minutos 	: minutos; 

		horaX 	= horas+":"+minutos;

		if(horaA.value == horaX && dataA.value == retornaData()) {
		//	STATUS
			status = "Em uso";
		//	HORA
			horaA = retornaHora();
			horaB = retornaHora();
		//	DATA
			dataA = retornaData();
			dataB = retornaData();
		}
		else {
		//	STATUS
			status = "Aguardando";
		//	HORA
			horaA = document.getElementById('horaA').value;
			horaA = horaA+":00";
			horaB = "00:00:00";
		//	DATA
			dataA = document.getElementById('dataA').value;
			dataB = "0000-00-00";
		}
	//
	//	INSTÂNCIA DA RESERVA DO ALUNO
		reserva  = new ReservaAluno(nome.value, equipamento.value, status, matricula.value, serial.value, dataA, horaA, dataB, horaB, horaC);
	//	VALIDAÇÃO
		if(reserva.validarDados()){
		// 	GRAVA AS INFORMAÇÕES DA RESERVA NA CLASSE BANCODEDADOS
			bancodedados.gravar(reserva, "Aluno");
		//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
			let diaA  = reserva.dataA.substr(8,2);
			let mesA  = "/"+reserva.dataA.substr(5,2);
			let anoA  = "/"+reserva.dataA.substr(0,4);
			let dataA = diaA+mesA+anoA;
		//	MODAL DE SUCESSO
			modalCadastarAlunoSucesso(reserva.nome, reserva.matricula, reserva.equipamento, reserva.serial, dataA, reserva.horaA);
		//	LIMPA OS VALORES
			nome.value 			= "";
			matricula.value 	= "";
			equipamento.value 	= "";
			serial.value 		= "";
			horaA.value 		= "";
			dataA.value 		= "";
		//
		} else {
		//	MODAL DE ERRO
			modalCadastroErro();
		//
		}
	//
	}
//
//	CADASTRAR NOME DO FUNCIONÁRIO
	function cadastrarFuncionario() {
	//	VERIFICA O NOME NO LOCAL STORAGE
		let id = localStorage.getItem("idFuncionario");
	//	DATA E HORA EXATAS
		let dataA = retornaData();
		let horaA = retornaHora();
	//	DEFININDO NOVA VERSÃO DO APP
		bancodedados.versaoApp();
		let versao = bancodedados.retornaVersao();
	//
	//	SE O NOME FOR NULO
		if(id === null){
		//	DEFINE UM NOME NOME
         	let nome = prompt("Antes de começarmos informe o seu nome");
		//	O NOVO NOME É PASSADO PARA A INSTÂNCIA FUNCIONÁRIO
			let funcionario = new Funcionario(nome, dataA, horaA, versao);
		//	VALIDAÇÃO DO NOME DO FUNCIONÁRIO
			if(funcionario.validarFuncionario()){
			//	GRAVA O NOME DO FUNCIONÁRIO
				bancodedados.gravarFuncionario(funcionario);
			//	MODAL DE BEM VINDO
				modalCadastarFuncionarioSucesso(funcionario.nome);
			//	SE NÃO
			} else{
			//	RECARREGA A PÁGINA
           		window.location.reload();
           	//
			}
		//
		}
	//
	}
//
//	2.2.0 - LISTA DE RESERVAS DOS PROFESSORES
	function ListaReservasProfessores() {
	//	VERIFICA O NOME DO FUNCIONÁRIO
		cadastrarFuncionario();
	//	RELÓGIO
		relogio();
	//	ALERTA
		alerta();
	//	ARRAY FUNCIONÁRIO
		let funcionario = Array();
	//	SETANDO O VALOR DO ARRAY NA VARIÁVEL
		funcionario = bancodedados.recuperaFuncionario();
	//	LISTANTO O FUNCIONÁRIO
 		funcionario.forEach(function(f) {
 		//	NOME DO FUNCIONÁRIO É EXIBIDO
			document.getElementById("funcionario").innerHTML = f.nome;
		//
		})
	//
	//	DECLARAÇÃO DO ARRAY RESERVAS
		let reservas = Array();
	//	SETANDO O VALOR DO ARRAY NA VARIÁVEL
		reservas = bancodedados.recuperaReservaProfessor();
	//	SELECIONANDO O ELEMENTO TBODY
		let listaReservas = document.getElementById("listaProfessores");
	//
	//	LISTANTO A RESERVA
 		reservas.forEach(function(p) {
		//	COR DO STATUS
			let status;
		//
			if(p.status == "Aguardando") {
				status = '<span class="text-danger"><b>'+p.status+'</b></span>';
			} else if(p.status == "Em uso") {
				status = '<span class="text-success"><b>'+p.status+'</b></span>';
			} else {
				status = '<span class="text-primary"><b>'+p.status+'</b></span>';
			}
		//
 		//	CRIANDO A LINHA (TR)
 			let linha =	listaReservas.insertRow();
 		//	CRIAR AS COLUNAS (TD)
 			linha.insertCell(0).innerHTML = p.nome;
 			linha.insertCell(1).innerHTML = p.equipamento;
 			linha.insertCell(2).innerHTML = p.sala;
		//
			linha.insertCell(3).innerHTML = status;
		//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
			let diaA = p.dataA.substr(8,2);
			let mesA = "/"+p.dataA.substr(5,2);
			let anoA = "/"+p.dataA.substr(0,4);
			dataA = diaA+mesA+anoA;
 		//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO/EDIÇÃO/EXCLUSÃO/VERIFICAÇÃO
 			linha.insertCell(4).append(
 				botaoVizualizarProfessor(	p.id ,p.nome, p.equipamento, p.status, p.sala, dataA, p.horaA, p.dataB, p.horaB, p.horaC, p.horaD)," ",
 				botaoEditarProfessor(		p.id ,p.nome, p.equipamento, p.status, p.sala, dataA, p.horaA, p.dataB, p.horaB, p.horaC, p.horaD)," ",
 				botaoExcluirProfessor(		p.id ,p.nome, p.equipamento, p.status, p.sala, dataA, p.horaA, p.dataB, p.horaB, p.horaC, p.horaD)," ",
 				botaoVerificarProfessor(	p.id ,p.nome, p.equipamento, p.status, p.sala, dataA, p.horaA, p.dataB, p.horaB, p.horaC, p.horaD)
 		//
 			);
 		//
		})
	}
//
//	2.3.0 - PESQUISAR RESERVA DO PROFESSOR
	function pesquisarReservaProfessor() {
	//	RECUPERANDO OS VALORES DOS CAMPOS
		let nome 		= document.getElementById('professor').value;
		let equipamento = document.getElementById('equipamento').value;
		let sala 		= document.getElementById('sala').value;
		let horaA 		= document.getElementById('horaA').value;
		let horaB 		= document.getElementById('horaB').value;
		let dataA 		= document.getElementById('dataA').value;
	//	PASANDO VALORES PARA UMA NOVA INSTÂNCIA
		let reserva = new ReservaProfessor(nome, equipamento, "" , sala, dataA, horaA, "", horaB);
	//	INTÂNCIA DA RESERVA SENDO PASSADA PRO MÉTODO DE PESQUISA
		let reservas = bancodedados.pesquisaReserva(reserva, "Professor");
	//	SELECIONANDO O ELEMENTO DA TABELA
		let listaReservas = document.getElementById("listaProfessores");
	//	LIMPANDO TABELA
		listaReservas.innerHTML = "";
	//
	//	VALIDAÇÃO DA PESQUISA
		if(nome == "" && equipamento == "" && horaA == "" && dataA == "" && sala == "" && horaB == "") {
		//	MODAL DE ERRO
			modalPesquisaErro();
		//
		} else {
		//
		//	LISTANDO A PESQUISA
			reservas.forEach(function(p) {
			//	TRATAMENTO DE DADOS
				//	COR DO STATUS
					let status;
				//	VERIFICAÇÃO DE STATUS
					if(p.status == "Aguardando") {
						status = '<span class="text-danger"><b>'+p.status+'</b></span>';
					} else if(p.status == "Em uso") {
						status = '<span class="text-success"><b>'+p.status+'</b></span>';
					} else {
						status = '<span class="text-primary"><b>'+p.status+'</b></span>';
					}
				//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
					let diaA = p.dataA.substr(8,2);
					let mesA = "/"+p.dataA.substr(5,2);
					let anoA = "/"+p.dataA.substr(0,4);
					dataA = diaA+mesA+anoA;
				//
			//
			//	CRIANDO A LINHA
				let linha = listaReservas.insertRow();
			//
			//	CRIAR AS COLUNAS
 				linha.insertCell(0).innerHTML = p.nome;
 				linha.insertCell(1).innerHTML = p.equipamento;
 				linha.insertCell(2).innerHTML = p.sala;
				linha.insertCell(3).innerHTML = status
 			//
 			//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO/EDIÇÃO/EXCLUSÃO/VERIFICAÇÃO
 				linha.insertCell(4).append(
 					botaoVizualizarProfessor(	p.id ,p.nome, p.equipamento, p.status, p.sala, dataA, p.horaA, p.dataB, p.horaB, p.horaC, p.horaD)," ",
 					botaoEditarProfessor(		p.id ,p.nome, p.equipamento, p.status, p.sala, dataA, p.horaA, p.dataB, p.horaB, p.horaC, p.horaD)," ",
 					botaoExcluirProfessor(		p.id ,p.nome, p.equipamento, p.status, p.sala, dataA, p.horaA, p.dataB, p.horaB, p.horaC, p.horaD)," ",
 					botaoVerificarProfessor(	p.id ,p.nome, p.equipamento, p.status, p.sala, dataA, p.horaA, p.dataB, p.horaB, p.horaC, p.horaD)
 			//
 				);
 			//
			})
		}
	//
	}
//
//	2.4.0 - LISTA DE RESERVAS DOS ALUNOS
	function ListasReservasAlunos() {
	//	VERIFICA O NOME DO FUNCIONÁRIO
		cadastrarFuncionario();
	//	RELÓGIO
		relogio();
	//	ALERTA
		alerta();
	//
	//	ARRAY FUNCIONÁRIO
		let funcionario = Array();
	//	SETANDO O VALOR DO ARRAY NA VARIÁVEL
		funcionario = bancodedados.recuperaFuncionario();
	//	LISTANTO O FUNCIONÁRIO
 		funcionario.forEach(function(f) {
 		//	NOME DO FUNCIONÁRIO É EXIBIDO
			document.getElementById("funcionario").innerHTML = f.nome;
		//
		})
	//
	//	DECLARAÇÃO DO ARRAY RESERVAS
		let reservas = Array();
	//	SETANDO O VALOR DO ARRAY NA VARIÁVEL
		reservas = bancodedados.recuperaReservaAluno();
	//	SELECIONANDO O ELEMENTO TBODY
		let listaReservas = document.getElementById("listaAlunos");
	//	LISTANTO A RESERVA
 		reservas.forEach(function(a) {
 		//	TRATAMENTO DE DADOS
 			//	COR DO STATUS
 				let status = null;
 			//	AGUARDANDO
				if(a.status == "Aguardando") { 
					status = '<span class="text-danger"><b>'+a.status+'</b></span>';
				}
			//	EM USO 
				else if (a.status == "Em uso") {
					status = '<span class="text-success"><b>'+a.status+'</b></span>';
				}
			//	RECOLHIDO 
				else {
					status = '<span class="text-primary"><b>'+a.status+'</b></span>';
				}
			//
		//
		//	CRIANDO A LINHA (TR)
 			let linha =	listaReservas.insertRow();
 		//	CRIAR AS COLUNAS (TD)
 			linha.insertCell(0).innerHTML = a.nome;
 			linha.insertCell(1).innerHTML = a.matricula;
 			linha.insertCell(2).innerHTML = a.equipamento;
 			linha.insertCell(3).innerHTML = a.serial;
 			linha.insertCell(4).innerHTML = status;
		//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO/EDIÇÃO/EXCLUSÃO
 			linha.insertCell(5).append(
 			//
 				botaoVizualizarAluno(	a.id, a.nome, a.equipamento, a.status, a.matricula, a.serial, a.dataA, a.horaA, a.dataB, a.horaB, a.horaC)," ",
 				botaoEditarAluno(		a.id, a.nome, a.equipamento, a.status, a.matricula, a.serial, a.dataA, a.horaA, a.dataB, a.horaB, a.horaC)," ",
 				botaoExcluirAluno(		a.id, a.nome, a.equipamento, a.status, a.matricula, a.serial, a.dataA, a.horaA, a.dataB, a.horaB, a.horaC)," ",
 				botaoVerificarAluno(	a.id, a.nome, a.equipamento, a.status, a.matricula, a.serial, a.dataA, a.horaA, a.dataB, a.horaB, a.horaC)
 			//
 			);
 		//
		})
	//
	}
//
//	2.5.0 PESQUISA RESERVA DO ALUNO
	function pesquisarReservaAluno() {
	//	RESGATANDO O VALOR DA RESERVA	
		let nome 		= document.getElementById('aluno').value;		
		let equipamento = document.getElementById('equipamento').value;
		let matricula 	= document.getElementById('matricula').value;
		let serial 		= document.getElementById('serial').value;
		let dataA 		= document.getElementById('dataA').value;
		let horaA 		= document.getElementById('horaA').value;
	//	INSTÂNCIA DA RESERVA DO ALUNO
		reserva  = new ReservaAluno(nome, equipamento,"", matricula, serial, dataA, horaA);
		console.log(reserva);
	//	INTÂNCIA DA RESERVA SENDO PASSADA PRO MÉTODO DE PESQUISA
		let reservas = bancodedados.pesquisaReserva(reserva, "Aluno");
	//	SELECIONANDO O ELEMENTO DA TABELA
		let listaReservas = document.getElementById("listaAlunos");
	//	LIMPANDO TABELA
		listaReservas.innerHTML = "";
	//
	//	VALIDAÇÃO DA PESQUISA
		if(nome == "" && equipamento == "" && matricula == "" && serial == "" && dataA == "" && horaA == "") {
		//	MODAL DE ERRO
			modalPesquisaErro();
		//
		} else {
		//
		//	LISTANDO A PESQUISA
			reservas.forEach(function(a) {
			//	CRIANDO A LINHA
				let linha = listaReservas.insertRow();
			//	CRIAR AS COLUNAS
				linha.insertCell(0).innerHTML = a.nome;
				linha.insertCell(1).innerHTML = a.matricula;
				linha.insertCell(2).innerHTML = a.equipamento;
				linha.insertCell(3).innerHTML = a.serial;
	 		//	COR DO STATUS
	 			let status = null;
				if(a.status == "Aguardando") { 
					status = '<span class="text-danger"><b>'+a.status+'</b></span>';
				} else if (a.status == "Em uso") {
					status = '<span class="text-success"><b>'+a.status+'</b></span>';
				} else {
					status = '<span class="text-primary"><b>'+a.status+'</b></span>';
				}
			//
					linha.insertCell(4).innerHTML = status;
			//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO/EDIÇÃO/EXCLUSÃO
 				linha.insertCell(5).append(
 				//
 					botaoVizualizarAluno(	a.id, a.nome, a.equipamento, a.status, a.matricula, a.serial,  a.dataA, a.horaA, a.dataB, a.horaB)," ",
 					botaoEditarAluno(		a.id, a.nome, a.equipamento, a.status, a.matricula, a.serial,  a.dataA, a.horaA, a.dataB, a.horaB)," ",
 					botaoExcluirAluno(		a.id, a.nome, a.equipamento, a.status, a.matricula, a.serial,  a.dataA, a.horaA, a.dataB, a.horaB)," ",
 					botaoVerificarAluno(	a.id, a.nome, a.equipamento, a.status, a.matricula, a.serial,  a.dataA, a.horaA, a.dataB, a.horaB)
 				//
 				);
 			//
			})
		}
	}
//
//
//	BOTÃO VIZUALIZAÇÃO
	let botaoVizualizarAluno = function(id, nome, equipamento, status, matricula, serial, dataA, horaA, dataB, horaB, horaC) {
	//	BOTAO DE VIZUALIZAÇÃO
 		let ver 		= document.createElement("button");
 		ver.className	= 'btn btn-outline-info btn-sm';
 		ver.title 		= "Vizualizar";
 		ver.innerHTML 	= '<i class="fa fa-eye"></i>';
 		ver.id 			= `id-ver-${id}`;
 	//	NO CLICAR DO BOTÃO OS DETALHES DA RESERVA SERÁ EXIBIDO EM UM MODAL
 		ver.onclick 	= function() {
 		//	COR DO STATUS
 			let statusB = null;
 		//	AGUARDANDO
			if(status == "Aguardando") { 
				statusB = '<span class="text-danger"><b>'+status+'</b></span>';
			}
		//	EM USO 
			else if (status == "Em uso") {
				statusB = '<span class="text-success"><b>'+status+'</b></span>';
			}
		//	RECOLHIDO 
			else {
				statusB = '<span class="text-primary"><b>'+status+'</b></span>';
			}
		//
		//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
			let _diaA = dataA.substr(8,2);
			let _mesA = "/"+dataA.substr(5,2);
			let _anoA = "/"+dataA.substr(0,4);
			let _dataA = _diaA+_mesA+_anoA;
		//
			let _diaB = dataB.substr(8,2);
			let _mesB = "/"+dataB.substr(5,2);
			let _anoB = "/"+dataB.substr(0,4);
			let _dataB = _diaB+_mesB+_anoB;
		//
		//	MODAL DE VIZUALIÇÃO
			modalVizualizarAluno(nome, equipamento, statusB, matricula, serial, _dataA, horaA, _dataB, horaB, horaC);
		//
 		}
 		return ver;
	}
//
//	BOTAO DE VIZUALIZAÇÃO
	let botaoVizualizarProfessor = function(id, nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {
	//	BOTAO DE VIZUALIZAÇÃO
 		let ver 		= document.createElement("button");
 		ver.className 	= 'btn btn-outline-info btn-sm';
 		ver.title 		= "Vizualizar";
 		ver.innerHTML 	= '<i class="far fa-eye"></i>';
 		ver.id 			= `id-ver-${id}`;
 		ver.onclick 	= function() {
 		//	COR DO STATUS
 			let statusB = null;
 		//	AGUARDANDO
			if(status == "Aguardando") { 
				statusB = '<span class="text-danger"><b>'+status+'</b></span>';
			}
		//	EM USO 
			else if (status == "Em uso") {
				statusB = '<span class="text-success"><b>'+status+'</b></span>';
			}
		//	RECOLHIDO 
			else {
				statusB = '<span class="text-primary"><b>'+status+'</b></span>';
			}
		//
 		//	MODAL DE VIZUALIÇÃO		
 			modalVizualizarProfessor(nome, equipamento, statusB, sala, dataA, horaA, dataB, horaB, horaC, horaD);
		//
 		}
 		return ver;
	}

//	BOTÃO EDITAR
	let botaoEditarAluno = function(id, nome, equipamento, status, matricula, serial, dataA, horaA, dataB, horaB, horaC) {
	//	BOTAO DE EDIÇÃO
 	//
 		let editar 			= document.createElement("button");
 		editar.className 	= 'btn btn-outline-success btn-sm';
 		editar.title 		= "Editar";
 		editar.innerHTML 	= '<i class="fas fa-pencil-alt"></i>';
 		editar.id 			= `id-editar-${id}`;
 	//
 		editar.onclick 		= function() {
 		//
 			let time 	 = new Date();
 			let horas 	 = time.getHours();
 			let minutos  = time.getMinutes() + 5;
 			let segundos = time.getSeconds();

 			horas 		= horas 	< 10 ? horas 	= "0"+horas 	: horas;
 			minutos 	= minutos 	< 10 ? minutos 	= "0"+minutos 	: minutos;
 			segundos 	= segundos 	< 10 ? segundos = "0"+segundos 	: segundos;
			
			let horaX = horas+":"+minutos+":"+segundos;

 			if(dataA >= retornaData() && horaX <= horaA && status == "Aguardando") {
 			//	VERIFICAÇÃO
 				let = resposta = prompt("Deseja EDITAR a reserva do(a) "+nome+"? R: Sim ou Não","Não");
 			//
 			//	VALIDAÇÃO DE VERIFICAÇÃO
 				if(resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
				//	FORMATAR O ID
					let id = this.id.replace('id-editar-','');
				//	REMOVE A RESERVA
					bancodedados.removerReserva(id);
				//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
					let diaBR = dataA.substr(8,2);
					let mesBR = "/"+dataA.substr(5,2);
					let anoBR = "/"+dataA.substr(0,4);
					let dataBR = diaBR+mesBR+anoBR;
				//	NOVOS VALORES SERÃO RECEBIDOS
 					let _nome 			= prompt("Nome do(a) Aluno(a):", nome);
 					let _matricula		= prompt("Matrícula:", matricula);
 					let _equipamento 	= prompt("Descrição do equipamento:", equipamento);
 					let _serial			= prompt("Nº de série:", serial);
 					let _dataA			= prompt("Data:", dataBR);
 					let _horaA			= prompt("Hora:", horaA);
				//	CONVERSÃO DA DATA NO FORMATO BR PARA EUA
					let diaEUA = _dataA.substr(6,4);
					let mesEUA = "-"+_dataA.substr(3,2);
					let anoEUA = "-"+_dataA.substr(0,2);
					let dataEUA = diaEUA+mesEUA+anoEUA;
				//
 				//	MODAL DE EDIÇÃO
 					modalEditarAlunoA(_nome, _equipamento, _matricula, _serial, dataBR, _horaA);
				//	CRIAÇÃO DE UMA NOVA INSTÂNCIA RESERVA
					reserva  = new ReservaAluno(_nome, _equipamento, status, _matricula, _serial, dataEUA, horaA, dataB, horaB, horaC);
				//	GRAVA AS INFORMAÇÕES NO BANCO DE DADOS
					bancodedados.gravar(reserva, "Aluno");
				//
 				}
 			} 
 			else {
 				modalEditarAlunoB(nome);
 			}
 		}
 		return editar;
 	}
//
//
	let botaoEditarProfessor = function(id, nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {
	//	BOTAO DE EDIÇÃO
		let editar 			= document.createElement("button");
 		editar.className 	= 'btn btn-outline-success btn-sm';
 		editar.title 		= "Editar";
 		editar.innerHTML 	= '<i class="fas fa-pencil-alt"></i>';
 		editar.id 			= `id-editar-${id}`;
 	//
 		editar.onclick 		= function() {
 		//
 			let time 	= new Date();
 			let horas 	= time.getHours();
 			let minutos = time.getMinutes() + 5;

 			horas 	= horas 	< 10 ? horas 	= "0"+horas 	: horas;
 			minutos = minutos 	< 10 ? minutos 	= "0"+minutos 	: minutos;
			
			let horaX = horas+":"+minutos;

 			if(horaX >= horaA || status == "Em uso" || status == "Retirado") {
 				modalEditarProfessorB(nome);
 			} else {
 			//	VERIFICAÇÃO
 				let = resposta = prompt("Deseja EDITAR a reserva do(a) "+nome+"? R: Sim ou Não","Não");
 				//	VALIDAÇÃO DE VERIFICAÇÃO
 				if(resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
 				//	NOVOS VALORES SERÃO RECEBIDOS
 					let _nome 			= prompt("Nome do(a) Professor(a):", nome);
 					let _equipamento 	= prompt("Descrição do equipamento:",equipamento);
 					let _sala 			= prompt("Nome da sala:",sala);
 					let _horaA 			= prompt("Início da aula:",horaA);
 					let _horaB 			= prompt("Término da aula:",horaB);
 					let _dataA 			= prompt("Data da aula:",dataA);
				//	CONVERSÃO DA DATA NO FORMATO BR PARA EUA
					let diaEUA = dataA.substr(6,4);
					let mesEUA = "-"+dataA.substr(3,2);
					let anoEUA = "-"+dataA.substr(0,2);
					_dataA = diaEUA+mesEUA+anoEUA;
 				//	MODAL DE EDIÇÃO
 					modalEditarProfessorA(_nome, _equipamento, _sala, dataA, _horaA, _horaB);
 				//	FORMATAR O ID
					let id = this.id.replace('id-editar-','');
				//	REMOVE A RESERVA
					bancodedados.removerReserva(id);
				//	CRIAÇÃO DE UMA NOVA INSTÂNCIA RESERVA
					let reserva = new ReservaProfessor(_nome, _equipamento, status, _sala, _dataA, _horaA, dataB, _horaB, horaC, horaD);
				//	GRAVA AS INFORMAÇÕES NO BANCO DE DADOS
					bancodedados.gravar(reserva, "Professor");
				//
 				}
 			}
 		}
 		return editar;
 	}
//
//	BOTÃO EXCLUIR
	let botaoExcluirAluno = function(id, nome, equipamento, status, matricula, serial, dataA, horaA, dataB, horaB, horaC) {
	//	BOTAO DE EXCLUSÃO
 		excluir 			= document.createElement("button");
 		excluir.className 	= 'btn btn-outline-danger btn-sm';
 		excluir.title 		= 'Excluir';
 		excluir.innerHTML 	= '<i class="fa fa-trash-alt"></i>';
 		excluir.id 			= `id-excluir-${id}`;
 	//
 		excluir.onclick = function() {
 	 	//	PRONPT DE VERIFICAÇÃO
			let resposta = prompt("Deseja EXCLUIR a reserva do(a) "+nome+"? R: Sim ou Não", "Não");
		//	VALIDAÇÃO DE EXCLUSÃO
			if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
 			//	COR DO STATUS
 				let statusB = null;
 			//	AGUARDANDO
				if(status == "Aguardando") { 
					statusB = '<span class="text-danger"><b>'+status+'</b></span>';
				}
			//	EM USO 
				else if (status == "Em uso") {
					statusB = '<span class="text-success"><b>'+status+'</b></span>';
				}
			//	RECOLHIDO 
				else {
					statusB = '<span class="text-primary"><b>'+status+'</b></span>';
				}
			//
			//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
				let diaBRA = dataA.substr(8,2);
				let mesBRA = "/"+dataA.substr(5,2);
				let anoBRA = "/"+dataA.substr(0,4);
				let dataBRA = diaBRA+mesBRA+anoBRA;
			//
			//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
				let diaBRB = dataB.substr(8,2);
				let mesBRB = "/"+dataB.substr(5,2);
				let anoBRB = "/"+dataB.substr(0,4);
				let dataBRB = diaBRB+mesBRB+anoBRB;
			//
			//	MODAL DE EXCLUSÃO
				modalExcluirAluno(nome, matricula, equipamento, serial, statusB, dataBRA, horaA, dataBRB, horaB, horaC);
			//	FORMATAR O ID
				let id = this.id.replace('id-excluir-','');
			//	REMOVE A RESERVA
 				bancodedados.removerReserva(id);
 			//
 			}
 		}
 		return excluir;
	}
//
	let botaoExcluirProfessor = function(id, nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {
 	//	BOTAO DE EXCLUSÃO
 		excluir 			= document.createElement("button");
 		excluir.className 	= 'btn btn-outline-danger btn-sm';
 		excluir.title 		= 'Excluir';
 		excluir.innerHTML 	= '<i class="fa fa-trash-alt"></i>';
 		excluir.id 			= `id-excluir-${id}`;
 		excluir.onclick 	= function() {
 	 	//	PRONPT DE VERIFICAÇÃO
			let resposta = prompt("Deseja EXCLUIR a reserva do(a) "+nome+"? R: Sim ou Não", "Não");
		//	VALIDAÇÃO DE EXCLUSÃO
			if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
			//	COR DO STATUS
				let corStatus;
			//
				if(status == "Aguardando") {
					corStatus = '<span class="text-danger"><b>'+status+'</b></span>';
				} else if(status == "Em uso") {
					corStatus = '<span class="text-success"><b>'+status+'</b></span>';
				} else {
					corStatus = '<span class="text-primary"><b>'+status+'</b></span>';
				}
			//	MODAL DE EXCLUSÃO 				
				modalExcluirProfessor(nome, equipamento, corStatus, sala, dataA, horaA, dataB, horaB, horaC, horaD);
			//	FORMATAR O ID
				let id = this.id.replace('id-excluir-','');
			//	REMOVE A RESERVA
 				bancodedados.removerReserva(id);
 			}
 		}
 		return excluir;
 	//
 	}
//
//	BOTÃO VERIFICAR
	let botaoVerificarAluno = function(id, nome, equipamento, status, matricula, serial, dataA, horaA, dataB, horaB, horaC) {
	//	BOTÃO VERIFICAR RESERVA
 		verificar 			= document.createElement("button");
 		verificar.className = "btn btn-outline-primary btn-sm";
 		verificar.title 	= "Verificar";
 		verificar.innerHTML = '<i class="fas fa-user-check"></i>';
 		verificar.id 		= `id-verifica-${id}`;
 		verificar.onclick 	= function() {
 		//
 			if(status ==  "Aguardando") {
			//	PRONPT DE VERIFICAÇÃO
				let resposta = prompt("A reserva do(a) "+nome+" está em uso? R: Sim ou Não", "Não");
			//	VALIDAÇÃO DE EXCLUSÃO
				if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
				///	FORMATAR O ID
					let id = this.id.replace('id-verifica-','');
				//	REMOVE A RESERVA
					bancodedados.removerReserva(id);
				//	NOVOS VALORES
					let _nome 			= nome;
					let _equipamento 	= equipamento;
					let _status 		= "Em uso";
					let _matricula		= matricula;
					let _serial			= serial;
					let _dataA			= dataA;
					let _horaA 			= horaA;
					let _dataB 			= retornaData();
					let _horaB 			= retornaHora();
					let _horaC 			= horaC;
 					//	COR DO STATUS
 						let statusB = null;
 					//	AGUARDANDO
						if(_status == "Aguardando") { 
							statusB = '<span class="text-danger"><b>'+_status+'</b></span>';
						}
					//	EM USO 
						else if (_status == "Em uso") {
							statusB = '<span class="text-success"><b>'+_status+'</b></span>';
						}
					//	RECOLHIDO 
						else {
							statusB = '<span class="text-primary"><b>'+_status+'</b></span>';
						}
					//
					//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
						let diaBRA = dataA.substr(8,2);
						let mesBRA = "/"+dataA.substr(5,2);
						let anoBRA = "/"+dataA.substr(0,4);
						let dataBRA = diaBRA+mesBRA+anoBRA;
					//
					//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
						let diaBRB = _dataB.substr(8,2);
						let mesBRB = "/"+_dataB.substr(5,2);
						let anoBRB = "/"+_dataB.substr(0,4);
						let dataBRB = diaBRB+mesBRB+anoBRB;
					//
				//
				//	MODAL DE VERIFICAÇÃO
					modalVerificaReservaAluno(_nome, _equipamento, statusB, _matricula, _serial, dataBRA, _horaA, dataBRB, _horaB, _horaC);
				//	CRIAÇÃO DE UMA NOVA INSTÂNCIA RESERVA
					reserva  = new ReservaAluno(_nome, _equipamento, _status, _matricula, _serial, _dataA, _horaA, _dataB, _horaB, _horaC);
				//	GRAVA AS INFORMAÇÕES NO BANCO DE DADOS
					bancodedados.gravar(reserva, "Aluno");
				//
	 			}
 			}	
 			else if(status == "Em uso") {
			//	PRONPT DE VERIFICAÇÃO
				let resposta = prompt("A reserva do(a) "+nome+" está recolhida? R: Sim ou Não", "Não");
			//	VALIDAÇÃO DE EXCLUSÃO
				if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
				///	FORMATAR O ID
					let id = this.id.replace('id-verifica-','');
				//	REMOVE A RESERVA
					bancodedados.removerReserva(id);
				//	NOVOS VALORES
					let _nome 			= nome;
					let _equipamento 	= equipamento;
					let _status 		= "Recolhido";
					let _matricula		= matricula;
					let _serial			= serial;
					let _dataA			= dataA;
					let _horaA 			= horaA;
					let _dataB 			= retornaData();
					let _horaB 			= horaB;		
					let _horaC 			= retornaHora();
 					//	COR DO STATUS
 						let statusB = null;
 					//	AGUARDANDO
						if(_status == "Aguardando") { 
							statusB = '<span class="text-danger"><b>'+_status+'</b></span>';
						}
					//	EM USO 
						else if (_status == "Em uso") {
							statusB = '<span class="text-success"><b>'+_status+'</b></span>';
						}
					//	RECOLHIDO 
						else {
							statusB = '<span class="text-primary"><b>'+_status+'</b></span>';
						}
					//
					//
					//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
						let diaBRA = _dataA.substr(8,2);
						let mesBRA = "/"+_dataA.substr(5,2);
						let anoBRA = "/"+_dataA.substr(0,4);
						let dataBRA = diaBRA+mesBRA+anoBRA;
					//
					//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
						let diaBRB = _dataB.substr(8,2);
						let mesBRB = "/"+_dataB.substr(5,2);
						let anoBRB = "/"+_dataB.substr(0,4);
						let dataBRB = diaBRB+mesBRB+anoBRB;
					//
				//
				//	MODAL DE VERIFICAÇÃO
					modalVerificaReservaAluno(_nome, _equipamento, statusB, _matricula, _serial, dataBRA, _horaA, dataBRB, _horaB, _horaC);
				//	CRIAÇÃO DE UMA NOVA INSTÂNCIA RESERVA
					reserva  = new ReservaAluno(_nome, _equipamento, _status, _matricula, _serial, _dataA, _horaA, _dataB, _horaB, _horaC);
				//	GRAVA AS INFORMAÇÕES NO BANCO DE DADOS
					bancodedados.gravar(reserva, "Aluno");
				//
	 			}
 			} 

 			else {
 				//	COR DO STATUS
 					let statusB = null;
 				//	AGUARDANDO
					if(status == "Aguardando") { 
						statusB = '<span class="text-danger"><b>'+status+'</b></span>';
					}
				//	EM USO 
					else if (status == "Em uso") {
						statusB = '<span class="text-success"><b>'+status+'</b></span>';
					}
				//	RECOLHIDO 
					else {
						statusB = '<span class="text-primary"><b>'+status+'</b></span>';
					}
				//
				//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
					let diaBRA = dataA.substr(8,2);
					let mesBRA = "/"+dataA.substr(5,2);
					let anoBRA = "/"+dataA.substr(0,4);
					let dataBRA = diaBRA+mesBRA+anoBRA;
				//
				//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
					let diaBRB = dataB.substr(8,2);
					let mesBRB = "/"+dataB.substr(5,2);
					let anoBRB = "/"+dataB.substr(0,4);
					let dataBRB = diaBRB+mesBRB+anoBRB;
				//
					modalVerificaReservaAlunoErro(nome, equipamento, statusB, matricula, serial, diaBRA, horaA, dataBRB, horaB, horac);
 				//
 			}

 		}
 		return verificar;
	}
//
//	BOTÃO VERIFICAR
	let botaoVerificarProfessor = function(id, nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {
	//	BOTÃO VERIFICAR RESERVA
 		verificar 			= document.createElement("button");
 		verificar.className = "btn btn-outline-primary btn-sm";
 		verificar.title 	= "Verificar";
 		verificar.innerHTML = '<i class="fas fa-user-check"></i>';
 		verificar.id 		= `id-verifica-${id}`;
 		verificar.onclick 	= function() {
 		//
 			if(status ==  "Aguardando") {
		//	PRONPT DE VERIFICAÇÃO
			let resposta = prompt("A reserva do(a) "+nome+" já está em uso? R: Sim ou Não", "Não");
			//	VALIDAÇÃO DE EXCLUSÃO
				if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
				//	FORMATAR O ID
					let id = this.id.replace('id-verifica-','');
				//	REMOVE A RESERVA
					bancodedados.removerReserva(id);
				//	NOVOS VALORES					
					let _nome 		 = nome;
					let _equipamento = equipamento;
					let _status 	 = "Em uso";
					let _sala 		 = sala;
					let _horaA 		 = horaA;
					let _dataB 		 = retornaData();
					let _horaB 		 = horaB;
					let _horaC 		 = retornaHora();
					let _horaD 		 = horaD;
				//	CONVERSÃO DA DATA NO FORMATO BR PARA EUA
					let diaEUA = dataA.substr(6,4);
					let mesEUA = "-"+dataA.substr(3,2);
					let anoEUA = "-"+dataA.substr(0,2);
					_dataA = diaEUA+mesEUA+anoEUA;
				//	COR DO STATUS
					let corStatus;
				//
					if(_status == "Aguardando") {
						corStatus = '<span class="text-danger"><b>'+_status+'</b></span>';
					} else if(_status == "Em uso") {
						corStatus = '<span class="text-success"><b>'+_status+'</b></span>';
					} else {
						corStatus = '<span class="text-primary"><b>'+_status+'</b></span>';
					}
				//
				//
				//	MODAL DE VERIFICAÇÃO
					modalVerificaReservaProfessor(_nome, _equipamento, corStatus, _sala, dataA, _horaA, _dataB, _horaB, _horaC, _horaD);
				//	CRIAÇÃO DE UMA NOVA INSTÂNCIA RESERVA
					reserva  = new ReservaProfessor(_nome, _equipamento, _status, _sala, _dataA, _horaA, _dataB, _horaB, _horaC, _horaD);
				//	GRAVA AS INFORMAÇÕES NO BANCO DE DADOS
					bancodedados.gravar(reserva, "Professor");
	 			}
 			} 	else if(status == "Em uso") {
				//	PRONPT DE VERIFICAÇÃO
					let resposta = prompt("A reserva do(a) "+nome+" foi retirada? R: Sim ou Não", "Não");
				//	VALIDAÇÃO DE EXCLUSÃO
					if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
					//	FORMATAR O ID
						let id = this.id.replace('id-verifica-','');
					//	REMOVE A RESERVA
						bancodedados.removerReserva(id);
					//	NOVOS VALORES					
						let _nome 		 = nome;
						let _equipamento = equipamento;
						let _status 	 = "Retirado";
						let _sala 		 = sala;
						let _horaA 		 = horaA;
						let _dataB 		 = dataB;
						let _horaB 		 = horaB;
						let _horaC 		 = horaC;
						let _horaD 		 = retornaHora();
					//	CONVERSÃO DA DATA NO FORMATO BR PARA EUA
						let diaEUA = dataA.substr(6,4);
						let mesEUA = "-"+dataA.substr(3,2);
						let anoEUA = "-"+dataA.substr(0,2);
						_dataA = diaEUA+mesEUA+anoEUA;
						//	COR DO STATUS
						let corStatus;
					//
						if(_status == "Aguardando") {
							corStatus = '<span class="text-danger"><b>'+_status+'</b></span>';
						} else if(_status == "Em uso") {
							corStatus = '<span class="text-success"><b>'+_status+'</b></span>';
						} else {
							corStatus = '<span class="text-primary"><b>'+_status+'</b></span>';
						}
					//	MODAL DE VERIFICAÇÃO
						modalVerificaReservaProfessor(_nome, _equipamento, corStatus, _sala, dataA, _horaA, _dataB, _horaB, _horaC, _horaD);
					//	CRIAÇÃO DE UMA NOVA INSTÂNCIA RESERVA
						reserva  = new ReservaProfessor(_nome, _equipamento, _status, _sala, _dataA, _horaA, _dataB, _horaB, _horaC, _horaD);
					//	GRAVA AS INFORMAÇÕES NO BANCO DE DADOS
						bancodedados.gravar(reserva, "Professor");
				}
 			}	else {
 				//	COR DO STATUS
					let corStatus;
				//
					if(status == "Aguardando") {
						corStatus = '<span class="text-danger"><b>'+status+'</b></span>';
					} else if(status == "Em uso") {
					corStatus = '<span class="text-success"><b>'+status+'</b></span>';
					} else {
						corStatus = '<span class="text-primary"><b>'+status+'</b></span>';
						}
 				//	MODAL DE ERRO 					
					modalVerificaReservaProfessorErro(nome, equipamento, corStatus, sala, dataA, horaA, dataB, horaB, horaC, horaD);
 				//
 			}
 		}
 		return verificar;
	}
//
//	MODAL INFORMAÇÃO DO APP
	let modalInformacaoApp = function(nome, versao, dataA, horaA) {
	//
 		$('#modal2').modal('show');
		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fa fa-info-circle"></i> Informações';
		document.getElementById('modal-documento-2').className	= 'modal-dialog border border-info rounded alert-info';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-info';
		document.getElementById('modal-conteudo-2').innerHTML 	= 'Informações dos detalhes do App Reserve:';
		document.getElementById('modal-conteudo-2').innerHTML  += '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-info"><th scope="col" class="text-white"><i class="fas fa-user-circle" title="Funcionário"></i></th><th scope="col" class="text-white"><i class="fas fa-user-tag" title="Versão"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Cadastro"></th><th scope="col" class="text-white"><i class="fab fa-github" title="GitHub"></i></th></tr></thead><tbody><tr><td>'+nome+'</td><td>'+versao+'</td><td>'+dataA+'<br>'+horaA+'</td><td><b><a href="https://github.com/JefersonLucas/reserve" target="_blank" title="Projeto">GitHub</a></b></td></tr></tbody></table>';
		document.getElementById('modal-botao-2').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-info';
	//
	}
//	MODAL CADASTRAR ALUNO
	let modalCadastarAlunoSucesso = function(nome, matricula, equipamento, serial, dataA, horaA) {
	//
		$('#modal1').modal('show');
		document.getElementById('modal-titulo-1').innerHTML 	= '<i class="fas fa-check-circle"></i> Sucesso!';
		document.getElementById('modal-documento-1').className	= 'modal-dialog border border-success rounded alert-success';
		document.getElementById('modal-cabecalho-1').className  = 'modal-header text-white bg-success';
		document.getElementById('modal-conteudo-1').innerHTML 	= 'A reserva do(a) aluno(a) <span class="text-success"><b>'+nome+'</b></span> foi cadadastrada com <span class="text-success"><b>sucesso!</b></span>'
		document.getElementById('modal-conteudo-1').innerHTML   += '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-success"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Data e hora"></i></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+matricula+'</th><td>'+equipamento+'</td><td>'+serial+'</td><td>'+dataA+'<br>'+horaA+'</td></tr></tbody></table>';
		document.getElementById('modal-botao-1').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-1').className 		= 'btn btn-outline-success';
	//
	}
//	MODAL CADASTRAR PROFESSOR
	let modalCadastarProfessorSucesso = function(nome, equipamento, status, sala, dataA, horaA, dataB, horaB) {
	//
		$('#modal1').modal('show');
		document.getElementById('modal-titulo-1').innerHTML 	= '<i class="fas fa-check-circle"></i> Sucesso!';
		document.getElementById('modal-documento-1').className	= 'modal-dialog border border-success rounded alert-success';
		document.getElementById('modal-cabecalho-1').className  = 'modal-header text-white bg-success';
		document.getElementById('modal-conteudo-1').innerHTML 	= 'A reserva do professor(a) <span class="text-success"><b>'+nome+'</b></span> foi cadastrada com <span class="text-success"><b>sucesso!</b></span><br>'
		document.getElementById('modal-conteudo-1').innerHTML  += '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-success"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário inicial"></i></tr></thead><tbody><tr><td>'+equipamento+'</td><td>'+sala+'</td><td>'+dataA+'<br>'+horaA+' / '+horaB+'</td></tr></tbody></table>';
		document.getElementById('modal-botao-1').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-1').className 		= 'btn btn-outline-success';
	//
	}
//	MODAL CADASTRAR FUNCIONÁRIO
	let modalCadastarFuncionarioSucesso = function(nome) {
	//
		$('#modal2').modal('show');
		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fas fa-user-circle"></i> '+nome+' seja bem vindo(a)!';
		document.getElementById('modal-documento-2').className	= 'modal-dialog border border-info rounded alert-info';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-info';
		document.getElementById('modal-conteudo-2').innerHTML 	= 'O App Reserve está atualizado com novas funcionalidades para a reserva dos equipamentos. Você pode obter mais informações vendo nesse <a href="https://github.com/JefersonLucas/reserve#changelog--versões" target="_blank">link</a> aqui.';
		document.getElementById('modal-botao-2').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-info';
	//
	} 
//	MODAL DE ERRO DE CADASTRO
	function modalCadastroErro() {
	//
		$('#modal2').modal('show');		
		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fas fa-times-circle"></i> Erro!';
		document.getElementById('modal-documento-2').className	= 'modal-dialog border border-danger rounded alert-danger';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo-2').innerHTML	= 'Erro ao efetuar seu <span class="text-danger"><b>cadastro</b></span>. Por favor verifique se todos os campo foram inseridos corretamente.';
		document.getElementById('modal-botao-2').innerHTML		= 'Corrigir';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-danger';
	//
	}
//	MODAL DE ERRO DE PESQUISA
	function modalPesquisaErro() {
	//
		$('#modal2').modal('show');		
		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fas fa-times-circle"></i> Erro!';
		document.getElementById('modal-documento-2').className	= 'modal-dialog border border-danger rounded alert-danger';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo-2').innerHTML	= 'Erro ao efetuar sua <span class="text-danger"><b>pesquisa</b></span>. Por favor verifique se todos os campo foram inseridos corretamente.';
		document.getElementById('modal-botao-2').innerHTML		= 'Corrigir';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-danger';
	//
	}
//	MODAL DE VIZUALIÇÃO ALUNO
	let modalVizualizarAluno = function(nome, equipamento, corStatus, matricula, serial, dataA, horaA, dataB, horaB,  horac) {
	//
 		$('#modal2').modal('show');
 		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fas fa-eye"></i> Informações';
		document.getElementById('modal-documento-2').className	= 'modal-dialog modal-lg border border-info rounded alert-info';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-info';
		document.getElementById('modal-conteudo-2').innerHTML 	= 'Detalhes da reserva do(a) aluno(a) <span class="text-info"><b>'+nome+'</b></span>:';
		document.getElementById('modal-conteudo-2').innerHTML  += '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-info"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário inicial"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário final"></i></th><th class="text-white" title="Status"><i class="fas fa-clipboard-check" title="Status"></i></th></tr></thead><tbody><tr><td>'+matricula+'</td><td>'+equipamento+'</td><td>'+serial+'</td><td>'+dataA+'<br>'+horaA+'</td><td>'+dataB+'<br>'+horaB+' / '+horac+'</td><td>'+corStatus+'</td></tr></tbody></table>';
		document.getElementById('modal-botao-2').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-info';
	//
	}
//	MODAL DE VIZUALIÇÃO PROFESSOR
	let modalVizualizarProfessor = function(nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {		
 	//
 		$('#modal2').modal('show');
		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fas fa-eye"></i> Informações';
		document.getElementById('modal-documento-2').className	= 'modal-dialog modal-lg border border-info rounded alert-info';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-info';
		document.getElementById('modal-conteudo-2').innerHTML 	= 'Detalhes da reserva do(a) professor(a) <span class="text-info"><b>'+nome+'</b></span>:';
		document.getElementById('modal-conteudo-2').innerHTML  += '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-info"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário inicial"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário final"></i></th><th class="text-white" title="Status"><i class="fas fa-clipboard-check" title="Status"></i></th></tr></thead><tbody><tr><td>'+equipamento+'</td><td>'+sala+'</td><td>'+dataA+'<br>'+horaA+' / '+horaB+'</td><td>'+dataB+'<br>'+horaC+' / '+horaD+'</td><td>'+status+'</td></tr></tbody></table>';
		document.getElementById('modal-botao-2').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-info';
	//
	}
//
	let modalEditarAlunoA = function(nome, equipamento, matricula, serial, dataA, horaA) {
	//
 		$('#modal1').modal('show');
 		document.getElementById('modal-titulo-1').innerHTML 	= '<i class="fas fa-pencil-alt"></i> Editar';
		document.getElementById('modal-documento-1').className	= 'modal-dialog border border-success rounded alert-success';
		document.getElementById('modal-cabecalho-1').className  = 'modal-header text-white bg-success';
		document.getElementById('modal-conteudo-1').innerHTML 	= 'A reserva do(a) aluno(a) <span class="text-success"><b>'+nome+'</b></span> foi alterada com <span class="text-success"><b>sucesso!</b></span>';
		document.getElementById('modal-conteudo-1').innerHTML   += '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-success"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Data e hora"></i></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+matricula+'</th><td>'+equipamento+'</td><td>'+serial+'</td><td>'+dataA+'<br>'+horaA+'</td></tr></tbody></table>';
		document.getElementById('modal-botao-1').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-1').className 		= 'btn btn-outline-success';
	//
	}
//	MODAL DE ERRO DE CADASTRO
	let  modalEditarAlunoB = function(nome) {
	//
		$('#modal2').modal('show');		
		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fas fa-times-circle"></i> Erro!';
		document.getElementById('modal-documento-2').className	= 'modal-dialog border border-danger rounded alert-danger';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo-2').innerHTML	= 'Você não pode alterar a reserva do(a) aluno(a) <span class="text-danger"><b>'+nome+'</b></span>.';
		document.getElementById('modal-botao-2').innerHTML		= 'Voltar';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-danger';
	//
	}
//
	let modalEditarProfessorA = function(nome, equipamento, sala, dataA, horaA, horaB) {
	//
 		$('#modal1').modal('show');
 		document.getElementById('modal-titulo-1').innerHTML 	= '<i class="fas fa-pencil-alt"></i> Editar';
		document.getElementById('modal-documento-1').className	= 'modal-dialog border border-success rounded alert-success';
		document.getElementById('modal-cabecalho-1').className  = 'modal-header text-white bg-success';
		document.getElementById('modal-conteudo-1').innerHTML 	= 'A reserva do(a) professor(a) <span class="text-success"><b>'+nome+'</b></span> foi alterada com <span class="text-success"><b>sucesso!</b></span>';
		document.getElementById('modal-conteudo-1').innerHTML  += '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-success"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário inicial"></i></th></tr></thead><tbody><tr><td>'+equipamento+'</td><td>'+sala+'</td><td>'+dataA+'<br>'+horaA+' / '+horaB+'</td></tr></tbody></table>';
		document.getElementById('modal-botao-1').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-1').className 		= 'btn btn-outline-success';
	//
	}
//	MODAL DE ERRO DE CADASTRO
	let  modalEditarProfessorB = function(nome) {
	//
		$('#modal2').modal('show');		
		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fas fa-times-circle"></i> Erro!';
		document.getElementById('modal-documento-2').className	= 'modal-dialog border border-danger rounded alert-danger';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo-2').innerHTML	= 'Você não pode alterar a reserva do(a) professor(a) <span class="text-danger"><b>'+nome+'</b></span>.';
		document.getElementById('modal-botao-2').innerHTML		= 'Voltar';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-danger';
	//
	}
//
	let modalExcluirAluno = function(nome, matricula, equipamento, serial, status, dataEUA, horaA, dataB, horaB, horaC) {
	//
	 	$('#modal1').modal('show');
 		document.getElementById('modal-titulo-1').innerHTML 	= '<i class="fa fa-trash-alt"></i> Excluir';
		document.getElementById('modal-documento-1').className	= 'modal-dialog modal-lg border border-danger rounded alert-danger';
		document.getElementById('modal-cabecalho-1').className  = 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo-1').innerHTML 	= 'A reserva do(a) aluno(a) <span class="text-danger"><b>'+nome+'</b></span> irá ser <span class="text-danger"><b>excluida!</b></span>';
		document.getElementById('modal-conteudo-1').innerHTML  += '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-danger"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário inicial"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário final"></i></th><th class="text-white" title="Status"><i class="fas fa-clipboard-check" title="Status"></i></th></tr></thead><tbody><tr><td>'+matricula+'</td><td>'+equipamento+'</td><td>'+serial+'</td><td>'+dataEUA+'<br>'+horaA+'</td><td>'+dataB+'<br>'+horaB+' / '+horaC+'</td><td>'+status+'</td></tr></tbody></table>';
		document.getElementById('modal-botao-1').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-1').className 		= 'btn btn-outline-danger';
	//
	}
//	
	let modalExcluirProfessor = function(nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {
	//
	 	$('#modal1').modal('show');
 		document.getElementById('modal-titulo-1').innerHTML 	= '<i class="fa fa-trash-alt"></i> Excluir';
		document.getElementById('modal-documento-1').className	= 'modal-dialog modal-lg border border-danger rounded alert-danger';
		document.getElementById('modal-cabecalho-1').className  = 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo-1').innerHTML 	= 'A reserva do(a) professor(a) <span class="text-danger"><b>'+nome+'</b></span> irá ser <span class="text-danger"><b>excluida!</b></span>';
		document.getElementById('modal-conteudo-1').innerHTML  += '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-danger"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário inicial"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário final"></i></th><th class="text-white" title="Status"><i class="fas fa-clipboard-check" title="Status"></i></th></tr></thead><tbody><tr><td>'+equipamento+'</td><td>'+sala+'</td><td>'+dataA+'<br>'+horaA+' / '+horaB+'</td><td>'+dataB+'<br>'+horaC+' / '+horaD+'</td><td>'+status+'</td></tr></tbody></table>';
		document.getElementById('modal-botao-1').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-1').className 		= 'btn btn-outline-danger';
	//
	}
//
	let modalVerificaReservaAluno = function(nome, equipamento, status, matricula, serial, dataA, horaA, dataB, horaB, horaC) {
	//
 		$('#modal1').modal('show');
 		document.getElementById('modal-titulo-1').innerHTML 	= '<i class="fas fa-user-check"></i> Verificada';
		document.getElementById('modal-documento-1').className	= 'modal-dialog modal-lg border border-primary rounded alert-primary';
		document.getElementById('modal-cabecalho-1').className  = 'modal-header text-white bg-primary';
		document.getElementById('modal-conteudo-1').innerHTML 	= 'A reserva do(a) aluno(a) <span class="text-primary"><b>'+nome+'</b></span> foi <span class="text-primary"><b>verificada!</b></span>';
		document.getElementById('modal-conteudo-1').innerHTML  += '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-primary"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário inicial"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário final"></i></th><th class="text-white" title="Status"><i class="fas fa-clipboard-check" title="Status"></i></th></tr></thead><tbody><tr><td>'+matricula+'</td><td>'+equipamento+'</td><td>'+serial+'</td><td>'+dataA+'<br>'+horaA+'</td><td>'+dataB+'<br>'+horaB+' / '+horaC+'</td><td>'+status+'</td></tr></tbody></table>';
		document.getElementById('modal-botao-1').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-1').className 		= 'btn btn-outline-primary';
	//
	}
//
	let modalVerificaReservaAlunoErro = function(nome, equipamento, status, matricula, serial, dataA, horaA, dataB, horaB) {
	//
 		$('#modal1').modal('show');
 		document.getElementById('modal-titulo-1').innerHTML 	= '<i class="fas fa-user-check"></i> Verificada';
		document.getElementById('modal-documento-1').className	= 'modal-dialog modal-lg border border-danger rounded alert-danger';
		document.getElementById('modal-cabecalho-1').className  = 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo-1').innerHTML 	= 'A reserva do(a) aluno(a) <span class="text-danger"><b>'+nome+'</b></span> já foi <span class="text-danger"><b>recolhida!</b></span>';
		document.getElementById('modal-conteudo-1').innerHTML  += '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-danger"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário inicial"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário final"></i></th><th class="text-white" title="Status"><i class="fas fa-clipboard-check" title="Status"></i></th></tr></thead><tbody><tr><td>'+matricula+'</td><td>'+equipamento+'</td><td>'+serial+'</td><td>'+dataA+'<br>'+horaA+'</td><td>'+dataB+'<br>'+horaB+'</td><td>'+status+'</td></tr></tbody></table>';
		document.getElementById('modal-botao-1').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-1').className 		= 'btn btn-outline-danger';
	//
	}
//
	let modalVerificaReservaProfessor = function(nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {
	//
 		$('#modal1').modal('show');
 		document.getElementById('modal-titulo-1').innerHTML 	= '<i class="fas fa-user-check"></i> Verificada';
		document.getElementById('modal-documento-1').className	= 'modal-dialog modal-lg border border-info rounded alert-info';
		document.getElementById('modal-cabecalho-1').className  = 'modal-header text-white bg-info';
		document.getElementById('modal-conteudo-1').innerHTML 	= 'A reserva do(a) aluno(a) <span class="text-info"><b>'+nome+'</b></span> foi <span class="text-info"><b>verificada!</b></span>';
		document.getElementById('modal-conteudo-1').innerHTML  += '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-info"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário inicial"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário final"></i></th><th class="text-white" title="Status"><i class="fas fa-clipboard-check" title="Status"></i></th></tr></thead><tbody><tr><td>'+equipamento+'</td><td>'+sala+'</td><td>'+dataA+'<br>'+horaA+' / '+horaB+'</td><td>'+dataB+'<br>'+horaC+' / '+horaD+'</td><td>'+status+'</td></tr></tbody></table>';
		document.getElementById('modal-botao-1').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-1').className 		= 'btn btn-outline-info';
	//
	}
//
	let modalVerificaReservaProfessorErro = function(nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {
	//
 		$('#modal2').modal('show');
 		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fas fa-user-check"></i> Verificada';
		document.getElementById('modal-documento-2').className	= 'modal-dialog modal-lg border border-danger rounded alert-danger';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo-2').innerHTML 	= 'A reserva do(a) aluno(a) <span class="text-danger"><b>'+nome+'</b></span> já foi <span class="text-danger"><b>recolhida!</b></span>';
		document.getElementById('modal-conteudo-2').innerHTML  += '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-danger"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário inicial"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário final"></i></th><th class="text-white" title="Status"><i class="fas fa-clipboard-check" title="Status"></i></th></tr></thead><tbody><tr><td>'+equipamento+'</td><td>'+sala+'</td><td>'+dataA+'<br>'+horaA+' / '+horaB+'</td><td>'+dataB+'<br>'+horaC+' / '+horaD+'</td><td>'+status+'</td></tr></tbody></table>';
		document.getElementById('modal-botao-2').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-danger';
	//
	}
//
	let modalAlertaReservaA = function(nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {
	//
		$('#modal1').modal('show');
		document.getElementById('modal-titulo-1').innerHTML 	= '<i class="fas fa-bell" title="Alerta"></i> Atenção!';
		document.getElementById('modal-documento-1').className  = 'modal-dialog border border-warning rounded alert-warning';
		document.getElementById('modal-cabecalho-1').className  = 'modal-header text-white bg-warning';
		document.getElementById('modal-conteudo-1').innerHTML 	= 'A reserva do(a) professor(a) <span class="text-warning"><b>'+nome+'</b></span> já está pra <span class="text-warning"><b>iniciar!</b></span>';
		document.getElementById('modal-conteudo-1').innerHTML  += '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-warning"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário"></i></th><th class="text-white" title="Status"><i class="fas fa-clipboard-check" title="Status"></i></th></tr></thead><tbody><tr><td>'+equipamento+'</td><td>'+sala+'</td><td>'+dataA+'<br>'+horaA+' / '+horaB+'</td><td>'+status+'</td></tr></tbody></table>';
		document.getElementById('modal-botao-1').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-1').className 		= 'btn btn-outline-warning';
	//
	}
//
//
	let modalAlertaReservaB = function(nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {
	//
		$('#modal1').modal('show');
		document.getElementById('modal-titulo-1').innerHTML 	= '<i class="fas fa-bell" title="Alerta"></i> Atenção!';
		document.getElementById('modal-documento-1').className  = 'modal-dialog border border-warning rounded alert-warning';
		document.getElementById('modal-cabecalho-1').className  = 'modal-header text-white bg-warning';
		document.getElementById('modal-conteudo-1').innerHTML 	= 'A reserva do(a) professor(a) <span class="text-warning"><b>'+nome+'</b></span> já está pra <span class="text-warning"><b>acabar!</b></span>';
		document.getElementById('modal-conteudo-1').innerHTML  += '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-warning"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário"></i></th><th class="text-white" title="Status"><i class="fas fa-clipboard-check" title="Status"></i></th></tr></thead><tbody><tr><td>'+equipamento+'</td><td>'+sala+'</td><td>'+dataA+'<br>'+horaA+' / '+horaB+'</td><td>'+status+'</td></tr></tbody></table>';
		document.getElementById('modal-botao-1').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-1').className 		= 'btn btn-outline-warning';
	//
	}
//
//	ALERTA
	let alerta = function() { setInterval(alertarReserva, 15000); }
//	FUNÇÃO ALERTA DE RESERVA 
	function alertarReserva() {
		
		reservas = bancodedados.recuperaReservaProfessor();

		reservas.forEach(function(p) {
		//	INSTÂNCIA DO TEMPO
			let time = new Date();
		//
		//	HORA
			let horas 	= time.getHours();
			let minutos = time.getMinutes();
		//	AJUSTE DE HORAs
			minutos = minutos 	< 10 ? minutos 	= "0"+minutos 	: minutos;
			horas 	= horas 	< 10 ? horas 	= "0"+horas 	: horas;
		//	HORA
			let hora = horas+":"+minutos;
		//
		//	DATA
			let ano = time.getFullYear();
			let mes = time.getMonth() + 1;
			let dia = time.getDate();
		//	AJUSTE DA DATA
			dia = dia < 10 ? dia = "0"+dia : dia;
			mes = mes < 10 ? mes = "0"+mes : mes;
		//	DATA
			let data = dia+"/"+mes+"/"+ano;
		//
		//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
			let diaA = p.dataA.substr(8,2);
			let mesA = "/"+p.dataA.substr(5,2);
			let anoA = "/"+p.dataA.substr(0,4);
			dataA = diaA+mesA+anoA;
		//	SE A DATA DA RESERVA FOR IGUAL A DATA ATUAL
			if(dataA == data) {
			//	SE O STATUS FOR AGURARDANDO
				if(p.status == "Aguardando") {
				//	SE A HORA DE MONTAGEM FOR IGUAL A DO hora
					if(hora >= p.horaA){
					//
						let nome 		= p.nome;
						let equipamento = p.equipamento;
						let status 		= "Em uso";
						let sala 		= p.sala;
						let dataA 		= p.dataA;
						let horaA 		= p.horaA;
						let horaB 		= p.horaB;
						let dataB 		= retornaData();
						let horaC 		= retornaHora();
						let horaD 		= p.horaD;
					//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
						let diaA = p.dataA.substr(8,2);
						let mesA = "/"+p.dataA.substr(5,2);
						let anoA = "/"+p.dataA.substr(0,4);
						dataA = diaA+mesA+anoA;
					//	COR DO STATUS
						let corStatus;
					//
						if(p.status == "Aguardando") {
							corStatus = '<span class="text-danger"><b>'+p.status+'</b></span>';
						} else if(p.status == "Em uso") {
							corStatus = '<span class="text-success"><b>'+p.status+'</b></span>';
						} else if(p.status == "Retirado"){
							corStatus = '<span class="text-primary"><b>'+p.status+'</b></span>';
						}
					//	ALERTA DE RESERVA
						modalAlertaReservaA(nome, equipamento, corStatus, sala, dataA, horaA, dataB, horaB, horaC, horaD);
					//
					}
				}
			//	SE O STATUS FOR Em uso
				if(p.status == "Em uso") {
				//	SE A HORA DE RETIRADA FOR IGUAL A DO TEMPO
					if(hora >= p.horaB){
					//
						let nome 		= p.nome;
						let equipamento = p.equipamento;
						let status 		= "Retirado";
						let sala 		= p.sala;
						let horaA 		= p.horaA;
						let dataB 		= p.dataB;
						let horaB 		= p.horaB;
						let horaC 		= p.horaC;
						let horaD 		= retornaHora();
					//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
						let diaA = p.dataA.substr(8,2);
						let mesA = "/"+p.dataA.substr(5,2);
						let anoA = "/"+p.dataA.substr(0,4);
						dataA = diaA+mesA+anoA;
					//	COR DO STATUS
						let corStatus;
					//
						if(p.status == "Aguardando") {
							corStatus = '<span class="text-danger"><b>'+p.status+'</b></span>';
						} else if(p.status == "Em uso") {
							corStatus = '<span class="text-success"><b>'+p.status+'</b></span>';
						} else if(p.status == "Retirado"){
							corStatus = '<span class="text-primary"><b>'+p.status+'</b></span>';
						}
					//	ALERTA DE RESERVA
						modalAlertaReservaB(nome, equipamento, corStatus, sala, dataA, horaA, dataB, horaB, horaC, horaD);
					//
					}
				//
				}
			//
			}
		//
		})
	//
	}
//
//	2.9.0 - RELÓGIO
	let relogio = function() {
		setInterval(calendario, 100);
	}
//
//	2.10.0 - CALENDÁRIO
	function calendario() {
	//
	//	INSTÂNCIA DATA
		let time = new Date();
	//	DATA
		let ano = time.getFullYear();
		let mes = time.getMonth() + 1;
		let dia = time.getDate();
	//	AJUSTE NA DATA
		mes = mes < 10 ? mes = "0"+mes : mes;
		dia = dia < 10 ? dia = "0"+dia : dia;
	//
		let data = dia+"/"+mes+"/"+ano;
	//
	//	HORA
		let horas = time.getHours();
		let minutos = time.getMinutes();
		let segundos = time.getSeconds();
	//	AJUSTE NA HORAs
		horas 	 = horas 	< 10 ? horas 	= "0"+horas 	: horas;
		minutos  = minutos 	< 10 ? minutos 	= "0"+minutos 	: minutos;
		segundos = segundos < 10 ? segundos = "0"+segundos 	: segundos;
	//	
		let hora = horas+":"+minutos+":"+segundos;
	//
	//	MENSAGEM
		let mensagem = null;
	//
		mensagem = horas >= "06" && horas <= "12" ? mensagem = "<i class='fas fa-sun'></i> Bom dia! " 	: mensagem; 
		mensagem = horas >= "12" && horas <= "18" ? mensagem = "<i class='fas fa-sun'></i> Boa tarde! "	: mensagem;	
		mensagem = horas >= "18" || horas <= "06" ? mensagem = "<i class='fas fa-moon'></i> Boa noite! ": mensagem;
	//
		document.getElementById("tempo").innerHTML = mensagem+"hoje é "+data+" e são "+hora+" |";
	//
	}
//
//	RETORNA A DATA ATUAL
    let retornaData = function() {
	//
	//	INSTÂNCIA DATA
		let time = new Date();
	//	DATA
		let ano = time.getFullYear();
		let mes = time.getMonth() + 1;
		let dia = time.getDate();
	//	AJUSTE NA DATA
		mes = mes < 10 ? mes = "0"+mes : mes;
		dia = dia < 10 ? dia = "0"+dia : dia;
	//	DATA NO FORMATO EUA
		let data = ano+"-"+mes+"-"+dia;
	//
		return data;
	//
    }
//
//	RETORNA A HORA ATUAL
    let retornaHora = function() {
    //	INSTÂNCIA DATA
		let time = new Date();
    //	HORA
		let horas 	 = time.getHours();
		let minutos  = time.getMinutes();
		let segundos = time.getSeconds();
	//	AJUSTE NA HORAs
		horas 	 = horas 	< 10 ? horas 	= "0"+horas 	: horas;
		minutos  = minutos 	< 10 ? minutos 	= "0"+minutos 	: minutos;
		segundos = segundos < 10 ? segundos = "0"+segundos 	: segundos;
	//	
		let hora = horas+":"+minutos+":"+segundos;
	//
		return hora;
	//
    }
//
//	INFORMAÇÃO DO APP
	function informacaoApp() {
	//	ARRAY FUNCIONÁRIO
		let funcionario = Array();
	//	SETANDO O VALOR DO ARRAY NA VARIÁVEL
		funcionario = bancodedados.recuperaFuncionario();
	//	LISTANTO A RESERVA
 		funcionario.forEach(function(f) {
 		//	MODAL DE VIZUALIÇÃO
 			modalInformacaoApp(f.nome, f.versao, f.dataA, f.horaA);
		//
		})
	//
	}
//	
//	2.7.0 - IMPRIME AS RESERVAS
	function imprimir() {
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
//	2.6.0 - ATUALIZA A PÁGINA
 	function atualizar() {
 	//	ATUALIZA A PÁGINA
 		window.location.reload();
	}
//
//=============================================================||
//=============================================================||
//	3 - FUNÇÕES BOOTSTRAP
//
//	3.1.0 - POPOVER
	$(function () {
  		$('[data-toggle="popover"]').popover();
	})
//
//	3.2.0 - TOOLTIP
	$(function () {
  		$('[data-toggle="tooltip"]').tooltip();
	})
//==============================================================||
//==============================================================||