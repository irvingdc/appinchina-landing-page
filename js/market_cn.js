function createAllCharts() { 
	createChart("chartA", [54.56, 45.44], ["用户 (771,980,000)", "非用户 (643,066,000)"])
	createChart("chartB", [97.5,2.5], ["手机 (752,650,000)", "其他 (19,330,000)"])
	createChart("chartC", [79.22, 19.27, 1.51], ["Android (596,250,000)", "iOS (145,036,000)", "其他 (11,365,000)"])
	chartsCreated = true
}

function selectRow(e){
	if(e.classList.contains("market-row-open")){
		e.classList.remove("market-row-open")
	}
	else{
		if(document.querySelectorAll(".market-row-open"))
			document.querySelectorAll(".market-row-open").forEach(it=>it.classList.remove("market-row-open"))
		e.classList.add("market-row-open")
	}
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