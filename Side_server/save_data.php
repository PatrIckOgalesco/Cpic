<?php
$host = 'localhost';
$username = 'root'; // Change this to your MySQL username
$password = ''; // Change this to your MySQL password
$database = 'dbase';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error: Could not connect to the database. " . $e->getMessage());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $newQuestion = $_POST['newQuestion'];
    $newAnswer = $_POST['newAnswer'];

    // Handle image upload
    $imagePath = 'images/'; // Update this path accordingly
    $imageName = time() . '_' . $_FILES['newImage']['name'];
    $targetPath = $imagePath . $imageName;

    move_uploaded_file($_FILES['newImage']['tmp_name'], $targetPath);

    // Insert data into the database
    $stmt = $pdo->prepare("INSERT INTO chatbotbase (question, answer, image) VALUES (?, ?, ?)");
    $stmt->execute([$newQuestion, $newAnswer, $targetPath]);

    // Return a response
    echo json_encode(['success' => true]);
}
?>
