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
}

// Variáveis globais
let banco_dados_reserve = new BancoDadosReserve(); 
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

// Input

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

// Cadastrar Reserva

let cadastrar_usuario = pegaId("cadastrar-usuario");

cadastrar_usuario.onclick = () => {

	let reserva = new Reserva(
		usuario.value.trim(),
		equipamento.value.trim(),
		local.value.trim(),
		hora_inicial.value,
		hora_final.value,
		data.value
	);

	if(reserva.validarReserva()) {
		banco_dados_reserve.gravar(reserva, "Reserva");
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

// Excluir todas as Reservas

excluir.onclick = () => {
	
	if(banco_dados_reserve.verificaIdReserva()) {
		let pergunta = prompt("Essa ação irá remover todas as reservas.\nDeseja continuar?", "Não");

		if (pergunta === "Sim" || pergunta === "S" || pergunta === "sim" || pergunta === "s") {
			modalExcluiTodasReservas();
			banco_dados_reserve.removeTodasReservas();
		}

	}

} 

// Modais

let modalCadastarSucesso = (nome, tabela) => {
	$('#modal-01').modal('show');
	
	let botao 	= pegaId('modal-botao-01');
	let fechar 	= pegaId('fechar-modal-01');
	
	pegaId('modal-titulo-01').innerHTML 	= '<i class="fas fa-check-circle"></i> Sucesso!';
	pegaId('modal-documento-01').className	= 'modal-dialog border border-success rounded alert-success';
	pegaId('modal-cabecalho-01').className  = 'modal-header text-white bg-success';
	pegaId('modal-conteudo-01').innerHTML 	= `A reserva do(a) <span class="text-success"><b>${nome}</b></span> foi cadastrada com <span class="text-success"><b>sucesso</b></span>!${tabela}`;
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

// Botões

atualizar.onclick 	= () => window.location.reload();
imprimir.onclick 	= () => window.print();

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