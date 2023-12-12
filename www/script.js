const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const deleteButton = document.querySelector("#delete-btn");
const voiceButton = document.querySelector("#voice-btn");

let userText = '';
let currentSpeech = null;

const sanitizeTextForSpeech = (text) => {
  // Remove line breaks and HTML tags from the text
  const sanitizedText = text.replace(/(<([^>]+)>|\n)/g, '');
  return sanitizedText.trim();
};

const loadDataFromLocalstorage = () => {
  const defaultText = `<div class="default-text"><br><br>
      <h1>Hello there, welcome!</h1><br>
        <p style="font-weight: bold;" id="intro">Your Personal CPIC</p>
          <span id="typewriter"></span>
          <span id="cursor">|</span><br>
        <img src="www/images/log2.png" alt="jett" id="img1">
        <img src="www/images/bg-bottom.png" alt="" class="curveImg" />

      <div class="default-intro2" id="default-intro2">
        <h2 id="smart"> SmartNavigator </h2>
          <div class="default-sub" id="default-sub">
            <p id="sub" style = "font-size: 12px;">"A chatbot designed to revolutionize the way students and faculty at Christian Polytechnic Institute of Catanduanes Inc."</p>
          </div>
    </div>
  </div>`;

// <img src="www/images/chatlogo.png" alt="jett" id="img2">

  chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

const createChatElement = (content, className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat", className);
  chatDiv.innerHTML = content;
  return chatDiv;
};

const speakAnswer = (answer) => {
  // Immediately cancel the current speech if there is any
  if (currentSpeech) {
    currentSpeech.onend = null;
    speechSynthesis.cancel();
    currentSpeech = null;
  }

  const speech = new SpeechSynthesisUtterance(sanitizeTextForSpeech(answer));
  speech.rate = 1.1;
  speech.onend = () => {
    currentSpeech = null;
  };

  currentSpeech = speech;

  speechSynthesis.speak(speech);
};

const handleOutgoingChat = () => {
  userText = chatInput.value.trim();
  if (!userText) return;

  chatInput.value = "";

  const suggestion = document.getElementById("suggestion");
  suggestion.textContent = "";

  const html = `<div class="chat-content">
    <div class="chat-details">
      <img src="www/images/user1.jpg" alt="user-img">
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
    default:
      // Send the user input to the server (PHP) for database query
      fetch('www/api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userText=${encodeURIComponent(userText)}`,
      })
        .then(response => response.text())
        .then(databaseAnswer => {
          answer = databaseAnswer;
          const answerHtml = `<div class="chat-content">
            <div class="chat-details">
              <img src="www/images/chatlogo.jpg" alt="chatbot-img">
              <p>${answer}</p>
            </div>
          </div>`;

          const incomingChatDiv = createChatElement(answerHtml, "incoming");
          chatContainer.appendChild(incomingChatDiv);
          chatContainer.scrollTo(0, chatContainer.scrollHeight);

          // Speak the answer using text-to-speech
          speakAnswer(answer);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      return;
  }

  // If the switch case handles the answer, display it in the chat
  const answerHtml = `<div class="chat-content">
    <div class="chat-details">
      <img src="www/images/chatlogo.jpg" alt="chatbot-img">
      <div>${answer}</div>
    </div>
  </div>`;

  const incomingChatDiv = createChatElement(answerHtml, "incoming");
  chatContainer.appendChild(incomingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  // Speak the answer using text-to-speech
  speakAnswer(answer);
};

const deleteChats = () => {
  if (confirm("Are you sure you want to delete all the chats?")) {
    if (currentSpeech) {
      currentSpeech.onend = null;
      speechSynthesis.cancel();
      currentSpeech = null;
    }

    localStorage.removeItem("all-chats");
    loadDataFromLocalstorage();
  }
};

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
deleteButton.addEventListener("click", deleteChats);

voiceButton.addEventListener("click", () => {
  const lastIncomingChat = chatContainer.querySelector(".chat.incoming:last-child p");
  if (lastIncomingChat) {
    const textToSpeak = lastIncomingChat.textContent;
    speakAnswer(textToSpeak);
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

// Add an event listener for page unload to stop speech
window.addEventListener('beforeunload', () => {
  if (currentSpeech) {
    currentSpeech.onend = null;
    speechSynthesis.cancel();
    currentSpeech = null;
  }
});
