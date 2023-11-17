// Variable to track whether the Admin notification is already displayed
let isAdminNotificationVisible = false;

// Create a function to display the "Admin" notification
function showAdminNotification() {
  // Check if an Admin notification is already visible
  if (isAdminNotificationVisible) {
    return; // Do nothing if an Admin notification is already displayed
  }

  // Create an Admin notification element
  const adminNotification = document.createElement("div");
  adminNotification.className = "adminboard";
  adminNotification.innerHTML = `
    <nav class="navbar1">
      <div class="logo_item">
        <i class='bx bx-home' ></i>Admin Dashboard
      </div>
    </nav><br><br>
    <div class="table-container">
  <h1>Hello there, Admin!</h1>
  <p>It's a great day to see you again. Welcome to your admin dashboard. How can we assist you today?</p>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Upload Image</th>
        <th>Question</th>
        <th>Answer</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td><input type="file" id="image1"></td>
        <td><input type="text" class="question-input" id="question1"></td>
        <td><input type="text" class="answer-input" id="answer1"></td>
        <td>
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
        </td>
      </tr>
      <tr>
        <td></td>
        <td><input type="file" id="image2"></td>
        <td><input type="text" class="question-input" id="question2"></td>
        <td><input type="text" class="answer-input" id="answer2"></td>
        <td>
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>

  <button class="add-row-button" onclick="addNewRow()">Add New Row</button>
</div>

<script>
  function addNewRow() {
    const image = document.getElementById('image1').value; // Get image input value
    const question = document.getElementById('question1').value; // Get question input value
    const answer = document.getElementById('answer1').value; // Get answer input value

    // Make an AJAX request using the fetch API
    fetch('add_row.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `image=${encodeURIComponent(image)}&question=${encodeURIComponent(question)}&answer=${encodeURIComponent(answer)}`,
    })
      .then(response => response.json()) // Assuming the server returns JSON
      .then(data => {
        // Handle the response data (e.g., update the table)
        console.log(data);
      })
      .catch(error => {
        console.error('Error adding new row:', error);
      });
  }
</script>


    <div class="table-container">
        <p>"Users feedback helps us improve and provide us with a better experience."</p>
      <table>
        <thead>
          <tr>
            <th>User Feedback</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Feedback 1</td>
          </tr>
          <tr>
            <td>Feedback 2</td>
          </tr>
          <!-- Add more feedback entries here if needed -->
        </tbody>
      </table>
    </div>
</div>

    
      <script src="www/adminboard.js"></script>
    <span id="close" class="material-symbols-rounded">close</span>
  `;

  // <input class="w3-input" type="text">
  //   <button class="button" type=button>Send</button><br>

  // Add a click event listener to the close button
  adminNotification.querySelector("#close").addEventListener("click", () => {
    document.body.removeChild(adminNotification);
    isAdminNotificationVisible = false; // Mark the Admin notification as closed
  });

  // Append the Admin notification to the body
  document.body.appendChild(adminNotification);
  isAdminNotificationVisible = true; // Mark the Admin notification as displayed
}

// Get a reference to the "Admin" button
const adminLink = document.getElementById("admin-button");

// Add a click event listener for the "Admin" button
adminLink.addEventListener("click", function (event) {
  event.preventDefault();
  showAdminNotification();
});


