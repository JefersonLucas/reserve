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

// Classes

class Administrador {
	constructor(nome = "Nome") {
		this.nome = nome;
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
class BancoDadosPerfil {
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
				continue;
			}
			admin.id = i;
			administrador.push(admin);
		}
		return administrador;
	}
}

// Substitui o getElementById

let pega_id = id => document.getElementById(id);

// Variáveis globais

let bancodados_perfil = new BancoDadosPerfil();
let nome 					= pega_id("nome-administrador");
let cadastrar_administrador = pega_id("cadastar-administrador");

let valida_nome 			= pega_id("valida-nome")
let valido 					= "valid-feedback";
let invalido 				= "invalid-feedback";
let mensagem_01 			= "Por favor, selecione uma opção válida.";
let mensagem_02 			= "Parece bom!";

let botao 					= pega_id('modal-botao-01');
let fechar 					= pega_id('fechar-modal-01');

let titulo_01 				= pega_id('modal-titulo-01');
let titulo_02 				= pega_id('modal-titulo-02');
let documento_01 			= pega_id('modal-documento-01');
let documento_02 			= pega_id('modal-documento-02');
let cabecalho_01 			= pega_id('modal-cabecalho-01');
let cabecalho_02 			= pega_id('modal-cabecalho-02');
let conteudo_01 			= pega_id('modal-conteudo-01');
let conteudo_02 			= pega_id('modal-conteudo-02');
let botao_01 				= pega_id('modal-botao-01');
let botao_02 				= pega_id('modal-botao-02');

// Funções auxiliares

setInterval(() => {

	if (nome.value === "" || nome.value === null || nome.value === undefined) {
		valida_nome.innerHTML = mensagem_01;
		valida_nome.className = invalido;
	}
	else {
		valida_nome.innerHTML = mensagem_02
		valida_nome.className = valido;
	}
});

// Atualizar a página

let atualizar_pagina = () => {
	return window.location.reload();
}

let recupera_dados = () => bancodados_perfil.recuperaDadosAdministrador();
let gravar_administrador = administrador => bancodados_perfil.gravarAdministrador(administrador);


// Modais

let modalCadastarSucesso = (nome, tabela) => {
	$('#modal-01').modal('show');

	titulo_01.innerHTML 	= '<i class="fas fa-check-circle"></i> Sucesso!';
	documento_01.className	= 'modal-dialog border border-success rounded alert-success';
	cabecalho_01.className  = 'modal-header text-white bg-success';
	conteudo_01.innerHTML 	= `Administrador(a) <span class="text-success"><b>${nome}</b></span> foi atualizado com <span class="text-success"><b>sucesso</b></span>!${tabela}`;
	botao_01.className 		= 'btn btn-outline-success';

	botao.onclick 	= () => atualizar_pagina();
	fechar.onclick 	= () => atualizar_pagina();
}

let modalCadastrarErro = () => {
	$('#modal-02').modal('show');

	titulo_02.innerHTML 	= '<i class="fas fa-times-circle"></i> Erro!';
	documento_02.className	= 'modal-dialog border border-danger rounded alert-danger';
	cabecalho_02.className 	= 'modal-header text-white bg-danger';
	conteudo_02.innerHTML	= 'Houve um erro ao atualizar as configurações de <span class="text-danger"><b>administrador</b></span>. Por favor, verifique se todos os campos foram preenchidos corretamente.';
	botao_02.className 		= 'btn btn-outline-danger';
}

// Tabela

let tabelaReserva = (bg, nome) => {
	let tabela = `
	<table class="table table-bordered text-center mt-4">
		<thead>
			<tr class="text-center bg-${bg}">
				<th scope="col" colspan="2" class="text-white"><i class="fas fa-user-tie fa-lg" title="Equipamento"></i></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>${nome}</td>
			</tr>
		</tbody>
	</table>`;
	return tabela;
}

// Ações

cadastrar_administrador.onclick = () => {

	let administrador = new Administrador(
		nome.value.trim()
	);

	if (administrador.validarAdministrador()) {		
		modalCadastarSucesso(
			administrador.nome,
			tabelaReserva(
				"success",
				administrador.nome
		));
		
		gravar_administrador(administrador);
		
		nome.value = "";
	}
	else {
		modalCadastrarErro();
	}
}

window.onload  = () => {

	let administrador = Array();

	administrador = recupera_dados();

	administrador.forEach(a => nome.value = a.nome);
}