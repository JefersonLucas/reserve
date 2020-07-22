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
	constructor(usuario, equipamento, local, hora_inicial, hora_final, data) {
		this.usuario 		= usuario;
		this.equipamento 	= equipamento;
		this.local 			= local;
		this.hora_inicial 	= hora_inicial;
		this.hora_final 	= hora_final;
		this.data 			= data;
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

// Variáveis globais

let usuario 	 		= document.getElementById("usuario");
let equipamento  		= document.getElementById("equipamento");
let local 		 		= document.getElementById("local");
let hora_inicial 		= document.getElementById("hora-inicial");
let hora_final 	 		= document.getElementById("hora-final");
let data 		 		= document.getElementById("data");
let atualizar 			= document.getElementById("atualizar");
let imprimir 			= document.getElementById("imprimir");
let alarme_ativado 		= document.getElementById("alarme-ativado");
let alarme_desativado 	= document.getElementById("alarme-desativado");

// Validações

// Formulário

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

// Imput

setInterval(() =>{

	if (usuario.value === "" || usuario.value === null || usuario.value === undefined) {
		document.getElementById("valida-usuario").innerHTML = "Por favor, selecione uma opção válida.";
		document.getElementById("valida-usuario").className = "invalid-feedback";
	}
	else {
		document.getElementById("valida-usuario").innerHTML = "Parece bom!";
		document.getElementById("valida-usuario").className = "valid-feedback";
	}
	if (equipamento.value === "" || equipamento.value === null || equipamento.value === undefined) {
		document.getElementById("valida-equipamento").innerHTML = "Por favor, selecione uma opção válida.";
		document.getElementById("valida-equipamento").className = "invalid-feedback";
	}
	else {
		document.getElementById("valida-equipamento").innerHTML = "Parece bom!";
		document.getElementById("valida-equipamento").className = "valid-feedback";
	}
	if (local.value === "" || local.value === null || local.value === undefined) {
		document.getElementById("valida-local").innerHTML = "Por favor, selecione uma opção válida.";
		document.getElementById("valida-local").className = "invalid-feedback";
	}
	else {
		document.getElementById("valida-local").innerHTML = "Parece bom!";
		document.getElementById("valida-local").className = "valid-feedback";
	}
	if (hora_inicial.value === "" || hora_inicial.value === null || hora_inicial.value === undefined) {
		document.getElementById("valida-hora-inicial").innerHTML = "Por favor, selecione uma opção válida.";
		document.getElementById("valida-hora-inicial").className = "invalid-feedback";
	}
	else {
		document.getElementById("valida-hora-inicial").innerHTML = "Parece bom!";
		document.getElementById("valida-hora-inicial").className = "valid-feedback";
	}
	if (hora_final.value === "" || hora_final.value === null || hora_final.value === undefined) {
		document.getElementById("valida-hora-final").innerHTML = "Por favor, selecione uma opção válida.";
		document.getElementById("valida-hora-final").className = "invalid-feedback";
	}
	else {
		document.getElementById("valida-hora-final").innerHTML = "Parece bom!";
		document.getElementById("valida-hora-final").className = "valid-feedback";
	}
	if (data.value === "" || data.value === null || data.value === undefined) {
		document.getElementById("valida-data").innerHTML = "Por favor, selecione uma opção válida.";
		document.getElementById("valida-data").className = "invalid-feedback";
	}
	else {
		document.getElementById("valida-data").innerHTML = "Parece bom!";
		document.getElementById("valida-data").className = "valid-feedback";
	}
});

// Cadastrar Reserva

let cadastrar_usuario = document.getElementById("cadastrar-usuario");

cadastrar_usuario.onclick = () => {

	let reserva = new Reserva(usuario.value.trim(),equipamento.value.trim(),local.value.trim(),hora_inicial.value,hora_final.value,data.value)

	if(reserva.validarReserva()) {
		modalCadastarSucesso(reserva.usuario, tabelaReserva("success", reserva.equipamento, reserva.local, data_BR(reserva.data), reserva.hora_inicial, reserva.hora_final));
		usuario.value = equipamento.value = local.value = data.value = hora_inicial.value = hora_final.value = "";
	}
	else {
		modalCadastrarErro();
	}
}

// Modais

let modalCadastarSucesso = (nome, tabela) => {
	$('#modal-01').modal('show');
	document.getElementById('modal-titulo-01').innerHTML 		= '<i class="fas fa-check-circle"></i> Sucesso!';
	document.getElementById('modal-documento-01').className		= 'modal-dialog border border-success rounded alert-success';
	document.getElementById('modal-cabecalho-01').className  	= 'modal-header text-white bg-success';
	document.getElementById('modal-conteudo-01').innerHTML 		= `A reserva do(a) <span class="text-success"><b>${nome}</b></span> foi cadastrada com <span class="text-success"><b>sucesso</b></span>!${tabela}`;
	document.getElementById('modal-botao-01').innerHTML 		= 'Voltar';
	document.getElementById('modal-botao-01').className 		= 'btn btn-outline-success';
}
let modalCadastrarErro = () => {
	$('#modal-02').modal('show');
	document.getElementById('modal-titulo-02').innerHTML 		= '<i class="fas fa-times-circle"></i> Erro!';
	document.getElementById('modal-documento-02').className		= 'modal-dialog border border-danger rounded alert-danger';
	document.getElementById('modal-cabecalho-02').className  	= 'modal-header text-white bg-danger';
	document.getElementById('modal-conteudo-02').innerHTML		= 'Houve um erro ao cadastrar a sua <span class="text-danger"><b>reserva</b></span>. Por favor, verifique se todos os campos foram preenchidos corretamente.';
	document.getElementById('modal-botao-02').innerHTML			= 'Voltar';
	document.getElementById('modal-botao-02').className 		= 'btn btn-outline-danger';
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
				<td>${hora_inicial} / ${hora_final}</td>
				<td>${data}</td>
			</tr>
		</tbody>
	</table>`;
	return tabela;
}

window.onload = () => {
	
}

// Funções auxiliares

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

// Botões

atualizar.onclick 	= () => window.location.reload();
imprimir.onclick 	= () => window.print();

alarme_ativado.onclick = () => {
	$('#toast').toast('show');
	document.getElementById("alarme-info").innerHTML 		= "Alarme ativado";
	document.getElementById("alarme-icone").className 		= "fas fa-bell fa-md";
	document.getElementById("alarme-ativado").className 	= "dropdown-item active";
	document.getElementById("alarme-desativado").className 	= "dropdown-item";
}

alarme_desativado.onclick = () => {
	$('#toast').toast('hide');
	document.getElementById("alarme-info").innerHTML 		= "Alarme desativado";
	document.getElementById("alarme-icone").className 		= "fas fa-bell-slash fa-md";
	document.getElementById("alarme-ativado").className 	= "dropdown-item";
	document.getElementById("alarme-desativado").className 	= "dropdown-item active";
}