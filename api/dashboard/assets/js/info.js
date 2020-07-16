/*!
 * Jeferson Luckas - reserve
 *
 * Author: Jeferson Luckas
 * Creation: 06/06/2020
 * Modification: 16/07/2020
 * Version: 1.0.0
 * Description: Auxiliary information.
 *
 * Copyright (c) 2020 Jeferson Luckas
 * Released under the MIT license
 * https://github.com/JefersonLucas/hora-de-respirar/blob/master/LICENSE
 *
 */

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

	document.getElementById("usuario").innerHTML = "Jeferson Lucas";
	document.getElementById("calendario").innerHTML = calendario;
	document.getElementById("relogio").innerHTML = relogio;
	document.getElementById("mensagem").innerHTML = mensagem;
})
