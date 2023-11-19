<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dbase";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user input from the POST request
$userFeedback = $conn->real_escape_string($_POST['feedback']);

// Insert feedback into the database
$sql = "INSERT INTO feedbase (feedback_level) VALUES ('$userFeedback')";

if ($conn->query($sql) === TRUE) {
    echo "Feedback submitted successfully!";
} else {
    echo "Error submitting feedback: " . $conn->error;
}

$conn->close();
?>
