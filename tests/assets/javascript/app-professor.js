//==============================================================||
//	AUTOR: JEFERSON LUCAS
//	DATA DE CRIAÇÃO: 17/06/2018
//  DATA DE MODIFICAÇÃO: 03/07/2018
//  VERSÃO: 1.5.0-BETA
//	DESCRIÇÃO: CORE PARA CADASTRO/CONSULTA/FILTRO/VISUALIZAÇÃO
//	/EDIÇÃO E EXCLUSÃO DE RESERVAS DE PROFESSORES
//==============================================================||
//==============================================================||
//	1 - CLASSES DO APP
//
//	1.1 - RESERVA
//
	class ReservaProfessor {

	//	DEFINIÇÃO DOS VALORES NO CONSTRUCTOR
		constructor(professor, equipamento, sala, horaA, horaB, dataEUA){
		//	INSTANCIAÇÃO DO OBJETO RESERVA
			this.professor 		= professor;
			this.equipamento 	= equipamento;
			this.sala 			= sala;
			this.horaA 			= horaA;
			this.horaB 			= horaB;
			this.dataEUA 		= dataEUA;
		}
	//	MÉTODO VALIDAÇÃO DOS DADOS
		validarDadosProfessor() {
		//	METÓDO FOR PARA RECUPERAR OS VALORES E SETAR EM UMA VARIÁVEL
			for(let i in this) {
			//	VERIFICA SE O VALOR É INDEFINIDO/VAZIO/NULO
				if(this[i] == undefined ||  this[i] == "" || this[i] == null) {
				//	SE O VALOR FOR INDEFINIDO/VAZIO/NULO RETORNA FALSO
					return false;
				} 
			}
		//	RETORNA VERDADEIRO CASO OS DADOS FOR VÁLIDOS
			return true;
		}
	}
//
//	1.2 - BANCO DE DADOS
//
	class BancodeDadosProfessor {
	//	MÉTODO CONSTRUCTOR RECEBE O ID
		constructor(){
		//	RECEBE O ID E SETA EM UMA VARIÁVEL
			let id = localStorage.getItem("idProfessor");
		//	SE O ID FOR NULL ELE RECEBERÁ 0
			if (id === null) {
				localStorage.setItem("idProfessor", 0);
			}
		}
	//	MÉTODO VERIFICA SE JÁ EXISTE UM ID
		getProximoId(){
		//	RECUPERA O ITEM NO LOCALSTORAGE
			let proximoId = localStorage.getItem("idProfessor");
		//	RETORNA O ID CONVERTIDO PARA INTEIRO E RECEBE + 1 
			let idProfessor = localStorage.getItem("idProfessor");
			let idAluno = localStorage.getItem("idAluno");

			console.log(idProfessor);
			console.log(idAluno);
			console.log(proximoId);

			
			for (idProfessor = 1; idProfessor != idAluno ; idProfessor++){
				
				console.log(idProfessor);
				console.log(idAluno);
				console.log(proximoId);

				return parseInt(proximoId) + idProfessor; 
			}
				console.log(idProfessor);
				console.log(idAluno);
				console.log(proximoId);
		}
	//	MÉTODO GRAVAR REGISTROS NO LOCALSTRORAGE 
		gravarProfessor(p){
		//	VALOR DA REFERÊNCIAÇÃO DO getProximoId ATRIBUÍDO A UMA VARIÁVEL ID
			let id = this.getProximoId();
		//
		//	CONVERTE VALORES E SETA PARA O LOCALSTRORAGE 
			localStorage.setItem(id, JSON.stringify(p));
		//
		//	ATUALIZA O ID COM A INFORMAÇÃO DO NOVO ID DA FUNÇÃO getProximoId()
			localStorage.setItem("idProfessor", id);
		}		
	//	MÉTODO RECUPERA OS REGISTROS NO LOCALSTORAGE
		recuperaTodosRegistrosProfessores() {
		//	ARRAY DE RESERVAS
			let reservas = Array();
		//
		//	RECUPERA O ID ATUAL E SETE EM UMA VARIÁVEL
			let id = localStorage.getItem("idProfessor");
		//
		//	RECUPERA TODAS AS RESERVAS EM LOCALSTORAGE
			for(let i = 1; i <= id; i ++) {
			//	RECUPERAR A RESERVA
				let reserva = JSON.parse(localStorage.getItem(i));
			//
			//	VERIFICA SE ALGUMA RESERVA É NULA
				if(reserva === null) {
				//	SE A RESERVA FOR NULA CONTINUA O LAÇO
					continue;
				}
			//	A RESERVA RECEBE UM ID
				reserva.id = i;
			//	PUSH DO ARRAY RESERVA
				reservas.push(reserva);
			}
		//	RETORNA O ARRAY RESERVA
			return reservas;
		}
	//	MÉTODO PESQUISA E FILTRA OS DADOS DA RESERVA
		pesquisarProfessor(reserva) {
		//	VARIÁVEL ARRAY
			let reservasFiltradas = Array();
		//	VARIÁVEL RECEBE O MÉTODO DE RECUPERAR TODOS OS REGISTROS
			reservasFiltradas = this.recuperaTodosRegistrosProfessores();
		//
		//	FILTRO PROFESSOR
			if(reserva.professor != "") {
				reservasFiltradas = reservasFiltradas.filter(p => p.professor == reserva.professor);
			}
		//	FILTRO EQUIPAMENTO
			if(reserva.equipamento != "") {
				reservasFiltradas = reservasFiltradas.filter(p => p.equipamento == reserva.equipamento);
			}		
		//	FILTRO SALA
			if(reserva.sala != "") {
				reservasFiltradas = reservasFiltradas.filter(p => p.sala == reserva.sala);
			}		
		//	FILTRO INICIO
			if(reserva.horaA != "") {
				reservasFiltradas = reservasFiltradas.filter(p => p.horaA == reserva.horaA);
			}
		//	FILTRO FIM
			if(reserva.horaB != "") {
				reservasFiltradas = reservasFiltradas.filter(p => p.horaB == reserva.horaB);
			}
		//	FILTRO DIA
			if(reserva.dataEUA != "") {
				reservasFiltradas = reservasFiltradas.filter(p => p.dataEUA == reserva.dataEUA);
			}
		//	RETORVA O FILTRO
			return reservasFiltradas;
		}
	//	MÉTODO REMOVER RESERVAS
		removerProfessor(id) {
			localStorage.removeItem(id);
		}
//		
	}
//
//
//==============================================================||
//==============================================================||
//	INSTÂCIA GLOBAL BANCODEDADOS ATRIBUIDA EM UMA VARIÁVEL
//
	let bancodedados = new BancodeDadosProfessor();
//
//==============================================================||
//==============================================================||
//	2 - FUNÇÕES DO APP DO PROFESSOR
//
//	2.1 - CADASTRA A RESERVA DO PROFESSOR
//
	function cadastrarReservaProfessor() {
	//
	//	RECUPERA OS VALORES A PARTIR DO ID E REFERENCIA EM UMA VARIÁVEL
		let professor 	= document.getElementById("professor");
		let equipamento = document.getElementById("equipamento");
		let sala 		= document.getElementById("sala");
		let horaA 		= document.getElementById("horaA");
		let horaB 		= document.getElementById("horaB");
		let dataEUA		= document.getElementById("data");
	//
	//	CRIAÇÃO DE UMA INSTÂCIA RESERVA ATRIBUIDA EM UMA VARIÁVEL
	//	PARÂMETROS DA RESERVA
		let reserva = new ReservaProfessor(professor.value, equipamento.value, sala.value, horaA.value, horaB.value, dataEUA.value);
	//

		console.log(reserva)
	//	VERIFICAÇÃO DA VALIDAÇÃO DOS DADOS
		if(reserva.validarDadosProfessor()) {
		//	DIALOG DE SUCESSO
		//
		// 	GRAVA AS INFORMAÇÕES DA RESERVA NA CLASSE BANCODEDADOS
			bancodedados.gravarProfessor(reserva);
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
			document.getElementById('modal_conteudo_success').innerHTML 	= 'A reserva do professor(a) <span class="text-success"><b>'+reserva.professor+'</b></span> foi cadastrada com <span class="text-success"><b>sucesso!</b></span><br>'
			document.getElementById('modal_conteudo_success').innerHTML	   += '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Equipamento</th><th scope="col">Local</th><th scope="col">Horário</th><th scope="col">Data</th></tr></thead><tbody><tr><th class="font-weight-normal">'+reserva.equipamento+'</th><td>'+reserva.sala+'</td><td>'+reserva.horaA+'/'+reserva.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
			document.getElementById('modal_btn_success').innerHTML 			= 'Voltar';
			document.getElementById('modal_btn_success').className 			= 'btn btn-outline-success';
		//
		//	ZERA OS VALORES
			professor.value 	= "";
			equipamento.value 	= "";
			sala.value 			= "";
			horaA.value 		= "";
			horaB.value 		= "";
			dataEUA.value 		= "";

		//
			$('#modalCadastraReservaSucesso').modal('show');
		//
		} else {
		//	DIALOG DE ERRO
			document.getElementById('modal_titulo_erro').innerHTML 		= '<i class="fas fa-times-circle"></i> Erro!';
			document.getElementById('modal_titulo_div_erro').className  = 'modal-header text-white bg-danger';
			document.getElementById('modal_conteudo_erro').innerHTML 	= 'Erro ao efetuar seu <span class="text-danger"><b>cadastro</b></span>. Por favor verifique se todos os campo foram inseridos corretamente.';
			document.getElementById('modal_btn_erro').innerHTML 		= 'Corrigir';
			document.getElementById('modal_btn_erro').className 		= 'btn btn-outline-danger';
		//
			$('#modalCadastraReservaErro').modal('show');
		}
		//
//
	}
//
//	2.2 - CARREGA A LISTA DE CONSULTA
//
	function carregaListaReservasProfessor() {
	//	DECLARAÇÃO DO ARRAY RESERVAS
		let reservas = Array();
	//	SETANDO O VALOR DO ARRAY NA VARIÁVEL
		reservas = bancodedados.recuperaTodosRegistrosProfessores();
	//	SELECIONANDO O ELEMENTO TBODY
		let listaReservas = document.getElementById("listaConsultas");
	//
	//	LISTANTO A RESERVA
 		reservas.forEach(function(p) {
 	//
 	//	CRIANDO A LINHA (TR)
 		let linha =	listaReservas.insertRow();
 	//
 	//	CRIAR AS COLUNAS (TD)
 		linha.insertCell(0).innerHTML = p.professor;
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
 	//	CRIAÇÃO DO BOTAO DE VIZUALIZAÇÃO
 	//
 		let ver 		= document.createElement("button");
 		ver.className 	= 'btn btn-outline-primary btn-sm';
 		ver.title 		= 'Vizualizar';
 		ver.innerHTML	= '<i class="far fa-eye"></i>';
 		ver.id			= `id_reserva_${p.id}`;
 	//
 	//	QUANDO CLICAR NO BOTÃO OS DETALHES DA RESERVA SERÁ EXIBIDO E UM MODAL DE VIZUALIZAÇÃO VAI APARECER
 		ver.onclick = function () {
 		//	MODAL DE VIZUALIZAÇÃO
			$('#modalVizualizaReserva').modal('show');
		//
			document.getElementById('modal-titulo-ver').innerHTML 		= '<i class="fas fa-eye"></i> Informações';
			document.getElementById('modal-titulo-div-ver').className  	= 'modal-header text-white bg-primary';
			document.getElementById('modal-conteudo-ver').innerHTML 	= 'Detalhes da reserva do(a) professor(a) <span class="text-primary"><b>'+p.professor+'</b></span>';
			document.getElementById('modal-conteudo-ver').innerHTML   	+= '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Equipamento</th><th scope="col">Local</th><th scope="col">Horário</th><th scope="col">Data</th></tr></thead><tbody><tr><th class="font-weight-normal">'+p.equipamento+'</th><td>'+p.sala+'</td><td>'+p.horaA+'/'+p.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
			document.getElementById('modal-btn-ver').innerHTML 			= 'Voltar';
			document.getElementById('modal-btn-ver').className 			= 'btn btn-outline-primary';
		//
		}
		//
 	//
 	//	CRIAÇÃO DO BOTAO DE EDIÇÃO
 	//
 		let editar 			= document.createElement("button");
 		editar.className 	= 'btn btn-outline-success btn-sm';
 		editar.title 		= 'Editar';
 		editar.innerHTML	= '<i class="fas fa-pencil-alt"></i>';
 		editar.id			= `id_reserva_${p.id}`;
 	//
 	//	QUANDO CLICAR NO BOTÃO UMA VERIFICAÇÃO DA EDIÇÃO IRÁ APARECER
 		editar.onclick = function () {
 		//
		//	VARIÁVEL DE VERIFICAÇÃO
			let resposta = prompt("Deseja realmente EDITAR a reserva do(a) "+p.professor+"? R: Sim ou Não", "Não");
		//
		//	VALIDAÇÃO DA EDIÇÃO
			if (resposta == "sim"|| resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
			//
			//	NOVOS VALORES SÃO RECEBIDOS E O VALOR ATUAL É RECUPERADO NO INPUT
				let professor 	= prompt("Nome do Professor:",p.professor);
				let equipamento = prompt("Descrição do equipamento:",p.equipamento);
				let sala 		= prompt("Nome da sala:",p.sala);
				let horaA 		= prompt("Início da aula:",p.horaA);
				let horaB 		= prompt("Término da aula:",p.horaB);
				let dataBr 		= prompt("Dia da aula:",dataBR);
			//
			//	MODAL DE ALTERAÇÃO
				$('#modalAlteraReserva').modal('show');
			//
				document.getElementById('modal-titulo-alt').innerHTML 		= '<i class="fas fa-pencil-alt"></i> Editar';
				document.getElementById('modal-titulo-div-alt').className  	= 'modal-header text-white bg-success';
				document.getElementById('modal-dialog-alt').className  		= 'modal-dialog border border-success rounded alert-success';
				document.getElementById('modal-conteudo-alt').innerHTML 	= 'A reserva do(a) professor(a) <span class="text-success"><b>'+professor+'</b></span> foi alterada com <span class="text-success"><b>sucesso!</b></span>'
				document.getElementById('modal-conteudo-alt').innerHTML    += '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Equipamento</th><th scope="col">Local</th><th scope="col">Horário</th><th scope="col">Data</th></tr></thead><tbody><tr><th class="font-weight-normal">'+equipamento+'</th><td>'+sala+'</td><td>'+horaA+'/'+horaB+'</td><td>'+dataBr+'</td></tr></tbody>';
				document.getElementById('modal-btn-alt').innerHTML 			= 'Voltar';
				document.getElementById('modal-btn-alt').className 			= 'btn btn-outline-success';
			//
			//	FORMATAR O ID
				let id = this.id.replace('id_reserva_','');
			//	REMOVE A RESERVA
 				bancodedados.removerProfessor(id);
 			//
			//	CONVERSÃO DO CALENDÁRIO NO FORMATO BR PARA O EUA
				let anoEUA = dataBr.substr(6,4);
				let mesEUA = "-"+dataBr.substr(3,2);
				let diaEUA = "-"+dataBr.substr(0,2);
			//	VARIÁVEL DO CALENDÁRIO NO FORMATO EUA
				let dataEUA = anoEUA+mesEUA+diaEUA;
			//
			//	CRIAÇÃO DE UMA INSTÂCIA RESERVA ATRIBUIDA EM UMA VARIÁVEL
				let reserva = new ReservaProfessor(professor, equipamento, sala, horaA, horaB, dataEUA);
			//
			// 	GRAVA AS INFORMAÇÕES DA RESERVA NA CLASSE BANCODEDADOS
				bancodedados.gravarProfessor(reserva);
			//
			}
		//
		}
		//
 	//
 	//	CRIAÇÃO BOTAO DE EXCLUSÃO
 	//
 		let excluir 		= document.createElement("button");
 		excluir.className 	= 'btn btn-outline-danger btn-sm';
 		excluir.title 		= 'Excluir';
 		excluir.innerHTML 	= '<i class="fa fa-trash-alt"></i>';
 		excluir.id 			= `id_reserva_${p.id}`;
 	//
 	//	QUANDO CLICAR NO BOTÃO A RESERVA SERÁ EXIBIDO UM PRONPT DE VERIFICAÇÃO
 		excluir.onclick = function () {
 		//
		//	PRONPT DE VERIFICAÇÃO
			let resposta = prompt("Deseja realmente EXCLUIR a reserva do(a) "+p.professor+"? R: Sim ou Não", "Não");
		//	VALIDAÇÃO DE EXCLUSÃO
			if (resposta == "sim"|| resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
			//
			//	DIALOG DE EXCLUSÃO
				$('#modalAlteraReserva').modal('show');
			//
				document.getElementById('modal-titulo-alt').innerHTML 		= '<i class="fa fa-trash-alt"></i> Excluir';
				document.getElementById('modal-titulo-div-alt').className  	= 'modal-header text-white bg-danger';
				document.getElementById('modal-dialog-alt').className  		= 'modal-dialog border border-danger rounded alert-danger'
				document.getElementById('modal-conteudo-alt').innerHTML 	= 'A reserva do(a) professor(a) <span class="text-danger"><b>'+p.professor+'</b></span> irá ser <span class="text-danger"><b>excluida!</b></span>';
				document.getElementById('modal-conteudo-alt').innerHTML    += '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Equipamento</th><th scope="col">Local</th><th scope="col">Horário</th><th scope="col">Data</th></tr></thead><tbody><tr><th class="font-weight-normal">'+p.equipamento+'</th><td>'+p.sala+'</td><td>'+p.horaA+'/'+p.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
				document.getElementById('modal-btn-alt').innerHTML 			= 'Voltar';
				document.getElementById('modal-btn-alt').className 			= 'btn btn-outline-danger';
			//
			//	FORMATAR O ID
				let id = this.id.replace('id_reserva_','');
			//	REMOVE A RESERVA
 				bancodedados.removerProfessor(id);
 			//
				}
			//
			}
		//
	//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO EDIÇÃO E EXCLUSÃO
		linha.insertCell(5).append(ver," ", editar," ",excluir);
	//
 		})
	}
//
//	2.3 - FILTRAR RESERVAS
//
	function pesquisarReservaProfessor() {
	//	RECUPERANDO O VALOR DO CAMPOS
		let professor 	= document.getElementById("professor").value;
		let equipamento = document.getElementById("equipamento").value;
		let sala 		= document.getElementById("sala").value;
		let horaA 		= document.getElementById("horaA").value;
		let horaB 		= document.getElementById("horaB").value;
		let dataEUA 	= document.getElementById("data").value;
	//
	//	PASSANDO VALORES PARA VARIÁVEL
		let reserva = new ReservaProfessor(professor, equipamento, sala, horaA, horaB, dataEUA);
	//	RESULTADO DA PESQUISA DO FILTRO PASSADO PARA A VARIÁVEL
		let reservas = bancodedados.pesquisarProfessor(reserva);
	//	SELECIONANDO O ELEMENTO TBODY
		let listaReservas = document.getElementById("listaConsultas")
	//	LIMPANDO CONTEÚDO DA TABELA DE RESERVA
		listaReservas.innerHTML = ""
	//
	//	VALIDAÇÃO DE PESQUISA FILTRO
		if(professor == "" && equipamento  == "" && sala == "" && horaA == "" && horaB == "" && dataEUA == "") {
		//	DIALOG DE ERRO
			$('#modalValidaReserva').modal('show');
		//
			document.getElementById('modal_titulo').innerHTML 		= '<i class="fas fa-times-circle"></i> Erro!';
			document.getElementById('modal_titulo_div').className  	= 'modal-header text-white bg-danger';
			document.getElementById('modal_conteudo').innerHTML 	= 'Erro ao efetuar sua <span class="text-danger"><b>perquisa</b></span>. Por favor verifique se algum campo não foi inseridos corretamente.';
			document.getElementById('modal_btn').innerHTML 			= 'Corrigir';
			document.getElementById('modal_btn').className 			= 'btn btn-outline-danger';
		//
 		}
 	//
 		else {
 	//
 	//	LISTANTO A DESPESA 		
 		reservas.forEach(function(r) {
 	//
 	//	CRIANDO A LINHA (TR)
 		let linha =	listaReservas.insertRow();
 	//
 	//	CRIAR AS COLUNAS (TD)
 		linha.insertCell(0).innerHTML = r.professor;
 		linha.insertCell(1).innerHTML = r.equipamento;
 		linha.insertCell(2).innerHTML = r.sala;
 		linha.insertCell(3).innerHTML = r.horaA+"/"+r.horaB;
	//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
		let diaBR = r.dataEUA.substr(8,2);
		let mesBR = "/"+r.dataEUA.substr(5,2);
		let anoBR = "/"+r.dataEUA.substr(0,4);
	//	VARIÁVEL NO FORMATO BR		
		let dataBR = diaBR+mesBR+anoBR;
	//	DATA EXIBIDA NO FORMATO BR
 		linha.insertCell(4).innerHTML = dataBR;
 	//
 	//	CRIAÇÃO DO BOTAO DE VIZUALIZAÇÃO
 	//
 		let ver 		= document.createElement("button");
 		ver.className 	= 'btn btn-outline-primary btn-sm';
 		ver.title 		= 'Vizualizar';
 		ver.innerHTML	= '<i class="fas fa-eye"></i>';
 		ver.id			= `id_reserva_${r.id}`;
 	//
 	//	QUANDO CLICAR NO BOTÃO OS DETALHES DA RESERVA SERÁ EXIBIDO E UM MODAL DE VIZUALIZAÇÃO VAI APARECER
 		ver.onclick = function () {
 		//	DIALOG DE VIZUALIZAÇÃO
			$('#modalVizualizaReserva').modal('show');
		//
			document.getElementById('modal-titulo-ver').innerHTML 		= '<i class="fas fa-eye"></i> Informações';
			document.getElementById('modal-titulo-div-ver').className  	= 'modal-header text-white bg-primary';
			document.getElementById('modal-conteudo-ver').innerHTML 	= 'Detalhes da reserva do(a) professor(a) <span class="text-primary"><b>'+r.professor+'</b></span>';
			document.getElementById('modal-conteudo-ver').innerHTML    += '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Equipamento</th><th scope="col">Local</th><th scope="col">Horário</th><th scope="col">Data</th></tr></thead><tbody><tr><th class="font-weight-normal">'+r.equipamento+'</th><td>'+r.sala+'</td><td>'+r.horaA+'/'+r.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
			document.getElementById('modal-btn-ver').innerHTML 			= 'Voltar';
			document.getElementById('modal-btn-ver').className 			= 'btn btn-outline-primary';
		//
		}
		//
 	//
 	//	CRIAÇÃO DO BOTAO DE EDIÇÃO
 	//
 		let editar 			= document.createElement("button");
 		editar.className 	= 'btn btn-outline-success btn-sm';
 		editar.title 		= 'Editar';
 		editar.innerHTML	= '<i class="fas fa-pencil-alt"></i>';
 		editar.id			= `id_reserva_${r.id}`;
 	//
 	//	QUANDO CLICAR NO BOTÃO UM PROMPT DE VERIFICAÇÃO IRÁ APARECER
 		editar.onclick = function () {
 		//
		//	VARIÁVEL DE VERIFICAÇÃO
			let resposta = prompt("Deseja realmente EDITAR a reserva do(a) "+r.professor+"? R: Sim ou Não", "Não");
		//
		//	VALIDAÇÃO DA EDIÇÃO
			if (resposta == "sim"|| resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
			//
			//	NOVOS VALORES SÃO RECEBIDOS E O VALOR ATUAL É RECUPERADO NO INPUT
				let professor 	= prompt("Nome do Professor:",r.professor);
				let equipamento = prompt("Descrição do equipamento:",r.equipamento);
				let sala 		= prompt("Nome da sala:",r.sala);
				let horaA 		= prompt("Início da aula:",r.horaA);
				let horaB 		= prompt("Término da aula:",r.horaB);
				let dataBr 		= prompt("Dia da aula:",dataBR);
			//
			//	MODAL DE ALTERAÇÃO
				$('#modalAlteraReserva').modal('show');
			//
				document.getElementById('modal-titulo-alt').innerHTML 		= '<i class="fas fa-pencil-alt"></i> Editar';
				document.getElementById('modal-titulo-div-alt').className  	= 'modal-header text-white bg-success';
				document.getElementById('modal-dialog-alt').className  		= 'modal-dialog border border-success rounded alert-success';
				document.getElementById('modal-conteudo-alt').innerHTML 	= 'A reserva do(a) professor(a) <span class="text-success"><b>'+professor+'</b></span> foi alterada com <span class="text-success"><b>sucesso!</b></span>'
				document.getElementById('modal-conteudo-alt').innerHTML    += '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Equipamento</th><th scope="col">Local</th><th scope="col">Horário</th><th scope="col">Data</th></tr></thead><tbody><tr><th class="font-weight-normal">'+equipamento+'</th><td>'+sala+'</td><td>'+horaA+'/'+horaB+'</td><td>'+dataBr+'</td></tr></tbody>';
				document.getElementById('modal-btn-alt').innerHTML 			= 'Voltar';
				document.getElementById('modal-btn-alt').className 			= 'btn btn-outline-success';
			//
			//	FORMATAR O ID
				let id = this.id.replace('id_reserva_','');
			//	REMOVE A RESERVA
 				bancodedados.removerProfessor(id);
 			//
			//	CONVERSÃO DO CALENDÁRIO NO FORMATO BR PARA O EUA
				let anoEUA = dataBr.substr(6,4);
				let mesEUA = "-"+dataBr.substr(3,2);
				let diaEUA = "-"+dataBr.substr(0,2);
			//	VARIÁVEL DO CALENDÁRIO NO FORMATO EUA
				let dataEUA = anoEUA+mesEUA+diaEUA;
			//
			//	CRIAÇÃO DE UMA INSTÂCIA RESERVA ATRIBUIDA EM UMA VARIÁVEL
				let reserva = new ReservaProfessor(professor, equipamento, sala, horaA, horaB, dataEUA);
			//
			// 	GRAVA AS INFORMAÇÕES DA RESERVA NA CLASSE BANCODEDADOS
				bancodedados.gravarProfessor(reserva);
			//			
			}
		//
		}
		//
 	//
 	//	CRIAÇÃO BOTAO DE EXCLUSÃO
 	//
 		let excluir 		= document.createElement("button");
 		excluir.className 	= 'btn btn-outline-danger btn-sm';
 		excluir.title 		= 'Excluir';
 		excluir.innerHTML 	= '<i class="fa fa-trash-alt"></i>';
 		excluir.id 			= `id_reserva_${r.id}`;
 	//
 	//	QUANDO CLICAR NO BOTÃO UM PROMPT DE VERIFICAÇÃO SERÁ EXIBIDO
 		excluir.onclick = function () {
 		//
		//	PRONPT DE VERIFICAÇÃO
			let resposta = prompt("Deseja realmente EXCLUIR a reserva do(a) "+r.professor+"? R: Sim ou Não", "Não");
		//	VALIDAÇÃO DE EXCLUSÃO
			if (resposta == "sim"|| resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
			//
			//	DIALOG DE EXCLUSÃO
				$('#modalAlteraReserva').modal('show');
			//
				document.getElementById('modal-titulo-alt').innerHTML 		= '<i class="fa fa-trash-alt"></i> Excluir';
				document.getElementById('modal-titulo-div-alt').className  	= 'modal-header text-white bg-danger';
				document.getElementById('modal-dialog-alt').className  		= 'modal-dialog border border-danger rounded alert-danger';
				document.getElementById('modal-conteudo-alt').innerHTML 	= 'A reserva do(a) professor(a) <span class="text-danger"><b>'+r.professor+'</b></span> irá ser <span class="text-danger"><b>excluida!</b></span>';
				document.getElementById('modal-conteudo-alt').innerHTML    += '<br><br><table class="table text-center" ><thead><tr ><th scope="col">Equipamento</th><th scope="col">Local</th><th scope="col">Horário</th><th scope="col">Data</th></tr></thead><tbody><tr><th class="font-weight-normal">'+r.equipamento+'</th><td>'+r.sala+'</td><td>'+r.horaA+'/'+r.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
				document.getElementById('modal-btn-alt').innerHTML 			= 'Voltar';
				document.getElementById('modal-btn-alt').className 			= 'btn btn-outline-danger';
			//
			//	FORMATAR O ID
				let id = this.id.replace('id_reserva_','');
			//	REMOVE A RESERVA
 				bancodedados.removerProfessor(id);
 		//
			}
		//
		}
		//
	//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO EDIÇÃO E EXCLUSÃO
		linha.insertCell(5).append(ver," ", editar," ",excluir);
	//
 		})
 	//
 		}
 	//
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