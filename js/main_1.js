const pagesList = ["home","aicon","market","about","contact","privacy-policy", "footer"];
var chartsCreated = false;
var navDisplayed = false;
var loading = false;

(()=>{
	console.log("hey :)")
	let home = document.querySelector("#home .welcome-page")
	home ? home.style.height = (window.innerHeight - 170).toString() + "px" : null

	document.querySelectorAll("a.action-redirect").forEach((it)=>{
		it.addEventListener("click", (event)=>{
	        event.preventDefault()
	        hideNav()
	        var el = event.target
	        while(el.tagName.toUpperCase() != "A" && el.parentElement){
	        	el = el.parentElement
	        }
			openPage(el.getAttribute("href"))
        }, false)
    })

    document.querySelectorAll("form").forEach((it)=>{
		it.addEventListener("submit", (event)=>{
	        event.preventDefault()
	        if(event.target.id=="searchAiconForm"){
	        	let app = find("#appToSearch").value
	        	if(!loading && app != "") aiconSearch(app)
	        }
        }, false)
    })

    document.addEventListener("scroll", (event)=>{
		var scroll = document.documentElement.scrollTop || document.body.scrollTop
		var nav = find("nav")
		if(window.innerWidth > 740)
			nav.style.top = scroll > 122 ? (scroll > 244 ? "-122px" : 122-scroll.toString() + "px") : null
		else
			nav.style.top = scroll > 142 ? (scroll > 284 ? "-142px" : 142-scroll.toString() + "px") : null
    }, false)

    loadPage()

})()

function hideMessage(){
	hide(find("p#confirmation"))
}

function loadPage(){
	window.scrollTo(0,0)
	pagesList.forEach((it)=>{ 
		el = find("#"+it)
		if(el){
			el.classList.remove("hidden")
			if(it == "market") setTimeout(()=>{createAllCharts()},500)
		}
	})
	setTimeout(()=>{ pagesList.forEach((it)=>{ find("#"+it) ? find("#"+it).classList.remove("invisible") : null }) },500)
}

function openPage(page){
	pagesList.forEach((it)=>{ find("#"+it) ? find("#"+it).classList.add("invisible") : null})
	setTimeout(()=>{ pagesList.forEach((it)=>{ find("#"+it) ? find("#"+it).classList.add("hidden") : null }) },500)
	setTimeout(()=>{ window.scrollTo(0,0) },600)
	setTimeout(()=>{ window.location = page },800)
}

function toggleNav(){
	if(navDisplayed){
		hideNav()
	}
	else{
		showNav()
	}
}

function showNav(){
	navDisplayed = true
	find("nav ul").classList.add("nav-displayed")
	find(".open-nav-button").classList.add("nav-displayed")
	show(find(".overlay"))
}

function hideNav(){
	setTimeout(()=>{
		navDisplayed = false
		find("nav ul").classList.remove("nav-displayed")
		find(".open-nav-button").classList.remove("nav-displayed")
		hide(find(".overlay"))
	},10)
}

function show(element){
	element.classList.remove("hidden")
	setTimeout(()=>{element.classList.remove("invisible")},100)
}

function hide(element){
	element.classList.add("invisible")
	setTimeout(()=>{element.classList.add("hidden")},700)
}

function sendForm(form){
	let formElement = find("#"+form+" form")
	let name = formElement.querySelector("input[name='name']")
	let email = formElement.querySelector("input[name='email']")
	let message = formElement.querySelector("textarea") ? formElement.querySelector("textarea") : null
	let phone = formElement.querySelector("input[name='phone']") ? formElement.querySelector("input[name='phone']") : null
	let information = find("p#confirmation")
	var button = formElement.querySelector("button")

	var xhttp = new XMLHttpRequest()
	var data = new FormData()
	data.append('name', name.value)
	data.append('email', email.value)
	data.append('message', message ? message.value : "")
	data.append('phone', phone ? phone.value : "")
	data.append('form', form)

	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
		loading = false
		button.innerHTML = "Submit"
	      	let response = this.responseText
	      	if(response == "success"){
	      		name.value = ""
	      		email.value = ""
	      		message ? message.value = "" : null
	      		phone ? phone.value = "" : null
	      		show(information)
	      		setTimeout(()=>{hide(information)},20000)
	      		handleFormSubmission(form)
	      	}
	      	else if(response == "test"){
	      		name.value = ""
	      		email.value = ""
	      		message ? message.value = "" : null
	      		phone ? phone.value = "" : null
	      		show(information)
	      		setTimeout(()=>{hide(information)},20000)
	      	}
	    }
	}
	if(!loading){
		button.innerHTML = "<img src='/images/rolling.gif' style='height:80%;'/>"
		loading = true
		xhttp.open("POST", "https://www.appinchina.co/inc/mail_general.php", true)
		xhttp.send(data)
	}

	return false
}

function createAllCharts(){
	createChart("chartA", [54.3, 46.7], ["Users ( 760million )", "Non-Users ( 640million )"])
    createChart("chartB", [54, 44.06, 1.94], ["Mobile Phones ( > 410.5million )", "Desktop ( > 334.8million )", "Tablet ( > 14.7million )"])
    createChart("chartC", [78.35, 20.71, 0.94], ["Android ( > 321.6million )", "iOS ( > 85million )", "Other ( > 3.9million )"])
    chartsCreated = true
}

function find(selector){
	let el = document.querySelectorAll(selector)
	return el.length > 1 ? el : el[0]
}

function handleFormSubmission(form){
	switch(form){
		case "conquerMarketForm":
			createIframe("https://www.appinchina.co?conf=2")
		break;
		case "marketForm":
			createIframe("https://www.appinchina.co?conf=4")
		break;
		case "aiconForm":
			createIframe("https://www.appinchina.co?conf=5")
		break;
		case "contactForm":
			createIframe("https://www.appinchina.co?conf=1")
		break;
	}
}

function createIframe(src){
    var i = document.createElement('iframe')
    i.style.display = 'none'
    i.onload = () => { i.parentNode.removeChild(i) }
    i.src = src
    document.body.appendChild(i)
}

function styleAsNumber(x) {
	var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
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
