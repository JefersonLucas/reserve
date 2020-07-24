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
			let reserva = JSON.parse(localStorage.getItem(i));

			if (
				reserva 				=== null 		||
				reserva.usuario 		=== undefined 	||
				reserva.equipamento 	=== undefined 	||
				reserva.local 			=== undefined 	||
				reserva.hora_inicial 	=== undefined 	||
				reserva.hora_final 		=== undefined 	||
				reserva.data 			=== undefined 	||
				reserva.status 			=== undefined) {
				continue;
			}
			reserva.id = i;
			reservas.push(reserva)
		}
		return reservas;
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
let cadastrar_usuario 	= pegaId("cadastrar-usuario");
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
	let cor = null;
	
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

cadastrar_usuario.onclick = () => {

	let reserva = new Reserva(
		usuario.value.trim(),
		equipamento.value.trim(),
		local.value.trim(),
		hora_inicial.value,
		hora_final.value,
		data.value,
		status
	);

	if(reserva.validarReserva()) {

		bancodados_reserve.gravar(reserva, "Reserva");
		
		modalCadastarSucesso(
			reserva.usuario,
			tabelaReserva(
				"success",
				reserva.equipamento,
				reserva.local,
				data_BR(reserva.data),
				reserva.hora_inicial,
				reserva.hora_final
		));
		usuario.value = equipamento.value = local.value = data.value = hora_inicial.value = hora_final.value = "";
	}
	else {
		modalCadastrarErro();
	}
}

// Pesquisar Reserva

// Botões

atualizar.onclick 	= () => window.location.reload();

imprimir.onclick 	= () => window.print();

excluir.onclick 	= () => {
	
	if(bancodados_reserve.verificaIdReserva()) {
		let pergunta = prompt("Essa ação irá remover todas as reservas.\nDeseja realmente continuar?", "Não");

		if (pergunta === "Sim" || pergunta === "S" || pergunta === "sim" || pergunta === "s") {
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

// Grupo de Botões

`<div class="btn-group btn-group-sm d-flex justify-content-center align-items-center" role="group">

	<!-- Botão Editar -->			
		
	<!-- Botão Vericar -->
	<button class="btn btn-sm btn-outline-primary border-0" id="verificar" title="Vericar reserva" type="button">
		<i class="fas fa-user-plus fa-lg"></i>
	</button>

	<!-- Botão Excluir -->
	<button class="btn btn-sm btn-outline-danger border-0" id="excluir" title="Excluir reserva" type="button">
		<i class="fas fa-user-times fa-lg"></i>
	</button>

</div>`

let grupo_botoes = (id, editar, verificar, excluir) => {

	let botoes 			= document.createElement("div");
	botoes.className 	= "btn-group btn-group-sm d-flex justify-content-center align-items-center";
	botoes.title 		= "Opções";
	botoes.role 		= "group"
	botoes.id 			= `id-botoes-${id}`;

	return botoes;
}

// Editar

// <button class="btn btn-sm btn-outline-success border-0" title="Editar reserva" type="button">
// <i class="fas fa-user-edit fa-lg"></i>

let botaoEditarReserva = (id, nome, equipamento, local, hora_inicial, hora_final, data, status) => {
	
	let editar 			= document.createElement("button");
	editar.className 	= "btn btn-sm btn-group btn-group-sm border-0 btn-outline-success";
	editar.title 		= "Editar reserva";
	editar.innerHTML 	= '<i class="fas fa-user-edit fa-lg"></i>';
	editar.type	 		= "button";
	editar.id 			= `id-editar-${id}`;

	// editar.onclick 		= function() {

	// 	let = resposta = prompt("Deseja EDITAR a reserva do(a) Professor(a) "+nome+"?","Não");

	// 		if(resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {

	// 			let _nome 			= prompt("Nome do(a) Professor(a):", nome).trim();
	// 			let _equipamento 	= prompt("Descrição do equipamento:",equipamento).trim();
	// 			let _sala 			= prompt("Nome da sala:",sala).trim();
	// 			let _horaA 			= prompt("Início da aula:",horaA).trim();
	// 			let _horaB 			= prompt("Término da aula:",horaB).trim();
	// 			let _dataA 			= prompt("Data da aula:",dataBR(dataA)).trim();

	// 			let reserva = new ReservaProfessor(_nome, _equipamento, status, _sala, dataEUA(_dataA), _horaA, dataB, _horaB, horaC, horaD);

	// 			if (reserva.validarDados()) {

	// 				let id = this.id.replace('id-editar-','');
	// 				bancodedados.removerReserva(id);

	// 				modalEditar(_nome, tabelaProfessorA("success", _equipamento, _sala, _dataA, horaSeg(_horaA), horaSeg(_horaB)), "Professor");
	// 				bancodedados.gravar(reserva, "Professor");

	// 			}
	// 			else{
	// 				modalErro();
	// 			}
	// 		}
	// 	}
	return editar;
}

// Verificar

let botaoVerificarReserva = (id, nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) => {

	verificar 			= document.createElement("button");
	verificar.className = "btn btn-sm btn-group btn-group-sm border-0 btn-outline-primary";
	verificar.title 	= "Verificar reserva";
	verificar.innerHTML = '<i class="fas fa-user-plus fa-lg"></i>';
	verificar.id 		= `id-verificar-${id}`;
 	
 // 	verificar.onclick 	= function() {
 	
 // 			if(status ==  "Aguardando") {
	
	// 		let resposta = prompt("A reserva do(a) Professor(a) "+nome+" já está em uso?", "Não");
	
	// 		if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
	
	// 			let _nome 		 = nome;
	// 			let _equipamento = equipamento;
	// 			let _status 	 = "Em uso";
	// 			let _sala 		 = sala;
	// 			let _dataA 		 = dataA;
	// 			let _horaA 		 = horaA;
	// 			let _horaB 		 = horaB;
	// 			let _dataB 		 = dataAtual();
	// 			let _horaC 		 = horaAtual(0,0,0);
	// 			let _horaD 		 = horaD;
	
	// 			reserva  = new ReservaProfessor(_nome, _equipamento, _status, _sala, _dataA, _horaA, _dataB, _horaB, _horaC, _horaD);
	
	// 			if(reserva.validarDados()) {
	// 				modalVerificar(_nome, tabelaProfessorB("primary", _equipamento, cor(_status), _sala, dataBR(_dataA), horaSeg(_horaA), dataBR(_dataB), horaSeg(_horaB), _horaC, _horaD), "Professor", _status);
	// 				let id = this.id.replace('id-verifica-','');
	// 				bancodedados.removerReserva(id);				
	// 				bancodedados.gravar(reserva, "Professor");
	// 			}
	
	// 			else {
	// 				modalErro();
	// 			}
	// 		}
 // 		}
 	
 // 		else if(status == "Em uso") {
	
	// 		let resposta = prompt("A reserva do(a) Professor(a) "+nome+" foi recolhida?", "Não");
	
	// 		if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
	// 			let _nome 		 = nome;
	// 			let _equipamento = equipamento;
	// 			let _status 	 = "Recolhida";
	// 			let _sala 		 = sala;
	// 			let _dataA 		 = dataA;
	// 			let _horaA 		 = horaA;
	// 			let _horaB 		 = horaB;
	// 			let _dataB 		 = dataB;
	// 			let _horaC 		 = horaC;
	// 			let _horaD 		 = horaAtual(0,0,0);
	
	// 			reserva  = new ReservaProfessor(_nome, _equipamento, _status, _sala, _dataA, _horaA, _dataB, _horaB, _horaC, _horaD);
	// 			if(reserva.validarDados()) {
	// 				let id = this.id.replace('id-verifica-','');
	// 				bancodedados.removerReserva(id);
	// 				modalVerificar(_nome, tabelaProfessorB("primary", _equipamento, cor(_status), _sala, dataBR(_dataA), horaSeg(_horaA), dataBR(_dataB), horaSeg(_horaB), _horaC, _horaD), "Professor", _status);
	// 				bancodedados.gravar(reserva, "Professor");
	// 			}
	// 			else {
	// 				modalErro();
	// 			}
	// 		}
	// 	}	
	// 	else {	
	// 		modalVerificarErro(nome, "Professor");
	// 	}
	// }
	return verificar;
}

// Excluir

let botaoExcluirReserva = (id, nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) => {

	excluir 			= document.createElement("button");
	excluir.className 	= 'btn btn-sm btn-group btn-group-sm border-0 btn-outline-danger';
	excluir.title 		= 'Excluir reserva';
	excluir.innerHTML 	= '<i class="fas fa-user-times fa-lg"></i>';
	excluir.id 			= `id-excluir-${id}`;

	// excluir.onclick 	= function() {

	// 	let resposta = prompt("Deseja EXCLUIR a reserva do(a) Professor(a) "+nome+"?", "Não");

	// 	if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {

	// 		let id = this.id.replace('id-excluir-','');
	// 		bancodedados.removerReserva(id);
	// 		modalExcluir(nome, tabelaProfessorB("danger", equipamento, cor(status), sala, dataBR(dataA), horaSeg(horaA), dataBR(dataB), horaSeg(horaB), horaC, horaD), "Professor");
	// 	}
	// }
	return excluir;
}

// Status da Reserva

pegaId("status-01").innerHTML = bancodados_reserve.pesquisaStatusAguardando();
pegaId("status-02").innerHTML = bancodados_reserve.pesquisaStatusEmUso();
pegaId("status-03").innerHTML = bancodados_reserve.pesquisaStatusRecolhida();

// Modais

let modalCadastarSucesso = (nome, tabela) => {
	$('#modal-01').modal('show');
	
	pegaId('modal-titulo-01').innerHTML 	= '<i class="fas fa-check-circle"></i> Sucesso!';
	pegaId('modal-documento-01').className	= 'modal-dialog border border-success rounded alert-success';
	pegaId('modal-cabecalho-01').className  = 'modal-header text-white bg-success';
	pegaId('modal-conteudo-01').innerHTML 	= `A reserva do(a) <span class="text-success"><b>${nome}</b></span> foi cadastrada com <span class="text-success"><b>sucesso</b></span>!${tabela}`;
	pegaId('modal-botao-01').innerHTML 		= 'Voltar';
	pegaId('modal-botao-01').className 		= 'btn btn-outline-success';

	let botao 	= pegaId('modal-botao-01');
	let fechar 	= pegaId('fechar-modal-01');	
	
	botao.onclick 	= () => window.location.reload();
	fechar.onclick 	= () => window.location.reload();
}

let modalCadastrarErro = () => {
	$('#modal-02').modal('show');

	pegaId('modal-titulo-02').innerHTML 	= '<i class="fas fa-times-circle"></i> Erro!';
	pegaId('modal-documento-02').className	= 'modal-dialog border border-danger rounded alert-danger';
	pegaId('modal-cabecalho-02').className  = 'modal-header text-white bg-danger';
	pegaId('modal-conteudo-02').innerHTML	= 'Houve um erro ao cadastrar a sua <span class="text-danger"><b>reserva</b></span>. Por favor, verifique se todos os campos foram preenchidos corretamente.';
	pegaId('modal-botao-02').innerHTML		= 'Voltar';
	pegaId('modal-botao-02').className 		= 'btn btn-outline-danger';
}

let modalExcluiTodasReservas = () => {
	$('#modal-02').modal('show');
	
	pegaId('modal-titulo-02').innerHTML 	= '<i class="fas fa-trash-alt"></i> Excluir';
	pegaId('modal-documento-02').className	= 'modal-dialog border border-danger rounded alert-danger';
	pegaId('modal-cabecalho-02').className  = 'modal-header text-white bg-danger';
	pegaId('modal-conteudo-02').innerHTML	= 'Todas as suas reservas foram <span class="text-danger"><b>excluídas</b></span>!';
	pegaId('modal-botao-02').innerHTML		= 'Voltar';
	pegaId('modal-botao-02').className 		= 'btn btn-outline-danger';
}

// Tabelas

let tabelaReserva = (bg, equipamento, local, data, hora_inicial, hora_final) => {
	let tabela = `
	<table class="table table-bordered text-center mt-4">
		<thead>
			<tr class="text-center bg-${bg}">
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
			botaoEditarReserva(),
			botaoVerificarReserva(),
			botaoExcluirReserva()
		);
	});
};