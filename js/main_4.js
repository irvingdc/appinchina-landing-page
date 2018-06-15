const pagesList = ["home","aicon","market","about","contact","privacy-policy", "footer"];
var chartsCreated = false;
var navDisplayed = false;
var loading = false;
var newsletterWasDisplayed = false;
var newsletterScrollThreshold = 0;
var currentTestimonial = 0;
var testimonialsInterval;

(()=>{
	let home = document.querySelector("#home .welcome-page")
	if(window.innerWidth > 600) home ? home.style.height = window.innerHeight.toString() + "px" : null
	if(window.localStorage.newsletterRegistered) hide(find("#newsletter-signup"))

	if(home && window.innerWidth > 1070) newsletterScrollThreshold = document.body.clientHeight - window.innerHeight - 500
	else if(home && window.innerWidth < 1070) newsletterScrollThreshold = document.body.clientHeight - 2*window.innerHeight
	else if(find("#market")) newsletterScrollThreshold = document.body.clientHeight - window.innerHeight - 1000 
	else newsletterScrollThreshold = document.body.clientHeight - window.innerHeight - 800 

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
    if(find("#testimonials p")) startTestimonials();
    if(find("#clientsCarousel")) setupCarousel(70);

    document.addEventListener("scroll", (event)=>{
		var scroll = document.documentElement.scrollTop || document.body.scrollTop
		var ul = find("nav+ul")
		if(scroll > 190) ul.classList.add("green") 
		else ul.classList.remove("green")
		var newsletter = find("#newsletter-signup")
		if(scroll < 150 && home){
			newsletter.classList.add("newsletter-hidden")
			newsletter.classList.remove("opened")
		}
		else if(scroll > newsletterScrollThreshold){
			if(home){
				newsletter.classList.add("newsletter-hidden")
				newsletter.classList.remove("opened")
			}
			else if(newsletter && !newsletterWasDisplayed){
				newsletterWasDisplayed = true
				openNewsletterForm()
			}
		}
		else{
			if(home) newsletter.classList.remove("newsletter-hidden")
		}

    }, false)

})()

function startTestimonials(){
	testimonialsInterval = setInterval(()=>{
		currentTestimonial++
		if(currentTestimonial == find("#testimonials p").length) currentTestimonial = 0
		showTestimonial(currentTestimonial)
	},15000)
}
function getURLParameter(name) {
    return decodeURIComponent(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,"error"])[1]
    );
}
function showTestimonial(testimonialIndex){
	currentTestimonial = testimonialIndex
	clearInterval(testimonialsInterval)
	switchTestimonial(currentTestimonial)
	startTestimonials()
}
function switchTestimonial(testimonialIndex){
	find("#testimonials p").forEach((it,index)=>{
		it.classList.remove("testimonial-displayed")
		if(index == testimonialIndex) setTimeout(()=>{ it.classList.add("testimonial-displayed")},600)
	})
	find("#testimonials li").forEach((it,index)=>{ 
		it.classList.remove("testimonial-displayed")
		if(index == testimonialIndex) it.classList.add("testimonial-displayed")
	})
}

function setupCarousel(speed = 10){
	var carouselPositions = []
	var interval = parseInt(1000/speed)
	find("#clientsCarousel").style.display = "block"
	find("#clientsCarousel > a").forEach((it,index)=>{
		it.style.width = "100px"
		it.style.position = "absolute"
		it.style.top = "0px"
		it.style.left = index*140+"px"
		carouselPositions.push(index*140)
	})
	setInterval(()=>{
		find("#clientsCarousel > a").forEach((it,index)=>{
			carouselPositions[index] -= 1
			if(carouselPositions[index] < -140) carouselPositions[index] = (carouselPositions.length-1) * 140
			it.style.left = carouselPositions[index]+"px"
		})
	},interval)
}

function openNewsletterForm(){
	find("#newsletter-signup").classList.add("opened")
	find("#newsletter-signup form input").focus()
}

function sendNewsletterSignup(){
	let formElement = find("#newsletter-signup form")
	let email = formElement.querySelector("input[name='email']")
	var button = formElement.querySelector("button")
	let information = find("p#newsletter-confirmation")
	var xhttp = new XMLHttpRequest()
	var data = new FormData()
	let source
	if(getURLParameter("gclid")!="error") source = "Ads"
	else if(getURLParameter("s")=='f') source = "Facebook"
	else if(getURLParameter("s")=='t') source = "Twitter"
	else if(getURLParameter("s")=='l') source = "Linkedin"
	else if(getURLParameter("s")=='q') source = "Quora"
	else if(getURLParameter("s")=='o') source = "Stackoverflow"
	else if(getURLParameter("s")=='r') source = "Reddit"
	else if(window.localStorage.sendgrid) source = "Bulk Email"
	else source = "Not Specified"
	data.append('source', source)
	data.append('email', email.value)
	data.append('form', "conquerMarketForm")
	data.append('test', window.localStorage.appinchina ? "test" : null)

	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
			loading = false
			button.innerHTML = "Submit"
	      	let response = this.responseText
	      	closeNewsletterForm()
	      	if(response == "success"){
	      		email.value = ""
	      		show(information)
	      		hide(find("#newsletter-signup"))
	      		setTimeout(()=>{hide(information)},20000)
	      		handleFormSubmission("conquerMarketForm")
	      		//window.localStorage.newsletterRegistered = true
	      		//gtag_report_conversion()
	      	}
	      	else if(response == "test"){
	      		email.value = ""
	      		show(information)
	      		hide(find("#newsletter-signup"))
	      		window.localStorage.newsletterRegistered = true
	      		setTimeout(()=>{hide(information)},20000)
	      	}
	    }
	}
	if(!loading){
		button.innerHTML = "<img src='/images/ring.gif' style='height:80%;'/>"
		loading = true
		xhttp.open("POST", "/inc/mail_general.php", true)
		xhttp.send(data)
	}

	return false
}

function closeNewsletterForm(){
	find("#newsletter-signup").classList.remove("opened")
}

function loadExternalContent(){
    if(getURLParameter("viva")=="mexico"){
    	window.localStorage.appinchina = true
    }
    if(getURLParameter("s")=="s"){
    	window.localStorage.sendgrid = true
    }
	if(!window.localStorage.appinchina){
	    insertScript("https://www.googletagmanager.com/gtag/js?id=UA-2213742-7")
	    insertScript("https://www.googletagmanager.com/gtag/js?id=AW-825668528")
	    insertScript("https://www.appinchina.co/js/external.js")
	}
}

function insertScript(url){
	var script = document.createElement("script");
    script.type = "text/javascript"; 
    script.async = true;
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function hideMessage(){
	let newsletter = find("p#newsletter-confirmation")
	hide(find("p#confirmation"))
	newsletter ? hide(newsletter) : null
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
	find("nav+ul").classList.add("nav-displayed")
	find("nav").classList.add("nav-displayed")
	find(".open-nav-button").classList.add("nav-displayed")
	show(find(".overlay"))
}

function hideNav(){
	setTimeout(()=>{
		navDisplayed = false
		find("nav+ul").classList.remove("nav-displayed")
		find("nav").classList.remove("nav-displayed")
		find(".open-nav-button").classList.remove("nav-displayed")
		hide(find(".overlay"))
	},10)
}

function show(element){
	if(!element) return
	element.classList.remove("hidden")
	setTimeout(()=>{element.classList.remove("invisible")},100)
}

function hide(element){
	if(!element) return
	element.classList.add("invisible")
	setTimeout(()=>{element.classList.add("hidden")},700)
}

function sendForm(form){
	let formElement = find("#"+form+" form")
	let name = formElement.querySelector("input[name='name']")
	let email = formElement.querySelector("input[name='email']")
	let service = formElement.querySelector("[name='service']") ? formElement.querySelector("[name='service']") : null
	let message = formElement.querySelector("textarea") ? formElement.querySelector("textarea") : null
	let source
	if(getURLParameter("gclid")!="error") source = "Ads"
	else if(getURLParameter("s")=='f') source = "Facebook"
	else if(getURLParameter("s")=='t') source = "Twitter"
	else if(getURLParameter("s")=='l') source = "Linkedin"
	else if(getURLParameter("s")=='q') source = "Quora"
	else if(getURLParameter("s")=='o') source = "Stackoverflow"
	else if(getURLParameter("s")=='r') source = "Reddit"
	else if(window.localStorage.sendgrid) source = "Bulk Email"
	else source = "Not Specified"

	let information = find("p#confirmation")
	var button = formElement.querySelector("button")

	var xhttp = new XMLHttpRequest()
	var data = new FormData()
	data.append('name', name.value)
	data.append('email', email.value)
	data.append('message', message ? message.value : "")
	data.append('form', form)
	data.append('source', source)
	data.append('service', service ? service.value : "")
	data.append('test', window.localStorage.appinchina ? "test" : null)

	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
		loading = false
		button.innerHTML = "Submit"
	      	let response = this.responseText
	      	if(response == "success"){
	      		name.value = ""
	      		email.value = ""
	      		message ? message.value = "" : null
	      		show(information)
	      		setTimeout(()=>{hide(information)},20000)
	      		handleFormSubmission(form)
	      	}
	      	else if(response == "test"){
	      		name.value = ""
	      		email.value = ""
	      		message ? message.value = "" : null
	      		show(information)
	      		setTimeout(()=>{hide(information)},20000)
	      	}
	    }
	}
	if(!loading){
		button.innerHTML = "<img src='https://www.appinchina.co/images/rolling.gif' style='height:80%;'/>"
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

function toggleJob(index){
	let el = find("#job"+index).classList
	el.contains("opened") ? el.remove("opened") : el.add("opened")
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
	fbq('track', 'Lead');
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

function gtag_report_conversion(url) {
 var callback = function () {
   if (typeof(url) != 'undefined') {
     window.location = url;
   }
 };
 gtag('event', 'conversion', {
     'send_to': 'AW-825668528/SATfCO3-znoQsOfaiQM',
     'event_callback': callback
 });
 return false;
}