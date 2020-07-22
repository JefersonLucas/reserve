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

class BancodeDadosAdministrador {
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
				continue
			}
			admin.id = i;
			administrador.push(admin); 
		}
		return administrador;
	}
}

// Variáveis globais

let bancodedados_administrador = new BancodeDadosAdministrador();
	
let calendario = "00/00/0000";
let relogio = "--:--";

let scrool_subir_pagina = document.querySelector(".to-top");

const DASHBOARD_PAGE 	= document.getElementById("dashboard-page");
const RESERVAS_PAGE 	= document.getElementById("reserva-page");
const PERFIL_PAGE 		= document.getElementById("perfil-page");

// Links

DASHBOARD_PAGE.onclick 	= () => window.location.href = "index.html";
RESERVAS_PAGE.onclick 	= () => window.location.href = "reserva.html";
PERFIL_PAGE.onclick 	= () => window.location.href = "perfil.html";

// Scroll para subir a página

window.addEventListener("scroll", () => {
	if (window.pageYOffset > 100) {
    	scrool_subir_pagina.classList.add("active");
  	}
  	else {
    	scrool_subir_pagina.classList.remove("active");
  	}
})

// Data, Hora e Mensagem

setInterval(()=>{

	let data 		= new Date();
	let horas 		= data.getHours();
	let minutos 	= data.getMinutes();
	let segundos 	= data.getSeconds();
	let ano 		= data.getFullYear();
	let mes 		= data.getMonth() + 1;
	let dia 		= data.getDate();
	let semana 		= data.getDay();
	let mensagem 	= "";
	let icone 		= null;
	let administrador = Array();

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
	
	mensagem = relogio >= "06:00:00" && relogio <= "12:00:00" ? mensagem = "Bom dia!"   : mensagem; 
	mensagem = relogio >= "12:00:00" && relogio <= "18:00:00" ? mensagem = "Boa tarde!" : mensagem;	
	mensagem = relogio >= "18:00:00" || relogio <= "06:00:00" ? mensagem = "Boa noite!" : mensagem;

	icone = mensagem === "Bom dia!"   ? document.getElementById("icone").className = "fas fa-sun fa-lg"		  : icone;
	icone = mensagem === "Boa tarde!" ? document.getElementById("icone").className = "fas fa-cloud-sun fa-lg" : icone;
	icone = mensagem === "Boa noite!" ? document.getElementById("icone").className = "fas fa-moon fa-lg"	  : icone;
	
	administrador = bancodedados_administrador.recuperaDadosAdministrador();

	document.getElementById("calendario").innerHTML = calendario;
	document.getElementById("relogio").innerHTML 	= relogio;
	document.getElementById("mensagem").innerHTML 	= mensagem;
	document.getElementById("semana").innerHTML 	= semana;
	
	administrador.forEach((a) => document.getElementById("administrador-nome").innerHTML = `${a.nome} ${a.sobrenome}`);

})

// Feather

feather.replace()