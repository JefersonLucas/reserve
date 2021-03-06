/*!
 * Jeferson Luckas - reserve
 *
 * Author: Jeferson Luckas
 * Creation: 06/06/2020
 * Modification: 16/07/2020
 * Version: 2.0.0
 * Description: Dashboard core
 *
 * Copyright (c) 2020 Jeferson Luckas
 * Released under the MIT license
 * https://github.com/JefersonLucas/reserve/blob/master/LICENSE
 *
 */

// Classes

class Grafico {
	constructor(domingo = 0, segunda = 0, terca = 0, quarta = 0, quinta = 0, sexta = 0, sabado = 0) {
		this.domingo 	= domingo;
		this.segunda 	= segunda;
		this.terca		= terca;
		this.quarta 	= quarta;
		this.quinta 	= quinta;
		this.sexta 		= sexta;
		this.sabado		= sabado;
	}
}
class ReservaDashboard {
	constructor(usuario, equipamento, local, hora_inicial, hora_final, data, status) {
		this.usuario 		= usuario;
		this.equipamento 	= equipamento;
		this.local 			= local;
		this.hora_inicial 	= hora_inicial;
		this.hora_final 	= hora_final;
		this.data 			= data;
		this.status 		= status;
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
class BancoDadosDashboard {
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
	recuperaReservas() {
		let reservas = Array();

		let id = localStorage.getItem("idReserva");

		for(let i = 0; i <= id; i++) {
			let r = JSON.parse(localStorage.getItem(i));
			let u = undefined;
			let n = null;

			if (r === n || r.usuario === u || r.equipamento === u || r.local === u || r.hora_inicial === u || r.hora_final === u || r.data === u || r.status === u) {
				continue;
			}
			r.id = i;
			reservas.push(r)
		}
		return reservas;
	}	
	pesquisaReserva(reserva) {
		let reservas_filtradas = Array();
	
		reservas_filtradas = this.recuperaReservas();
	
		if(reserva.usuario != "") {
			reservas_filtradas = reservas_filtradas.filter(r => r.usuario === reserva.usuario);
		}
		if(reserva.equipamento != "") {
			reservas_filtradas = reservas_filtradas.filter(r => r.equipamento === reserva.equipamento);
		}
		if(reserva.local != "") {
			reservas_filtradas = reservas_filtradas.filter(r => r.local === reserva.local);
		}
		if(reserva.hora_inicial != "") {
			reservas_filtradas = reservas_filtradas.filter(r => r.hora_inicial === reserva.hora_inicial);
		}
		if(reserva.hora_inicial != "") {
			reservas_filtradas = reservas_filtradas.filter(r => r.hora_inicial === reserva.hora_inicial);
		}
		if(reserva.data != "") {
			reservas_filtradas = reservas_filtradas.filter(r => r.data === reserva.data);
		}
		return reservas_filtradas;
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
	pesquisaStatusReserva() {
		let pesquisa = Array();

		pesquisa = this.recuperaReservas();

		pesquisa = pesquisa.filter(p => p.status === "Aguardando" || p.status === "Em uso" || p.status === "Recolhida");
		
		return pesquisa.length;
	}
	pesquisaStatus(status) {
		
		switch(status) {
			case "status-01":
				status = "Aguardando";
				break;
			case "status-02":
				status = "Utilizando";
				break;
			case "status-03":
				status = "Recolhida";
				break;
		}
		
		let pesquisa = Array();

		pesquisa = this.recuperaReservas();

		pesquisa = pesquisa.filter(p => p.status === status);
		
		pesquisa = pesquisa.length < 10 ? `0${pesquisa.length}`: pesquisa;

		return pesquisa;
	}
	pegaProximoIdGrafico() {
		let proximo_Id = localStorage.getItem("idGrafico");
		return parseInt(proximo_Id);
	}
	gravarGrafico(grafico) {
		let id = this.pegaProximoId();

		localStorage.setItem(id, JSON.stringify(grafico));
		localStorage.setItem(`idGrafico`, id); 
	}
	recuperaGraficos() {
		let graficos = Array();

		let id = localStorage.getItem("idGrafico");

		for(let i = 0; i <= id; i++) {
			let g = JSON.parse(localStorage.getItem(i));
			let u = undefined;

			if (g === null || g.domingo === u || g.segunda === u || g.terca === u || g.quarta === u || g.quinta === u || g.sexta === u || g.sabado === u) {
				continue;
			}
			g.id = i;
			graficos.push(g)
		}
		return graficos;
	}
}

// Substitui o getElementById

let pega_id = id => document.getElementById(id);

// Variáveis globais

let bancodados_dashboard 	= new BancoDadosDashboard();
let buscar_reserva 			= pega_id("buscar-reserva");
let lista_reservas 			= pega_id("lista-reservas-01");

// Métodos das classes BancoDadosReserve

let pesquisa_status = status 	=> bancodados_dashboard.pesquisaStatus(status);
let pesquisa_reserva = reserva 	=> bancodados_dashboard.pesquisaReserva(reserva);
let recupera_reservas = () 		=> bancodados_dashboard.recuperaReservas();

// Status da Reserva

for (let i = 1; i <= 3; i++) {
	pega_id(`status-0${i}`).innerHTML = pesquisa_status(`status-0${i}`);
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

// Estilo dos status

let estilo_status = status => {
	
	let estilo = "";
	
	switch(status) {
		case "Aguardando":
			estilo = `<span class="text-danger mx-2" title="${status}"><b><i class="fas fa-file fa-lg"></i></b></span>`;
			break
		case "Utilizando":
			estilo = `<span class="text-success mx-2" title="${status}"><b><i class="fas fa-file-upload fa-lg"></i></b></span>`;
			break
		case "Recolhida":
			estilo = `<span class="text-primary mx-2" title="${status}"><b><i class="fas fa-file-download fa-lg"></i></b></span>`;
	}
	return estilo;
}

// Buscar Reserva

buscar_reserva.onfocus = () => {

	setInterval(() => {
		
		let usuario = buscar_reserva.value;

		let equipamento = local = hora_inicial = hora_final = data = status = "";

		let reserva = new ReservaDashboard(usuario.trim(), equipamento, local, hora_inicial, hora_final, data, status);
			
		let reservas = pesquisa_reserva(reserva);
	
		lista_reservas.innerHTML = "";

		reservas.forEach( r => {

			let linha = lista_reservas.insertRow();

			linha.insertCell(0).innerHTML = r.usuario;
			linha.insertCell(1).innerHTML = r.equipamento;
			linha.insertCell(2).innerHTML = r.local;
			linha.insertCell(3).innerHTML = r.hora_inicial;
			linha.insertCell(4).innerHTML = r.hora_final;
			linha.insertCell(5).innerHTML = data_BR(r.data);
			linha.insertCell(6).innerHTML = estilo_status(r.status);
		});
	});
}


// Exibindo a lista de reservas no Dashboard

window.onload = () => {

	let reservas = Array();

	reservas = recupera_reservas();

	reservas.forEach( r => {

		let linha = lista_reservas.insertRow();

		linha.insertCell(0).innerHTML = r.usuario;
		linha.insertCell(1).innerHTML = r.equipamento;
		linha.insertCell(2).innerHTML = r.local;
		linha.insertCell(3).innerHTML = r.hora_inicial;
		linha.insertCell(4).innerHTML = r.hora_final;
		linha.insertCell(5).innerHTML = data_BR(r.data);
		linha.insertCell(6).innerHTML = estilo_status(r.status);
	});
};

// Gráfico

(function () {
  "use strict"

  var ctx = pega_id("myChart")
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
	type: "line",
	data: {
	  labels: [
		'Domingo',
		'Segunda-feira',
		'Terça-feira',
		'Quarta-feira',
		'Quinta-feira',
		'Sexta-feira',
		'Sábado'
	  ],
	  datasets: [{
		data: [
		  0,
		  10,
		  8,
		  11,
		  8,
		  10,
		  0
		],
		lineTension: 0,
		backgroundColor: 'transparent',
		borderColor: '#007bff',
		borderWidth: 4,
		pointBackgroundColor: '#007bff'
	  }]
	},
	options: {
	  scales: {
		yAxes: [{
		  ticks: {
			beginAtZero: false
		  }
		}]
	  },
	  legend: {
		display: false
	  }
	}
  })
}())