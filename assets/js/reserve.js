/*!
 * Jeferson Luckas - reserve
 *
 * Author: Jeferson Luckas
 * Creation: 06/06/2020
 * Modification: 16/07/2020
 * Version: 2.0.0
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
			let n = null;

			if (r === n || r.usuario === u || r.equipamento === u || r.local === u || r.hora_inicial === u || r.hora_final === u || r.data === u || r.status === u) {
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
	removeTodasReservas() {
		let id = localStorage.getItem("idReserva");
	
		for(let i = 0; i <= id; i++) {
			localStorage.removeItem(id);
			if (id === null || id === null || id > 0) {
				localStorage.setItem("idReserva", 0);
			}
		}
	}
	removerReserva(id) {
		localStorage.removeItem(id);
	}
	pesquisaStatus(status) {

		switch(status) {
			case "status-01":
				status = "Aguardando";
				break
			case "status-02":
				status = "Utilizando";
				break
			case "status-03":
				status = "Recolhida";
				break
		}
		
		let pesquisa = Array();

		pesquisa = this.recuperaReservas();

		pesquisa = pesquisa.filter(p => p.status === status);
		
		pesquisa = pesquisa.length < 10 ? `0${pesquisa.length}`: pesquisa;
		
		return pesquisa;
	}
}

// Substitui o getElementById

let pega_id = id => document.getElementById(id);

// Variáveis globais

// Classe

let bancodados_reserve = new BancoDadosReserve(); 

// Formulário

let usuario 	 = pega_id("usuario");
let equipamento  = pega_id("equipamento");
let local 		 = pega_id("local");
let hora_inicial = pega_id("hora-inicial");
let hora_final 	 = pega_id("hora-final");
let data 		 = pega_id("data");
let status 		 = "Aguardando";

// Botões

let atualizar 			= pega_id("atualizar");
let imprimir 			= pega_id("imprimir");
let excluir 			= pega_id("excluir");

let alarme_ativado 		= pega_id("alarme-ativado");
let alarme_desativado 	= pega_id("alarme-desativado");
let alarme_info 		= pega_id("alarme-info");
let alarme_icone 		= pega_id("alarme-icone");

let cadastrar_reserva 	= pega_id("cadastrar-reserva");
let pesquisar_reserva 	= pega_id("pesquisar-reserva");
let buscar_reserva 		= pega_id("buscar-reserva");

// Validação

let valida_usuario 		= pega_id("valida-usuario");
let valida_equipamento 	= pega_id("valida-equipamento");
let valida_local 		= pega_id("valida-local");
let valida_hora_inicial = pega_id("valida-hora-inicial")
let valida_hora_final 	= pega_id("valida-hora-final");
let valida_data 		= pega_id("valida-data");

let valido 				= "valid-feedback";
let invalido 			= "invalid-feedback";
let mensagem_01 		= "Por favor, selecione uma opção válida.";
let mensagem_02 		= "Parece bom!";

// Modais

let botao 		 = pega_id("modal-botao-01");
let fechar 		 = pega_id("fechar-modal-01");

let titulo_01 	 = pega_id("modal-titulo-01");
let documento_01 = pega_id("modal-documento-01");
let cabecalho_01 = pega_id("modal-cabecalho-01");
let conteudo_01  = pega_id("modal-conteudo-01");
let botao_01 	 = pega_id("modal-botao-01");

let titulo_02 	 = pega_id("modal-titulo-02");
let documento_02 = pega_id("modal-documento-02");
let cabecalho_02 = pega_id("modal-cabecalho-02");
let conteudo_02  = pega_id("modal-conteudo-02");
let botao_02 	 = pega_id("modal-botao-02");

//  Lista de reservas

let lista_reservas = pega_id("lista-reservas-02");

// Funções auxiliares

// Métodos das classes BancoDadosReserve

let pesquisa_status = status 	=> bancodados_reserve.pesquisaStatus(status);

let gravar = (reserva, nome) 	=> bancodados_reserve.gravar(reserva, nome);

let remover_reserva = id 		=> bancodados_reserve.removerReserva(id);

let pesquisa_reserva = reserva 	=> bancodados_reserve.pesquisaReserva(reserva);

let remove_todas_reservas = () 	=> bancodados_reserve.removeTodasReservas();

let recupera_reservas = () 		=> bancodados_reserve.recuperaReservas();

// Validação de input

setInterval(() => {

	if (usuario.value === "") {
		valida_usuario.innerHTML = mensagem_01;
		valida_usuario.className = invalido;
	}
	else {
		valida_usuario.innerHTML = mensagem_02;
		valida_usuario.className = valido;
	}
	if (equipamento.value === "") {
		valida_equipamento.innerHTML = mensagem_01;
		valida_equipamento.className = invalido;
	}
	else {
		valida_equipamento.innerHTML = mensagem_02;
		valida_equipamento.className = valido;
	}
	if (local.value === "") {
		valida_local.innerHTML = mensagem_01;
		valida_local.className = invalido;
	}
	else {
		valida_local.innerHTML = mensagem_02;
		valida_local.className = valido;
	}
	if (hora_inicial.value === "") {
		valida_hora_inicial.innerHTML = mensagem_01;
		valida_hora_inicial.className = invalido;
	}
	else {
		valida_hora_inicial.innerHTML = mensagem_02;
		valida_hora_inicial.className = valido;
	}
	if (hora_final.value === "") {
		valida_hora_final.innerHTML = mensagem_01;
		valida_hora_final.className = invalido;
	}
	else {
		valida_hora_final.innerHTML = mensagem_02;
		valida_hora_final.className = valido;
	}
	if (data.value === "") {
		valida_data.innerHTML = mensagem_01;
		valida_data.className = invalido;
	}
	else {
		valida_data.innerHTML = mensagem_02;
		valida_data.className = valido;
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

let estilo_status = status => {
	
	let estilo = "";
	
	switch(status) {
		case "Aguardando":
			estilo = `<span class="badge badge-dark text-danger" title="${status}"><b>${status}</b></span>`;
			break
		case "Utilizando":
			estilo = `<span class="badge badge-dark text-success" title="${status}"><b>${status}</b></span>`;
			break
		case "Recolhida":
			estilo = `<span class="badge badge-dark text-primary" title="${status}"><b>${status}</b></span>`;
	}
	return estilo;
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

// Atualizar a página

let atualizar_pagina = () => {
	return window.location.reload();
}

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
					
					remover_reserva(id);
					
					gravar(reserva, "Reserva");
					
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

	let verificar 		= document.createElement("button");
	verificar.className = "btn btn-sm btn-group btn-group-sm border-0 btn-outline-primary";
	verificar.title 	= "Verificar reserva";
	verificar.innerHTML = '<i class="fas fa-user-plus fa-lg"></i>';
	verificar.id 		= `id-verificar-${id}`;
 	
 	verificar.onclick 	= function() {
 	
 		if(status ===  "Aguardando") {
	
			let resposta = prompt(`A reserva do(a) ${usuario} já está sendo Utilizada?`, "Não");
	
			if (resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
	
				let _usuario 	 	= usuario;
				let _equipamento 	= equipamento;
				let _local 		 	= local;
				let _hora_inicial	= hora_inicial;
				let _hora_final	 	= hora_final;
				let _data 		 	= data;
				let _status 	 	= "Utilizando";
	
				let reserva  = new Reserva(_usuario, _equipamento, _local, _hora_inicial, _hora_final, _data, _status);
	
				if(reserva.validarReserva()) {

					let id = this.id.replace("id-verificar-","");
					
					remover_reserva(id);
					
					gravar(reserva, "Reserva");
										
					modalVerificarReserva("primary", _usuario, tabelaReserva(_equipamento, _local, _hora_inicial, _hora_final, data_BR(_data), "primary"), _status);
				}	
				else {
					modalErro();
				}
			}
 		}
 	
 		else if(status === "Utilizando") {
	
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
					
					remover_reserva(id);
					
					gravar(reserva, "Reserva");
								
					modalVerificarReserva("primary", _usuario, tabelaReserva(_equipamento, _local, _hora_inicial, _hora_final, data_BR(_data), "primary"), _status);
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

	let excluir 		= document.createElement("button");
	excluir.className 	= "btn btn-sm btn-group btn-group-sm border-0 btn-outline-danger";
	excluir.title 		= "Excluir reserva";
	excluir.innerHTML 	= '<i class="fas fa-user-times fa-lg"></i>';
	excluir.id 			= `id-excluir-${id}`;

	excluir.onclick 	= function() {

		let resposta = prompt(`Deseja EXCLUIR a reserva do(a) ${usuario}?`, "Não");

		if (resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
			
			let id = this.id.replace("id-excluir-","");
			
			remover_reserva(id);
			
			modalExcluirReserva("danger", usuario, tabelaReserva(equipamento, local, hora_inicial, hora_final, data_BR(data), "danger"));
		}
	}
	return excluir;
}

// Modais

let modalCadastarSucesso = (estilo, usuario, tabela) => {
	$('#modal-01').modal('show');
	
	titulo_01.innerHTML 	= '<i class="fas fa-check-circle"></i> Sucesso!';
	documento_01.className	= `modal-dialog border border-${estilo} rounded alert-${estilo}`;
	cabecalho_01.className 	= `modal-header text-white bg-${estilo}`;
	conteudo_01.innerHTML 	= `A reserva do(a) <span class="text-${estilo}"><b>${usuario}</b></span> foi cadastrada com <span class="text-${estilo}"><b>sucesso</b></span>!${tabela}`;
	botao_01.className 		= `btn btn-outline-${estilo}`;

	botao.onclick 			= () => atualizar_pagina();
	fechar.onclick 			= () => atualizar_pagina();
}

let modalAcaoErro = (acao) => {
	$('#modal-02').modal('show');

	titulo_02.innerHTML 	= '<i class="fas fa-times-circle"></i> Erro!';
	documento_02.className	= 'modal-dialog border border-danger rounded alert-danger';
	cabecalho_02.className 	= 'modal-header text-white bg-danger';
	conteudo_02.innerHTML	= `Houve um erro ao <span class="text-danger"><b>${acao} a sua reserva</b></span>. Por favor, verifique se todos os campos foram preenchidos corretamente.`;
	botao_02.className 		= 'btn btn-outline-danger';
}

let modalExcluiTodasReservas = () => {
	$('#modal-01').modal('show');
	
	titulo_01.innerHTML 	= '<i class="fas fa-trash-alt"></i> Excluir';
	documento_01.className	= 'modal-dialog border border-danger rounded alert-danger';
	cabecalho_01.className 	= 'modal-header text-white bg-danger';
	conteudo_01.innerHTML	= 'Todas as suas reservas foram <span class="text-danger"><b>excluídas</b></span>!';
	botao_01.className 		= 'btn btn-outline-danger';
	
	botao.onclick 			= () => atualizar_pagina();
	fechar.onclick 			= () => atualizar_pagina();
}

let modalEditarReserva = (estilo, usuario, tabela) => {
	$('#modal-01').modal('show');

	titulo_01.innerHTML 	= '<i class="fas fa-check-circle"></i> Sucesso!';
	documento_01.className	= `modal-dialog border border-${estilo} rounded alert-${estilo}`;
	cabecalho_01.className 	= `modal-header text-white bg-${estilo}`;
	conteudo_01.innerHTML 	= `A reserva do(a) <span class="text-success"><b>${usuario}</b></span> foi alterada com <span class="text-success"><b>sucesso</b></span>!${tabela}`;
	botao_01.className 		= `btn btn-outline-${estilo}`;
	
	botao.onclick 			= () => atualizar_pagina();
	fechar.onclick 			= () => atualizar_pagina();
}

let modalVerificarReserva = (estilo, usuario, tabela, status) => {
	$('#modal-01').modal('show');

	titulo_01.innerHTML 	= '<i class="fas fa-user-plus"></i> Verificada';
	documento_01.className	= `modal-dialog border border-${estilo} rounded alert-${estilo}`;
	cabecalho_01.className 	= `modal-header text-white bg-${estilo}`;
	conteudo_01.innerHTML 	= `A reserva do(a) <span class="text-${estilo}"><b>${usuario}</b></span> está <span class="text-${estilo}"><b>${status}</b></span>!${tabela}`;
	botao_01.className 		= `btn btn-outline-${estilo}`;
		
	botao.onclick 			= () => atualizar_pagina();
	fechar.onclick 			= () => atualizar_pagina();
}

let modalVerificarErro = (estilo, usuario, status) => {
	$('#modal-02').modal('show');

	titulo_02.innerHTML 	= '<i class="fas fa-user-plus"></i> Verificada';
	documento_02.className	= `modal-dialog border border-${estilo} rounded alert-${estilo}`;
	cabecalho_02.className 	= `modal-header text-white bg-${estilo}`;
	conteudo_02.innerHTML 	= `A reserva do(a) <span class="text-${estilo}"><b>${usuario}</b></span> já está <span class="text-${estilo}"><b>${status}</b></span>!`;
	botao_02.className 		= `btn btn-outline-${estilo}`;
}

let modalExcluirReserva = (estilo, usuario, tabela) => {
	$('#modal-01').modal('show');

	titulo_01.innerHTML 	= '<i class="fas fa-user-times"></i> Excluir!';
	documento_01.className	= `modal-dialog border border-${estilo} rounded alert-${estilo}`;
	cabecalho_01.className 	= `modal-header text-white bg-${estilo}`;
	conteudo_01.innerHTML 	= `A reserva do(a) <span class="text-${estilo}"><b>${usuario}</b></span> foi excluída com <span class="text-${estilo}"><b>sucesso</b></span>!${tabela}`;
	botao_01.className 		= `btn btn-outline-${estilo}`;
	
	botao.onclick 			= () => atualizar_pagina();
	fechar.onclick 			= () => atualizar_pagina();
}

let modalErro = () => {
	$('#modal-02').modal('show');		

	titulo_02.innerHTML 	= '<i class="fas fa-times-circle"></i> Erro!';
	documento_02.className	= 'modal-dialog border border-danger rounded alert-danger';
	cabecalho_02.className 	= 'modal-header text-white bg-danger';
	conteudo_02.innerHTML	= 'Nos desculpe, ocorreu algum <span class="text-danger"><b>erro</b></span>!';
	botao_02.className 		= 'btn btn-outline-danger';
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

// Ações

// Cadastrar Reserva

cadastrar_reserva.onclick = () => {

	let reserva = new Reserva(usuario.value.trim(), equipamento.value.trim(), local.value.trim(), hora_inicial.value, hora_final.value, data.value, status);

	if(reserva.validarReserva()) {

		gravar(reserva, "Reserva");
		
		modalCadastarSucesso("success", reserva.usuario, tabelaReserva(reserva.equipamento, reserva.local,reserva.hora_inicial,reserva.hora_final,data_BR(reserva.data),"success"));
		
		usuario.value = equipamento.value = local.value = data.value = hora_inicial.value = hora_final.value = "";
	}
	else {
		modalAcaoErro("cadastar");
	}
}

// Pesquisar Reserva

pesquisar_reserva.onclick = () => {
	
	let usuario 	 		= pega_id("usuario").value;
	let equipamento  		= pega_id("equipamento").value;
	let local 		 		= pega_id("local").value;
	let hora_inicial 		= pega_id("hora-inicial").value;
	let hora_final 	 		= pega_id("hora-final").value;
	let data 		 		= pega_id("data").value;

	if(usuario === "" && equipamento === "" && local === "" && hora_inicial === "" && hora_final === "" && data === "") {
		modalAcaoErro("pesquisar");
	}		
	else {
	
		let reserva = new Reserva(usuario.trim(), equipamento.trim(), local.trim(), hora_inicial, hora_final, data, status);
	
		let reservas = pesquisa_reserva(reserva, "Reserva");
			
		lista_reservas.innerHTML = "";
	
		reservas.forEach( r => {

			let linha = lista_reservas.insertRow();

			linha.insertCell(0).innerHTML = r.usuario;
			linha.insertCell(1).innerHTML = r.equipamento;
			linha.insertCell(2).innerHTML = r.local;
			linha.insertCell(3).innerHTML = estilo_status(r.status);
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
			
		let reservas = pesquisa_reserva(reserva, "Reserva");
			
		lista_reservas.innerHTML = "";
	
		reservas.forEach( r => {

			let linha = lista_reservas.insertRow();

			linha.insertCell(0).innerHTML = r.usuario;
			linha.insertCell(1).innerHTML = r.equipamento;
			linha.insertCell(2).innerHTML = r.local;
			linha.insertCell(3).innerHTML = estilo_status(r.status);
			linha.insertCell(4).append(
				botaoEditarReserva(			r.id, r.usuario, r.equipamento, r.local, r.hora_inicial, r.hora_final, r.data, r.status),
				botaoVerificarReserva(		r.id, r.usuario, r.equipamento, r.local, r.hora_inicial, r.hora_final, r.data, r.status),
				botaoExcluirReserva( 		r.id, r.usuario, r.equipamento, r.local, r.hora_inicial, r.hora_final, r.data, r.status)
			);
		});
	});
}

// Botões

atualizar.onclick 	= () => atualizar_pagina();

imprimir.onclick 	= () => window.print();

excluir.onclick 	= () => {
	
	if(bancodados_reserve.verificaIdReserva()) {
		let resposta = prompt("Essa ação irá remover todas as reservas.\nDeseja realmente continuar?", "Não");

		if (resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
			modalExcluiTodasReservas();
			remove_todas_reservas();
		}
	}
}

alarme_ativado.onclick = () => {
	$('#toast').toast('show');
	
	alarme_info.innerHTML 		= "Alarme ativado";
	alarme_icone.className 		= "fas fa-bell fa-md";
	alarme_ativado.className 	= "dropdown-item active";
	alarme_desativado.className = "dropdown-item";
}

alarme_desativado.onclick = () => {
	$('#toast').toast('hide');

	alarme_info.innerHTML 		= "Alarme desativado";
	alarme_icone.className 		= "fas fa-bell-slash fa-md";
	alarme_ativado.className 	= "dropdown-item";
	alarme_desativado.className = "dropdown-item active";
}

// Status das Reservas

for (let i = 1; i <= 3; i++) {
	pega_id(`status-0${i}`).innerHTML = pesquisa_status(`status-0${i}`);
}

// Exibindo a lista de Reservas no Dashboard

window.onload = () => {

	let reservas = Array();

	reservas = recupera_reservas();

	reservas.forEach( r =>{

		let linha = lista_reservas.insertRow();

		linha.insertCell(0).innerHTML = r.usuario;
		linha.insertCell(1).innerHTML = r.equipamento;
		linha.insertCell(2).innerHTML = r.local;
		linha.insertCell(3).innerHTML = estilo_status(r.status);
		linha.insertCell(4).append(
			botaoEditarReserva(			r.id, r.usuario, r.equipamento, r.local, r.hora_inicial, r.hora_final, r.data, r.status),
			botaoVerificarReserva(		r.id, r.usuario, r.equipamento, r.local, r.hora_inicial, r.hora_final, r.data, r.status),
			botaoExcluirReserva( 		r.id, r.usuario, r.equipamento, r.local, r.hora_inicial, r.hora_final, r.data, r.status)
		);
	});
};