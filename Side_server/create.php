<?php

$servername = "localhost";
$username = "root";
$password = "";
$database = "dbase";

$connection = new mysqli($servername, $username, $password, $database);

if ($connection->connect_error) {
    die("Connection Failed: " . $connection->connect_error);
}

$question = "";
$answer = "";
$images = "";

$errorMessage = "";
$successMessage = "";

if ($_SERVER['REQUEST_METHOD'] == 'POST') { // Corrected the typo in REQUEST_METHOD
    $question = $_POST["question"];
    $answer = $_POST["answer"];
    $images = $_POST["images"];
}

do {
    if (empty($question) || empty($answer)) {
        $errorMessage = "All fields are required";
        break;
    }

    $sql = "INSERT INTO chatbotbase (question, answer, images) VALUES ('$question', '$answer', '$images')";
    $result = $connection->query($sql);

    if (!$result) {
        $errorMessage = "Invalid query: " . $connection->error;
        break;
    }

    $question = "";
    $answer = "";
    $images = "";

    $successMessage = "Client added correctly";

    // Redirect to another page after a successful insert
    header("Location: admin.php");
    exit;

} while (false);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <!-- Fixed the script tag (changed 'scr' to 'src') -->
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
    <h2>New Record</h2>

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

    <form method="post">
        <div class="row mb-3">
            <label class="col-sm-3 col-form-label">Question</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" name="question" value="<?php echo $question; ?>">
            </div>
        </div>

        <!-- Moved this part inside the form element -->
        <div class="row mb-3">
            <label class="col-sm-3 col-form-label">Answer</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" name="answer" value="<?php echo $answer; ?>">
            </div>
        </div>

        <div class="row mb-3">
            <label class="col-sm-3 col-form-label">Image</label>
            <div class="col-sm-6">
                <input type="file" class="form-control" name="images" value="<?php echo $images; ?>">
            </div>
        </div>

        <?php
        if (!empty($successMessage)) {
            echo "
            <div class='row mb-3'>
                <div class='offset-sm-3 col-sm-6'>
                    <div class='alert alert-success alert-dismissible fade show' role='alert'> <!-- Changed alert type to success -->
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
