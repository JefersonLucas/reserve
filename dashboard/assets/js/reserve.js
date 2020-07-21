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
	constructor(usuario, equipamento, local, horaInicial, horaFinal, data) {
		this.usuario 		= usuario;
		this.equipamento 	= equipamento;
		this.local 			= local;
		this.horaInicial 	= horaInicial;
		this.horaFinal 		= horaFinal;
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

// Cadastrar

let cadastrar_usuario = document.getElementById("cadastrar-usuario");

cadastrar_usuario.onclick = () => {
	let usuario 	= document.getElementById("usuario");
	let equipamento = document.getElementById("equipamento");
	let local 		= document.getElementById("local");
	let horaInicial = document.getElementById("hora-inicial");
	let horaFinal 	= document.getElementById("hora-final");
	let data 		= document.getElementById("data");

	let reserva = new Reserva(usuario.value.trim(),equipamento.value.trim(),local.value.trim(),horaInicial.value,horaFinal.value,data.value)

	if(reserva.validarReserva()) {
		console.log("Sucesso!");
	}
	else {
		console.log("Erro!");
	}
}

// Botões

let atualizar 			= document.getElementById("atualizar");
let imprimir 			= document.getElementById("imprimir");
let alarme_ativado 		= document.getElementById("alarme-ativado");
let alarme_desativado 	= document.getElementById("alarme-desativado");

atualizar.onclick 	= () => window.location.reload();
imprimir.onclick 	= () =>  window.print();

alarme_ativado.onclick = () => {
	$('#toast').toast('show');
	document.getElementById("alarme-info").innerHTML = "Alarme ativado";
	document.getElementById("alarme-icone").className = "fas fa-bell fa-md";
	document.getElementById("alarme-ativado").className = "dropdown-item active";
	document.getElementById("alarme-desativado").className = "dropdown-item";
}

alarme_desativado.onclick = () => {
	$('#toast').toast('hide');
	document.getElementById("alarme-info").innerHTML = "Alarme desativado";
	document.getElementById("alarme-icone").className = "fas fa-bell-slash fa-md";
	document.getElementById("alarme-ativado").className = "dropdown-item";
	document.getElementById("alarme-desativado").className = "dropdown-item active";
}