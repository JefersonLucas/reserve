/*!
 * Jeferson Luckas - reserve
 *
 * Author: Jeferson Luckas
 * Creation: 06/06/2020
 * Modification: 16/07/2020
 * Version: 1.0.0
 * Description: Perfil core
 *
 * Copyright (c) 2020 Jeferson Luckas
 * Released under the MIT license
 * https://github.com/JefersonLucas/reserve/blob/master/LICENSE
 *
 */

class Administrador {
	constructor(nome, sobrenome) {
		this.nome 		= nome;
		this.sobrenome 	= sobrenome;
	}
	validarAdministrador() {
		for(let a in this) {
			if (this[a] === "" || this[a] === null || this[a] === undefined) {
				return false;
			}
		}
		return true;
	}
}
class BancodeDadosReserva {
	constructor() {
		let idAdministrador = localStorage.getItem("idAdministrador");
		idAdministrador = idAdministrador === null ? localStorage.setItem("idAdministrador", 0) : idAdministrador;
	}
	gravarAdministrador(administrador) {
		let id = 0;
		localStorage.setItem(id, JSON.stringify(administrador));
		localStorage.setItem("idAdministrador", id);
	}
	recuperaDadosAdministrador() {
		let administrador = Array();

		let id = localStorage.getItem("idAdministrador");

		for(let i = 0; i <= id; i++) {
			let admin = JSON.parse(localStorage.getItem(i));
			if (admin === null) {
				continue
			}
			admin.id = i;
			administrador.push(admin); 
		}
		return administrador;
	}
}

let bancodedados = new BancodeDadosReserva();

let cadastrar_administrador = document.getElementById("cadastar-administrador");

let nome_01 = document.getElementById("nome-01");
let nome_02 = document.getElementById("nome-02");

setInterval(() =>{

	if (nome_01.value === "" || nome_01.value === null || nome_01.value === undefined) {
		document.getElementById("valida-nome-01").innerHTML = "Por favor, selecione uma opção válida.";
		document.getElementById("valida-nome-01").className = "invalid-feedback";
	}
	else {
		document.getElementById("valida-nome-01").innerHTML = "Parece bom!";
		document.getElementById("valida-nome-01").className = "valid-feedback";
	}
	if (nome_02.value === "" || nome_02.value === null || nome_02.value === undefined) {
		document.getElementById("valida-nome-02").innerHTML = "Por favor, selecione uma opção válida.";
		document.getElementById("valida-nome-02").className = "invalid-feedback";
	}
	else {
		document.getElementById("valida-nome-02").innerHTML = "Parece bom!";
		document.getElementById("valida-nome-02").className = "valid-feedback";
	}
});

cadastrar_administrador.onclick = () => {

	let administrador = new Administrador(nome_01.value.trim(), nome_02.value.trim());

	if (administrador.validarAdministrador()) {

		modalCadastarSucesso(administrador.nome, administrador.sobrenome, tabelaReserva("success", administrador.nome, administrador.sobrenome));
		
		bancodedados.gravarAdministrador(administrador);
		
		nome_01.value = nome_02.value = "";
	}
	else {
		modalCadastrarErro();
	}
}

let dadosAdministrador = () => {
	let administrador = Array();

	administrador = bancodedados.recuperaDadosAdministrador();

	administrador.forEach((a) => {
		document.getElementById("nome-01").value = a.nome;
		document.getElementById("nome-02").value = a.sobrenome;
	})
}

window.onload = () => {
	dadosAdministrador();
}


let modalCadastarSucesso = (nome, sobrenome ,tabela) => {
	$('#modal-01').modal('show');
	document.getElementById('modal-titulo-01').innerHTML 		= '<i class="fas fa-check-circle"></i> Sucesso!';
	document.getElementById('modal-documento-01').className		= 'modal-dialog border border-success rounded alert-success';
	document.getElementById('modal-cabecalho-01').className  	= 'modal-header text-white bg-success';
	document.getElementById('modal-conteudo-01').innerHTML 		= `A reserva do(a) <span class="text-success"><b>${nome} ${sobrenome}</b></span> foi cadastrada com <span class="text-success"><b>sucesso</b></span>!${tabela}`;
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

let tabelaReserva = (bg, nome, sobrenome) => {
	let tabela = `
	<table class="table table-bordered text-center mt-4">
		<thead>
			<tr class="text-center bg-${bg}">
				<th scope="col" colspan="2" class="text-white"><i class="fas fa-signature fa-lg" title="Equipamento"></i></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>${nome}</td>
				<td>${sobrenome}</td>
			</tr>
		</tbody>
	</table>`;
	return tabela;
}