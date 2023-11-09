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
        <p>"Hello there, Admin! It's a great day to see you again. Welcome to your admin dashboard. How can we assist you today?"</p>
      <table>
        <thead>
          <tr>
            <th>Upload Image</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="file"></td>
            <td><input type="text" class="question-input"></td>
            <td><input type="text" class="answer-input"></td>
            <td>
              <button class="edit-button">Edit</button>
              <button class="delete-button">Delete</button>
            </td>
          </tr>
          <tr>
            <td><input type="file"></td>
            <td><input type="text" class="question-input"></td>
            <td><input type="text" class="answer-input"></td>
            <td>
              <button class="edit-button">Edit</button>
              <button class="delete-button">Delete</button>
            </td>
          </tr>
          <!-- Add more rows here if needed -->
        </tbody>
      </table>
      
  <button class="add-row-button">Add New Row</button>
    </div>

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


