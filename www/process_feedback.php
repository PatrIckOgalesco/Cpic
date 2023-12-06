<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dbase"; // Your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $feedback = $_POST["userInput"];

    $sql = "INSERT INTO feedbase (feedback) VALUES ('$feedback')";

    if ($conn->query($sql) !== TRUE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
