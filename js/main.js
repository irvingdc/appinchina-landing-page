const pagesList = ["home","aicon","market","about","contact","privacy-policy", "footer"];
var chartsCreated = false;
var navDisplayed = false;
var loading = false;
var newsletterWasDisplayed = false;
var newsletterScrollThreshold = 0;
var currentTestimonial = 0;
var testimonialsInterval;
var homeImageSelectors = [
							{
								selector: "#clientsList",
								displayed: false
							},
							{
								selector: "#process .process-container",
								displayed: false
							},
							{
								selector: "#system", 
								displayed: false
							},
							{
								selector: "#packagesList", 
								displayed: false
							},
							{
								selector: "#enterprisePackage", 
								displayed: false
							},
							{
								selector: "#extraServices", 
								displayed: false
							},
							{
								selector: "#conquerMarketForm",
								displayed: false
							},
						]
var marketImageSelectors = 	[
								{
									selector: "#ranking",
									displayed: false
								},
								{
									selector: "#storesList",
									displayed: false
								}
							]

function handleImagesVisibility(scroll){
	let selectors
	if(window.location.pathname == "/" || window.location.pathname == "/test/") selectors = homeImageSelectors
	else if (window.location.pathname.includes("/market")) selectors = marketImageSelectors
	else {
		//console.log("pathname doesn't match",window.location.pathname)
		return null
	}
	selectors.filter(it=>{return !it.displayed}).forEach(obj=>{
		let elements = document.querySelectorAll(obj.selector)
		elements.forEach(el=>{
			let top = el.offsetTop - window.innerHeight
			if(scroll > top && !obj.displayed){
				obj.displayed = true
				document.querySelectorAll(obj.selector+" .background-hidden").forEach(it=>{it.classList.remove("background-hidden")})
				document.querySelectorAll(obj.selector+" [data-src]").forEach(it=>{it.setAttribute("src",it.getAttribute("data-src"))})
			}
		})
	})
}

(()=>{
	let home = document.querySelector("#home .welcome-page")
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
    //addServicesListeners();
    if(find("#testimonials p")) startTestimonials();
    if(find("#clientsCarousel")) setupCarousel(70);

    document.addEventListener("scroll", (event)=>{
		handleScroll(home)
		//if(window.location.pathname.includes("services")) handleServicesScroll()
    }, false)
    setTimeout(()=>{handleScroll()},500)
})();

function handleServicesScroll(){
	var scroll = document.documentElement.scrollTop || document.body.scrollTop
	let el
	for(let h of find(".service-list h3")){
		if(h.offsetTop > scroll){
			el = h
			break;
		}
	}
	find(".services-nav a").forEach(it=>{
		it.href.split("#")[1] == el.id ? it.classList.add("selected") : it.classList.remove("selected")

	})
}

function addServicesListeners(){
	find(".services-nav a").forEach(it=>{
		it.addEventListener("click", e => {
			e.preventDefault()
			window.scroll({ top: find("#"+it.href.split("#")[1]).offsetTop - 65, behavior: "smooth" });
		})
	})
}

function handleScroll(home){
	var scroll = document.documentElement.scrollTop || document.body.scrollTop
	handleImagesVisibility(scroll)
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
}

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
		else setTimeout(()=>{ it.classList.remove("testimonial-displayed")},600)
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

function textareaChanged(){
	let errorMessage = find("#formErrorMessage")
	if(errorMessage) errorMessage.classList.remove("displayed")
}

function sendForm(form, serviceSelected){

	let formElement = find("#"+form+" form")
	let name = formElement.querySelector("input[name='name']") ? formElement.querySelector("input[name='name']") : null
	let email = formElement.querySelector("input[name='email']")
	let service = formElement.querySelector("[name='service']") ? formElement.querySelector("[name='service']") : null
	let message = formElement.querySelector("textarea") ? formElement.querySelector("textarea") : null
	let source = window.localStorage.source ? window.localStorage.source : "Not Specified"

	const MIN_LENGTH = window.location.host.includes("cn.appinchina") ? 10 : 40
	if(message && message.value && message.value.trim().length < MIN_LENGTH){
		let errorMessage = find("#formErrorMessage")
		if(errorMessage) errorMessage.classList.add("displayed")
		return false
	} 

	let information = find("p#confirmation")
	var button = formElement.querySelector("button")

	var xhttp = new XMLHttpRequest()
	var data = new FormData()
	data.append('referrer', window.localStorage.referrer)
	data.append('name', name ? name.value : "")
	data.append('email', email.value)
	data.append('message', message ? message.value : "")
	data.append('form', form)
	data.append('source', source)
	data.append('service', service ? service.value : (serviceSelected ? serviceSelected : ""))
	data.append('test', window.localStorage.appinchina ? "test" : null)

	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
		loading = false
		button.innerHTML = "Submit"
	      	let response = this.responseText
	      	localStorage.removeItem("source")
	      	if(response == "success"){
	      		name ? name.value = "" : null
	      		email.value = ""
	      		message ? message.value = "" : null
	      		show(information)
	      		setTimeout(()=>{hide(information)},20000)
	      		handleFormSubmission(form)
	      		gtag_report_conversion()
	      		bing_report_conversion()
	      		yahoo_report_conversion()
	      	}
	      	else if(response == "test"){
	      		name ? name.value = "" : null
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

function closeNewsletterForm(){
	find("#newsletter-signup").classList.remove("opened")
}

function loadExternalContent(){
    if(getURLParameter("viva")=="mexico"){
    	window.localStorage.appinchina = true
    }
    var source
    	if(getURLParameter("gclid")!="error") source = "Google Ads"
	else if(getURLParameter("s")=='f') source = "Facebook"
	else if(getURLParameter("s")=='fa') source = "Facebook Ads"
	else if(getURLParameter("s")=='la') source = "Linkedin Ads"
	else if(getURLParameter("s")=='t') source = "Twitter"
	else if(getURLParameter("s")=='l') source = "Linkedin"
	else if(getURLParameter("s")=='q') source = "Quora"
	else if(getURLParameter("s")=='o') source = "Stackoverflow"
	else if(getURLParameter("s")=='r') source = "Reddit"
	else if(getURLParameter("s")=='m') source = "Medium"
	if(source) window.localStorage.source = source
	
	if(document.referrer){
	    if(!!document.referrer && !document.referrer.includes("appinchina.co")){
	        console.log("saving the new referrer")
	        window.localStorage.referrer = document.referrer
	    }
	    else{
	        console.log("the referrer is appinchina")
	    }
	}
	else{
	    if(!window.localStorage.referrer){
	        console.log("there's no referrer saved")
	        window.localStorage.referrer = "No referrer"
	    }
	    else{
	        console.log("'No referrer' already saved as referrer")
	    }
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

function sendNewsletterSignup(){
	let formElement = find("#newsletter-signup form")
	let email = formElement.querySelector("input[name='email']")
	var button = formElement.querySelector("button")
	let information = find("p#newsletter-confirmation")
	var xhttp = new XMLHttpRequest()
	var data = new FormData()
	let source = window.localStorage.source ? window.localStorage.source : "Not Specified"

	data.append('referrer', window.localStorage.referrer)
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
	      		window.localStorage.newsletterRegistered = true
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
			createIframe("https://www.appinchina.co/?conf=2")
		break;
	    case "getStartedForm":
			createIframe("https://www.appinchina.co/?conf=7")
		break;
		case "marketForm":
			createIframe("https://www.appinchina.co/?conf=4")
		break;
		case "servicesForm":
			createIframe("https://www.appinchina.co/?conf=6")
		break;
		case "aiconForm":
			createIframe("https://www.appinchina.co/?conf=5")
		break;
		case "contactForm":
			createIframe("https://www.appinchina.co/?conf=1")
		break;
	}
}

function showAllMedia(){
	document.querySelectorAll("#media .hidden").forEach(it=>it.classList.remove("hidden"))
	document.querySelector("#media .show-more").classList.add("hidden")
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

function showServiceDetails(id, index){
	find("#"+id+" .service-titles li").forEach((it,i) => i==index ? it.classList.add("selected") : it.classList.remove("selected"))
	find("#"+id+" .service-details li").forEach((it,i) => i==index ? it.classList.add("displayed") : it.classList.remove("displayed"))
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
function gtag_report_conversion(url) { 
  let callback = function(){
  	console.log("conversion tracked")
  }
  gtag('event', 'conversion', { 'send_to': 'AW-825668528/SATfCO3-znoQsOfaiQM', 'event_callback': callback }); 
  return false; 
}
function yahoo_report_conversion(){
    window.dotq = window.dotq || [];
    window.dotq.push(
    {
      'projectId': '10000',
      'properties': {
        'pixelId': '10061744',
        'qstrings': {
          'et': 'custom',
          'el': 'Qualified Lead'
        }
    } } );
}
function bing_report_conversion(){
    window.uetq = window.uetq || [];
    window.uetq.push({ 'el': 'Qualified Lead' });
}