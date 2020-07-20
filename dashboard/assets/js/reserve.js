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

class Reserva {
	constructor(usuario, equipamento, local, horaInicial, horaFinal, data) {
		this.usuario 		= usuario;
		this.equipamento 	= equipamento;
		this.local 			= local;
		this.horaInicial 	= horaInicial;
		this.horaFinal 		= horaFinal;
		this.data 			= data;
	}
}

let cadastrar = document.getElementById("cadastrar");

cadastrar.onclick = () => {
	let usuario 	= document.getElementById("usuario");
	let equipamento = document.getElementById("equipamento");
	let local 		= document.getElementById("local");
	let horaInicial = document.getElementById("hora-inicial");
	let horaFinal 	= document.getElementById("hora-final");
	let data 		= document.getElementById("data");

	console.log(usuario.value, equipamento.value, local.value, horaInicial.value, horaFinal.value,data.value)
}

// Botões: Atualizar, Imprimir e Alarme da Página

let atualizar = document.getElementById("atualizar");
let imprimir = document.getElementById("imprimir");
let alarmeAtivado = document.getElementById("alarme-ativado");
let alarmeDesativado = document.getElementById("alarme-desativado");

atualizar.onclick = () => window.location.reload();
imprimir.onclick = () =>  window.print();

alarmeAtivado.onclick = () => {
	document.getElementById("alarme-info").innerHTML = "Alarme ativado";
	document.getElementById("alarme-icone").className = "fas fa-bell fa-md";
	document.getElementById("alarme-ativado").className = "dropdown-item active";
	document.getElementById("alarme-desativado").className = "dropdown-item";
}

alarmeDesativado.onclick = () => {
	document.getElementById("alarme-info").innerHTML = "Alarme desativado";
	document.getElementById("alarme-icone").className = "fas fa-bell-slash fa-md";
	document.getElementById("alarme-ativado").className = "dropdown-item";
	document.getElementById("alarme-desativado").className = "dropdown-item active";
}