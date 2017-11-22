function createAllCharts(){
	createChart("chartA", [54.3, 46.7], ["Users ( 760million )", "Non-Users ( 640million )"])
    createChart("chartB", [54, 44.06, 1.94], ["Mobile Phones ( > 410.5million )", "Desktop ( > 334.8million )", "Tablet ( > 14.7million )"])
    createChart("chartC", [78.35, 20.71, 0.94], ["Android ( > 321.6million )", "iOS ( > 85million )", "Other ( > 3.9million )"])
    chartsCreated = true
}

function createChart(id, data, labels){
	let chartOptions = {
          responsive: true,
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
	            label: '# of Votes',
	            data: data,
	            backgroundColor: backgroundColors.slice(0, data.length),
	            borderColor: borderColors.slice(0, data.length),
	            borderWidth: 1
	        }]
	    },
	    options: chartOptions
	});
}
