var storesFound = 0;
var totalDownloads = 0;
var aiconLoading = false;
const timeLimit = 35000;

(()=>{
	let app = getUrlParameter("app")
	if(app) aiconSearch(app)
})();

function aiconSearch(app){
	aiconLoading = true
	history.pushState(null, null, '?app='+app)
	show(find("#aicon .results"))
	show(find("#loader"))
	hide(find("#searchAiconForm"))
	setTimeout(()=>{show(find("#searchOtherApp"))},600)
	var i
	for(i=0; i<=18; i++){
		searchInStore(i,app)
	}
	setTimeout(()=>{
		hide(find("#loader"))
		if(!storesFound) show(find("#zeroResults"))
	}, timeLimit)
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function searchInStore(index,app){
	var xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	try{
	      		let response = JSON.parse(this.responseText)
	      		if(response.found == "yes"){
	      			storesFound += 1
			    	if(storesFound){			    		
			    		let el=find("#searchTitle")
			    		el.querySelector("span").innerHTML = app
			    		show(el)
			    	}
	      			var el = find("#store"+index)
			      	el.querySelector("span.store-link").innerHTML = response.link
		      		if(response.downloads != "" && response.downloads != "RESULTS FOUND"){
			      		el.querySelector("p span").innerHTML = response.downloads
		      			totalDownloads += response.downloadsFull
		      			let totalElement = find("#totalDownloads")
			        	totalElement.innerHTML = styleAsNumber(totalDownloads)
			        	show(find("#totalDownloadsTitle"))
			        	show(totalElement)
			        }
			        else{
			        	el.querySelector("p span").innerHTML = "multiple"
			        }
			        show(el)
	      		}
	  		}
	  		catch(err){}
	    }
	}
	let timestamp = new Date().getTime()
	xhttp.open("GET", "https://www.appinchina.co/aicon/newSearchers/search"+index+".php?app="+app+"&timestamp="+timestamp, true)
	xhttp.send()
	setTimeout(()=>{ xhttp.abort() }, timeLimit)
}
