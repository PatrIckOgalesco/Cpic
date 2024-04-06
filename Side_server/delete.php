<?php 

if(isset($_GET["id"])){
    $id = $_GET["id"];

    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "dbase";

    $connection = new mysqli($servername, $username, $password, $database);

    if ($connection->connect_error) {
        die("Connection Failed: " . $connection->connect_error);
    }

    $sql = "DELETE FROM chatbotbase WHERE id=$id";
    $connection->query($sql);



}

header("location: admin.php");
exit;


?>