<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dbase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$userText = isset($_POST['userText']) ? $conn->real_escape_string($_POST['userText']) : '';

if (!empty($userText)) {
    // Modify the SQL query to use OR for multiple questions
    $sql = "SELECT * FROM chatbotbase WHERE LOWER(question) LIKE LOWER('%$userText%')";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();

        if (!empty($row['images'])) {
            $imageData = base64_encode($row['images']);
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
        echo "I apologize, but it seems I couldn't locate the information you're looking for. Feel free to ask another question or provide more details, and I'll do my best to assist you!";
    }
} else {
    echo "User text is empty or not set.";
}

$conn->close();
?>
