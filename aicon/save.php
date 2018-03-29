<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "gingro_aicon_s";
$password = "GDB?^@9z{is.";
$database = "gingro_aicon_searches";

$conn = mysqli_connect($servername, $username, $password, $database);

$search = $_GET["search"];
$url = $_GET["url"];
$name = $_GET["appFullName"];
$email = json_decode(file_get_contents("http://31.220.53.98/aicon-scrapers/googleDetails?url=".$url))->email; 

$stmt = $conn->prepare("INSERT INTO searches(date, name, search, url, email) VALUES(NOW(),?,?,?,?)");
$stmt->bind_param('ssss', $name, $search, $url, $email);
$stmt->execute();

echo "success";

?>