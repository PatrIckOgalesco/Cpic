<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dbase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST["id"];
    $question = $conn->real_escape_string($_POST["question"]);
    $answer = $conn->real_escape_string($_POST["answer"]);

    for ($i = 1; $i <= 3; $i++) {
        $fileInputName = "images{$i}";

        if (isset($_FILES[$fileInputName])) {
            $image = $_FILES[$fileInputName];

            if (!empty($image["tmp_name"])) {
                // Upload the image to a folder
                $uploadDir = "uploads/";
                $uploadFile = $uploadDir . basename($image["name"]);
                move_uploaded_file($image["tmp_name"], $uploadFile);

                // Save the filename to the database
                $imageFilename = basename($image["name"]);
                $sqlInsert = "INSERT INTO chatbotbase (id, question, answer, image) VALUES ('$id', '$question', '$answer', '$imageFilename')";
                $conn->query($sqlInsert);
            }
        }
    }
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot Data</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;700&display=swap');
        body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Fira Code', monospace;
            font-size: 12px;
        }
    </style>
</head>

<body>
    <h2>Add New Data</h2>

    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data">
        ID: <input type="number" name="id">
        Question: <textarea name="question" required></textarea>
        Answer: <textarea name="answer" required></textarea>
        Select images 1 to upload: <input type="file" name="images1">
        Select images 2 to upload: <input type="file" name="images2">
        Select images 3 to upload: <input type="file" name="images3">
        <input type="submit" value="Upload">
    </form>

    <!-- Display Chatbot Data -->
    <h2>Chatbot Data</h2>

    <?php
    // Re-establish the database connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sqlSelect = "SELECT id, question, answer, image FROM chatbotbase";
    $result = $conn->query($sqlSelect);

    // Check if the query was successful
    if ($result) {
        if ($result->num_rows > 0) {
            echo "<table border='1'>";
            echo "<tr>
                <th>ID</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Image</th>
                <th>Action</th>
            </tr>";

            while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>{$row['id']}</td>";
                echo "<td>{$row['question']}</td>";
                echo "<td><img src='uploads/{$row['images']}' width='100' height='100'></td>";
                
                // Display the image filename
                echo "<td>{$row['image']}</td>";

                echo "<td><a href='edit.php?id={$row['id']}'>Edit</a> | <a href='delete.php?id={$row['id']}'>Delete</a></td>";
                echo "</tr>";
            }

            echo "</table>";
        } else {
            echo "No records found.";
        }
    } else {
        // Display an error message if the query fails
        echo "Error: " . $conn->error;
    }

    // Close the connection if it was successfully opened
    if ($conn->ping()) {
        $conn->close();
    }
    ?>
</body>
</html>
