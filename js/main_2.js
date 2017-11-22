const pagesList = ["home","aicon","market","about","contact","privacy-policy", "footer"];
var chartsCreated = false;
var navDisplayed = false;
var loading = false;

(()=>{
	let home = document.querySelector("#home .welcome-page")
	home ? home.style.height = (window.innerHeight - 170).toString() + "px" : null

    document.querySelectorAll("form").forEach((it)=>{
		it.addEventListener("submit", (event)=>{
	        event.preventDefault()
	        if(event.target.id=="searchAiconForm"){
	        	let app = find("#appToSearch").value
	        	if(!loading && app != "") aiconSearch(app)
	        }
        }, false)
    })
    loadExternalContent();

})()

function loadExternalContent(){
    var script = document.createElement("script");
    script.type = "text/javascript"; 
    script.async = true;
    script.src = "/js/external.js";
    document.getElementsByTagName("head")[0].appendChild(script);
}

function hideMessage(){
	hide(find("p#confirmation"))
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