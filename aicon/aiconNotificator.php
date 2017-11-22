<?php
	$servername = "localhost";
	$username = "gingro_aicon";
	$password = "33e6b98afcbf";
	$database = "gingro_aicon";
	$conn = mysql_connect($servername, $username, $password) or die (mysql_error());
	mysql_select_db($database) or die(mysql_error());
	$table = mysql_query("  SELECT id, search, time, date
							FROM
							 (
							   SELECT searches.id, searches.search, searches.time, searches.date
							   FROM searches
							   UNION ALL
							   SELECT searches_backup.id, searches_backup.search, searches_backup.time, searches_backup.date
							   FROM searches_backup
							)  t
							GROUP BY id, search, time, date
							HAVING COUNT(*) = 1
							ORDER BY id DESC");
	$mailtext="<!DOCTYPE html>
			<html lang=\"en\">
			<body><h2>Latest searches</h2><table><tr><th style='padding:15px; padding-bottom:0px;'>#</th><th style='padding:15px; padding-bottom:0px;'>App</th><th style='padding:15px; padding-bottom:0px;'>Date</th><th style='padding:15px; padding-bottom:0px;'>Time</th></tr>";
	$count=0;
	while ($table_row = mysql_fetch_array($table)) {
		$count++;
		$mailtext.="<tr><td style='padding:15px; padding-bottom:0px;'>".$count."</td><td style='padding:15px; padding-bottom:0px;'>".$table_row['search']."</td><td style='padding:15px; padding-bottom:0px;'>".$table_row['date']."</td><td style='padding:15px; padding-bottom:0px;'>".date("H:i",strtotime($table_row['time']))."</td></tr>";
	}
	$mailtext.="</table></body></html>";

	echo $mailtext;

	mysql_query("DROP TABLE searches_backup");
	mysql_query("CREATE TABLE searches_backup LIKE searches");
	mysql_query("INSERT searches_backup SELECT * FROM searches");

	if($count>0) sendNotification($mailtext);

	function sendNotification($mailtext){
		require_once('../PHPMailer-master/class.phpmailer.php');
		$mail = new PHPMailer();
		$body = $mailtext;
		$body = eregi_replace("[\]",'',$body);
		$mail->AddReplyTo("info@appinchina.co","appinchina.co");
		$mail->SetFrom('info@appinchina.co', 'appinchina.co');
		$mail->AddReplyTo("info@appinchina.co","appinchina.co");
		$mail->AddAddress("irving@appinchina.co" , "");
		$mail->AddAddress("rich@appinchina.co" , "");
		$mail->AddAddress("shlomo@appinchina.co" , "");
		//$mail->AddAddress( "shlomo@appinchina.co", "");
		$mail->Subject    = "New searches inside AICON";
		$mail->AltBody    = "To view the message properly, please use an HTML compatible email viewer!";
		$mail->MsgHTML($body);                                           
		if($mail->Send())
			echo "mail sent";
	}

?>