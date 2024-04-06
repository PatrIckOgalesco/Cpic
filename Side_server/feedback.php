<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Feedback</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;700&display=swap');

        body {
            font-family: 'Fira Code', monospace;
            font-size: 12px;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .feedback-container {
            margin: 10px 60px;
            padding: 20px;
            border-radius: 5px;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
        }

        h3 {
            color: #343541;
            margin-bottom: 20px;
            border-bottom: 1px solid #343541;
        }

        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

        li {
            margin-bottom: 20px;
            font-size: 12px;
            color: #333;
            border: 1px solid #dee2e6;
            padding: 15px;
            border-radius: 5px;
            position: relative;
        }

        .read-indicator {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            font-size: 18px;
            color: #28a745;
        }

        a {
            text-decoration: none;
            color: #0d6efd;
            font-weight: bold;
        }

        a:hover {
            text-decoration: underline;
        }

        .return-button {
            background-color: #0d6efd;
            color: #fff;
            padding: 10px 10px;
            border: none;
            border-radius: 0;
            cursor: pointer;
            margin-bottom: 20px;
        }

        .return-button:hover {
            background-color: #0a58ca;
        }
    </style>
</head>

<body>
    <button class="return-button" onclick="window.location.href='http://localhost/system-error/Side_server/admin.php';">Return to Admin Page</button>
    <div class="feedback-container">
        <h3>User Feedback</h3>
        <p>Dear Admin, as you scroll down, you'll find valuable insights and feedback from our users. Their thoughts and experiences are a testament to the success and impact of our system. We encourage you to take a moment to review the feedback, as it provides a glimpse into the user's perspective and helps us continually enhance and optimize our services. Your dedication to understanding user feedback is crucial in maintaining a positive and efficient system. Thank you for your commitment to excellence!</p>
        <ul>
            <?php
            $servername = "localhost";
            $username = "root";
            $password = "";
            $database = "dbase";

            $connection = new mysqli($servername, $username, $password, $database);

            if ($connection->connect_error) {
                die("Connection Failed: " . $connection->connect_error);
            }

            // Fetch user feedback from the database
            $feedbackSql = "SELECT * FROM feedbase"; // Replace with your actual table and column names
            $feedbackResult = $connection->query($feedbackSql);

            // Check if the query was successful
            if ($feedbackResult) {
                while ($feedbackRow = $feedbackResult->fetch_assoc()) {
                    $readStatus = isset($feedbackRow['is_read']) && $feedbackRow['is_read'] == 1 ? '<span class="read-indicator">&#10003;</span>' : '';
                    echo "<li>{$readStatus}AnonymousUser: {$feedbackRow['feedback']}</li>";
                }
            } else {
                echo "<li>Error: " . $connection->error . "</li>";
            }

            // Close the database connection
            $connection->close();
            ?>
        </ul>
    </div>
</body>

</html>
