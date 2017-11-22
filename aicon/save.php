<?php
   $input = $_POST["input"];
   $mydate=getdate(date("U"));
   $date = "$mydate[weekday], $mydate[mday]-$mydate[month]-$mydate[year]";
   $time = "$mydate[hours]:$mydate[minutes]:$mydate[seconds]";
   $results=0;
   if(isset($_POST["input"])){
      $servername = "localhost";
      $username = "gingro_aicon";
      $password = "33e6b98afcbf";
      $database = "gingro_aicon";
      mysql_connect($servername, $username, $password) or die (mysql_error());
      mysql_select_db($database) or die(mysql_error());
      echo mysql_query('INSERT INTO gingro_aicon.searches (search, date, time, baidu_link, xiaomi_link, himarket_link, huawei_link, 360_link, anzhi_link, wandoujia_link, search_results) 
            VALUES ("'.$input.'", "'.$date.'","'.$time.'","'.search_baidu($input).'","'.search_xiaomi($input).'","'.search_himarket($input).'","'.search_huawei($input).'","'.search_sixty($input).'","'.search_anzhi($input).'","'.search_wandoujia($input).'","'.$results.'");');
   }
   function search_baidu($app){
      echo ".";
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
      echo ".";
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
      echo ".";
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
      echo ".";
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
      echo ".";
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
      echo ".";
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
      echo ".";
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