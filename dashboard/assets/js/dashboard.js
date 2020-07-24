/*!
 * Jeferson Luckas - reserve
 *
 * Author: Jeferson Luckas
 * Creation: 06/06/2020
 * Modification: 16/07/2020
 * Version: 1.0.0
 * Description: Dashboard core
 *
 * Copyright (c) 2020 Jeferson Luckas
 * Released under the MIT license
 * https://github.com/JefersonLucas/reserve/blob/master/LICENSE
 *
 */

// Classe

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
			let reserva = JSON.parse(localStorage.getItem(i));

			if (
				reserva 				=== null 		||
				reserva.usuario 		=== undefined 	||
				reserva.equipamento 	=== undefined 	||
				reserva.local 			=== undefined 	||
				reserva.hora_inicial 	=== undefined 	||
				reserva.hora_final 		=== undefined 	||
				reserva.data 			=== undefined 	||
				reserva.status 			=== undefined) {
				continue;
			}
			reserva.id = i;
			reservas.push(reserva)
		}
		return reservas;
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
	pesquisaStatusAguardando() {
		let pesquisa = Array();

		pesquisa = this.recuperaReservas();

		pesquisa = pesquisa.filter(p => p.status === "Aguardando");
		
		if (pesquisa.length < 10) {
			pesquisa = `0${pesquisa.length}`;
		}
		return pesquisa;
	}
	pesquisaStatusEmUso() {
		let pesquisa = Array();

		pesquisa = this.recuperaReservas();

		pesquisa = pesquisa.filter(p => p.status === "Em uso");
		
		if (pesquisa.length < 10) {
			pesquisa = `0${pesquisa.length}`;
		}
		return pesquisa;
	}
	pesquisaStatusRecolhida() {
		let pesquisa = Array();

		pesquisa = this.recuperaReservas();

		pesquisa = pesquisa.filter(p => p.status === "Recolhida");
		
		if (pesquisa.length < 10) {
			pesquisa = `0${pesquisa.length}`;
		}
		return pesquisa;
	}
}

// Substitui o getElementById

function pegaId(id) {
	return document.getElementById(id);
}

// Variáveis globais

let bancodados_dashboard = new BancoDadosDashboard();

// Status da Reserva

pegaId("status-01").innerHTML = bancodados_dashboard.pesquisaStatusAguardando();
pegaId("status-02").innerHTML = bancodados_dashboard.pesquisaStatusEmUso();
pegaId("status-03").innerHTML = bancodados_dashboard.pesquisaStatusRecolhida();

// Chart

(function () {
  'use strict'

  var ctx = pegaId('myChart')
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
	type: 'line',
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