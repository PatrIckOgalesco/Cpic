<?php

$servername = "localhost";
$username = "root";
$password = "";
$database = "dbase";

$connection = new mysqli($servername, $username, $password, $database);

if ($connection->connect_error) {
    die("Connection Failed: " . $connection->connect_error);
}

$id = "";
$question = "";
$answer = "";
$images = "";

$errorMessage = "";
$successMessage = "";

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (!isset($_GET["id"])) {
        header("location: admin.php");
        exit;
    }

    $id = $_GET["id"];

    $sql = "SELECT * FROM chatbotbase WHERE id = ?";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        $question = $row["question"];
        $answer = $row["answer"];
        $images = $row["images"];
    } else {
        header("location: admin.php");
        exit;
    }
} else {
    $id = $_POST["id"];
    $question = $_POST["question"];
    $answer = $_POST["answer"];

    // File upload handling
    $images = $_FILES["images"]["name"];
    $images_temp = $_FILES["images"]["tmp_name"];
    $target_directory = "uploads/"; // Create a folder named "uploads" in the same directory as this PHP file

    if (empty($id) || empty($question) || empty($answer)) {
    $errorMessage = "All fields are required";
} else {
    // Check if a file is uploaded
    if (!empty($images_temp)) {
        $base64Image = base64_encode(file_get_contents($images_temp));
    } else {
        $base64Image = null;
    }

    $sql = "UPDATE chatbotbase SET question = ?, answer = ?, images = ? WHERE id = ?";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param("sssi", $question, $answer, $base64Image, $id);
    if ($stmt->execute()) {
        $successMessage = "Client updated correctly";
        header("location: admin.php");
        exit;
    } else {
        $errorMessage = "Invalid query: " . $connection->error;
    }
}
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <title>Document</title>
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

<div class="container my-5">
    <h2>Edit Client</h2>

    <?php
    if (!empty($errorMessage)) {
        echo "
        <div class='alert alert-warning alert-dismissible fade show' role='alert'>
            <strong>$errorMessage</strong>
            <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
        </div>
        ";
    }
    ?>

    <form method="post" enctype="multipart/form-data"> <!-- Add enctype for file upload -->
        <input type="hidden" name="id" value="<?php echo $id; ?>">
        <div class="row mb-3">
            <label class="col-sm-3 col-form-label">Question</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" name="question" value="<?php echo $question; ?>">
            </div>
        </div>

        <div class="row mb-3">
            <label class="col-sm-3 col-form-label">Answer</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" name="answer" value="<?php echo $answer; ?>">
            </div>
        </div>

        <div class="row mb-3">
            <label class="col-sm-3 col-form-label">Images</label>
            <div class="col-sm-6">
                <input type="file" class="form-control" name="images">
            </div>
        </div>

        <?php
        if (!empty($successMessage)) {
            echo "
            <div class='row mb-3'>
                <div class='offset-sm-3 col-sm-6'>
                    <div class='alert alert-success alert-dismissible fade show' role='alert'>
                        <strong>$successMessage</strong>
                        <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                    </div>
                </div>
            </div>
            ";
        }
        ?>

        <div class="row mb-3">
            <div class="offset-sm-3 col-sm-3 d-grid">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
            <div class="col-sm-3 d-grid">
                <a class="btn btn-outline-primary" href="admin.php" role="button">Cancel</a>
            </div>
        </div>
    </form>
</div>

</body>
</html>
