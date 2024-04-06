<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "dbase";

    $connection = new mysqli($servername, $username, $password, $database);

    if ($connection->connect_error) {
        die("Connection Failed: " . $connection->connect_error);
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $currentCode = $_POST["code"];
        $redirectURL = "http://localhost/admin/admin.php";

        $sql = "SELECT code FROM code"; 
        $result = $connection->query($sql);

        // Check if the query was successful
        if ($result) {
            // Fetch data from the result set
            $row = $result->fetch_assoc();
            $pin = $row["code"];

            if ($currentCode != $pin) {
                echo '<script>alert("You entered a wrong code");</script>';
            } else {
                echo '<script>window.location.href = "http://localhost/system-error/Side_server/admin.php#";</script>';
                exit();
            }
        } else {
            echo "Error: " . $connection->error;
        }

        // Close the database connection
        $connection->close();
    }
?>
