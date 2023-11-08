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
    </nav><br><br><br><br>

    <div class="table-container">
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
        <td><input type="text"></td>
        <td><input type="text"></td>
        <td>
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
        </td>
      </tr>
      <tr>
        <td><input type="file"></td>
        <td><input type="text"></td>
        <td><input type="text"></td>
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


