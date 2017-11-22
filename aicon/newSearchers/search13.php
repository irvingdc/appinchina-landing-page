<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");
$url = "http://31.220.53.98/scrapers/meizu?search=".(urlencode($_GET["app"]));     
echo file_get_contents($url);

?>