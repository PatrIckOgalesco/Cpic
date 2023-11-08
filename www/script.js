const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const deleteButton = document.querySelector("#delete-btn");
const voiceButton = document.querySelector("#voice-btn");

let userText = '';
let currentSpeech = null;

const loadDataFromLocalstorage = () => {
  const defaultText = `<div class="default-text"><br>

    <h2 style="font-size: 1.7rem;text-align: left;">Hello there, welcome!</h2>
    <p>Your Personal CPIC Chatbot Campus Navigator!</p><br><br><br>
    <img src="www/images/chatbot3.jpg" alt="user-img" style="border-radius: 50px;">
    <h1> SmartNavigator </h1>
    <p>"A chatbot designed to revolutionize <br> the way students and 
  faculty at <br> Christian Polytechnic Institute of Catanduanes Inc."
</p>

    <p style="color: #75a99c; font-size: 12px;">Created by: 4th Yr-BSCS (Group 3)</p>
  </div>`;

  chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

// <img src="www/images/chatbot3.jpg" alt="user-img" style="border-radius: 50px;">

const createChatElement = (content, className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = content;
  return chatDiv;
};

const handleOutgoingChat = () => {
  userText = chatInput.value.trim();
  if (!userText) return;

  chatInput.value = "";

  const suggestion = document.getElementById("suggestion");
  suggestion.textContent = "";

  const html = `<div class="chat-content">
    <div class="chat-details">
      <img src="www/images/user6.jpg" alt="user-img">
      <p>${userText}</p>
    </div>
  </div>`;

  const outgoingChatDiv = createChatElement(html, "outgoing");
  chatContainer.querySelector(".default-text")?.remove();
  chatContainer.appendChild(outgoingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  const question = userText.toLowerCase();
  let answer = '';

  switch (question) {
    case "hi":
    case "hello":
      answer = "Hello there!\n\n"+"How can I assist you today? Please enter your questions in the prompts, and I'll be happy to provide you with the information you need.";
      break;
    case "who is aristotle":
      answer = '<img src="www/images/aristotle.jpg" style="height: 50%; width: 100%;"> <br> Aristotle was a Greek philosopher and scientist, who lived from 384 to 322 BCE. He was a student of Plato and the founder of the Lyceum, a school of philosophy in Athens. He wrote on many subjects, including physics, biology, ethics, politics, and logic, and is considered one of the greatest intellectual figures of Western history. He was known as "the man who knew everything" and "The Philosopher".';
      break;
    case "who is gollum":
      answer = '<img src="www/images/gollum.gif" style="height: 50%; width: 100%;"> <br> Smeagol was once a BSCS student of CPIC, but was corrupted by THESIS and WEB SYSTEM and later named Gollum after his habit of making "a horrible swallowing noise in his throat". As Smeagol began to change physically because of his altered lifestyle, he frequently made a noise clearing his throat. This, by onomatopoeia, became "Gollum". Then others who saw him, not knowing his name or that he was a Hobbit began to call him Gollum.';
      break;
    case "where is cpic":
      answer = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d825.6277244016944!2d124.23732506459146!3d13.585938586788869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a016d415315ef9%3A0x70e8088067123e64!2sCPIC%20College!5e1!3m2!1sen!2sph!4v1699417169526!5m2!1sen!2sph" width="100%" height="auto" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> <br> Christian Polytechnic Institute of Catanduanes <br> Inc.Sta. Elena, Virac, Catanduanes <br> Phone #: (052) 811-0192';
      break;

    default:
      answer = "I'm sorry, but I couldn't find an answer to your question. Please make sure your question is properly punctuated and try again. If the question is not recognized or you have further inquiries, feel free to contact or email the Developer.";
      break;
  }

  const answerHtml = `<div class="chat-content">
    <div class="chat-details">
      <img src="www/images/chatbot3.jpg" alt="chatbot-img">
      <p>${answer}</p>
    </div> 
  </div>`;

  const incomingChatDiv = createChatElement(answerHtml, "incoming");
  chatContainer.appendChild(incomingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  if (currentSpeech) {
    currentSpeech.onend = null;
    speechSynthesis.cancel();
    currentSpeech = null;
  }

  const speech = new SpeechSynthesisUtterance(answer);
  speech.rate = 1.5;
  speech.onend = () => {
    currentSpeech = null;
  };

  currentSpeech = speech;

  speechSynthesis.speak(speech);
};

deleteButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all the chats?")) {
    if (currentSpeech) {
      currentSpeech.onend = null;
      speechSynthesis.cancel();
      currentSpeech = null;
    }

    localStorage.removeItem("all-chats");
    loadDataFromLocalstorage();
  }
});

const initialInputHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${initialInputHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleOutgoingChat();
  }
});

loadDataFromLocalstorage();
sendButton.addEventListener("click", handleOutgoingChat);

voiceButton.addEventListener("click", () => {
  const lastIncomingChat = chatContainer.querySelector(".chat.incoming:last-child p");
  if (lastIncomingChat) {
    const textToSpeak = lastIncomingChat.textContent;
    const speech = new SpeechSynthesisUtterance(textToSpeak);
    speechSynthesis.speak(speech);
  }
});

chatInput.addEventListener("input", () => {
  const suggestion = document.querySelector("#suggestion");
  const userText = chatInput.value;
  suggestion.textContent = userText;

  const chatInputRect = chatInput.getBoundingClientRect();
  const suggestionWidth = suggestion.offsetWidth;
  const suggestionLeft = chatInputRect.left;
  suggestion.style.left = `${suggestionLeft}px`;
});

voiceButton.addEventListener("click", () => {
  const lastIncomingChat = chatContainer.querySelector(".chat.incoming:last-child p");
  if (lastIncomingChat) {
    const textToSpeak = lastIncomingChat.textContent;
    const speech = new SpeechSynthesisUtterance(textToSpeak);
    speechSynthesis.speak(speech);
  }
});
