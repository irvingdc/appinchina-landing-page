<?php

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

function getBestMatch($results, $app, $header){
	$app = clean($app);
	$bestResultUrl = false;
	$bestResultPercent = 0;
	foreach($results as $e){
		$text = strtolower($e->plaintext);
		$url = $e->href;
		
		if(!containsChineseCharacters($app)) $text = clean($text);
		
		$similarity = (1 + similar_text($text,$app)) * (1 + similar_text($app,$text)) * (1 + similarity($text,$app)) * (1 + similarity($app,$text));
		if($similarity > $bestResultPercent){
			$bestResultUrl = $header.$e->href;
			$bestResultPercent = $similarity;
		}
	}
	if($bestResultPercent > 600000) return $bestResultUrl;
	else return false;
}

function curlGet($url){         
	$ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $runfile);

    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);

    return curl_exec ($ch);

    curl_close ($ch); 

}

function containsChineseCharacters($string){
    $newString = preg_replace("/\p{Han}+/u", '', $string);
    return (strlen($newString) != strlen($string));
}

function clean($string) {
   $string = strtolower($string);
   $string = preg_replace("/\p{Han}+/u", '', $string);
   return preg_replace('/[^A-Za-z0-9\-]/', '', $string);
}

function similarity($str1, $str2) {
    $len1 = strlen($str1);
    $len2 = strlen($str2);
    
    $max = max($len1, $len2);
    $similarity = $i = $j = 0;
    
    while (($i < $len1) && isset($str2[$j])) {
        if ($str1[$i] == $str2[$j]) {
            $similarity++;
            $i++;
            $j++;
        } elseif ($len1 < $len2) {
            $len1++;
            $j++;
        } elseif ($len1 > $len2) {
            $i++;
            $len1--;
        } else {
            $i++;
            $j++;
        }
    }

    return (100 * ($similarity / $max));
}

function removeProtocol($url){
	$url = str_replace("https://","",$url);
	$url = str_replace("http://","",$url);
	return $url;
}

?>