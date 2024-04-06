<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
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
    </style>>
    
</head>
<body>

    <?php
    $servername = "185.27.134.60";
    $username = "if0_35441354";
    $password = "8Dg7fEWiWSfFk7I";
    $database = "if0_35441354_dbase";


    // Create connection
    $connection = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }

    if (isset($_GET['search_query'])) {
        // Use prepared statement to prevent SQL injection
        $search_query = '%' . $connection->real_escape_string($_GET['search_query']) . '%';

        $sql = "SELECT * FROM chatbotbase WHERE question LIKE ?";
        $stmt = $connection->prepare($sql);
        
        if ($stmt) {
            $stmt->bind_param('s', $search_query);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if (!$result) {
                die("Invalid query: " . $connection->error);
            }

            // Close the statement
            $stmt->close();
        } else {
            die("Error in preparing statement: " . $connection->error);
        }
    } 
    ?>

    <!-- Display search results -->
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
                            while ($row = $result->fetch_assoc()) {
                            // Escape HTML output to prevent XSS attacks
                                echo "<tr>
                                        <td>{$row['id']}</td>
                                        <td>{$row['question']}</td>
                                        <td>{$row['answer']}</td>
                                        <td>{$row['images']}</td>
                                        <td>
                                            <a class='btn btn-primary btn-sm' href='edit.php?id={$row['id']}'>Edit</a>
                                            <a class='btn btn-danger btn-sm' href='delete.php?id={$row['id']}'>Delete</a>
                                        </td>
                                    </tr>";
                            }
                            ?>
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <?php
    // Close the database connection
    $connection->close();
    ?>


</body>
</html>



                        <?php
                        while ($row = $result->fetch_assoc()) {
                        // Escape HTML output to prevent XSS attacks
                            echo "<tr>
                                    <td>{$row['id']}</td>
                                    <td>{$row['question']}</td>
                                    <td>{$row['answer']}</td>
                                    <td>{$row['images']}</td>
                                    <td>
                                        <a class='btn btn-primary btn-sm' href='edit.php?id={$row['id']}'>Edit</a>
                                        <a class='btn btn-danger btn-sm' href='delete.php?id={$row['id']}'>Delete</a>
                                    </td>
                                </tr>";
                        }
                        ?>






