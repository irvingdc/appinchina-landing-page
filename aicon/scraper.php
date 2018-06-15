<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");

$store = $_GET["store"];
$appName = $_GET["appName"];
$appFullName = $_GET["appFullName"];
$package = $_GET["package"];

if(isset($_GET["googleDetailsUrl"])) $url = "http://31.220.53.98/aicon-scrapers/googleDetails?url=".(urlencode($_GET["googleDetailsUrl"]));
else if($store=="google") $url = "http://31.220.53.98/aicon-scrapers/google?appName=".(urlencode($appName)); 
else $url = "http://31.220.53.98/aicon-scrapers/general?appName=".(urlencode($appName))."&appFullName=".(urlencode($appFullName))."&store=".(urlencode($store))."&package=".(urlencode($package)); 
echo file_get_contents($url);

?>