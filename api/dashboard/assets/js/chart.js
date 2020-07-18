/* globals Chart:false, feather:false */

(function () {
  'use strict'

  var ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
	type: 'line',
	data: {
	  labels: [
		'Domingo',
		'Segunda',
		'Terça',
		'Quarta',
		'Quinta',
		'Sexta',
		'Sábado'
	  ],
	  datasets: [{
		data: [
		  0,
		  10,
		  8,
		  11,
		  10,
		  8,
		  5
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

