/*!
 * Jeferson Luckas - reserve
 *
 * Author: Jeferson Luckas
 * Creation: 06/06/2020
 * Modification: 16/07/2020
 * Version: 1.0.0
 * Description: Script helpers
 *
 * Copyright (c) 2020 Jeferson Luckas
 * Released under the MIT license
 * https://github.com/JefersonLucas/reserve/blob/master/LICENSE
 *
 */

// Banco de Dados

class BancoDadosHelpers {
	constructor() {
		let idAdministrador = localStorage.getItem("idAdministrador");
		idAdministrador = idAdministrador === null ? localStorage.setItem("idAdministrador", 0) : idAdministrador;
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
	recuperaReservas() {
		let reservas = Array();

		let id = localStorage.getItem("idReserva");

		for(let i = 0; i <= id; i++) {
			let reserva = JSON.parse(localStorage.getItem(i));

			if (
				reserva === null ||
				reserva.usuario == undefined ||
				reserva.equipamento == undefined ||
				reserva.local === undefined ||
				reserva.hora_inicial == undefined ||
				reserva.hora_final == undefined ||
				reserva.data == undefined) {
				continue;
			}
			reserva.id = i;
			reservas.push(reserva)
		}
		return reservas;
	}
}

// Variáveis globais

let bancodados_helpers = new BancoDadosHelpers();
	
let administrador 		= Array();
let calendario 			= "00/00/0000";
let icone 				= null;
let periodo 			= "";
let relogio 			= "--:--";

let scrool_subir_pagina = document.querySelector(".to-top");

const DASHBOARD_PAGE 	= pegaId("dashboard-page");
const RESERVAS_PAGE 	= pegaId("reserva-page");
const PERFIL_PAGE 		= pegaId("perfil-page");

// Links

DASHBOARD_PAGE.onclick 	= () => window.location.href = "index.html";
RESERVAS_PAGE.onclick 	= () => window.location.href = "reserva.html";
PERFIL_PAGE.onclick 	= () => window.location.href = "perfil.html";

// Substitui o getElementById

function pegaId(id){
	return document.getElementById(id);
}

// Scroll para subir a página

window.addEventListener("scroll", () => {
	if (window.pageYOffset > 100) {
    	scrool_subir_pagina.classList.add("active");
  	}
  	else {
    	scrool_subir_pagina.classList.remove("active");
  	}
});

// Atualização de data, hora e periodo

setInterval(()=>{

	let data 		= new Date();
	let horas 		= data.getHours();
	let minutos 	= data.getMinutes();
	let segundos 	= data.getSeconds();
	let ano 		= data.getFullYear();
	let mes 		= data.getMonth() + 1;
	let dia 		= data.getDate();
	let semana 		= data.getDay();

	mes = mes < 10 ? mes = `0${mes}` : mes;
	dia = dia < 10 ? dia = `0${dia}` : dia;
	
	horas 	 = horas 	< 10 ? horas 	= `0${horas}` 	: horas;
	minutos  = minutos 	< 10 ? minutos 	= `0${minutos}` : minutos;
	segundos = segundos < 10 ? segundos = `0${segundos}`: segundos;
	
	switch(semana) {
		case 0:
			semana = "Domingo";
			break
		case 1:
			semana = "Segunda-feira";
			break
		case 2:
			semana = "Terça-feira";
			break
		case 3:
			semana = "Quarta-feira";
			break
		case 4:
			semana = "Quinta-feira";
			break
		case 5:
			semana = "Sexta-feira";
			break
		case 6:
			semana = "Sábado";
			break
	}
	
	calendario = `${dia}/${mes}/${ano}`;
	relogio = `${horas}:${minutos}:${segundos}`;
	
	periodo = relogio >= "06:00:00" && relogio <= "12:00:00" ? periodo = "Bom dia!"   : periodo; 
	periodo = relogio >= "12:00:00" && relogio <= "18:00:00" ? periodo = "Boa tarde!" : periodo;	
	periodo = relogio >= "18:00:00" || relogio <= "06:00:00" ? periodo = "Boa noite!" : periodo;

	icone = periodo === "Bom dia!"   ? pegaId("icone").className = "fas fa-sun fa-lg"		  	: icone;
	icone = periodo === "Boa tarde!" ? pegaId("icone").className = "fas fa-cloud-sun fa-lg" 	: icone;
	icone = periodo === "Boa noite!" ? pegaId("icone").className = "fas fa-moon fa-lg"			: icone;
	
	administrador = bancodados_helpers.recuperaDadosAdministrador();

	pegaId("calendario").innerHTML 			= calendario;
	pegaId("relogio").innerHTML 			= relogio;
	pegaId("periodo").innerHTML 			= periodo;
	pegaId("semana").innerHTML 				= semana;
	pegaId("administrador-nome").innerHTML 	= "Nome Sobrenome";
	
	administrador.forEach((a) => pegaId("administrador-nome").innerHTML = `${a.nome} ${a.sobrenome}`);
	
});

// Feather

feather.replace()