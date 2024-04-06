<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "dbase";

// Create connection
$connection = new mysqli($servername, $username, $password, $database);

// Check connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get user's feedback from the form
    $userFeedback = $_POST['feedback'];

    // Insert the feedback into the database
    $sql = "INSERT INTO feedbase (feedback) VALUES ('$userFeedback')";

    if ($connection->query($sql) === TRUE) {
        echo "Feedback submitted successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $connection->error;
    }
}

// Close the database connection
$connection->close();
?>
