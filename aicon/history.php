<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
   <meta name="viewport" content="width=device-width">
   <link rel="stylesheet" type="text/css" href="main.css" />
   <link rel="stylesheet" type="text/css" href="design.css" />
   <link rel="shortcut icon" href="favicon.ico"/>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <title>App in China or not</title>
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
   <script type="text/javascript" src="animations.js"></script>
<!--Start of leadboxer Script-->
<script type="text/javascript" src="//script.leadboxer.com/?account=b79b7d890f9d7f00153419facdf2ed67"></script>
<!--End of leadboxer Script-->
<style>
   body{
      background-color:#101010;
   }
   div.table1{
       box-shadow: 0px 0px 2px 1px black;
       -webkit-box-shadow: 0px 0px 2px 1px black;
       opacity:1;
   }
   header.page-header{
       box-shadow: 0px 0px 2px 1px black;
       -webkit-box-shadow: 0px 0px 2px 1px black;
       opacity:1;
   }
   div.newcontainer h1{
       font-size:26px; padding-top:40px; font-weight:normal;
   }
   tr:nth-child(odd){
       background-color:#E5FFC3;
   }
   td:first-child{
      color:#92bf3e !important;
   }
   input#pass{
    width:300px;
    margin:auto;
    border:1px solid black;
   }
   h1#title{
    display: none;
   }
   h1#title2{
    font-size: 18px;
    padding-bottom: 5px;
    margin-top:100px;
   }
</style>
</head>

<body>
   <header class="page-header">
        <div class="nav-line">
          <a href="http://www.appinchina.co" class="btn-menu" data-burger-menu-id="menu-aside"><span>Menu</span></a>
          <a href="http://www.appinchina.co" class="logo"><img src="logo.svg" alt="AppInChina"> AppInChina</a>
        </div>
   </header>
   <h3></h3>
   <h2><span class="black">AppInChina<span class="soft">OrNot</span></span></h2>
   <div class="newcontainer">
      <h1 id="title">Searches done in the tool:</h1>
      <div class="tables-container">
         <h1 id="title2">Please enter password<input type="password" name="pass" id="pass"></input></h1>
         
         <div class="table1">
         </div>
      </div>
   </div>
  <script type="text/javascript">
    $(document).ready(function(){update();});
    var myVar = setInterval(function(){update();},1000);
    
    function update(){
      var url = "loadHistory.php";
      var xmlhttp = new XMLHttpRequest();
      var response = "";
      xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
          if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              response = xmlhttp.responseText;
              if(response!="error"){
                $("div.table1").html(response);
                $("#title").show();
                $("#title2").hide();
                $("#pass").hide();
              }
          }
      }
      xmlhttp.open("POST", url, true);
      xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xmlhttp.send("pass="+$("#pass").val());
    }
  </script>
</body>
</html>  