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
$userText = $conn->real_escape_string($_POST['userText']);

// Query the database
$sql = "SELECT * FROM chatbotbase WHERE question = '$userText'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of each row
    $row = $result->fetch_assoc();

    // Check if the answer contains an image
    if (!empty($row['image'])) {
        $imageData = base64_encode($row['image']);
        $imageSrc = "data:image/jpeg;base64,{$imageData}";
        echo "<div class='chat-details1'>
                  <div class='image-container'>
                      <img src='{$imageSrc}' alt='Answer Image'>
                  </div>
                  <div class='text-container'>
                      <p>{$row['answer']}</p>
                  </div>
              </div>";
    } else if (!empty($row['answer'])) {
        echo "<div class='chat-details1'>
                  <div class='text-container'>
                      <p>{$row['answer']}</p>
                  </div>
              </div>";
    }
} else {
    echo "I'm sorry, but I couldn't find an answer to your question. Please try again.";
}

$conn->close();
?>
