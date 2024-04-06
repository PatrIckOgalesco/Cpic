<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "dbase";

$connection = new mysqli($servername, $username, $password, $database);

if ($connection->connect_error) {
    die("Connection Failed: " . $connection->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Handle form submission for changing PIN
    // Retrieve form data
    $old_pin = $_POST["old"];
    $new_pin = $_POST["new"];
    $confirm_pin = $_POST["confirm"];

    // Perform PIN change operation here
    // For example, you can run an SQL query to update the PIN in the database

    // After updating the PIN, you can display a success message or redirect the user to another page
    // For demonstration purposes, let's redirect to the same page
    header("Location: admin.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Main Page</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;700&display=swap');

        body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Fira Code', monospace;
            font-size: 12px;
        }

        .bg-red {
            padding-top: 32px;
        }

        .change-pin-button {
            position: fixed;
            top: 10px;
            right: 10px;
            background-color: gray;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            z-index: 1;
        }

        .change-pin-button:active {
            transform: scale(1.1);
        }

        .Feedback-button {
            position: fixed;
            top: 10px;
            right: 140px;
            background-color: #28a745;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            z-index: 1;
        }

        .Feedback-button:active {
            transform: scale(1.1);
        }

        #modal {
            width: 420px;
            height: 250px;
            background-color: #212227;
            color: #F1F1F1;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            display: none;
            z-index: 1;
            padding-top: 40px;
        }

        #modal form {
            position: relative;
            left: 16%;
            width: 70%;
            height: 80%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        #modal form .btn {
            margin-top: 15px;
            background-color: #0d6efd;
            color: #F1F1F1;
            width: 100px;
        }

        #modal input {
            background-color: transparent;
            border: none;
            border-bottom: 1px solid #999;
            outline: none;
        }

        #modal input::placeholder {
            color: #999;
            font-style: italic;
            font-size: 12px;
        }

        #modal input:focus::placeholder {
            color: transparent;
        }

        #user-feedback {
            margin-top: 20px;
            padding: 20px;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <div class="bg-red">
        <button class="change-pin-button" onclick="showChangePinModal()">Change PIN</button>
        <button class="Feedback-button" onclick="window.location.href='http://localhost/system-error/Side_server/feedback.php';">Feedback</button>
        <div id="modal">
            <form method="post">
                <input type="text" name="old" placeholder="Enter old code">
                <br>
                <input type="text" name="new" placeholder="Enter new code">
                <br>
                <input type="text" name="confirm" placeholder="Confirm new code">
                <br>
                <input class="btn" type="submit" value="SAVE">
            </form>
        </div>
    </div>
    <div class="container my-6">
        <h2>Main Database</h2>
        <br>
        <div class="container my-6">
            <form class="mb-3" method="GET" action="search.php">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for questions" name="search_query">
                    <button class="btn btn-outline-secondary" type="submit">Search</button>
                </div>
            </form>
            <br>
            <a class="btn btn-primary" href="create.php" role="button">New Record</a>
            <br>
            <div class="row">
                <div class="col">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Questions</th>
                                <th>Answers</th>
                                <th>Images</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            // PHP code to display records from the database
                            $sql = "SELECT * FROM chatbotbase";
                            $result = $connection->query($sql);

                            if (!$result) {
                                die("Invalid query: " . $connection->error);
                            }

                            while ($row = $result->fetch_assoc()) {
                                echo "<tr>
                                    <td>{$row['id']}</td>
                                    <td>{$row['question']}</td>
                                    <td>{$row['answer']}</td>
                                    <td>";

                                if (isset($row['images']) && !empty($row['images'])) {
                                    // Fetch the image data and encode it
                                    $imageData = base64_encode($row['images']);
                                    // Embed the encoded image data into the img tag
                                    $src = 'data:image/jpeg;base64,' . $imageData;
                                    echo "<img src='{$src}' width='100' height='100'>";
                                } else {
                                    echo "No image available.";
                                }

                                echo "</td>
                                    <td>
                                        <a class='btn btn-primary btn-sm' href='edit.php?id={$row['id']}'>Edit</a>
                                        <a class='btn btn-danger btn-sm' href='delete.php?id={$row['id']}'>Delete</a>
                                    </td>
                                </tr>";
                            }
                            ?>
                            <tr>
                                <td>1</td>
                                <td>What is the tallest building in the World?</td>
                                <td>Burj Khalifa</td>
                                <td></td>
                                <td>
                                    <a class="btn btn-primary btn-sm" href="">Edit</a>
                                    <a class="btn btn-danger btn-sm" href="">Delete</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script>
        function showChangePinModal() {
            var modal = document.getElementById('modal');
            modal.style.display = (modal.style.display === "block") ? "none" : "block";
        }
    </script>
</body>

</html>
