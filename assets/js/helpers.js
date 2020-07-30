/*!
 * Jeferson Luckas - reserve
 *
 * Author: Jeferson Luckas
 * Creation: 06/06/2020
 * Modification: 16/07/2020
 * Version: 2.0.0
 * Description: Script helpers
 *
 * Copyright (c) 2020 Jeferson Luckas
 * Released under the MIT license
 * https://github.com/JefersonLucas/reserve/blob/master/LICENSE
 *
 */

// Classe

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
			let r = JSON.parse(localStorage.getItem(i));
			let u = undefined;
			if (r === null || r.usuario == u || r.equipamento == u || r.local === u || r.hora_inicial == u || r.hora_final == u || r.data == u) {
				continue;
			}
			r.id = i;
			reservas.push(r)
		}
		return reservas;
	}
}

// Substitui o getElementById

let pegar_id = id => document.getElementById(id);

// Variáveis globais

let bancodados_helpers = new BancoDadosHelpers();
	
let administrador 		= Array();

let nome_administrador	= pegar_id("administrador-nome");

let Calendario 			= "00/00/0000";
let Relogio 			= "--:--";
let Periodo 			= "";

let icone 				= pegar_id("icone");
let relogio 			= pegar_id("relogio");
let semana 				= pegar_id("semana");
let periodo 			= pegar_id("periodo")

const DASHBOARD_PAGE 	= pegar_id("dashboard-page");
const RESERVAS_PAGE 	= pegar_id("reserva-page");
const PERFIL_PAGE 		= pegar_id("perfil-page");

let scrool_subir_pagina = document.querySelector(".to-top");

// Funções auxiliares

// Links

DASHBOARD_PAGE.onclick 	= () => window.location.href = "index.html";
RESERVAS_PAGE.onclick 	= () => window.location.href = "reserva.html";
PERFIL_PAGE.onclick 	= () => window.location.href = "perfil.html";

let recupera_dados_administrador = () => bancodados_helpers.recuperaDadosAdministrador()

// Atualização de data, hora e periodo

setInterval(()=>{

	let data 		= new Date();
	let Horas 		= data.getHours();
	let Minutos 	= data.getMinutes();
	let Segundos 	= data.getSeconds();
	
	let Ano 		= data.getFullYear();
	let Mes 		= data.getMonth() + 1;
	let Dia 		= data.getDate();
	let Semana 		= data.getDay();

	Mes = Mes < 10 ? Mes = `0${Mes}` : Mes;
	Dia = Dia < 10 ? Dia = `0${Dia}` : Dia;
	
	Horas 	 = Horas 	< 10 ? Horas 	= `0${Horas}` 	: Horas;
	Minutos  = Minutos 	< 10 ? Minutos 	= `0${Minutos}` : Minutos;
	Segundos = Segundos < 10 ? Segundos = `0${Segundos}`: Segundos;
	
	switch(Semana) {
		case 0:
			Semana = "Domingo";
			break
		case 1:
			Semana = "Segunda-feira";
			break
		case 2:
			Semana = "Terça-feira";
			break
		case 3:
			Semana = "Quarta-feira";
			break
		case 4:
			Semana = "Quinta-feira";
			break
		case 5:
			Semana = "Sexta-feira";
			break
		case 6:
			Semana = "Sábado";
			break
	}
	
	Calendario = `${Dia}/${Mes}/${Ano}`;
	Relogio = `${Horas}:${Minutos}:${Segundos}`;
	
	Periodo = Relogio >= "06:00:00" && Relogio <= "12:00:00" ? Periodo = "Bom dia!"   : Periodo; 
	Periodo = Relogio >= "12:00:00" && Relogio <= "18:00:00" ? Periodo = "Boa tarde!" : Periodo;	
	Periodo = Relogio >= "18:00:00" || Relogio <= "06:00:00" ? Periodo = "Boa noite!" : Periodo;

	icone = Periodo === "Bom dia!"   ? icone.className = "fas fa-cloud-sun fa-lg text-info"	: icone;
	icone = Periodo === "Boa tarde!" ? icone.className = "fas fa-sun fa-lg text-warning" 	: icone;
	icone = Periodo === "Boa noite!" ? icone.className = "fas fa-moon fa-lg text-black-50"	: icone;
	
	administrador = recupera_dados_administrador();

	calendario.innerHTML 						= Calendario;
	relogio.innerHTML 							= Relogio;
	periodo.innerHTML 							= Periodo;
	semana.innerHTML 							= Semana;
	nome_administrador.innerHTML 				= "Administrador";
	
	administrador.forEach( a => nome_administrador.innerHTML = a.nome);
	
});

// Scroll para subir a página

window.addEventListener("scroll", () => {
	if (window.pageYOffset > 100) {
    	scrool_subir_pagina.classList.add("active");
  	}
  	else {
    	scrool_subir_pagina.classList.remove("active");
  	}
});

// Feather

feather.replace()