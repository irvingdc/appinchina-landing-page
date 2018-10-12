function setupAicon(){
    var url = new URL(window.location.href);
    var app = url.searchParams.get("app");
    console.log("url: ",'https://www.appinchina.co/admin/api/aiconReports.php?app='+encodeURIComponent(app));
    
    fetch('https://www.appinchina.co/admin/api/aiconReports.php?app='+encodeURIComponent(app))
      .then(response => {
        return response.json();
      })
      .catch(error => {
          console.log("ERROR 1: ", error)
      })
      .then(json => {
        buildAiconTable(app, json)
      })
      .catch(error => {
          console.log("ERROR 2: ", error)
      })
}

function gc(val){ //validates if the element should display
    return val ? "" : "aicon-hidden"
}

function styleAsNumber(str){
    return (str !== undefined && str !== null) ? (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, (a, b, c) => {
            return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
        }) : ""
}

function buildAiconTable(app, stores){
    let totalDownloads = stores.map(it => it.downloads ? (typeof it.downloads == "number" ? it.downloads : it.downloads.replace(/[^\d]/g,"")) : 0 ).reduce((acc, val) => acc + parseInt(val ? val : 0), 0)
    let html = `
    <div class="aicon-card">
        <div>
            <h2 class="TableTitle">${ app }</h2>
			<div class="MainInfo">
				<h3><b>Stores Found: </b> ${ stores.filter(it => it.href).length }</h3>
				<h3><b>Total Downloads: </b> ${ styleAsNumber(totalDownloads) }</h3>
			</div>
        </div>
        <table class="aicon-results">
            <tr>
              <th>Ranking</th>
              <th class="align-left">Store</th>
              <th class="${ gc(stores[0].market_coverage) }">MAU</th>
              <th class="align-left">Result</th>
              <th>Downloads</th>
              <th>Version</th>
              <th>Link</th>
            </tr>` +
            stores.map( it => `<tr>
                <td>
                    <span class="aicon-label">Ranking: </span>
                    ${ it.ranking+1 }
                </td>
                <td class="align-left">
                    <span class="aicon-label">Store: </span>
                    <a href="${ it.url }" target="_blank">${  it.name }</a>
                </td>
                <td  class="${ gc(stores[0].market_coverage) }">
                    <span class="aicon-label">MAU: </span>
                    ${ parseFloat(it.market_coverage).toFixed(2) }%
                </td>
                <td class="align-left">
                    <span class="aicon-label">Status: </span>
                    <span class="${ gc(!it.scrapeable) }">Not Searchable</span>
                    <span class="${ gc(it.scrapeable) }">
                        <b class="${ [gc(it.found), "aicon-found"].join(' ') }">Found</b>
                        <b class="${ [gc(!it.found), "aicon-not-found"].join(' ') }">Not Found</b>
                    </span>
                </td>
                <td>
                    <span class="aicon-label">Downloads: </span>
                    <span class="${ gc(it.downloaded)}">${ it.downloads ? it.downloads : "" }</span>
                </td>
                <td>
                    <span class="aicon-label">Version: </span>
                    <span class="${ gc(it.downloaded) }">${ it.version ? it.version : "" }</span>
                </td>
                <td>
                    <span class="aicon-label">Link: </span>
                    <a class="${ gc(it.href) }" href="${ it.href ? it.href : "" }" target="_blank">View in store</a>
                </td>
            </tr>`).join('') +
          `</table>
        </div>
    `;
    document.querySelector("#aicon").innerHTML = html;
}

setupAicon();