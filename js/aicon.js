var storesResults = 0
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
	      			googleResults += `<div onclick='openAiconPage("${removeSpecialChars(it.name)}","${removeSpecialChars(it.package)}","${removeSpecialChars(it.url)}")'>
	      								<img src='data:image/png;base64,${it.imageData}'>
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
			googleRequest.open("GET", "https://www.appinchina.co/aicon/scraper.php?store=google&appName="+encodeURIComponent(app)+"&timestamp="+timestamp, true)
			googleRequest.send()
		},400)
	}
	else{
		hideLoader()
	}
}

function createStoresTable(){
	var html = `<div>
					<h2><span>Your app</span> has been found on <b id="totalResults">0</b> Chinese app <b id="storesTitle">stores</b></h2>
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
	window.open("/aicon/?search="+encodeURIComponent(lastAiconSearch)+"&app="+encodeURIComponent(name)+"&package="+encodeURIComponent(pkg)+"&url="+encodeURIComponent(url),"_blank")
}

function searchInAppStores(name, pkg, url){
	setTableStyle(name)	
	history.pushState('', 'AppInChina | AICON', "?search="+encodeURIComponent(lastAiconSearch)+"&app="+encodeURIComponent(name)+"&package="+encodeURIComponent(pkg)+"&url="+encodeURIComponent(url))
	find("#storesResults > div h2 span").innerHTML = `<a href="${url}" target="_blank">${name}</a>`
	setTimeout(()=>{show(find("form#searchAiconForm a"))}, 500)
	if(url) saveInDatabase(name,url)
	stores.forEach(it=>{
		searchInStore(name,pkg,it.store)
	})
}

function saveInDatabase(name, url){
	var xhttp = new XMLHttpRequest()
	let timestamp = new Date().getTime()
	let fullUrl = "https://www.appinchina.co/aicon/save.php?search="+encodeURIComponent(lastAiconSearch)+"&appFullName="+encodeURIComponent(name)+"&url="+encodeURIComponent(url)+"&timestamp="+timestamp
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
	    	storesResults += 1
	    	try{
	      		if(this.responseText && JSON.parse(this.responseText).text){
	      			let response = JSON.parse(this.responseText)
	      			el.querySelector("td:nth-child(2)").innerHTML = `<a href="${response.href}" target="_blank">Found in store</a>`
	      			totalDownloads += response.downloads ? response.downloads : 0
	      			find("#storesResults > div p span").innerHTML = styleAsNumber(totalDownloads)
		      		el.querySelector("td:nth-child(3)").innerHTML = response.downloads ? response.styledDownloads : "Some results found"
		      		storesFound += 1
		      		document.querySelector("#totalResults").innerHTML = storesFound
		      		document.querySelector("#storesTitle").innerHTML = storesFound==1 ? "store" : "stores"
	      		}
	      		else{
	      			el.querySelector("td:nth-child(2)").innerHTML = `Not found`
	      		}
	  		}
	  		catch(err){
	  			el.querySelector("td:nth-child(2)").innerHTML = `Not found`
	  		}
	    }
	    else if(this.readyState == 4){
	    	storesResults += 1
	    	el.querySelector("td:nth-child(2)").innerHTML = "Store not responding"
	    }
	}
	let timestamp = new Date().getTime()
	xhttp.open("GET", "https://www.appinchina.co/aicon/scraper.php?store="+store+"&appName="+encodeURIComponent(lastAiconSearch)+"&appFullName="+encodeURIComponent(name)+"&package="+pkg+"&timestamp="+timestamp, true)
	xhttp.send()
	setTimeout(()=>{ xhttp.abort() }, timeLimit)
}

(()=>{
	createStoresTable()
	let search = getUrlParameter("search")
	let name = getUrlParameter("app")
	let pkg = getUrlParameter("package")
	let url = getUrlParameter("url")
	lastAiconSearch = search
	if(name && pkg && search) searchInAppStores(name, pkg, url)
	
})();






