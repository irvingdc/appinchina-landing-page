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
			  image: "https://www.appinchina.co/images/stores/360.png",
			  url: "http://zhushou.360.cn/",
			},
			{ store: "tencent",
			  name: "Tencent",
			  image: "https://www.appinchina.co/images/stores/tencent.png",
			  url: "http://sj.qq.com/",
			},
			{ store: "xiaomi",
			  name: "Xiaomi",
			  image: "https://www.appinchina.co/images/stores/miui.png",
			  url: "http://app.xiaomi.com",
			},
			{ store: "baidu",
			  name: "Baidu",
			  image: "https://www.appinchina.co/images/stores/baidu.png",
			  url: "http://as.baidu.com",
			},
			/*{ store: "huawei",
			  name: "Huawei",
			  image: "https://www.appinchina.co/images/stores/huawei.png",
			  url: "http://appstore.huawei.com/",
			},*/
			{ store: "meizu",
			  name: "Meizu",
			  image: "https://www.appinchina.co/images/stores/meizu.jpeg",
			  url: "http://app.flyme.cn/",
			},
			{ store: "wandoujia",
			  name: "Wandoujia",
			  image: "https://www.appinchina.co/images/stores/wandoujia.png",
			  url: "http://www.wandoujia.com/",
			},
			{ store: "sogou",
			  name: "Sogou",
			  image: "https://www.appinchina.co/images/stores/sogou.png",
			  url: "http://zhushou.sogou.com/",
			},
			{ store: "pp",
			  name: "PP",
			  image: "https://www.appinchina.co/images/stores/pp.png",
			  url: "http://www.25pp.com/",
			},
			{ store: "lenovo",
			  name: "Lenovo",
			  image: "https://www.appinchina.co/images/stores/lenovo.png",
			  url: "http://www.lenovomm.com",
			},
			{ store: "anzhi",
			  name: "Anzhi",
			  image: "https://www.appinchina.co/images/stores/anzhi.jpg",
			  url: "http://www.anzhi.com/",
			},
			{ store: "_2345",
			  name: "2345",
			  image: "https://www.appinchina.co/images/stores/2345.png",
			  url: "http://zhushou.2345.com",
			},
			{ store: "mm",
			  name: "Mobile Market",
			  image: "https://www.appinchina.co/images/stores/mm.png",
			  url: "http://mm.10086.cn/",
			},
			{ store: "cheering",
			  name: "Cheering",
			  image: "https://www.appinchina.co/images/stores/lemon.png",
			  url: "http://apps.mycheering.com/WebPage/index.html",
			},
			{ store: "appchina",
			  name: "AppChina",
			  image: "https://www.appinchina.co/images/stores/appchina.png",
			  url: "http://www.appchina.com/",
			},
			{ store: "zol",
			  name: "Zol",
			  image: "https://www.appinchina.co/images/stores/zol.png",
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
	      		googleResults += `<div onclick="handleSearchFocusOut()" class="aicon-clear flex"><span>Borrar Resultados</span></div>`;
	      		find("#googleResults").innerHTML = googleResults
	  		}
	  		catch(err){}
	    }
	}
	let timestamp = new Date().getTime()
	if(app != "" && app != lastAiconSearch){
		setTimeout(()=>{
			showLoader()
			find("#googleResults").innerHTML = `<div class="aicon-loading"><span>Por favor espera mientras buscamos...</span></div>`
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
					<h2><span>Tu aplicación</span> podría estar en las siguientes App Stores</h2>
					<p>Número estimado de descargas::<span>0</span></p>
				</div>
				<table>
					<tr>
						<th>App Store</th>
						<th>Resultado</th>
						<th>Descargas</th>
					</tr>`
	stores.forEach(it=>{
		html += `<tr id="${it.store}Store">
					<td><a href="${it.url}" target="_blank"><img src="${it.image}"/>${it.name}</a></td>
					<td><img src="https://www.appinchina.co/images/ring.gif"/></td>
					<td></td>
				 </tr>`
	})
	html += `</table>`
	find("#storesResults") ? find("#storesResults").innerHTML = html : null
}

function openAiconPage(name, package, url){
	window.open("/aicon/?search="+encodeURI(lastAiconSearch)+"&app="+encodeURI(name)+"&package="+encodeURI(package),"_blank")
}

function searchInAppStores(name, package, url){
	setTableStyle(name)	
	history.pushState('', 'AppInChina | AICON', "?search="+encodeURI(lastAiconSearch)+"&app="+encodeURI(name)+"&package="+encodeURI(package))
	find("#storesResults > div h2 span").innerHTML = name
	setTimeout(()=>{show(find("form#searchAiconForm a"))},500)
	if(url) saveInDatabase(name,url)
	stores.forEach(it=>{
		searchInStore(name,package,it.store)
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
	      		if(this.responseText && JSON.parse(this.responseText).text){
	      			let response = JSON.parse(this.responseText)
	      			el.querySelector("td:nth-child(2)").innerHTML = `<a href="${response.href}" target="_blank">Encontrado</a>`
	      			totalDownloads += response.downloads ? response.downloads : 0
	      			find("#storesResults > div p span").innerHTML = styleAsNumber(totalDownloads)
		      		el.querySelector("td:nth-child(3)").innerHTML = response.downloads ? response.styledDownloads : "Algunos resultados encontrados"
	      		}
	      		else{
	      			el.querySelector("td:nth-child(2)").innerHTML = `No Encontrado`
	      		}
  		}
  		catch(err){
  			el.querySelector("td:nth-child(2)").innerHTML = `No Encontrado`
  		}
	    }
	    else if(this.readyState == 4){
	    	storesFound += 1
	    	el.querySelector("td:nth-child(2)").innerHTML = "La App Store no responde"
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
	let package = getUrlParameter("package")
	lastAiconSearch = search
	if(name && package && search) searchInAppStores(name, package)
	
})();