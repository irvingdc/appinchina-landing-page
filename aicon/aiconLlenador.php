<?php
   $servername = "localhost";
   $username = "gingro_aicon";
   $password = "33e6b98afcbf";
   $database = "gingro_aicon";
   $results = 0;
   mysql_connect($servername, $username, $password) or die (mysql_error());
   mysql_select_db($database) or die(mysql_error());
   $all_searches= mysql_query("SELECT * FROM searches WHERE id<222 ORDER BY id DESC");
   while($row = mysql_fetch_array($all_searches)){
   		$id = $row["id"];
   		$results = 0;
   		echo "Analizing id:".$id.", app:".$row["search"]." ";
   		mysql_query("UPDATE searches SET baidu_link='".search_baidu($row["search"])."' WHERE id=".$id);
   		echo ".";
   		mysql_query("UPDATE searches SET xiaomi_link='".search_xiaomi($row["search"])."' WHERE id=".$id);
   		echo ".";
   		mysql_query("UPDATE searches SET himarket_link='".search_himarket($row["search"])."' WHERE id=".$id);
   		echo ".";
   		mysql_query("UPDATE searches SET huawei_link='".search_huawei($row["search"])."' WHERE id=".$id);
   		echo ".";
   		mysql_query("UPDATE searches SET wandoujia_link='".search_wandoujia($row["search"])."' WHERE id=".$id);
   		echo ".";
   		mysql_query("UPDATE searches SET anzhi_link='".search_anzhi($row["search"])."' WHERE id=".$id);
   		echo ".";
   		mysql_query("UPDATE searches SET 360_link='".search_sixty($row["search"])."' WHERE id=".$id);
   		echo ".";
   		mysql_query("UPDATE searches SET search_results='".$results."' WHERE id=".$id);
   		echo ". all good<br>";
   }

   function search_baidu($app){
   	global $results;
   	$link="http://shouji.baidu.com/s?wd=";
	$app_plus=str_replace(" ","+",$app);
	$app=str_replace(" ","",$app);
	$string = "";
	$last_ocurrence_app=0;
	$main_webpage = file_get_contents($link.$app_plus);
	$main_webpage = strtolower(str_replace(" ","",$main_webpage));
	$result="error";
	$position_found_app=1;
	$con=0;
	while($position_found_app!==false){
        	$position_found_app = strpos($main_webpage,$app,$last_occurrence_app);
        	if($position_found_app!==false){
        		$last_occurrence_app = $position_found_app+1;
        		$result_tmp = substr($main_webpage,$position_found_app,strlen($app)+12);
        		$con++;
        		if(strpos($result_tmp,"</a>")!==false){
        			$results++;
        			return $link.$app_plus;
        		}
        	}
        }
	return "no results";
   }
   function search_xiaomi($app){
   	global $results;
   	$link="http://app.mi.com/search?keywords=";
	$app_plus=str_replace(" ","+",$app);
	$app=str_replace(" ","",$app);
	$string = "";
	$last_ocurrence_app=0;
	$main_webpage = file_get_contents($link.$app_plus);
	$main_webpage = strtolower(str_replace(" ","",$main_webpage));
	$result="error";
	$position_found_app=1;
	$con=0;
	while($position_found_app!==false){
        	$position_found_app = strpos($main_webpage,$app,$last_occurrence_app);
        	if($position_found_app!==false){
        		$last_occurrence_app = $position_found_app+1;
        		$result_tmp = substr($main_webpage,$position_found_app,strlen($app)+12);
        		$con++;
        		if(strpos($result_tmp,"</a>")!==false){
        			$results++;
        			return $link.$app_plus;
        		}
        	}
        }
	return "no results";
   }
   function search_himarket($app){
   	global $results;
   	$link="http://apk.hiapk.com/search?key=";
	$app_plus=str_replace(" ","+",$app);
	$app=str_replace(" ","",$app);
	$string = "";
	$last_ocurrence_app=0;
	$main_webpage = file_get_contents($link.$app_plus);
	$main_webpage = strtolower(str_replace(" ","",$main_webpage));
	$result="error";
	$position_found_app=1;
	$con=0;
	while($position_found_app!==false){
        	$position_found_app = strpos($main_webpage,$app,$last_occurrence_app);
        	if($position_found_app!==false){
        		$last_occurrence_app = $position_found_app+1;
        		$result_tmp = substr($main_webpage,$position_found_app,strlen($app)+12);
        		$con++;
        		if(strpos($result_tmp,"</a>")!==false){
        			$results++;
        			return $link.$app_plus;
        		}
        	}
        }
	return "no results";
   }
   function search_huawei($app){
   	global $results;
   	$link="http://appstore.huawei.com/search/";
	$app_plus=str_replace(" ","+",$app);
	$app=str_replace(" ","",$app);
	$string = "";
	$last_ocurrence_app=0;
	$main_webpage = file_get_contents($link.$app_plus);
	$main_webpage = strtolower(str_replace(" ","",$main_webpage));
	$result="error";
	$position_found_app=1;
	$con=0;
	while($position_found_app!==false){
        	$position_found_app = strpos($main_webpage,$app,$last_occurrence_app);
        	if($position_found_app!==false){
        		$last_occurrence_app = $position_found_app+1;
        		$result_tmp = substr($main_webpage,$position_found_app,strlen($app)+12);
        		$con++;
        		if(strpos($result_tmp,"</a>")!==false){
        			$results++;
        			return $link.$app_plus;
        		}
        	}
        }
	return "no results";
   }
   function search_sixty($app){
   	global $results;
   	$link="http://zhushou.360.cn/search/index/?kw=";
	$app_plus=str_replace(" ","+",$app);
	$app=str_replace(" ","",$app);
	$string = "";
	$last_ocurrence_app=0;
	$main_webpage = file_get_contents($link.$app_plus);
	$main_webpage = strtolower(str_replace(" ","",$main_webpage));
	$result="error";
	$position_found_app=1;
	$con=0;
	while($position_found_app!==false){
        	$position_found_app = strpos($main_webpage,'"title=',$last_occurrence_app);
        	if($position_found_app!==false){
        		$last_occurrence_app = $position_found_app+1;
        		$result_tmp = substr($main_webpage,$position_found_app,strlen($app)+15);
        		$con++;
        		if(strpos($result_tmp,$app)!==false){
        			$results++;
        			return $link.$app_plus;
        		}
        	}
        }
	return "no results";
   }
   function search_anzhi($app){
   	global $results;
   	$link="http://www.anzhi.com/search.php?keyword=";
	$app_plus=str_replace(" ","+",$app);
	$app=str_replace(" ","",$app);
	$string = "";
	$last_ocurrence_app=0;
	$main_webpage = file_get_contents($link.$app_plus);
	$main_webpage = strtolower(str_replace(" ","",$main_webpage));
	$result="error";
	$position_found_app=1;
	$con=0;
	while($position_found_app!==false){
        	$position_found_app = strpos($main_webpage,$app,$last_occurrence_app);
        	if($position_found_app!==false){
        		$last_occurrence_app = $position_found_app+1;
        		$result_tmp = substr($main_webpage,$position_found_app,strlen($app)+12);
        		$con++;
        		if(strpos($result_tmp,"</a>")!==false){
        			$results++;
        			return $link.$app_plus;
        		}
        	}
        }
	return "no results";
   }
   function search_wandoujia($app){
   	global $results;
   	$link="http://www.wandoujia.com/search?key=";
	$app_plus=str_replace(" ","+",$app);
	$app=str_replace(" ","",$app);
	$string = "";
	$last_ocurrence_app=0;
	$main_webpage = file_get_contents($link.$app_plus);
	$main_webpage = strtolower(str_replace(" ","",$main_webpage));
	$result="error";
	$position_found_app=1;
	while($position_found_app!==false){
        	$position_found_app = strpos($main_webpage,$app,$last_occurrence_app);
        	if($position_found_app!==false){
        		$last_occurrence_app = $position_found_app+1;
        		$result_tmp = substr($main_webpage,$position_found_app,strlen($app)+12);
        		if(strpos($result_tmp,"</a>")!==false){
        			$results++;
        			return $link.$app_plus;
        		}
        	}
        }
	return "no results";
   }
?>