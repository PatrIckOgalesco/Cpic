<?php
$servername = "185.27.134.60";
$username = "if0_35441354";
$password = "8Dg7fEWiWSfFk7I";
$database = "if0_35441354_dbase";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query the database to get predictive text options
$sql = "SELECT question FROM chatbotbase";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $predictiveTextOptions = array();
    
    // Fetch associative array
    while ($row = $result->fetch_assoc()) {
        $predictiveTextOptions[] = $row['question'];
    }

    // Output JSON response
    echo json_encode($predictiveTextOptions);
} else {
    echo json_encode(array()); // Return an empty array if no options found
}

$conn->close();
?>
