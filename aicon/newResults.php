<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta name="viewport" content="width=device-width">
	<link rel="stylesheet" type="text/css" href="main.css" />
	<link rel="stylesheet" type="text/css" href="css/new_aicon.css" />
	<link rel="shortcut icon" href="favicon.ico"/>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>App in China or Not</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script type="text/javascript" src="js/new_aicon.js"></script>
<!--Start of Google Analytics Script-->
 <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-2213742-7', 'auto');
  ga('send', 'pageview');
</script>
<!--End of Google Analytics Script-->
<!-- SW -->
<script src = "//go.saleswingsapp.com/assets/javascripts/sw2.js" 
type="text/javascript"></script>
<script>window.ch.saleswings.start
(null, "05b84440-4b11-4377-9c0a-8996bbf42fea");
</script>
<!-- SW -->
  <!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
 fbq('init', '144837885851316'); 
fbq('track', 'PageView');
</script>
<noscript>
 <img height="1" width="1" 
src="https://www.facebook.com/tr?id=144837885851316&ev=PageView
&noscript=1"/>
</noscript>
<!-- End Facebook Pixel Code -->
</head>

<body>
	<header class="page-header">
        <div class="nav-line">
          <a class="btn-menu" data-burger-menu-id="menu-aside" href="https://www.appinchina.co"><span>Menu</span></a>
          <a class="logo"><img src="logo.svg" alt="AppInChina" href="https://www.appinchina.co"> AppInChina</a>
        </div>
	</header>
	<h3></h3>
	<h2><span class="black">AppInChina<span class="soft">OrNot</span></span></h2>
	<div class="newcontainer">
		<h1 class="fullresults"><span id="span-app"></span> may be on the following stores <br><div id="totalDownloads"></div></h1>
		<div><img src="img/ring.gif" id="loading"></div>

		<div class="sendform-container" id="form2">
			<div class="sendform">
				<h4>We found copies of your app.<br>Would you like to reclaim them?</h4>
				<input type="text" name="email" placeholder="Email" id="uxmail">
				<button id="sendmail" onclick='sendMail3($("#uxmail").val());'>Yes, reclaim my app</button>
				<div id="closebutton" onclick='$("#form2").fadeOut();'></div>
                                <label class="checkbox" style="margin-top: 3px; padding-bottom: 13px; color: white; text-align: center;">
                                <input type="checkbox" name="subscription" value="yes" id="check" checked>
                                <span class="face-label">Sign up to our newsletter</span>
			</div>
		</div>

		<div class="tables-container">
			<form onsubmit="return function(){fbq('track', 'Search'); return goSearch()}">
				<h1>Discover if your app already exists on the top Chinese app stores</h1>
				<table>
					<tr>
						<td><input type="text" id="appToSearch" placeholder="What's your app name?" value="<?php echo $_GET['app']; ?>"></input></td>
						<td><button>Search</button></td>
					</tr>
				</table>
			</form>
			<script> $(document).ready(function(){ fbq('track', 'Search'); goSearch() }) </script>
			
			<div class="results">
				<div id="store1">
					<img id="logostore" src="https://i0.wp.com/appinchina.co/wordpress/wp-content/uploads/2014/09/baidu.png?w=720">
				    	<a href="http://as.baidu.com" target="_blank">Baidu</a>
				    	<p class="downloads1">Downloaded <span id="downloads1">many</span> times</p>
				    	<p id="store1_result" class="bottom-link"><a href="#">View in store</a></p>
				</div>
				<div id="store2">
					<img id="logostore" src="https://i2.wp.com/appinchina.co/wordpress/wp-content/uploads/2014/09/miui.png?w=720">
				    	<a href="http://app.xiaomi.com" target="_blank">Xiaomi</a>
					<p class="downloads2">Downloaded <span id="downloads2">many</span> times</p>
				    	<p id="store2_result" class="bottom-link"><a href="#">View in store</a></p>
				</div>
				<div id="store3">
					<img id="logostore" src="https://i0.wp.com/appinchina.co/wordpress/wp-content/uploads/2014/09/himarket.png?w=720" class="img3">
				    	<a href="http://apk.hiapk.com" target="_blank">HiMarket</a>
					<p class="downloads3">Downloaded <span id="downloads3">many</span> times</p>
				    	<p id="store3_result" class="bottom-link"><a href="#">View in store</a></p>
				</div>
				<div id="store4">
					<img id="logostore" src="https://i0.wp.com/appinchina.co/wordpress/wp-content/uploads/2014/09/huawei.png?w=720" class="img4">
				    	<a href="http://appstore.huawei.com/" target="_blank">Huawei</a>
					<p class="downloads4">Downloaded <span id="downloads4">many</span> times</p>
				    	<p id="store4_result" class="bottom-link"><a href="#">View in store</a></p>
				</div>
				<div id="store5">
					<img id="logostore" src="https://i0.wp.com/appinchina.co/wordpress/wp-content/uploads/2014/09/360mobile.png?w=720" class="img5">
				    	<a href="http://zhushou.360.cn/" target="_blank">360</a>
					<p class="downloads5">Downloaded <span id="downloads5">many</span> times</p>
				    	<p id="store5_result" class="bottom-link"><a href="#">View in store</a></p>
				</div>
				<div id="store6">
					<img id="logostore" src="http://i0.wp.com/appinchina.co/wordpress/wp-content/uploads/2014/09/anzhi.png?w=720" class="img6">
				    	<a href="http://www.anzhi.com/" target="_blank">Anzhi</a>
					<p class="downloads6">Downloaded <span id="downloads6">many</span> times</p>
				    	<p id="store6_result" class="bottom-link"><a href="#">View in store</a></p>
				</div>
				<div id="store7">
					<img id="logostore" src="https://i1.wp.com/appinchina.co/wordpress/wp-content/uploads/2014/09/wandoujia.png?w=720" class="img7">
				    	<a href="http://www.wandoujia.com/" target="_blank">Wandoujia</a>
					<p class="downloads7">Downloaded <span id="downloads7">many</span> times</p>
				    	<p id="store7_result" class="bottom-link"><a href="#">View in store</a></p>
				</div>
				<div id="store8">
					<img id="logostore" src="img/sogou.png" class="img8">
				    	<a href="http://zhushou.sogou.com/" target="_blank">Sogou</a>
					<p class="downloads8">Downloaded <span id="downloads8">many</span> times</p>
				    	<p id="store8_result" class="bottom-link"><a href="#">View in store</a></p>
				</div>
				<div id="store9">
					<img id="logostore" src="http://i2.wp.com/appinchina.co/wordpress/wp-content/uploads/2014/09/91mobile.png?w=720" class="img9">
				    	<a href="http://apk.91.com/" target="_blank">91</a>
					<p class="downloads9">Downloaded <span id="downloads9">many</span> times</p>
				    	<p id="store9_result" class="bottom-link"><a href="#">View in store</a></p>
				</div>
				<div id="store10">
					<img id="logostore" src="http://i1.wp.com/appinchina.co/wordpress/wp-content/uploads/2014/09/oppostore.png?w=720" class="img10">
				    	<a href="http://store.oppomobile.com/index.html" target="_blank">OPPO</a>
					<p class="downloads10">Downloaded <span id="downloads10">many</span> times</p>
				    	<p id="store10_result" class="bottom-link"><a href="#">View in store</a></p>
				</div>
				<div id="store11">
					<img id="logostore" src="http://i0.wp.com/appinchina.co/wordpress/wp-content/uploads/2014/09/lenovo.png?w=720" class="img11">
				    	<a href="http://www.lenovomm.com" target="_blank">Lenovo</a>
					<p class="downloads11">Downloaded <span id="downloads11">many</span> times</p>
				    	<p id="store11_result" class="bottom-link"><a href="#">View in store</a></p>
				</div>
				<div id="store12">
					<img id="logostore" src="img/t.png" class="img12">
				    	<a href="http://www.25pp.com/" target="_blank">Taobao</a>
					<p class="downloads12">Downloaded <span id="downloads12">many</span> times</p>
				    	<p id="store12_result" class="bottom-link"><a href="#">View in store</a></p>
				</div>
			</div>
		</div>
		<p class="negativeResults">Zero results found</p>
		<div class="back">
			<a href="/aicon" id="back">Search again</a>
		</div>

	</div>

<!--Start of mouseflow Script-->
  <script type="text/javascript">  
      var _mfq = _mfq || [];
	  (function() {
	    var mf = document.createElement("script");
	    mf.type = "text/javascript"; mf.async = true;
	    mf.src = "//cdn.mouseflow.com/projects/e6bc91a0-14ab-40f7-a817-e4c1d90b7e24.js";
	    document.getElementsByTagName("head")[0].appendChild(mf);
	  })();
	$('[data-burger-menu-id="contact-form"]').on( "click", function() {
	if (mouseflow) { mouseflow.tag('Button clicked'); }});
</script>
  <!--End of mouseflow Script-->
	
</body>
</html>	