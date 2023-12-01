let openNotification = null;

function closeNotification() {
  if (openNotification) {
    document.body.removeChild(openNotification);
    openNotification = null;
  }
}

function showNotification(notificationHTML) {
  closeNotification();

  const notification = document.createElement("div");
  notification.className = "notification-popup";
  notification.innerHTML = notificationHTML;

  const closeButton = document.createElement("span");
  closeButton.id = "close";
  closeButton.className = "material-symbols-rounded";
  closeButton.textContent = "close";
  closeButton.addEventListener("click", () => {
    closeNotification();
  });

  notification.appendChild(closeButton);
  document.body.appendChild(notification);

  openNotification = notification;
}

// Get references to the buttons
const aboutButton = document.getElementById("about-button");
const aboutUsButton = document.getElementById("aboutUs-button");
const contactButton = document.getElementById("contact-button");
const feedbackButton = document.getElementById("feedback-button");
const speechButton = document.getElementById("speech-button");

aboutButton.addEventListener("click", function (event) {
  event.preventDefault();
  const aboutHTML = `
    <h3>About</h3>
    <img src="www/images/Digital.gif" alt="Snippet"><br>
    <p>SmartNavigator is a cutting-edge chatbot designed to revolutionize the way students and faculty at Christian Polytechnic Institute of Catanduanes Inc. (CPIC) access and interact with campus-related information. It is powered by state-of-the-art natural language processing and voice interaction capabilities, enabling it to provide precise and swift responses to user queries.</p><br><br>
    <h2>Purpose of the System</h2><br>
    <p>The SmartNavigator is a cutting-edge technological solution designed to serve a vital role in the educational landscape, with the primary purpose of enhancing the overall educational experience for students, parents, and educators within the CPIC school system.</p><br>
    <p>The first and foremost purpose of the SmartNavigator is to provide a responsive and efficient communication channel between stakeholders. It strives to bridge the communication gap by offering timely and accurate information, thus promoting transparency and engagement between students, parents, and educators. By facilitating this streamlined exchange of information, the chatbot ensures that parents remain well-informed about school activities, student progress, and other relevant updates.</p><br>
    <p>The SmartNavigator is introduced with a multifaceted purpose aimed at improving communication, providing academic support, reducing administrative tasks, and contributing to data-driven educational enhancements within the CPIC school system. Through this research, we aim to gain a comprehensive understanding of the manifold benefits and potential challenges associated with this innovative tool, shedding light on its role in revolutionizing education in the digital age.</p>
    <span id="close" class="material-symbols-rounded">close</span>
  `;
  showNotification(aboutHTML);
});

aboutUsButton.addEventListener("click", function (event) {
  event.preventDefault();
  const aboutUsHTML = `
    <h3>About Us</h3>
    <img src="www/images/VR.gif" alt="Snippet"><br>
    <p>
        We are a group of dedicated 4th-year Bachelor of Computer Science (BCSC) students from Christian Polytechnic Institute of Catanduanes Inc. (CPIC). Our journey led us to the creation of SmartNavigator, a cutting-edge chatbot. Our thesis project is designed to revolutionize the way students and faculty at CPIC access and interact with campus-related information. SmartNavigator is powered by state-of-the-art natural language processing and voice interaction capabilities, allowing it to deliver precise and swift responses to user queries. We are excited to bring innovation to our school community and make information access more convenient for everyone.
    </p><br>
    <h3>Meet Our Team</h3><br>
    <ul style= "text-align: left; font-size: 12px;">
        <li>
            <strong>Name:</strong> Jon Ken Ambrosio<br>
            <strong>Age:</strong> 22<br>
            <strong>Contact:</strong> jon@example.com<br>
            <strong>Role:</strong> Project Manager | System Developer | Database Manager
        </li><br>
        <li>
            <strong>Name:</strong> John Patrick Ogalesco<br>
            <strong>Age:</strong> 23<br>
            <strong>Contact:</strong> jpatrickogalesco@gmail.com<br>
            <strong>Role:</strong> UI Designer | Programming
        </li><br>
        <li>
            <strong>Name:</strong> Jolina Idanan<br>
            <strong>Age:</strong> 24<br>
            <strong>Contact:</strong> jolina@example.com<br>
            <strong>Role:</strong> System Analyst
        </li><br>
        <li>
            <strong>Name:</strong> Nelmar Obre<br>
            <strong>Age:</strong> 23<br>
            <strong>Contact:</strong> nelmar@example.com<br>
            <strong>Role:</strong> Team Leader
        </li><br>
        <li>
            <strong>Name:</strong> Jayson Tangher<br>
            <strong>Age:</strong> 25<br>
            <strong>Contact:</strong> jayson@example.com<br>
            <strong>Role:</strong> System Analyst
        </li>
    </ul>
    <span id="close" class="material-symbols-rounded">close</span>
  `;
  showNotification(aboutUsHTML);
});

contactButton.addEventListener("click", function (event) {
  event.preventDefault();
  const contactHTML = `
    <h3>Contact</h3>
    <img src="www/images/Media.gif" alt="Snippet"><br>
    <p style="font-size: 13px">Address: Francia, Virac</p><br>
    <p style="font-size: 13px">Phone: +0098 9893 5647</p><br>
    <p style="font-size: 13px">Email: cpic@gmail.com</p><br>
    <span id="close" class="material-symbols-rounded">close</span>
  `;
  showNotification(contactHTML);
});

feedbackButton.addEventListener("click", function (event) {
  event.preventDefault();
  const feedbackHTML = `
    <h3>Feedback</h3>
    <img src="www/images/Explainer.gif" alt="Snippet"><br>
    <p>"We value your feedback and would love to hear your thoughts. Your feedback helps us improve and provide you with a better experience."</p><br>
    <div class="input-container">
    <input id="userInput" class="w3-input" type="text" placeholder="Enter your comment here...">
    <span id="sendbutton" type="button" class="material-symbols-rounded">send</span>
    </div>
    <span id="close" class="material-symbols-rounded">close</span>
  `;
  showNotification(feedbackHTML);
});

speechButton.addEventListener("click", function (event) {
  event.preventDefault();
  const speechHTML = `
    <h3>Speech Rate</h3>
    <p>Note: 1.0 - Normal | 2.0 - Max</p>
    <input type="range" id="size-slider" min="1" max="5" value="1.1" class="speechrate">
    <span id="close" class="material-symbols-rounded">close</span>
  `;
  showNotification(speechHTML);
});