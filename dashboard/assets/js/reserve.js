/*!
 * Jeferson Luckas - reserve
 *
 * Author: Jeferson Luckas
 * Creation: 06/06/2020
 * Modification: 16/07/2020
 * Version: 1.0.0
 * Description: Script core
 *
 * Copyright (c) 2020 Jeferson Luckas
 * Released under the MIT license
 * https://github.com/JefersonLucas/reserve/blob/master/LICENSE
 *
 */

// Classes

class Reserva {
	constructor(usuario, equipamento, local, hora_inicial, hora_final, data, status) {
		this.usuario 		= usuario;
		this.equipamento 	= equipamento;
		this.local 			= local;
		this.hora_inicial 	= hora_inicial;
		this.hora_final 	= hora_final;
		this.data 			= data;
		this.status 		= status;
	}
	validarReserva() {
		for (let r in this){
			if(this[r] === "" || this[r] === null || this[r] === undefined){
				return false;
			}
		}
		return true;
	}
}

class BancoDadosReserve {
	constructor() {
		let idReserva = localStorage.getItem("idReserva");
		idReserva = idReserva === null ? localStorage.setItem("idReserva", 0) : idReserva;
	}
	pegaProximoId(nome) {
		let proximo_Id = localStorage.getItem("idReserva");
		return parseInt(proximo_Id) + 1;
	}
	gravar(reserva, nome) {
		let id = this.pegaProximoId(nome);

		localStorage.setItem(id, JSON.stringify(reserva));
		localStorage.setItem(`id${nome}`, id); 
	}
	verificaIdReserva() {
		let id = localStorage.getItem("idReserva");
		
		id = id > 0 ? true : false;
		
		return id;
	}
	recuperaReservas() {
		let reservas = Array();

		let id = localStorage.getItem("idReserva");

		for(let i = 0; i <= id; i++) {
			let r = JSON.parse(localStorage.getItem(i));
			let u = undefined;

			if (r === null || r.usuario === u || r.equipamento === u || r.local === u || r.hora_inicial === u || r.hora_final === u || r.data === u || r.status === u) {
				continue;
			}
			r.id = i;
			reservas.push(r)
		}
		return reservas;
	}
	pesquisaReserva(reserva) {
		let reservas_filtradas = Array();
	
		reservas_filtradas = this.recuperaReservas();
	
		if(reserva.usuario != "") {
			reservas_filtradas = reservas_filtradas.filter(r => r.usuario === reserva.usuario);
		}
		if(reserva.equipamento != "") {
			reservas_filtradas = reservas_filtradas.filter(r => r.equipamento === reserva.equipamento);
		}
		if(reserva.local != "") {
			reservas_filtradas = reservas_filtradas.filter(r => r.local === reserva.local);
		}
		if(reserva.hora_inicial != "") {
			reservas_filtradas = reservas_filtradas.filter(r => r.hora_inicial === reserva.hora_inicial);
		}
		if(reserva.hora_inicial != "") {
			reservas_filtradas = reservas_filtradas.filter(r => r.hora_inicial === reserva.hora_inicial);
		}
		if(reserva.data != "") {
			reservas_filtradas = reservas_filtradas.filter(r => r.data === reserva.data);
		}
		return reservas_filtradas;
	}
	removerReserva(id) {
		localStorage.removeItem(id);
	}
	removeTodasReservas() {
		let id = localStorage.getItem("idReserva");
	
		for(let i = 0; i <= id; i++) {
			localStorage.removeItem(id);
			if (id === null || id === null || id > 0) {
				localStorage.setItem("idReserva", 0);
			}
		}
	}
	pesquisaStatusAguardando() {
		let pesquisa = Array();

		pesquisa = this.recuperaReservas();

		pesquisa = pesquisa.filter(p => p.status === "Aguardando");
		
		if (pesquisa.length < 10) {
			pesquisa = `0${pesquisa.length}`;
		}
		return pesquisa;
	}
	pesquisaStatusEmUso() {
		let pesquisa = Array();

		pesquisa = this.recuperaReservas();

		pesquisa = pesquisa.filter(p => p.status === "Em uso");
		
		if (pesquisa.length < 10) {
			pesquisa = `0${pesquisa.length}`;
		}
		return pesquisa;
	}
	pesquisaStatusRecolhida() {
		let pesquisa = Array();

		pesquisa = this.recuperaReservas();

		pesquisa = pesquisa.filter(p => p.status === "Recolhida");
		
		if (pesquisa.length < 10) {
			pesquisa = `0${pesquisa.length}`;
		}
		return pesquisa;
	}
}

// Variáveis globais

let bancodados_reserve = new BancoDadosReserve(); 
let usuario 	 		= pegaId("usuario");
let equipamento  		= pegaId("equipamento");
let local 		 		= pegaId("local");
let hora_inicial 		= pegaId("hora-inicial");
let hora_final 	 		= pegaId("hora-final");
let data 		 		= pegaId("data");
let atualizar 			= pegaId("atualizar");
let imprimir 			= pegaId("imprimir");
let excluir 			= pegaId("excluir");
let alarme_ativado 		= pegaId("alarme-ativado");
let alarme_desativado 	= pegaId("alarme-desativado");
let cadastrar_reserva 	= pegaId("cadastrar-reserva");
let pesquisar_reserva 	= pegaId("pesquisar-reserva");
let buscar_reserva 		= pegaId("buscar-reserva");
let botao 				= pegaId("modal-botao-01");
let fechar 				= pegaId("fechar-modal-01");
let status 				= "Aguardando";

// Validação de input

setInterval(() => {

	let valido 		= "valid-feedback";
	let invalido 	= "invalid-feedback";
	let mensagem_01 = "Por favor, selecione uma opção válida.";
	let mensagem_02 = "Parece bom!";

	if (usuario.value === "") {
		pegaId("valida-usuario").innerHTML = mensagem_01;
		pegaId("valida-usuario").className = invalido;
	}
	else {
		pegaId("valida-usuario").innerHTML = mensagem_02;
		pegaId("valida-usuario").className = valido;
	}
	if (equipamento.value === "") {
		pegaId("valida-equipamento").innerHTML = mensagem_01;
		pegaId("valida-equipamento").className = invalido;
	}
	else {
		pegaId("valida-equipamento").innerHTML = mensagem_02;
		pegaId("valida-equipamento").className = valido;
	}
	if (local.value === "") {
		pegaId("valida-local").innerHTML = mensagem_01;
		pegaId("valida-local").className = invalido;
	}
	else {
		pegaId("valida-local").innerHTML = mensagem_02;
		pegaId("valida-local").className = valido;
	}
	if (hora_inicial.value === "") {
		pegaId("valida-hora-inicial").innerHTML = mensagem_01;
		pegaId("valida-hora-inicial").className = invalido;
	}
	else {
		pegaId("valida-hora-inicial").innerHTML = mensagem_02;
		pegaId("valida-hora-inicial").className = valido;
	}
	if (hora_final.value === "") {
		pegaId("valida-hora-final").innerHTML = mensagem_01;
		pegaId("valida-hora-final").className = invalido;
	}
	else {
		pegaId("valida-hora-final").innerHTML = mensagem_02;
		pegaId("valida-hora-final").className = valido;
	}
	if (data.value === "") {
		pegaId("valida-data").innerHTML = mensagem_01;
		pegaId("valida-data").className = invalido;
	}
	else {
		pegaId("valida-data").innerHTML = mensagem_02;
		pegaId("valida-data").className = valido;
	}
});

// Validação de formulário

(() => {
	window.addEventListener("load", () => {
		let formulario = document.getElementsByClassName("needs-validation");
			let validacao = Array.prototype.filter.call(formulario, (form) => {
				form.addEventListener("submit", (evento) => {

				if (form.checkValidity() === false) {
					evento.preventDefault();
					evento.stopPropagation();
				}
				form.classList.add("was-validated");
			}, false);
		});
	}, false);
})();

//	Modifica a cor do Status

let cor_status = status => {
	let cor = "";
	
	if(status == "Aguardando") {
		cor = `<span class="text-danger"><b>${status}</b></span>`;
	}
	else if(status == "Em uso") {
		cor = `<span class="text-success"><b>${status}</b></span>`;
	}
	else {
		cor = `<span class="text-primary"><b>${status}</b></span>`;
	}
	return cor;
}

//	Converter datas

let data_BR = data_USA => {
	let dia  		= data_USA.substr(8,2);
	let mes  		= `/${data_USA.substr(5,2)}`;
	let ano  		= `/${data_USA.substr(0,4)}`;
	let data_BR 	= `${dia}${mes}${ano}`;

	return data_BR;
}

let data_USA = data_BR => {
	let ano  		= data_BR.substr(6,4);
	let mes  		= `-${data_BR.substr(3,2)}`;	
	let dia  		= `-${data_BR.substr(0,2)}`;
	let data_USA 	= `${ano}${mes}${dia}`;

	return data_USA;
}

// Substitui o getElementById

function pegaId(id) {
	return document.getElementById(id);
}

// Cadastrar Reserva

cadastrar_reserva.onclick = () => {

	let reserva = new Reserva(usuario.value.trim(), equipamento.value.trim(), local.value.trim(), hora_inicial.value, hora_final.value, data.value, status);

	if(reserva.validarReserva()) {

		bancodados_reserve.gravar(reserva, "Reserva");
		
		modalCadastarSucesso("success", reserva.usuario, tabelaReserva(reserva.equipamento, reserva.local,reserva.hora_inicial,reserva.hora_final,data_BR(reserva.data),"success"));
		
		usuario.value = equipamento.value = local.value = data.value = hora_inicial.value = hora_final.value = "";
	}
	else {
		modalAcaoErro("cadastar");
	}
}

// Pesquisar Reserva

pesquisar_reserva.onclick = () => {
	
	let usuario 	 		= pegaId("usuario").value;
	let equipamento  		= pegaId("equipamento").value;
	let local 		 		= pegaId("local").value;
	let hora_inicial 		= pegaId("hora-inicial").value;
	let hora_final 	 		= pegaId("hora-final").value;
	let data 		 		= pegaId("data").value;

	if(usuario === "" && equipamento === "" && local === "" && hora_inicial === "" && hora_final === "" && data === "") {
		modalAcaoErro("pesquisar");
	}		
	else {
	
		let reserva = new Reserva(usuario.trim(), equipamento.trim(), local.trim(), hora_inicial, hora_final, data, status);
	
		let reservas = bancodados_reserve.pesquisaReserva(reserva, "Reserva");
	
		let lista_reservas = pegaId("lista-reservas-02");
		
		lista_reservas.innerHTML = "";
	
		reservas.forEach(r => {

			let linha = lista_reservas.insertRow();

			linha.insertCell(0).innerHTML = r.usuario;
			linha.insertCell(1).innerHTML = r.equipamento;
			linha.insertCell(2).innerHTML = r.local;
			linha.insertCell(3).innerHTML = cor_status(r.status);
			linha.insertCell(4).append(
				botaoEditarReserva(			r.id, r.usuario, r.equipamento, r.local, r.hora_inicial, r.hora_final, r.data, r.status),
				botaoVerificarReserva(		r.id, r.usuario, r.equipamento, r.local, r.hora_inicial, r.hora_final, r.data, r.status),
				botaoExcluirReserva( 		r.id, r.usuario, r.equipamento, r.local, r.hora_inicial, r.hora_final, r.data, r.status)
			);
		});
	}
}

// Buscar Reserva

buscar_reserva.onclick = () => {

	setInterval(() => {
		
		let usuario = buscar_reserva.value;

		let equipamento = local = hora_inicial = hora_final = data = status = "";

		let reserva = new Reserva(usuario.trim(), equipamento, local, hora_inicial, hora_final, data, status);
			
		let reservas = bancodados_reserve.pesquisaReserva(reserva, "Reserva");
	
		let lista_reservas = pegaId("lista-reservas-02");
		
		lista_reservas.innerHTML = "";
	
		reservas.forEach(r => {

			let linha = lista_reservas.insertRow();

			linha.insertCell(0).innerHTML = r.usuario;
			linha.insertCell(1).innerHTML = r.equipamento;
			linha.insertCell(2).innerHTML = r.local;
			linha.insertCell(3).innerHTML = cor_status(r.status);
			linha.insertCell(4).append(
				botaoEditarReserva(			r.id, r.usuario, r.equipamento, r.local, r.hora_inicial, r.hora_final, r.data, r.status),
				botaoVerificarReserva(		r.id, r.usuario, r.equipamento, r.local, r.hora_inicial, r.hora_final, r.data, r.status),
				botaoExcluirReserva( 		r.id, r.usuario, r.equipamento, r.local, r.hora_inicial, r.hora_final, r.data, r.status)
			);
		});
	});
}

// Botões

atualizar.onclick 	= () => window.location.reload();

imprimir.onclick 	= () => window.print();

excluir.onclick 	= () => {
	
	if(bancodados_reserve.verificaIdReserva()) {
		let resposta = prompt("Essa ação irá remover todas as reservas.\nDeseja realmente continuar?", "Não");

		if (resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
			modalExcluiTodasReservas();
			bancodados_reserve.removeTodasReservas();
		}
	}
}

alarme_ativado.onclick = () => {
	$('#toast').toast('show');
	
	pegaId("alarme-info").innerHTML 		= "Alarme ativado";
	pegaId("alarme-icone").className 		= "fas fa-bell fa-md";
	pegaId("alarme-ativado").className 		= "dropdown-item active";
	pegaId("alarme-desativado").className 	= "dropdown-item";
}

alarme_desativado.onclick = () => {
	$('#toast').toast('hide');

	pegaId("alarme-info").innerHTML 		= "Alarme desativado";
	pegaId("alarme-icone").className 		= "fas fa-bell-slash fa-md";
	pegaId("alarme-ativado").className 		= "dropdown-item";
	pegaId("alarme-desativado").className 	= "dropdown-item active";
}

// Status da Reserva

pegaId("status-01").innerHTML = bancodados_reserve.pesquisaStatusAguardando();
pegaId("status-02").innerHTML = bancodados_reserve.pesquisaStatusEmUso();
pegaId("status-03").innerHTML = bancodados_reserve.pesquisaStatusRecolhida();

// Editar

let botaoEditarReserva = (id, usuario, equipamento, local, hora_inicial, hora_final, data, status) => {
	
	let editar 			= document.createElement("button");
	editar.className 	= "btn btn-sm btn-group btn-group-sm border-0 btn-outline-success";
	editar.title 		= "Editar reserva";
	editar.innerHTML 	= '<i class="fas fa-user-edit fa-lg"></i>';
	editar.type	 		= "button";
	editar.id 			= `id-editar-${id}`;

	editar.onclick 		= function() {

		let = resposta = prompt(`Deseja EDITAR a reserva do(a) ${usuario}?`,"Não");

			if (resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {

				let _usuario		= prompt("Nome do(a) usuário(a)", usuario).trim();
				let _equipamento 	= prompt("Descrição do equipamento", equipamento).trim();
				let _local 			= prompt("Nome do local", local).trim();
				let _hora_inicial	= prompt("Horário inicial", hora_inicial).trim();
				let _hora_final		= prompt("Horário final", hora_final).trim();
				let _data 			= prompt("Data", data_BR(data)).trim();
				let _status 		= status;

				let reserva = new Reserva(_usuario, _equipamento, _local, _hora_inicial, _hora_final, data_USA(_data), _status);

				if (reserva.validarReserva()) {
					
					let id = this.id.replace("id-editar-","");
					
					bancodados_reserve.removerReserva(id);
					
					bancodados_reserve.gravar(reserva, "Reserva");
					
					modalEditarReserva("success", _usuario, tabelaReserva(_equipamento, _local, _hora_inicial, _hora_final, _data, "success"));
				}
				else {
					modalErro();
				}
			}
		}
	return editar;
}

// Verificar

let botaoVerificarReserva = (id, usuario, equipamento, local, hora_inicial, hora_final, data, status) => {

	verificar 			= document.createElement("button");
	verificar.className = "btn btn-sm btn-group btn-group-sm border-0 btn-outline-primary";
	verificar.title 	= "Verificar reserva";
	verificar.innerHTML = '<i class="fas fa-user-plus fa-lg"></i>';
	verificar.id 		= `id-verificar-${id}`;
 	
 	verificar.onclick 	= function() {
 	
 		if(status ===  "Aguardando") {
	
			let resposta = prompt(`A reserva do(a) ${usuario} já está em uso?`, "Não");
	
			if (resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
	
				let _usuario 	 	= usuario;
				let _equipamento 	= equipamento;
				let _local 		 	= local;
				let _hora_inicial	= hora_inicial;
				let _hora_final	 	= hora_final;
				let _data 		 	= data;
				let _status 	 	= "Em uso";
	
				let reserva  = new Reserva(_usuario, _equipamento, _local, _hora_inicial, _hora_final, _data, _status);
	
				if(reserva.validarReserva()) {

					let id = this.id.replace("id-verificar-","");
					
					bancodados_reserve.removerReserva(id);
					
					bancodados_reserve.gravar(reserva, "Reserva");
										
					modalVerificarReserva("primary", _usuario, tabelaReserva(_equipamento, _local, _hora_inicial, _hora_final, data_BR(_data), "primary"), cor_status(_status));
				}	
				else {
					modalErro();
				}
			}
 		}
 	
 		else if(status === "Em uso") {
	
			let resposta = prompt(`A reserva do(a) ${usuario} foi recolhida?`, "Não");
	
			if (resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {

				let _usuario 	 	= usuario;
				let _equipamento 	= equipamento;
				let _local 		 	= local;
				let _hora_inicial	= hora_inicial;
				let _hora_final	 	= hora_final;
				let _data 		 	= data;
				let _status 	 	= "Recolhida";
	
				let reserva  = new Reserva(_usuario, _equipamento, _local, _hora_inicial, _hora_final, _data, _status);
	
				if(reserva.validarReserva()) {

					let id = this.id.replace("id-verificar-","");
					
					bancodados_reserve.removerReserva(id);
					
					bancodados_reserve.gravar(reserva, "Reserva");
								
					modalVerificarReserva("primary", _usuario, tabelaReserva(_equipamento, _local, _hora_inicial, _hora_final, data_BR(_data), "primary"), cor_status(_status));
				}	
				else {
					modalErro();
				}
			}
		}	
		else {	
			modalVerificarErro("primary", usuario, status);
		}
	}
	return verificar;
}

// Excluir

let botaoExcluirReserva = (id, usuario, equipamento, local, hora_inicial, hora_final, data, status) => {

	excluir 			= document.createElement("button");
	excluir.className 	= "btn btn-sm btn-group btn-group-sm border-0 btn-outline-danger";
	excluir.title 		= "Excluir reserva";
	excluir.innerHTML 	= '<i class="fas fa-user-times fa-lg"></i>';
	excluir.id 			= `id-excluir-${id}`;

	excluir.onclick 	= function() {

		let resposta = prompt(`Deseja EXCLUIR a reserva do(a) ${usuario}?`, "Não");

		if (resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
			
			let id = this.id.replace("id-excluir-","");
			
			bancodados_reserve.removerReserva(id);
			
			modalExcluirReserva("danger", usuario, tabelaReserva(equipamento, local, hora_inicial, hora_final, data_BR(data), "danger"));
		}
	}
	return excluir;
}

// Modais

let modalCadastarSucesso = (estilo, usuario, tabela) => {
	$('#modal-01').modal('show');
	
	pegaId('modal-titulo-01').innerHTML 	= '<i class="fas fa-check-circle"></i> Sucesso!';
	pegaId('modal-documento-01').className	= `modal-dialog border border-${estilo} rounded alert-${estilo}`;
	pegaId('modal-cabecalho-01').className  = `modal-header text-white bg-${estilo}`;
	pegaId('modal-conteudo-01').innerHTML 	= `A reserva do(a) <span class="text-${estilo}"><b>${usuario}</b></span> foi cadastrada com <span class="text-${estilo}"><b>sucesso</b></span>!${tabela}`;
	pegaId('modal-botao-01').innerHTML 		= 'Voltar';
	pegaId('modal-botao-01').className 		= `btn btn-outline-${estilo}`;

	botao.onclick 	= () => window.location.reload();
	fechar.onclick 	= () => window.location.reload();
}

let modalAcaoErro = (acao) => {
	$('#modal-02').modal('show');

	pegaId('modal-titulo-02').innerHTML 	= '<i class="fas fa-times-circle"></i> Erro!';
	pegaId('modal-documento-02').className	= 'modal-dialog border border-danger rounded alert-danger';
	pegaId('modal-cabecalho-02').className  = 'modal-header text-white bg-danger';
	pegaId('modal-conteudo-02').innerHTML	= `Houve um erro ao <span class="text-danger"><b>${acao} a sua reserva</b></span>. Por favor, verifique se todos os campos foram preenchidos corretamente.`;
	pegaId('modal-botao-02').innerHTML		= 'Voltar';
	pegaId('modal-botao-02').className 		= 'btn btn-outline-danger';
}

let modalExcluiTodasReservas = () => {
	$('#modal-01').modal('show');
	
	pegaId('modal-titulo-01').innerHTML 	= '<i class="fas fa-trash-alt"></i> Excluir';
	pegaId('modal-documento-01').className	= 'modal-dialog border border-danger rounded alert-danger';
	pegaId('modal-cabecalho-01').className  = 'modal-header text-white bg-danger';
	pegaId('modal-conteudo-01').innerHTML	= 'Todas as suas reservas foram <span class="text-danger"><b>excluídas</b></span>!';
	pegaId('modal-botao-01').innerHTML		= 'Voltar';
	pegaId('modal-botao-01').className 		= 'btn btn-outline-danger';
	
	botao.onclick 	= () => window.location.reload();
	fechar.onclick 	= () => window.location.reload();
}

let modalEditarReserva = (estilo, usuario, tabela) => {
	$('#modal-01').modal('show');

	pegaId('modal-titulo-01').innerHTML 	= '<i class="fas fa-check-circle"></i> Sucesso!';
	pegaId('modal-documento-01').className	= `modal-dialog border border-${estilo} rounded alert-${estilo}`;
	pegaId('modal-cabecalho-01').className  = `modal-header text-white bg-${estilo}`;
	pegaId('modal-conteudo-01').innerHTML 	= `A reserva do(a) <span class="text-success"><b>${usuario}</b></span> foi alterada com <span class="text-success"><b>sucesso</b></span>!${tabela}`;
	pegaId('modal-botao-01').innerHTML 		= 'Voltar';
	pegaId('modal-botao-01').className 		= `btn btn-outline-${estilo}`;
	
	botao.onclick 	= () => window.location.reload();
	fechar.onclick 	= () => window.location.reload();
}

let modalVerificarReserva = (estilo, usuario, tabela, status) => {
	$('#modal-01').modal('show');

	pegaId('modal-titulo-01').innerHTML 	= '<i class="fas fa-user-plus"></i> Verificada';
	pegaId('modal-documento-01').className	= `modal-dialog border border-${estilo} rounded alert-${estilo}`;
	pegaId('modal-cabecalho-01').className  = `modal-header text-white bg-${estilo}`;
	pegaId('modal-conteudo-01').innerHTML 	= `A reserva do(a) <span class="text-${estilo}"><b>${usuario}</b></span> está <span class="text-${estilo}"><b>${status}</b></span>!${tabela}`;
	pegaId('modal-botao-01').innerHTML 		= 'Voltar';
	pegaId('modal-botao-01').className 		= `btn btn-outline-${estilo}`;
		
	botao.onclick 	= () => window.location.reload();
	fechar.onclick 	= () => window.location.reload();
}

let modalVerificarErro = (estilo, usuario, status) => {
	$('#modal-02').modal('show');

	pegaId('modal-titulo-02').innerHTML 	= '<i class="fas fa-user-plus"></i> Verificada';
	pegaId('modal-documento-02').className	= `modal-dialog border border-${estilo} rounded alert-${estilo}`;
	pegaId('modal-cabecalho-02').className  = `modal-header text-white bg-${estilo}`;
	pegaId('modal-conteudo-02').innerHTML 	= `A reserva do(a) <span class="text-${estilo}"><b>${usuario}</b></span> já está <span class="text-${estilo}"><b>${status}</b></span>!`;
	pegaId('modal-botao-02').innerHTML 		= 'Voltar';
	pegaId('modal-botao-02').className 		= `btn btn-outline-${estilo}`;
}

let modalExcluirReserva = (estilo, usuario, tabela) => {
	$('#modal-01').modal('show');

	pegaId('modal-titulo-01').innerHTML 	= '<i class="fas fa-user-times"></i> Excluir!';
	pegaId('modal-documento-01').className	= `modal-dialog border border-${estilo} rounded alert-${estilo}`;
	pegaId('modal-cabecalho-01').className  = `modal-header text-white bg-${estilo}`;
	pegaId('modal-conteudo-01').innerHTML 	= `A reserva do(a) <span class="text-${estilo}"><b>${usuario}</b></span> foi excluída com <span class="text-${estilo}"><b>sucesso</b></span>!${tabela}`;
	pegaId('modal-botao-01').innerHTML 		= 'Voltar';
	pegaId('modal-botao-01').className 		= `btn btn-outline-${estilo}`;
	
	botao.onclick 	= () => window.location.reload();
	fechar.onclick 	= () => window.location.reload();
}

let modalErro = () => {
	$('#modal-02').modal('show');		

	pegaId('modal-titulo-02').innerHTML 		= '<i class="fas fa-times-circle"></i> Erro!';
	pegaId('modal-documento-02').className		= 'modal-dialog border border-danger rounded alert-danger';
	pegaId('modal-cabecalho-02').className  	= 'modal-header text-white bg-danger';
	pegaId('modal-conteudo-02').innerHTML		= 'Nos desculpe, ocorreu algum <span class="text-danger"><b>erro</b></span>!';
	pegaId('modal-botao-02').innerHTML			= 'Voltar';
	pegaId('modal-botao-02').className 			= 'btn btn-outline-danger';
}

// Tabela

let tabelaReserva = (equipamento, local, hora_inicial, hora_final, data, estilo) => {
	let tabela = `
	<table class="table table-bordered text-center mt-4">
		<thead>
			<tr class="text-center bg-${estilo}">
				<th scope="col" class="text-white"><i class="fas fa-laptop fa-lg" title="Equipamento"></i></th>
				<th scope="col" class="text-white"><i class="fas fa-map-marker-alt fa-lg" title="Local"></i></th>
				<th scope="col" class="text-white" colspan="2"><i class="fas fa-user-clock fa-lg" title="Horário da reserva"></i></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>${equipamento}</td>
				<td>${local}</td>
				<td>${hora_inicial} - ${hora_final}</td>
				<td>${data}</td>
			</tr>
		</tbody>
	</table>`;

	return tabela;
}

// Exibindo a lista de Reservas no Dashboard

window.onload = () => {

	let reservas = Array();
	let lista_reservas = pegaId("lista-reservas-02");

	reservas = bancodados_reserve.recuperaReservas();

	reservas.forEach(r =>{

		let linha = lista_reservas.insertRow();

		linha.insertCell(0).innerHTML = r.usuario;
		linha.insertCell(1).innerHTML = r.equipamento;
		linha.insertCell(2).innerHTML = r.local;
		linha.insertCell(3).innerHTML = cor_status(r.status);
		linha.insertCell(4).append(
			botaoEditarReserva(			r.id, r.usuario, r.equipamento, r.local, r.hora_inicial, r.hora_final, r.data, r.status),
			botaoVerificarReserva(		r.id, r.usuario, r.equipamento, r.local, r.hora_inicial, r.hora_final, r.data, r.status),
			botaoExcluirReserva( 		r.id, r.usuario, r.equipamento, r.local, r.hora_inicial, r.hora_final, r.data, r.status)
		);
	});
};