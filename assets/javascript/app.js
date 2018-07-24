//==============================================================||
//	AUTOR: JEFERSON LUCAS
//	DATA DE CRIAÇÃO: 21/07/2018
//  DATA DE MODIFICAÇÃO: 24/07/2018
//  VERSÃO: 1.5.0-BETA
//	DESCRIÇÃO: CORE PARA CADASTRO/CONSULTA/FILTRO/VISUALIZAÇÃO
//	/EDIÇÃO E EXCLUSÃO DE RESERVAS DE PROFESSORES E ALUNOS
//==============================================================||
//==============================================================||
class Reserva {
	constructor(nome, equipamento, horaA, dataEUA) {
		this.nome = nome;
		this.equipamento = equipamento;
		this.horaA = horaA;
		this.dataEUA = dataEUA; 
	}
	validaDadosReserva() {
		for (let r in this){
			if (this[r] === undefined || this[r] === "" || this[r] === null){
				return false;
			}
		}
		return true;
	}
}
class ReservaProfessor extends Reserva {
	constructor(nome, equipamento, horaA, dataEUA, sala, horaB) {
		super(nome, equipamento, horaA, dataEUA);
		this.sala = sala;
		this.horaB = horaB;
	}
}
class ReservaAluno extends Reserva {
	constructor(nome, equipamento, horaA, dataEUA, matricula, numeroSerie) {
		super(nome, equipamento, horaA, dataEUA);
		this.matricula = matricula;
		this.numeroSerie = numeroSerie;
	}
}
class BancodeDados {
	constructor(){
		let idAluno = localStorage.getItem('idAluno');
		let idProfessor = localStorage.getItem('idProfessor');
		if (idAluno === null) {
			localStorage.setItem('idAluno', 0);
		}
		if (idProfessor === null) {
			localStorage.setItem('idProfessor', 0);
		}
	}
	getProximoId(nome) {
		let idAluno 	= parseInt(localStorage.getItem('idAluno')); 
		let idProfessor = parseInt(localStorage.getItem('idProfessor'));
		if (nome == "Professor") {
			if(idAluno > idProfessor) {
				for(let i = 0; i <= idAluno; i++) {
					var proximoId = i + 1;
				}
				return proximoId;
			} else if(idProfessor > idAluno) {
				var proximoId = (idProfessor + 1);
				return proximoId;
			} else if(idProfessor == idAluno) {
				var proximoId = (idProfessor + 1);
				return proximoId;
			}
			else {
				return 0;
			}
		} else if(nome == "Aluno") {
			if(idProfessor > idAluno) {
				for(let i = 0; i <= idProfessor; i++){
					var proximoId = i + 1;
				}
				return proximoId;
			} else if(idAluno > idProfessor) {
				let proximoId = (idAluno + 1);
				return proximoId;
			} else if(idAluno == idProfessor) {
				let proximoId = (idAluno + 1);
				return proximoId;
			} else {
				return 0;
			}
		}
	}
	gravar(reserva, nome) {
		let id = this.getProximoId(nome);
		localStorage.setItem(id, JSON.stringify(reserva));
		localStorage.setItem(`id${nome}`, id);
	}
	recuperaReservaProfessor() {
		let reservas = Array();
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
		let reservas = Array();
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
	pesquisaReserva(reserva, nome) {
		if(nome == "Professor") {
			let reservasFiltradas = Array();
			reservasFiltradas = this.recuperaReservaProfessor();
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
			return reservasFiltradas;
		} else if (nome == "Aluno") {
			let reservasFiltradas = Array();
			reservasFiltradas = this.recuperaReservaAluno();
			if(reserva.nome != "") {
				reservasFiltradas = reservasFiltradas.filter(a => a.nome == reserva.nome);
			}
			if(reserva.matricula != "") {
				reservasFiltradas = reservasFiltradas.filter(a => a.matricula == reserva.matricula);
			}
			if(reserva.equipamento != "") {
				reservasFiltradas = reservasFiltradas.filter(a => a.equipamento == reserva.equipamento);
			}
			if(reserva.numeroSerie != "") {
				reservasFiltradas = reservasFiltradas.filter(a => a.numeroSerie == reserva.numeroSerie);
			}
			if(reserva.horaA != "") {
				reservasFiltradas = reservasFiltradas.filter(a => a.horaA == reserva.horaA);
			}
			if(reserva.dataEUA != "") {
				reservasFiltradas = reservasFiltradas.filter(a => a.dataEUA == reserva.dataEUA);
			}
			return reservasFiltradas;
		}
	}
	removerReserva(id) {
		localStorage.removeItem(id);
	}
}

let bancodedados = new BancodeDados();

function cadastrarReservaProfessor() {

	let nome 		= document.getElementById('professor');
	let equipamento = document.getElementById('equipamento');
	let sala 		= document.getElementById('sala');
	let horaA 		= document.getElementById('horaA');
	let horaB 		= document.getElementById('horaB');
	let dataEUA 	= document.getElementById('data');

	reserva = new ReservaProfessor(nome.value, equipamento.value, horaA.value, dataEUA.value, sala.value, horaB.value);
	
		if(reserva.validaDadosReserva()){
	
			$('#modalCadastraReservaSucesso').modal('show');
	
			bancodedados.gravar(reserva, "Professor");
	
			var diaBR = dataEUA.value.substr(8,2);
			var mesBR = "/"+dataEUA.value.substr(5,2);
			var anoBR = "/"+dataEUA.value.substr(0,4);
			var dataBR = diaBR+mesBR+anoBR;
	
			document.getElementById('modal-titulo-success').innerHTML 		= '<i class="fas fa-check-circle"></i> Sucesso!';
			document.getElementById('modal-titulo-div-success').className  	= 'modal-header text-white bg-success';
			document.getElementById('modal-conteudo-success').innerHTML 	= 'A reserva do professor(a) <span class="text-success"><b>'+reserva.nome+'</b></span> foi cadastrada com <span class="text-success"><b>sucesso!</b></span><br>'
			document.getElementById('modal-conteudo-success').innerHTML    += '<br><br><table class="table text-center" ><thead><tr class="text-center bg-success"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-clock" title="Horário"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+reserva.equipamento+'</th><td>'+reserva.sala+'</td><td>'+reserva.horaA+'/'+reserva.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
			document.getElementById('modal-btn-success').innerHTML 			= 'Voltar';
			document.getElementById('modal-btn-success').className 			= 'btn btn-outline-success';
	
			nome.value 			= "";
			equipamento.value 	= "";
			sala.value 			= "";
			horaA.value 		= "";
			horaB.value 		= "";
			dataEUA.value 		= "";
	
		} else {
	
			$('#modalCadastraReservaErro').modal('show');
	
			document.getElementById('modal-titulo-erro').innerHTML 		= '<i class="fas fa-times-circle"></i> Erro!';
			document.getElementById('modal-titulo-div-erro').className  = 'modal-header text-white bg-danger';
			document.getElementById('modal-conteudo-erro').innerHTML 	= 'Erro ao efetuar seu <span class="text-danger"><b>cadastro</b></span>. Por favor verifique se todos os campo foram inseridos corretamente.';
			document.getElementById('modal-btn-erro').innerHTML 		= 'Corrigir';
			document.getElementById('modal-btn-erro').className 		= 'btn btn-outline-danger';
		}
	}

function cadastrarReservaAluno() {

	let nome 		= document.getElementById('aluno');
	let matricula 	= document.getElementById('matricula');
	let equipamento = document.getElementById('equipamento');		
	let numeroSerie = document.getElementById('serie');
	let horaA 		= document.getElementById('horaA');
	let dataEUA 	= document.getElementById('data');

	reserva  = new ReservaAluno(nome.value, equipamento.value, horaA.value, dataEUA.value, matricula.value, numeroSerie.value);

	if(reserva.validaDadosReserva()){

		bancodedados.gravar(reserva, "Aluno");

		var diaBR = dataEUA.value.substr(8,2);
		var mesBR = "/"+dataEUA.value.substr(5,2);
		var anoBR = "/"+dataEUA.value.substr(0,4);
		var dataBR = diaBR+mesBR+anoBR;

		$('#modalCadastraReservaSucesso').modal('show');
		document.getElementById('modal-titulo-success').innerHTML 		= '<i class="fas fa-check-circle"></i> Sucesso!';
		document.getElementById('modal-titulo-div-success').className  	= 'modal-header text-white bg-success';
		document.getElementById('modal-conteudo-success').innerHTML 	= 'A reserva do aluno(a) <span class="text-success"><b>'+reserva.nome+'</b></span> foi cadastrada com <span class="text-success"><b>sucesso!</b></span><br>'
		document.getElementById('modal-conteudo-success').innerHTML	   += '<br><br><table class="table text-center"><thead><tr class="text-center bg-success"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i> - <i class="fas fa-clock" title="Horário"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+reserva.matricula+'</th><td>'+reserva.equipamento+'</td><td>'+reserva.numeroSerie+'</td><td>'+dataBR+' - '+reserva.horaA+'</td></tr></tbody>';
		document.getElementById('modal-btn-success').innerHTML 			= 'Voltar';
		document.getElementById('modal-btn-success').className 			= 'btn btn-outline-success';

		nome.value 			= "";
		matricula.value 	= "";
		equipamento.value 	= "";
		numeroSerie.value 	= "";
		horaA.value			= "";
		dataEUA.value 		= "";

	} else {

		$('#modalCadastraReservaErro').modal('show');
		document.getElementById('modal-titulo-erro').innerHTML 		= '<i class="fas fa-times-circle"></i> Erro!';
		document.getElementById('modal-titulo-div-erro').className  = 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo-erro').innerHTML 	= 'Erro ao efetuar seu <span class="text-danger"><b>cadastro</b></span>. Por favor verifique se todos os campo foram inseridos corretamente.';
		document.getElementById('modal-btn-erro').innerHTML 		= 'Corrigir';
		document.getElementById('modal-btn-erro').className 		= 'btn btn-outline-danger';
	}
}

function ListaReservasProfessores() {

	let reservas = Array();

	reservas = bancodedados.recuperaReservaProfessor();

	let listaReservas = document.getElementById("listaProfessores");

	reservas.forEach(function(p) {

		let linha =	listaReservas.insertRow();

		linha.insertCell(0).innerHTML = p.nome;
		linha.insertCell(1).innerHTML = p.equipamento;
		linha.insertCell(2).innerHTML = p.sala;
		linha.insertCell(3).innerHTML = p.horaA+"/"+p.horaB;

			let diaBR = p.dataEUA.substr(8,2);
			let mesBR = "/"+p.dataEUA.substr(5,2);
			let anoBR = "/"+p.dataEUA.substr(0,4);
			let dataBR = diaBR+mesBR+anoBR;

		linha.insertCell(4).innerHTML = dataBR;

 			let ver 		= document.createElement("button");
 			ver.className 	= 'btn btn-outline-primary btn-sm';
 			ver.title 		= "Vizualizar";
 			ver.innerHTML 	= '<i class="far fa-eye"></i>';
 			ver.id 			= `id-ver-${p.id}`;
 			ver.onclick = function() {

 				$('#modalVizualizaReserva').modal('show');
				document.getElementById('modal-titulo-ver').innerHTML 		= '<i class="fas fa-eye"></i> Informações';
				document.getElementById('modal-titulo-div-ver').className  	= 'modal-header text-white bg-primary';
				document.getElementById('modal-conteudo-ver').innerHTML 	= 'Detalhes da reserva do(a) professor(a) <span class="text-primary"><b>'+p.nome+'</b></span>:';
				document.getElementById('modal-conteudo-ver').innerHTML    += '<br><br><table class="table text-center"><thead><tr class="text-center bg-primary"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-clock" title="Horário"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+p.equipamento+'</th><td>'+p.sala+'</td><td>'+p.horaA+'/'+p.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
				document.getElementById('modal-btn-ver').innerHTML 			= 'Voltar';
				document.getElementById('modal-btn-ver').className 			= 'btn btn-outline-primary';
 			
 			}
 	
 			let editar 			= document.createElement("button");
 			editar.className 	= 'btn btn-outline-success btn-sm';
 			editar.title 		= "Editar";
 			editar.innerHTML 	= '<i class="fas fa-pencil-alt"></i>';
 			editar.id 			= `id-editar-${p.id}`;
 			editar.onclick = function() {

 				let = resposta = prompt("Deseja EDITAR a reserva do(a) "+p.nome+"? R: Sim ou Não","Não");

 				if(resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {

 					let nome 			= prompt("Nome do(a) Professor(a):", p.nome);
 					let equipamento 	= prompt("Descrição do equipamento:",p.equipamento);
 					let sala 			= prompt("Nome do sala:",p.sala);
 					let horaA 			= prompt("Início da aula:",p.horaA);
 					let horaB 			= prompt("Término da aula:",p.horaB);
 					let dataBr 			= prompt("Data da aula:",dataBR);
 				
 					$('#modalAlteraReserva').modal('show');
					document.getElementById('modal-titulo-altera').innerHTML 		= '<i class="fas fa-pencil-alt"></i> Editar';
					document.getElementById('modal-titulo-div-altera').className  	= 'modal-header text-white bg-success';
					document.getElementById('modal-dialog-altera').className  		= 'modal-dialog border border-success rounded alert-success';
					document.getElementById('modal-conteudo-altera').innerHTML 		= 'A reserva do(a) professor(a) <span class="text-success"><b>'+nome+'</b></span> foi alterada com <span class="text-success"><b>sucesso!</b></span>'
					document.getElementById('modal-conteudo-altera').innerHTML     += '<br><br><table class="table text-center"><thead><tr class="text-center bg-success"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-clock" title="Horário"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+equipamento+'</th><td>'+sala+'</td><td>'+horaA+'/'+horaB+'</td><td>'+dataBr+'</td></tr></tbody>';
					document.getElementById('modal-btn-altera').innerHTML 			= 'Voltar';
					document.getElementById('modal-btn-altera').className 			= 'btn btn-outline-success';
				
					let id = this.id.replace('id-editar-','');
				
					bancodedados.removerReserva(id);
				
					let anoEUA = dataBr.substr(6,4);
					let mesEUA = "-"+dataBr.substr(3,2);
					let diaEUA = "-"+dataBr.substr(0,2);
					let dataEUA = anoEUA+mesEUA+diaEUA;
				
					let reserva = new ReservaProfessor(nome, equipamento, horaA, dataEUA, sala, horaB);
					bancodedados.gravar(reserva, "Professor");
				
				}
 			}
 		
 			excluir 			= document.createElement("button");
 			excluir.className 	= 'btn btn-outline-danger btn-sm';
 			excluir.title 		= 'Excluir';
 			excluir.innerHTML 	= '<i class="fa fa-trash-alt"></i>';
 			excluir.id 			= `id-excluir-${p.id}`;
 			excluir.onclick = function() {
 		
 			let resposta = prompt("Deseja EXCLUIR a reserva do(a) "+p.nome+"? R: Sim ou Não", "Não");
		
				if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
		
					$('#modalAlteraReserva').modal('show')
					document.getElementById('modal-titulo-altera').innerHTML 		= '<i class="fa fa-trash-alt"></i> Excluir';
					document.getElementById('modal-titulo-div-altera').className  	= 'modal-header text-white bg-danger';
					document.getElementById('modal-dialog-altera').className  		= 'modal-dialog border border-danger rounded alert-danger';
					document.getElementById('modal-conteudo-altera').innerHTML 		= 'A reserva do(a) professor(a) <span class="text-danger"><b>'+p.nome+'</b></span> irá ser <span class="text-danger"><b>excluida!</b></span>';
					document.getElementById('modal-conteudo-altera').innerHTML     += '<br><br><table class="table text-center"><thead><tr class="text-center bg-danger"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-clock" title="Horário"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+p.equipamento+'</th><td>'+p.sala+'</td><td>'+p.horaA+'/'+p.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
					document.getElementById('modal-btn-altera').innerHTML 			= 'Voltar';
					document.getElementById('modal-btn-altera').className 			= 'btn btn-outline-danger';
		
					let id = this.id.replace('id-excluir-','');
		
					bancodedados.removerReserva(id);
 				}
 			}
 		linha.insertCell(5).append(ver," ", editar," ", excluir);
 	})
}

function pesquisarReservaProfessor() {

	let nome 		= document.getElementById('professor').value;
	let equipamento = document.getElementById('equipamento').value;
	let sala 		= document.getElementById('sala').value;
	let horaA 		= document.getElementById('horaA').value;
	let horaB 		= document.getElementById('horaB').value;
	let dataEUA 	= document.getElementById('data').value;
	
	let reserva = new ReservaProfessor(nome, equipamento, horaA, dataEUA, sala, horaB);
	
	let reservas = bancodedados.pesquisaReserva(reserva, "Professor");
	
	let listaReservas = document.getElementById("listaProfessores");
	
	listaReservas.innerHTML = "";
	
	if(nome == "" && equipamento == "" && horaA == "" && dataEUA == "" && sala == "" && horaB == "") {
	
		$('#modalValidaReserva').modal('show');
		document.getElementById('modal-titulo').innerHTML 		= '<i class="fas fa-times-circle"></i> Erro!';
		document.getElementById('modal-titulo-div').className  	= 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo').innerHTML 	= 'Erro ao efetuar sua <span class="text-danger"><b>perquisa</b></span>. Por favor verifique se algum campo não foi inseridos corretamente.';
		document.getElementById('modal-btn').innerHTML 			= 'Corrigir';
		document.getElementById('modal-btn').className 			= 'btn btn-outline-danger';
	
	} else {
	
		reservas.forEach(function(p) {
	
			let linha = listaReservas.insertRow();
			linha.insertCell(0).innerHTML = p.nome;
			linha.insertCell(1).innerHTML = p.equipamento;
			linha.insertCell(2).innerHTML = p.sala;
			linha.insertCell(3).innerHTML = p.horaA+"/"+p.horaB;
	
				let diaBR = p.dataEUA.substr(8,2);
				let mesBR = "/"+p.dataEUA.substr(5,2);
				let anoBR = "/"+p.dataEUA.substr(0,4);
				let dataBR = diaBR+mesBR+anoBR;
		
			linha.insertCell(4).innerHTML = dataBR;
	
				let ver 		= document.createElement("button");
 				ver.className 	= 'btn btn-outline-primary btn-sm';
 				ver.title 		= "Vizualizar";
 				ver.innerHTML 	= '<i class="far fa-eye"></i>';
 				ver.id 			= `id-ver-${p.id}`;
 				ver.onclick = function() {
 				
 					$('#modalVizualizaReserva').modal('show');
					document.getElementById('modal-titulo-ver').innerHTML 		= '<i class="fas fa-eye"></i> Informações';
					document.getElementById('modal-titulo-div-ver').className  	= 'modal-header text-white bg-primary';
					document.getElementById('modal-conteudo-ver').innerHTML 	= 'Detalhes da reserva do(a) professor(a) <span class="text-primary"><b>'+p.nome+'</b></span>:';
					document.getElementById('modal-conteudo-ver').innerHTML   	+= '<br><br><table class="table text-center"><thead><tr class="text-center bg-primary"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></th><th scope="col" class="text-white"><i class="fas fa-clock" title="Horário"></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+p.equipamento+'</th><td>'+p.sala+'</td><td>'+p.horaA+'/'+p.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
					document.getElementById('modal-btn-ver').innerHTML 			= 'Voltar';
					document.getElementById('modal-btn-ver').className 			= 'btn btn-outline-primary';
				}
 				
 				let editar 			= document.createElement("button");
 				editar.className 	= 'btn btn-outline-success btn-sm';
 				editar.title 		= "Editar";
 				editar.innerHTML 	= '<i class="fas fa-pencil-alt"></i>';
 				editar.id 			= `id-editar-${p.id}`;
 				editar.onclick = function() {
 		
 					let = resposta = prompt("Deseja EDITAR a reserva do(a) "+p.nome+"? R: Sim ou Não","Não");
 		
 					if(resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
 	
 						let nome 			= prompt("Nome do(a) Professor(a):", p.nome);
 						let equipamento 	= prompt("Descrição do equipamento:",p.equipamento);
 						let sala 			= prompt("Nome do sala:",p.sala);
 						let horaA 			= prompt("Início da aula:",p.horaA);
 						let horaB 			= prompt("Término da aula:",p.horaB);
 						let dataBr 			= prompt("Data da aula:",dataBR);
 		
 						$('#modalAlteraReserva').modal('show');
						document.getElementById('modal-titulo-altera').innerHTML 		= '<i class="fas fa-pencil-alt"></i> Editar';
						document.getElementById('modal-titulo-div-altera').className  	= 'modal-header text-white bg-success';
						document.getElementById('modal-dialog-altera').className  		= 'modal-dialog border border-success rounded alert-success';
						document.getElementById('modal-conteudo-altera').innerHTML 		= 'A reserva do(a) professor(a) <span class="text-success"><b>'+nome+'</b></span> foi alterada com <span class="text-success"><b>sucesso!</b></span>'
						document.getElementById('modal-conteudo-altera').innerHTML     += '<br><br><table class="table text-center"><thead><tr class="text-center bg-success"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></th><th scope="col" class="text-white"><i class="fas fa-clock" title="Horário"></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+equipamento+'</th><td>'+sala+'</td><td>'+horaA+'/'+horaB+'</td><td>'+dataBr+'</td></tr></tbody>';
						document.getElementById('modal-btn-altera').innerHTML 			= 'Voltar';
						document.getElementById('modal-btn-altera').className 			= 'btn btn-outline-success';
			
						let id = this.id.replace('id-editar-','');
				
						bancodedados.removerReserva(id);
			
						let anoEUA = dataBr.substr(6,4);
						let mesEUA = "-"+dataBr.substr(3,2);
						let diaEUA = "-"+dataBr.substr(0,2);
						let dataEUA = anoEUA+mesEUA+diaEUA;
				
						let reservaProfessor = new ReservaProfessor(nome, equipamento, horaA, dataEUA, sala, horaB);
				
						bancodedados.gravar(reservaProfessor, "Professor");
					}
 				}
 				
 				excluir 			= document.createElement("button");
 				excluir.className 	= 'btn btn-outline-danger btn-sm';
 				excluir.title 		= 'Excluir';
 				excluir.innerHTML 	= '<i class="fa fa-trash-alt"></i>';
 				excluir.id 			= `id-excluir-${p.id}`;
 				excluir.onclick = function() {
 		 	
 				 	let resposta = prompt("Deseja EXCLUIR a reserva do(a) "+p.nome+"? R: Sim ou Não", "Não");
			
					if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
			
						$('#modalAlteraReserva').modal('show')
						document.getElementById('modal-titulo-altera').innerHTML 		= '<i class="fa fa-trash-alt"></i> Excluir';
						document.getElementById('modal-titulo-div-altera').className  	= 'modal-header text-white bg-danger';
						document.getElementById('modal-dialog-altera').className  		= 'modal-dialog border border-danger rounded alert-danger';
						document.getElementById('modal-conteudo-altera').innerHTML 		= 'A reserva do(a) professor(a) <span class="text-danger"><b>'+p.nome+'</b></span> irá ser <span class="text-danger"><b>excluida!</b></span>';
						document.getElementById('modal-conteudo-altera').innerHTML     += '<br><br><table class="table text-center"><thead><tr class="text-center bg-danger"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></th><th scope="col" class="text-white"><i class="fas fa-clock" title="Horário"></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+p.equipamento+'</th><td>'+p.sala+'</td><td>'+p.horaA+'/'+p.horaB+'</td><td>'+dataBR+'</td></tr></tbody>';
						document.getElementById('modal-btn-altera').innerHTML 			= 'Voltar';
						document.getElementById('modal-btn-altera').className 			= 'btn btn-outline-danger';
			
						let id = this.id.replace('id-excluir-','');
			
						bancodedados.removerReserva(id);
 					}
 				}
			linha.insertCell(5).append(ver," ", editar," ", excluir);
		})
	}
}

function ListasReservasAlunos() {

	let reservas = Array();
	reservas = bancodedados.recuperaReservaAluno();

	let listaReservas = document.getElementById("listaAlunos");

	reservas.forEach(function(a) {

		let linha =	listaReservas.insertRow();
	
		linha.insertCell(0).innerHTML = a.nome;
		linha.insertCell(1).innerHTML = a.matricula;
		linha.insertCell(2).innerHTML = a.equipamento;
		linha.insertCell(3).innerHTML = a.numeroSerie;
	
			let diaBR = a.dataEUA.substr(8,2);
			let mesBR = "/"+a.dataEUA.substr(5,2);
			let anoBR = "/"+a.dataEUA.substr(0,4);
			let dataBR = diaBR+mesBR+anoBR;
	
		linha.insertCell(4).innerHTML = dataBR +" - "+ a.horaA;
	
			let ver = document.createElement("button");
 			ver.className = 'btn btn-outline-primary btn-sm';
 			ver.title = "Vizualizar";
 			ver.innerHTML = '<i class="fa fa-eye"></i>';
 			ver.id = `id-ver-${a.id}`;
 			ver.onclick = function() {
 		
 				$('#modalVizualizaReserva').modal('show');
				document.getElementById('modal-titulo-ver').innerHTML 		= '<i class="fas fa-eye"></i> Informações';
				document.getElementById('modal-titulo-div-ver').className  	= 'modal-header text-white bg-primary';
				document.getElementById('modal-conteudo-ver').innerHTML 	= 'Detalhes da reserva do(a) aluno(a) <span class="text-primary"><b>'+a.nome+'</b></span>:';
				document.getElementById('modal-conteudo-ver').innerHTML   	+= '<br><br><table class="table text-center"><thead><tr class="text-center bg-primary"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i> - <i class="fas fa-clock" title="Horário"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+a.matricula+'</th><td>'+a.equipamento+'</td><td>'+a.numeroSerie+'</td><td>'+dataBR+' - '+a.horaA+'</td></tr></tbody>';
				document.getElementById('modal-btn-ver').innerHTML 			= 'Voltar';
				document.getElementById('modal-btn-ver').className 			= 'btn btn-outline-primary';
		
			}
 		
 			let editar 			= document.createElement("button");
 			editar.className 	= 'btn btn-outline-success btn-sm';
 			editar.title 		= "Editar";
 			editar.innerHTML 	= '<i class="fas fa-pencil-alt"></i>';
 			editar.id 			= `id-editar-${a.id}`;
 			editar.onclick = function() {
 		
 				let = resposta = prompt("Deseja EDITAR a reserva do(a) "+a.nome+"? R: Sim ou Não","Não");
 		
 				if(resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
 		
 					let nome 			= prompt("Nome do(a) Aluno(a):",a.nome); 					
 					let matricula		= prompt("Matrícula:",a.matricula);
 					let equipamento 	= prompt("Descrição do equipamento:",a.equipamento);
 					let numeroSerie		= prompt("Nº de série:",a.numeroSerie);
 					let horaA 			= prompt("Início da aula:",a.horaA);
 					let dataBr 			= prompt("Data da aula:",dataBR);
 		
 					$('#modalAlteraReserva').modal('show');
					document.getElementById('modal-titulo-altera').innerHTML 		= '<i class="fas fa-pencil-alt"></i> Editar';
					document.getElementById('modal-titulo-div-altera').className  	= 'modal-header text-white bg-success';
					document.getElementById('modal-dialog-altera').className  		= 'modal-dialog border border-success rounded alert-success';
					document.getElementById('modal-conteudo-altera').innerHTML 		= 'A reserva do(a) aluno(a) <span class="text-success"><b>'+nome+'</b></span> foi alterada com <span class="text-success"><b>sucesso!</b></span>'
					document.getElementById('modal-conteudo-altera').innerHTML     += '<br><br><table class="table text-center"><thead><tr class="text-center bg-success"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i> - <i class="fas fa-clock" title="Horário"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+matricula+'</th><td>'+equipamento+'</td><td>'+numeroSerie+'</td><td>'+dataBr+'-'+horaA+'</td></tr></tbody>';
					document.getElementById('modal-btn-altera').innerHTML 			= 'Voltar';
					document.getElementById('modal-btn-altera').className 			= 'btn btn-outline-success';
		
					let id = this.id.replace('id-editar-','');
		
					bancodedados.removerReserva(id);
		
					let anoEUA = dataBr.substr(6,4);
					let mesEUA = "-"+dataBr.substr(3,2);
					let diaEUA = "-"+dataBr.substr(0,2);
					let dataEUA = anoEUA+mesEUA+diaEUA;
		
					reservaAluno  = new ReservaAluno(nome, equipamento, horaA, dataEUA, matricula, numeroSerie);
		
					bancodedados.gravar(reservaAluno, "Aluno");
				}
 			}
 		
 			excluir = document.createElement("button");
 			excluir.className = 'btn btn-outline-danger btn-sm';
 			excluir.title = 'Excluir';
 			excluir.innerHTML = '<i class="fa fa-trash-alt"></i>';
 			excluir.id = `id-excluir-${a.id}`;
 			excluir.onclick = function() {
 		
 				let resposta = prompt("Deseja EXCLUIR a reserva do(a) "+a.nome+"? R: Sim ou Não", "Não");
				if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
		
					$('#modalAlteraReserva').modal('show');
					document.getElementById('modal-titulo-altera').innerHTML = '<i class="fa fa-trash-alt"></i> Excluir';
					document.getElementById('modal-titulo-div-altera').className = 'modal-header text-white bg-danger';
					document.getElementById('modal-dialog-altera').className = 'modal-dialog border border-danger rounded alert-danger';
					document.getElementById('modal-conteudo-altera').innerHTML = 'A reserva do(a) professor(a) <span class="text-danger"><b>'+a.nome+'</b></span> irá ser <span class="text-danger"><b>excluida!</b></span>';
					document.getElementById('modal-conteudo-altera').innerHTML += '<br><br><table class="table text-center"><thead><tr class="text-danger bg-danger"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i> - <i class="fas fa-clock" title="Horário"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+a.matricula+'</th><td>'+a.equipamento+'</td><td>'+a.numeroSerie+'</td><td>'+dataBR+'-'+a.horaA+'</td></tr></tbody>';
					document.getElementById('modal-btn-altera').innerHTML = 'Voltar';
					document.getElementById('modal-btn-altera').className = 'btn btn-outline-danger';
		
					let id = this.id.replace('id-excluir-','');
					bancodedados.removerReserva(id);
 				}
 			}
		linha.insertCell(5).append(ver," ", editar," ", excluir);
	})
}

function pesquisarReservaAluno() {

	let nome = document.getElementById('aluno').value;
	let matricula = document.getElementById('matricula').value;
	let equipamento = document.getElementById('equipamento').value;		
	let numeroSerie = document.getElementById('serie').value;
	let horaA = document.getElementById('horaA').value;
	let dataEUA = document.getElementById('data').value;

	reserva = new ReservaAluno(nome, equipamento, horaA, dataEUA, matricula, numeroSerie);

	let reservas = bancodedados.pesquisaReserva(reserva, "Aluno");

	let listaReservas = document.getElementById("listaAlunos");

	listaReservas.innerHTML = "";

	if(nome == "" && equipamento == "" && horaA == "" && dataEUA == "" && matricula == "" && numeroSerie == "") {

		$('#modalValidaReserva').modal('show');
		document.getElementById('modal-titulo').innerHTML = '<i class="fas fa-times-circle"></i> Erro!';
		document.getElementById('modal-titulo-div').className = 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo').innerHTML = 'Erro ao efetuar sua <span class="text-danger"><b>perquisa</b></span>. Por favor verifique se algum campo não foi inseridos corretamente.';
		document.getElementById('modal-btn').innerHTML = 'Corrigir';
		document.getElementById('modal-btn').className = 'btn btn-outline-danger';

	} else {

		reservas.forEach(function(a) {

			let linha = listaReservas.insertRow();

			linha.insertCell(0).innerHTML = a.nome;
			linha.insertCell(1).innerHTML = a.matricula;
			linha.insertCell(2).innerHTML = a.equipamento;
			linha.insertCell(3).innerHTML = a.numeroSerie;
	
				let diaBR = a.dataEUA.substr(8,2);
				let mesBR = "/"+a.dataEUA.substr(5,2);
				let anoBR = "/"+a.dataEUA.substr(0,4);
				let dataBR = diaBR+mesBR+anoBR;
	
			linha.insertCell(4).innerHTML = dataBR+" - "+a.horaA;
	
				let ver = document.createElement("button");
 				ver.className = 'btn btn-outline-primary btn-sm';
 				ver.title = "Vizualizar";
 				ver.innerHTML = '<i class="fa fa-eye"></i>';
 				ver.id = `id-ver-${a.id}`;
 				ver.onclick = function() {
 	
 					$('#modalVizualizaReserva').modal('show');
					document.getElementById('modal-titulo-ver').innerHTML = '<i class="fas fa-eye"></i> Informações';
					document.getElementById('modal-titulo-div-ver').className = 'modal-header text-white bg-primary';
					document.getElementById('modal-conteudo-ver').innerHTML = 'Detalhes da reserva do(a) aluno(a) <span class="text-primary"><b>'+a.nome+'</b></span>:';
					document.getElementById('modal-conteudo-ver').innerHTML += '<br><br><table class="table text-center"><thead><tr class="text-center bg-primary"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i> - <i class="fas fa-clock" title="Horário"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+a.matricula+'</th><td>'+a.equipamento+'</td><td>'+a.numeroSerie+'</td><td>'+dataBR+' - '+a.horaA+'</td></tr></tbody>';
					document.getElementById('modal-btn-ver').innerHTML = 'Voltar';
					document.getElementById('modal-btn-ver').className = 'btn btn-outline-primary';
				}
 	
 				let editar = document.createElement("button");
 				editar.className = 'btn btn-outline-success btn-sm';
 				editar.title = "Editar";
 				editar.innerHTML = '<i class="fas fa-pencil-alt"></i>';
 				editar.id = `id-editar-${a.id}`;
 				editar.onclick = function() {
 	
 					let = resposta = prompt("Deseja EDITAR a reserva do(a) "+a.nome+"? R: Sim ou Não","Não");
 	
 					if(resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
 	
 						let nome = prompt("Nome do(a) Aluno(a):",a.nome); 					
 						let matricula = prompt("Matrícula:",a.matricula);
 						let equipamento = prompt("Descrição do equipamento:",a.equipamento);
 						let numeroSerie	= prompt("Nº de série:",a.numeroSerie);
 						let horaA = prompt("Início da aula:",a.horaA);
 						let dataBr = prompt("Data da aula:",dataBR);
 	
 						$('#modalAlteraReserva').modal('show');
						document.getElementById('modal-titulo-altera').innerHTML = '<i class="fas fa-pencil-alt"></i> Editar';
						document.getElementById('modal-titulo-div-altera').className = 'modal-header text-white bg-success';
						document.getElementById('modal-dialog-altera').className = 'modal-dialog border border-success rounded alert-success';
						document.getElementById('modal-conteudo-altera').innerHTML = 'A reserva do(a) aluno(a) <span class="text-success"><b>'+nome+'</b></span> foi alterada com <span class="text-success"><b>sucesso!</b></span>'
						document.getElementById('modal-conteudo-altera').innerHTML += '<br><br><table class="table text-center"><thead><tr class="text-center bg-success"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i> - <i class="fas fa-clock" title="Horário"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+matricula+'</th><td>'+equipamento+'</td><td>'+numeroSerie+'</td><td>'+dataBr+'-'+horaA+'</td></tr></tbody>';
						document.getElementById('modal-btn-altera').innerHTML = 'Voltar';
						document.getElementById('modal-btn-altera').className = 'btn btn-outline-success';
	
						let id = this.id.replace('id-editar-','');
	
						bancodedados.removerReserva(id);
	
						let anoEUA = dataBr.substr(6,4);
						let mesEUA = "-"+dataBr.substr(3,2);
						let diaEUA = "-"+dataBr.substr(0,2);
						let dataEUA = anoEUA+mesEUA+diaEUA;
	
						reservaAluno = new ReservaAluno(nome, equipamento, horaA, dataEUA, matricula, numeroSerie);
	
						bancodedados.gravar(reservaAluno, "Aluno");
					}
 				}
 	
 				excluir = document.createElement("button");
 				excluir.className = 'btn btn-outline-danger btn-sm';
 				excluir.title = 'Excluir';
 				excluir.innerHTML = '<i class="fa fa-trash-alt"></i>';
 				excluir.id = `id-excluir-${a.id}`;
 	
 				excluir.onclick = function() {
 	
 					let resposta = prompt("Deseja EXCLUIR a reserva do(a) "+a.nome+"? R: Sim ou Não", "Não");
	
					if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
	
						$('#modalAlteraReserva').modal('show');
						document.getElementById('modal-titulo-altera').innerHTML = '<i class="fa fa-trash-alt"></i> Excluir';
						document.getElementById('modal-titulo-div-altera').className = 'modal-header text-white bg-danger';
						document.getElementById('modal-dialog-altera').className = 'modal-dialog border border-danger rounded alert-danger';
						document.getElementById('modal-conteudo-altera').innerHTML = 'A reserva do(a) professor(a) <span class="text-danger"><b>'+a.nome+'</b></span> irá ser <span class="text-danger"><b>excluida!</b></span>';
						document.getElementById('modal-conteudo-altera').innerHTML += '<br><br><table class="table text-center"><thead><tr class="text-center bg-danger"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-calendar-alt" title="Data"></i> - <i class="fas fa-clock" title="Horário"></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+a.matricula+'</th><td>'+a.equipamento+'</td><td>'+a.numeroSerie+'</td><td>'+dataBR+'-'+a.horaA+'</td></tr></tbody>';
						document.getElementById('modal-btn-altera').innerHTML = 'Voltar';
						document.getElementById('modal-btn-altera').className = 'btn btn-outline-danger';
	
						let id = this.id.replace('id-excluir-','');
	
						bancodedados.removerReserva(id);
 					}
 				}
			linha.insertCell(5).append(ver," ", editar," ", excluir);
		})
	}
}

function atualiza() {
	window.location.reload();
}

function imprimeReservas() {

    let imprime = document.getElementById('conteudo-imprecao').innerHTML;
    telaImpressao = window.open('about:blank');
    telaImpressao.document.write(imprime);
    telaImpressao.window.print();
    telaImpressao.window.close();
}

$(function () {
	$('[data-toggle="popover"]').popover();
})

$(function () {
	$('[data-toggle="tooltip"]').tooltip();
})