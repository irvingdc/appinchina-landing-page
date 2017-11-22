<?php

$url = "http://appinchina.xyz/tencent?search=".$_GET["app"];     
echo file_get_contents($url);

?>