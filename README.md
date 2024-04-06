# SmartNavigator
# Chatbot
CPIC chatbot using HTML, CSS, and JavaScript


Xampp Mysql Database
	Database Name: dbase
	Table Name: chatbotbase

Table and Type
	ID(3) - int
	image - LONGBLOB
	question(255) - varchar
	answer(8000) - varchar










<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dbase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$userText = $conn->real_escape_string($_POST['userText']);

$sql = "SELECT * FROM chatbotbase WHERE question = '$userText'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
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

$conn->close();
?>


















<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dbase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$userText = $conn->real_escape_string($_POST['userText']);

$sql = "SELECT * FROM chatbotbase WHERE question = '$userText'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
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

$conn->close();
?>














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













































































































animation effect but image not display


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
$response = ""; // Initialize $response variable

if (!empty($userText)) {
    // Modify the SQL query to use OR for multiple questions
    $sql = "SELECT * FROM chatbotbase WHERE LOWER(question) LIKE LOWER('%$userText%')";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();

    if (!empty($row['image'])) {
        // Convert image data to base64
        $imageData = base64_encode($row['image']);
        $imageSrc = "data:image/jpeg;base64,{$imageData}";
        $response = "<div class='chat-details1'>
                        <div class='image-container'>
                            <img src='{$imageSrc}' alt='Answer Image'>
                        </div>
                        <div class='text-container'>
                            <p>{$row['answer']}</p>
                        </div>
                    </div>";
    } else if (!empty($row['answer'])) {
        // If there is no image, display only text
        $response = "<div class='chat-details1'>
                        <div class='text-container'>
                            <p>{$row['answer']}</p>
                        </div>
                    </div>";
    }

    echo $response;
} else {
    echo "I apologize, but it seems I couldn't locate the information you're looking for. Feel free to ask another question or provide more details, and I'll do my best to assist you!";
}
} else {
    $response = "User text is empty or not set.";
}

echo $response;
$conn->close();
?>
























js | typwwriter | not working image

// const typewriterEffect = (element, text, speed = 50, callback) => {
//   let i = 0;
//   function type() {
//     if (i < text.length) {
//       element.innerHTML += text.charAt(i);
//       i++;
//       setTimeout(type, speed);
//     } else {
//       // If a callback function is provided, call it after the typewriter effect is complete
//       if (typeof callback === 'function') {
//         callback();
//       }
//     }
//   }
//   type();
// };

// const handleOutgoingChat = () => {
//   userText = chatInput.value.trim();
//   if (!userText) return;

//   chatInput.value = "";

//   const suggestion = document.getElementById("suggestion");
//   suggestion.textContent = "";

//   const html = `<div class="chat-content">
//     <div class="chat-details">
//       <img src="www/images/user1.jpg" alt="user-img">
//       <p>${userText}</p>
//     </div>
//   </div>`;

//   const outgoingChatDiv = createChatElement(html, "outgoing");
//   chatContainer.querySelector(".default-text")?.remove();
//   chatContainer.appendChild(outgoingChatDiv);
//   chatContainer.scrollTo(0, chatContainer.scrollHeight);

//   const question = userText.toLowerCase();
//   let answer = '';

//   switch (question) {
//     default:
//       // Send the user input to the server (PHP) for a database query
//       fetch('www/api.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: `userText=${encodeURIComponent(userText)}`,
//       })
//         .then(response => response.text())
//         .then(databaseAnswer => {
//           answer = databaseAnswer;
//           const answerHtml = `<div class="chat-content">
//             <div class="chat-details">
//               <img src="www/images/chatlogo.jpg" alt="chatbot-img">
//               <p id="typewriter"></p>
//             </div>
//           </div>`;

//           const incomingChatDiv = createChatElement(answerHtml, "incoming");
//           chatContainer.appendChild(incomingChatDiv);
//           chatContainer.scrollTo(0, chatContainer.scrollHeight);

//           // Apply typewriter effect to the dynamically fetched answer
//           const typewriterElement = incomingChatDiv.querySelector("#typewriter");
//           typewriterEffect(typewriterElement, answer, 50, () => {
//             // Speak the answer using text-to-speech after the typewriter effect is complete
//             speakAnswer(answer);
//           });
//         })
//         .catch(error => {
//           console.error('Error fetching data:', error);
//         });
//       return;
//   }
// };