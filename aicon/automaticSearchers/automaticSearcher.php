<?php

	/* Connection stablished with the database */
	$servername = "localhost";
	$username = "gingro_clients";
	$password = "33e6b98afcbf";
	mysql_connect($servername, $username, $password) or die (mysql_error());
	mysql_select_db("gingro_clients_db") or die(mysql_error());
	
	$apps = mysql_query("SELECT * FROM APPS ORDER BY id DESC");
	while($app = mysql_fetch_array($apps)){
		echo "<br>APP -> ".$app['name']."<br>";
		$information = mysql_query("SELECT * FROM INFORMATION WHERE app_id=".$app['id']);
		while($information_row = mysql_fetch_array($information)){
			switch($information_row['store_id']){
				case 3:
					$link = $information_row['link'];
					if($link!= null AND $link != ""){
						$link = str_replace("http://","",$link);
						$link = str_replace("https://","",$link);
						$search_link = "http://www.appinchina.co/aicon/automaticSearchers/search1.php?link=".$link;
						
						$downloads = json_decode(file_get_contents($search_link));
						echo "DOWNLOADS IN BAIDU (".$link.") -> ".$downloads->downloads."<br>";
						mysql_query("INSERT INTO DOWNLOADS(downloads,date,app_id,store_id) VALUES(".$downloads->downloads.",NOW(),".$app['id'].",".$information_row['store_id'].")");
					}
				break;
				case 6:
					$link = $information_row['link'];
					if($link!= null AND $link != ""){
						$link = str_replace("http://","",$link);
						$link = str_replace("https://","",$link);
						$search_link = "http://www.appinchina.co/aicon/automaticSearchers/search3.php?link=".$link;
						
						$downloads = json_decode(file_get_contents($search_link));
						echo "DOWNLOADS IN HIMARKET(".$link.") -> ".$downloads->downloads."<br>";
						mysql_query("INSERT INTO DOWNLOADS(downloads,date,app_id,store_id) VALUES(".$downloads->downloads.",NOW(),".$app['id'].",".$information_row['store_id'].")");
					}
				break;
				case 10:
					$link = $information_row['link'];
					if($link!= null AND $link != ""){
						$link = str_replace("http://","",$link);
						$link = str_replace("https://","",$link);
						$search_link = "http://www.appinchina.co/aicon/automaticSearchers/search4.php?link=".$link;
						
						$downloads = json_decode(file_get_contents($search_link));
						echo "DOWNLOADS IN HUAWEI(".$link.") -> ".$downloads->downloads."<br>";
						mysql_query("INSERT INTO DOWNLOADS(downloads,date,app_id,store_id) VALUES(".$downloads->downloads.",NOW(),".$app['id'].",".$information_row['store_id'].")");
					}
				break;
				case 2:
					$link = $information_row['link'];
					if($link!= null AND $link != ""){
						$link = str_replace("http://","",$link);
						$link = str_replace("https://","",$link);
						$search_link = "http://www.appinchina.co/aicon/automaticSearchers/search5.php?link=".$link;
						
						$downloads = json_decode(file_get_contents($search_link));
						echo "DOWNLOADS IN 360(".$link.") -> ".$downloads->downloads."<br>";
						mysql_query("INSERT INTO DOWNLOADS(downloads,date,app_id,store_id) VALUES(".$downloads->downloads.",NOW(),".$app['id'].",".$information_row['store_id'].")");
					}
				break;
				case 8:
					$link = $information_row['link'];
					if($link!= null AND $link != ""){
						$link = str_replace("http://","",$link);
						$link = str_replace("https://","",$link);
						$search_link = "http://www.appinchina.co/aicon/automaticSearchers/search6.php?link=".$link;
						
						$downloads = json_decode(file_get_contents($search_link));
						echo "DOWNLOADS IN ANZHI(".$link.") -> ".$downloads->downloads."<br>";
						mysql_query("INSERT INTO DOWNLOADS(downloads,date,app_id,store_id) VALUES(".$downloads->downloads.",NOW(),".$app['id'].",".$information_row['store_id'].")");
					}
				break;
				case 5:
					$link = $information_row['link'];
					if($link!= null AND $link != ""){
						$link = str_replace("http://","",$link);
						$link = str_replace("https://","",$link);
						$search_link = "http://www.appinchina.co/aicon/automaticSearchers/search7.php?link=".$link;
						
						$downloads = json_decode(file_get_contents($search_link));
						echo "DOWNLOADS IN WANDOUJIA(".$link.") -> ".$downloads->downloads."<br>";
						mysql_query("INSERT INTO DOWNLOADS(downloads,date,app_id,store_id) VALUES(".$downloads->downloads.",NOW(),".$app['id'].",".$information_row['store_id'].")");
					}
				break;
				case 13:
					$link = $information_row['link'];
					if($link!= null AND $link != ""){
						$link = str_replace("http://","",$link);
						$link = str_replace("https://","",$link);
						$search_link = "http://www.appinchina.co/aicon/automaticSearchers/search8.php?link=".$link;
						
						$downloads = json_decode(file_get_contents($search_link));
						echo "DOWNLOADS IN SOGOU(".$link.") -> ".$downloads->downloads."<br>";
						mysql_query("INSERT INTO DOWNLOADS(downloads,date,app_id,store_id) VALUES(".$downloads->downloads.",NOW(),".$app['id'].",".$information_row['store_id'].")");
					}
				break;
				case 7:
					$link = $information_row['link'];
					if($link!= null AND $link != ""){
						$link = str_replace("http://","",$link);
						$link = str_replace("https://","",$link);
						$search_link = "http://www.appinchina.co/aicon/automaticSearchers/search9.php?link=".$link;
						
						$downloads = json_decode(file_get_contents($search_link));
						echo "DOWNLOADS IN 91(".$link.") -> ".$downloads->downloads."<br>";
						mysql_query("INSERT INTO DOWNLOADS(downloads,date,app_id,store_id) VALUES(".$downloads->downloads.",NOW(),".$app['id'].",".$information_row['store_id'].")");
					}
				break;
				case 9:
					$link = $information_row['link'];
					if($link!= null AND $link != ""){
						$link = str_replace("http://","",$link);
						$link = str_replace("https://","",$link);
						$search_link = "http://www.appinchina.co/aicon/automaticSearchers/search10.php?link=".$link;
						
						$downloads = json_decode(file_get_contents($search_link));
						echo "DOWNLOADS IN OPPO(".$link.") -> ".$downloads->downloads."<br>";
						mysql_query("INSERT INTO DOWNLOADS(downloads,date,app_id,store_id) VALUES(".$downloads->downloads.",NOW(),".$app['id'].",".$information_row['store_id'].")");
					}
				break;
				case 14:
					$link = $information_row['link'];
					if($link!= null AND $link != ""){
						$link = str_replace("http://","",$link);
						$link = str_replace("https://","",$link);
						$search_link = "http://www.appinchina.co/aicon/automaticSearchers/search11.php?link=".$link;
						
						$downloads = json_decode(file_get_contents($search_link));
						echo "DOWNLOADS IN LENOVO(".$link.") -> ".$downloads->downloads."<br>";
						mysql_query("INSERT INTO DOWNLOADS(downloads,date,app_id,store_id) VALUES(".$downloads->downloads.",NOW(),".$app['id'].",".$information_row['store_id'].")");
					}
				break;
				case 15:
					$link = $information_row['link'];
					if($link!= null AND $link != ""){
						$link = str_replace("http://","",$link);
						$link = str_replace("https://","",$link);
						$search_link = "http://www.appinchina.co/aicon/automaticSearchers/search12.php?link=".$link;
						
						$downloads = json_decode(file_get_contents($search_link));
						echo "DOWNLOADS IN TAOBAO(".$link.") -> ".$downloads->downloads."<br>";
						mysql_query("INSERT INTO DOWNLOADS(downloads,date,app_id,store_id) VALUES(".$downloads->downloads.",NOW(),".$app['id'].",".$information_row['store_id'].")");
					}
				break;
			}	
		}
	}
?>