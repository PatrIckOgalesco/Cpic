// Variable to track whether the notification is already displayed
let isNotificationVisible = false;

// Create a function to display the "About" notification
function showAboutNotification() {
  // Check if a notification is already visible
  if (isNotificationVisible) {
    return; // Do nothing if a notification is already displayed
  }

  // Create a notification element for "About"
  const notification = document.createElement("div");
  notification.className = "notification-popup";
  notification.innerHTML = `
    <h3>About</h3>
    <img src="www/images/Digital.gif" alt="Snippet"><br>
    <p>SmartNavigator is a cutting-edge chatbot designed to revolutionize the way students and faculty at Christian Polytechnic Institute of Catanduanes Inc. (CPIC) access and interact with campus-related information. It is powered by state-of-the-art natural language processing and voice interaction capabilities, enabling it to provide precise and swift responses to user queries.</p><br><br>
    <h2>Purpose of the System</h2><br>
    <p>The SmartNavigator is a cutting-edge technological solution designed to serve a vital role in the educational landscape, with the primary purpose of enhancing the overall educational experience for students, parents, and educators within the CPIC school system.</p><br>
    <p>The first and foremost purpose of the SmartNavigator is to provide a responsive and efficient communication channel between stakeholders. It strives to bridge the communication gap by offering timely and accurate information, thus promoting transparency and engagement between students, parents, and educators. By facilitating this streamlined exchange of information, the chatbot ensures that parents remain well-informed about school activities, student progress, and other relevant updates.</p><br>
    <p>The SmartNavigator is introduced with a multifaceted purpose aimed at improving communication, providing academic support, reducing administrative tasks, and contributing to data-driven educational enhancements within the CPIC school system. Through this research, we aim to gain a comprehensive understanding of the manifold benefits and potential challenges associated with this innovative tool, shedding light on its role in revolutionizing education in the digital age.</p>
    <span id="close" class="material-symbols-rounded">close</span>
  `;

  // Add a click event listener to the close button
  notification.querySelector("#close").addEventListener("click", () => {
    document.body.removeChild(notification);
    isNotificationVisible = false; // Mark the notification as closed
  });

  // Append the "About" notification to the body
  document.body.appendChild(notification);
  isNotificationVisible = true; // Mark the notification as displayed
}

// Create a function to display the "About Us" notification
function showAboutUsNotification() {
  // Check if a notification is already visible
  if (isNotificationVisible) {
    return; // Do nothing if a notification is already displayed
  }

  // Create a notification element for "About Us"
  const aboutUsNotification = document.createElement("div");
  aboutUsNotification.className = "notification-popup";
  aboutUsNotification.innerHTML = `
    <h3>About Us</h3>
    <img src="www/images/VR.gif" alt="Snippet"><br>
    <p>
        We are a group of dedicated 4th-year Bachelor of Computer Science (BCSC) students from Christian Polytechnic Institute of Catanduanes Inc. (CPIC). Our journey led us to the creation of SmartNavigator, a cutting-edge AI chatbot. Our thesis project is designed to revolutionize the way students and faculty at CPIC access and interact with campus-related information. SmartNavigator is powered by state-of-the-art natural language processing and voice interaction capabilities, allowing it to deliver precise and swift responses to user queries. We are excited to bring innovation to our school community and make information access more convenient for everyone.
    </p><br>
    <h3>Meet Our Team</h3><br>
    <ul style= "text-align: left; font-size: 12px;">
        <li>
            <strong>Name:</strong> Jon Ken Ambrosiobr<br>
            <strong>Age:</strong> 22<br>
            <strong>Contact:</strong> john@example.com<br>
            <strong>Role:</strong> Project Manager, System Developer, Database Manager
        </li><br>
        <li>
            <strong>Name:</strong> John Patrick Ogalesco<br>
            <strong>Age:</strong> 23<br>
            <strong>Contact:</strong> jane@example.com<br>
            <strong>Role:</strong> UI/UX Designer
        </li><br>
        <li>
            <strong>Name:</strong> Jolina Idanan<br>
            <strong>Age:</strong> 24<br>
            <strong>Contact:</strong> robert@example.com<br>
            <strong>Role:</strong> System Analyst
        </li><br>
        <li>
            <strong>Name:</strong> Nelmar Obre<br>
            <strong>Age:</strong> 23<br>
            <strong>Contact:</strong> sarah@example.com<br>
            <strong>Role:</strong> Team Leader
        </li><br>
        <li>
            <strong>Name:</strong> Jayson Tangher<br>
            <strong>Age:</strong> 25<br>
            <strong>Contact:</strong> michael@example.com<br>
            <strong>Role:</strong> System Analyst
        </li>
    </ul>
    <span id="close" class="material-symbols-rounded">close</span>
  `;

  // Add a click event listener to the close button
  aboutUsNotification.querySelector("#close").addEventListener("click", () => {
    document.body.removeChild(aboutUsNotification);
    isNotificationVisible = false; // Mark the notification as closed
  });

  // Append the "About Us" notification to the body
  document.body.appendChild(aboutUsNotification);
  isNotificationVisible = true; // Mark the notification as displayed
}

// Create a function to display the "Contact" notification
function showContactNotification() {
  // Check if a notification is already visible
  if (isNotificationVisible) {
    return; // Do nothing if a notification is already displayed
  }

  // Create a notification element for "Contact"
  const contactNotification = document.createElement("div");
  contactNotification.className = "notification-popup";
  contactNotification.innerHTML = `
    <h3>Contact</h3>
    <img src="www/images/Media.gif" alt="Snippet"><br>
    <p style="font-size: 13px">Address: Francia, Virac</p><br>
    <p style="font-size: 13px">Phone: +0098 9893 5647</p><br>
    <p style="font-size: 13px">Email: cpic@gmail.com</p><br>
    <span id="close" class="material-symbols-rounded">close</span>
  `;

  // Add a click event listener to the close button
  contactNotification.querySelector("#close").addEventListener("click", () => {
    document.body.removeChild(contactNotification);
    isNotificationVisible = false; // Mark the notification as closed
  });

  // Append the "Contact" notification to the body
  document.body.appendChild(contactNotification);
  isNotificationVisible = true; // Mark the notification as displayed
}

// Get references to the "About," "About Us," and "Contact" buttons
const aboutLink = document.getElementById("about-button");
const aboutUsLink = document.getElementById("aboutUs-button");
const contactLink = document.getElementById("contact-button");

// Add click event listeners for all buttons
aboutLink.addEventListener("click", function (event) {
  event.preventDefault();
  showAboutNotification();
});

aboutUsLink.addEventListener("click", function (event) {
  event.preventDefault();
  showAboutUsNotification();
});

contactLink.addEventListener("click", function (event) {
  event.preventDefault();
  showContactNotification();
});
