//analytics
/*
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-2213742-7', 'auto');
ga('send', 'pageview');
*/

//mouseflow
window._mfq = window._mfq || [];
(function() {
    var mf = document.createElement("script");
    mf.type = "text/javascript"; mf.async = true;
    mf.src = "//cdn.mouseflow.com/projects/e6bc91a0-14ab-40f7-a817-e4c1d90b7e24.js";
    document.getElementsByTagName("head")[0].appendChild(mf);
    console.log(":)")
})();

//saleswings
!function(){function a(){var a=document.createElement("script");a.type="text/javascript",a.async=1,a.src="//go.saleswingsapp.com/assets/javascripts/sw/05b84440-4b11-4377-9c0a-8996bbf42fea?enableFormTracker=true";var b=document.getElementById("SW-05b84440-4b11-4377-9c0a-8996bbf42fea");b.parentNode.insertBefore(a,b)}window.attachEvent?window.attachEvent("onload",a):window.addEventListener("load",a,0);window.attachEvent?window.attachEvent("onhashchange",a):window.addEventListener("hashchange",a,0);}();

if(!(window.location.href=="https://www.appinchina.co/" || window.location.href=="https://appinchina.co/" || window.location.href=="https://www.appinchina.co" || window.location.href=="https://appinchina.co")){
	//google tag manager
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', 'UA-2213742-7');
	console.log("using google tag manager")
}

//google adwords
window.dataLayer = window.dataLayer || [];
 function gtag(){dataLayer.push(arguments);}
 gtag('js', new Date());

 gtag('config', 'AW-825668528');
 
//identick
window.identick = '45'
!function(i,d,e,n,t,c,k){i.Identick=e;i[e]||(i[e]=function(){
(i[e].q=i[e].q||[]).push(arguments)});i[e].l=+new Date;c=d.createElement(n);
k=d.getElementsByTagName(n)[0];c.src=t;k.parentNode.insertBefore(c,k)}
(window,document,'idntk','script','//cdn.identick.com/intel.js');

console.log("loaded external scripts")