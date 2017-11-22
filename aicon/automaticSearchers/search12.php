<?php

	//TAOBAO
	
	include('simple_html_dom.php');
	$link=$_GET['link'];
	$link=str_replace(" ","+",$link);
	$string = "";
	$found="no";
	$downloads = null;
	
	if(exists($link)){
		$html = file_get_html("http://".$link);
		foreach($html->find('p.app-downs') as $f){
			$downloads = $f->plaintext;
			$downloads = preg_replace('/\s+/', '', $downloads);
			$downloads = replaceChineseChars($downloads);
			break;
		}
	}
	echo $json =  '{"downloads":"'.str_replace(",","",$downloads).'"}';
	
	function replaceChineseChars($string){
		$multiply = 1;
		$downloads = "";
		$array = array("0","1","2","3","4","5","6","7","8","9",".",",");
		if(strpos($string, '百')) $multiply *= "100";
		if(strpos($string, '千')) $multiply *= "1000";
		if(strpos($string, '万')) $multiply *= "10000";
		if(strpos($string, '亿')) $multiply *= "100000000";
		for($i=0; $i<strlen($string); $i++){
			if(in_array(substr($string, $i, 1),$array)) $downloads = $downloads.substr($string, $i, 1);
		}
		$downloads = floatval($downloads)*floatval($multiply);
		
		if(strlen($downloads)>3)$downloads = substr_replace($downloads, ",", -3, 0);
		if(strlen($downloads)>7) $downloads = substr_replace($downloads, ",", -7, 0);
		if(strlen($downloads)>11) $downloads = substr_replace($downloads, ",", -11, 0);
		if(strlen($downloads)>15) $downloads = substr_replace($downloads, ",", -15, 0);
		if(strlen($downloads)>19) $downloads = substr_replace($downloads, ",", -19, 0);
		
		return $downloads;
	}
	
	function exists($url){
		$array = get_headers("http://".$url);
		$string = $array[0];
		if(strpos($string,"200"))
		  {
		    return true;
		  }
		  else
		  {
		    return false;
		  }
	}
?>