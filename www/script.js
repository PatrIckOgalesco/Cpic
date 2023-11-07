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