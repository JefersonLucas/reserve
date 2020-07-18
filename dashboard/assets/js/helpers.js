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

// Links

const DASHBOARD_PAGE = document.getElementById("dashboard-page");
const RESERVAS_PAGE = document.getElementById("reservas-page");
const PERFIL_PAGE = document.getElementById("perfil-page");

DASHBOARD_PAGE.onclick = () => window.location.href = "index.html";
RESERVAS_PAGE.onclick = () => window.location.href = "reservas.html";
PERFIL_PAGE.onclick = () => window.location.href = "perfil.html";


// Botão para subir a página

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
	if (window.pageYOffset > 100) {
    	toTop.classList.add("active");
  	}
  	else {
    	toTop.classList.remove("active");
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
	let mensagem 	= null;

	mes = mes < 10 ? mes = `0${mes}` : mes;
	dia = dia < 10 ? dia = `0${dia}` : dia;
	
	horas 	 = horas 	< 10 ? horas 	= `0${horas}` 	: horas;
	minutos  = minutos 	< 10 ? minutos 	= `0${minutos}` : minutos;
	segundos = segundos < 10 ? segundos = `0${segundos}`: segundos;
	
	let relogio = `${horas}:${minutos}:${segundos}`;
	let calendario = `${dia}/${mes}/${ano}`;

	mensagem = relogio >= "06:00:00" && relogio <= "12:00:00" ? mensagem = "<i class='fas fa-sun'></i> Bom dia! "    : mensagem; 
	mensagem = relogio >= "12:00:00" && relogio <= "18:00:00" ? mensagem = "<i class='fas fa-sun'></i> Boa tarde! "  : mensagem;	
	mensagem = relogio >= "18:00:00" || relogio <= "06:00:00" ? mensagem = "<i class='fas fa-moon'></i> Boa noite! " : mensagem;

	document.getElementById("usuario").innerHTML = "Jeferson Luckas";
	document.getElementById("calendario").innerHTML = calendario;
	document.getElementById("relogio").innerHTML = relogio;
	document.getElementById("mensagem").innerHTML = mensagem;
})

// Feather

feather.replace()