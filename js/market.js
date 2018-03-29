function createAllCharts() { 
	createChart("chartA", [53.2, 46.8], ["Users (731,250,000)", "Non-Users (643,280,000)"])
	createChart("chartB", [95.1, 4.9], ["Mobile (695,310,000)", "Other (35,940,000)"])
	createChart("chartC", [71.97, 18.89, 9.14], ["Android (500,414,000)", "iOS (131,344,000)", "Other (63,552,000)"])
	chartsCreated = true
}

function createChart(id, data, labels){
	let chartOptions = {
          responsive: true,
          events: ['mousemove', 'mouseout'],
          legend: {
            display: true,
            position: 'bottom',
            labels: { 
            	boxWidth: 30,
            	fontSize: 16
            },
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                const x = data.datasets[tooltipItem.datasetIndex]
                  .data[tooltipItem.index]

                return x+"%"
              },
            },
            displayColors: false,
          },
          layout: {
	            
        	}
       	}
    let backgroundColors = [
	                'rgba(140, 188, 63,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(255, 206, 86, 0.3)',
	                'rgba(153, 102, 255, 0.3)',
	                'rgba(255, 159, 64, 0.3)'
	            ]
	let borderColors = [
	                'rgba(140, 188, 63,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ]
	var ctx = document.getElementById(id).getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'pie',
	    data: {
	        labels: labels,
	        datasets: [{
	            label: '#',
	            data: data,
	            backgroundColor: backgroundColors.slice(0, data.length),
	            borderColor: borderColors.slice(0, data.length),
	            borderWidth: 1
	        }]
	    },
	    options: chartOptions
	});
}