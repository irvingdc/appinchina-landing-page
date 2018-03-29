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
	if(window.location.pathname == "/" || window.location.pathname == "/test/") selectors = homeImageSelectors
	else if (window.location.pathname == "/market/") selectors = marketImageSelectors
	else return null
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
    if(find("#testimonials p")) startTestimonials();
    if(find("#clientsCarousel")) setupCarousel(70);

    document.addEventListener("scroll", (event)=>{
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

var storesFound = 0
var totalDownloads = 0
var aiconLoading = false
const timeLimit = 60000
var googleRequest = new XMLHttpRequest()
var lastAiconSearch
var totalDownloads = 0
const stores = [
			{ store: "_360",
			  name: "360",
			  image: "/images/stores/360.png",
			  url: "http://zhushou.360.cn/",
			},
			{ store: "tencent",
			  name: "Tencent",
			  image: "/images/stores/tencent.png",
			  url: "http://sj.qq.com/",
			},
			{ store: "xiaomi",
			  name: "Xiaomi",
			  image: "/images/stores/miui.png",
			  url: "http://app.xiaomi.com",
			},
			{ store: "baidu",
			  name: "Baidu",
			  image: "/images/stores/baidu.png",
			  url: "http://as.baidu.com",
			},
			{ store: "huawei",
			  name: "Huawei",
			  image: "/images/stores/huawei.png",
			  url: "http://appstore.huawei.com/",
			},
			{ store: "meizu",
			  name: "Meizu",
			  image: "/images/stores/meizu.jpeg",
			  url: "http://app.flyme.cn/",
			},
			{ store: "wandoujia",
			  name: "Wandoujia",
			  image: "/images/stores/wandoujia.png",
			  url: "http://www.wandoujia.com/",
			},
			{ store: "sogou",
			  name: "Sogou",
			  image: "/images/stores/sogou.png",
			  url: "http://zhushou.sogou.com/",
			},
			{ store: "pp",
			  name: "PP",
			  image: "/images/stores/pp.png",
			  url: "http://www.25pp.com/",
			},
			{ store: "lenovo",
			  name: "Lenovo",
			  image: "/images/stores/lenovo.png",
			  url: "http://www.lenovomm.com",
			},
			{ store: "anzhi",
			  name: "Anzhi",
			  image: "/images/stores/anzhi.jpg",
			  url: "http://www.anzhi.com/",
			},
			{ store: "_2345",
			  name: "2345",
			  image: "/images/stores/2345.png",
			  url: "http://zhushou.2345.com",
			},
			{ store: "mm",
			  name: "Mobile Market",
			  image: "/images/stores/mm.png",
			  url: "http://mm.10086.cn/",
			},
			{ store: "cheering",
			  name: "Cheering",
			  image: "/images/stores/lemon.png",
			  url: "http://apps.mycheering.com/WebPage/index.html",
			},
			{ store: "appchina",
			  name: "AppChina",
			  image: "/images/stores/appchina.png",
			  url: "http://www.appchina.com/",
			},
			{ store: "zol",
			  name: "Zol",
			  image: "/images/stores/zol.png",
			  url: "http://xiazai.zol.com.cn",
			},
		];

function aiconSearch(app){
	lastAiconSearch = undefined
	return false
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function handleSearchFocusOut(){
	setTimeout(()=>{find("#googleResults").innerHTML = ""},300)
	find("#appToSearch").value = ""
}

function removeSpecialChars(str){
	return str.replace(/\"/g,'')
}
function searchGoogle(){
	let app = find("#appToSearch").value
	googleRequest.abort()
	var googleResults = ""
	googleRequest.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	hideLoader()
	    	try{
	      		let apps = JSON.parse(this.responseText)
	      		console.log(apps)
	      		var appInformation
	      		apps.forEach((it)=>{
	      			googleResults += `<div onclick="openAiconPage('${removeSpecialChars(it.name)}','${removeSpecialChars(it.package)}','${removeSpecialChars(it.url)}')">
	      								<img src="data:image/png;base64,${it.imageData}">
	      								<div>
	      									<span>${it.name}</span>
	      									<span>${it.company}</span>
	      								</div>
	      							  </div>`;
	      		})
	      		googleResults += `<div onclick="handleSearchFocusOut()" class="aicon-clear flex"><span>Clear Results</span></div>`;
	      		find("#googleResults").innerHTML = googleResults
	  		}
	  		catch(err){}
	    }
	}
	let timestamp = new Date().getTime()
	if(app != "" && app != lastAiconSearch){
		setTimeout(()=>{
			showLoader()
			find("#googleResults").innerHTML = `<div class="aicon-loading"><span>Please wait while we search...</span></div>`
			lastAiconSearch = app
			googleRequest.open("GET", "https://www.appinchina.co/aicon/scraper.php?store=google&appName="+app+"&timestamp="+timestamp, true)
			googleRequest.send()
		},400)
	}
	else{
		hideLoader()
	}
}

function createStoresTable(){
	var html = `<div>
					<h2><span>Your app</span> may be in the following stores</h2>
					<p>Estimated number of downloads:<span>0</span></p>
				</div>
				<table>
					<tr>
						<th>App Store</th>
						<th>Result</th>
						<th>Downloads</th>
					</tr>`
	stores.forEach(it=>{
		html += `<tr id="${it.store}Store">
					<td><a href="${it.url}" target="_blank"><img src="${it.image}"/>${it.name}</a></td>
					<td><img src="/images/ring.gif"/></td>
					<td></td>
				 </tr>`
	})
	html += `</table>`
	find("#storesResults") ? find("#storesResults").innerHTML = html : null
}

function openAiconPage(name, pkg, url){
	window.open("/aicon/?search="+encodeURI(lastAiconSearch)+"&app="+encodeURI(name)+"&package="+encodeURI(pkg),"_blank")
}

function searchInAppStores(name, pkg, url){
	setTableStyle(name)	
	history.pushState('', 'AppInChina | AICON', "?search="+encodeURI(lastAiconSearch)+"&app="+encodeURI(name)+"&package="+encodeURI(pkg))
	find("#storesResults > div h2 span").innerHTML = name
	setTimeout(()=>{show(find("form#searchAiconForm a"))},500)
	if(url) saveInDatabase(name,url)
	stores.forEach(it=>{
		searchInStore(name,pkg,it.store)
	})
}

function saveInDatabase(name, url){
	var xhttp = new XMLHttpRequest()
	let timestamp = new Date().getTime()
	let fullUrl = "https://www.appinchina.co/aicon/save.php?search="+encodeURI(lastAiconSearch)+"&appFullName="+encodeURI(name)+"&url="+encodeURI(url)+"&timestamp="+timestamp
	console.log(fullUrl)
	xhttp.open("GET", fullUrl, true)
	xhttp.send()
}

function setTableStyle(name){
	find("#storesResults").style.height = "1240px"
}

function showLoader(){
	aiconLoading = true
	find("div#home form#searchAiconForm input").classList.remove("not-searching")
	find("#aiconGoogleLoader").style.display = "block"
}

function hideLoader(){
	aiconLoading = false
	find("div#home form#searchAiconForm input").classList.add("not-searching")
	find("#aiconGoogleLoader").style.display = "none"
}

function styleAsNumber(number){
	return number.toLocaleString('en', {maximumSignificantDigits : 21})
}

function searchInStore(name,pkg,store){
	var xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		let el = find("#"+store+"Store")
	    if (this.readyState == 4 && this.status == 200) {
	    	storesFound += 1
	    	try{
	      		if(this.responseText){
	      			let response = JSON.parse(this.responseText)
	      			el.querySelector("td:nth-child(2)").innerHTML = `<a href="${response.href}" target="_blank">Found in store</a>`
	      			totalDownloads += response.downloads ? response.downloads : 0
	      			find("#storesResults > div p span").innerHTML = styleAsNumber(totalDownloads)
		      		el.querySelector("td:nth-child(3)").innerHTML = response.downloads ? response.styledDownloads : "Some results found"
	      		}
	      		else{
	      			el.querySelector("td:nth-child(2)").innerHTML = `Not found`
	      		}
	  		}
	  		catch(err){}
	    }
	    else if(this.readyState == 4){
	    	storesFound += 1
	    	el.querySelector("td:nth-child(2)").innerHTML = "Store not responding"
	    }
	}
	let timestamp = new Date().getTime()
	xhttp.open("GET", "https://www.appinchina.co/aicon/scraper.php?store="+store+"&appName="+lastAiconSearch+"&appFullName="+name+"&package="+pkg+"&timestamp="+timestamp, true)
	xhttp.send()
	setTimeout(()=>{ xhttp.abort() }, timeLimit)
}

(()=>{
	createStoresTable()

	let search = getUrlParameter("search")
	let name = getUrlParameter("app")
	let pkg = getUrlParameter("package")
	lastAiconSearch = search
	if(name && pkg && search) searchInAppStores(name, pkg)
	
})();






