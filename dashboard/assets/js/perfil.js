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
// Variáveis globais

let banco_dados_perfil = new BancoDadosPerfil();
let nome_01 = pegaId("nome-administrador");
let cadastrar_administrador = pegaId("cadastar-administrador");

// Funções auxiliares

// Substitui o getElementById

function pegaId(id){
	return document.getElementById(id);
}

setInterval(() => {

	let valido 		= "valid-feedback";
	let invalido 	= "invalid-feedback";
	let mensagem_01 = "Por favor, selecione uma opção válida.";
	let mensagem_02 = "Parece bom!";

	if (nome_01.value === "" || nome_01.value === null || nome_01.value === undefined) {
		pegaId("valida-nome-01").innerHTML = mensagem_01;
		pegaId("valida-nome-01").className = invalido;
	}
	else {
		pegaId("valida-nome-01").innerHTML = mensagem_02
		pegaId("valida-nome-01").className = valido;
	}
});

// Modais

let modalCadastarSucesso = (nome, tabela) => {
	$('#modal-01').modal('show');

	let botao 		= pegaId('modal-botao-01');
	let fechar 		= pegaId('fechar-modal-01');
	
	pegaId('modal-titulo-01').innerHTML 	= '<i class="fas fa-check-circle"></i> Sucesso!';
	pegaId('modal-documento-01').className	= 'modal-dialog border border-success rounded alert-success';
	pegaId('modal-cabecalho-01').className  = 'modal-header text-white bg-success';
	pegaId('modal-conteudo-01').innerHTML 	= `Administrador(a) <span class="text-success"><b>${nome}</b></span> foi atualizado com <span class="text-success"><b>sucesso</b></span>!${tabela}`;
	pegaId('modal-botao-01').innerHTML 		= 'Voltar';
	pegaId('modal-botao-01').className 		= 'btn btn-outline-success';

	botao.onclick 	= () => window.location.reload();
	fechar.onclick 	= () => window.location.reload();
}

let modalCadastrarErro = () => {
	$('#modal-02').modal('show');
	pegaId('modal-titulo-02').innerHTML 	= '<i class="fas fa-times-circle"></i> Erro!';
	pegaId('modal-documento-02').className	= 'modal-dialog border border-danger rounded alert-danger';
	pegaId('modal-cabecalho-02').className  = 'modal-header text-white bg-danger';
	pegaId('modal-conteudo-02').innerHTML	= 'Houve um erro ao atualizar as configurações de <span class="text-danger"><b>administrador</b></span>. Por favor, verifique se todos os campos foram preenchidos corretamente.';
	pegaId('modal-botao-02').innerHTML		= 'Voltar';
	pegaId('modal-botao-02').className 		= 'btn btn-outline-danger';
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
		nome_01.value.trim()
	);

	if (administrador.validarAdministrador()) {		
		modalCadastarSucesso(
			administrador.nome,
			tabelaReserva(
				"success",
				administrador.nome
		));
		
		banco_dados_perfil.gravarAdministrador(administrador);
		
		nome_01.value = "";
	}
	else {
		modalCadastrarErro();
	}
}

window.onload  = () => {

	let administrador = Array();

	administrador = banco_dados_perfil.recuperaDadosAdministrador();

	administrador.forEach((a) => pegaId("nome-administrador").value = a.nome);
}