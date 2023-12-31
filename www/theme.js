// theme.js
const themeButton = document.querySelector("#theme-btn");
const themeText = document.querySelector("#theme-text");
const themes = ["default", "light-mode", "light", "dark-mode", "blue-mode", "green-mode"];
let currentThemeIndex = 0;

// Function to set the theme based on the stored theme in localStorage or "default" if not set
function setThemeFromLocalStorage() {
  const storedTheme = localStorage.getItem("themeColor");
  if (themes.includes(storedTheme)) {
    currentThemeIndex = themes.indexOf(storedTheme);
  } else {
    currentThemeIndex = themes.indexOf("default");
    localStorage.setItem("themeColor", "default"); // Ensure "default" is stored in localStorage
  }

  const currentTheme = themes[currentThemeIndex];
  document.body.classList.add(currentTheme);
  themeButton.innerHTML = `<i class='bx ${currentTheme === 'light-mode' ? 'bxs-moon' : 'bxs-sun'}'></i>`;
  themeText.innerText = currentTheme;

  // Check the current theme and create or remove the Matrix Rain effect accordingly
  toggleMatrixRain();

  // Check if the current theme is "light-mode" and set the background accordingly
  if (currentTheme === "light-mode") {
    document.body.style.background = "url('www/images/Waterfall.gif')";
  } else {
    document.body.style.background = "var(--outgoing-chat-bg)";
  }
}

// Function to update the theme
function updateTheme(newTheme) {
  currentThemeIndex = themes.indexOf(newTheme);
  document.body.classList.remove(...themes);
  document.body.classList.add(newTheme);
  localStorage.setItem("themeColor", newTheme);

  const themeIcon = document.querySelector("#theme-btn i");
  themeIcon.className = ''; // Clear existing classes
  themeIcon.classList.add('bx', newTheme === 'light-mode' ? 'bxs-moon' : 'bxs-sun'); // Adjust icons based on theme
  
  themeText.innerText = newTheme;

  // Check the current theme and create or remove the Matrix Rain effect accordingly
  toggleMatrixRain();

  // Check if the current theme is "light-mode" and set the background accordingly
  if (newTheme === "light-mode") {
    document.body.style.background = "url('www/images/Waterfall.gif')";
  } else {
    document.body.style.background = "var(--outgoing-chat-bg)";
  }
}

themeButton.addEventListener("click", (event) => {
  // Toggle dropdown visibility on theme button click
  const dropdown = document.getElementById("theme-dropdown");
  dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";

  // Prevent the event from propagating to the document click listener
  event.stopPropagation();
});

document.addEventListener("click", () => {
  // Hide dropdown when clicking outside of it
  const dropdown = document.getElementById("theme-dropdown");
  dropdown.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  setThemeFromLocalStorage(); // Set the theme based on localStorage
});

function toggleMatrixRain() {
  const currentTheme = document.body.classList.contains("dark-mode");

  if (currentTheme) {
    createMatrixRain();
  } else if (rainCanvas) {
    // Remove the Matrix Rain canvas if it exists and the theme is not "dark-mode"
    rainCanvas.remove();
    rainCanvas = null;
  }
}

// Function to change the theme
function changeTheme(newTheme) {
  updateTheme(newTheme);
  // Close the dropdown after selecting a theme
  document.getElementById("theme-dropdown").style.display = "none";
}

// Matrix Rain
let rainCanvas = null;

function createMatrixRain() {
  rainCanvas = document.createElement("canvas");
  const context = rainCanvas.getContext("2d");
  rainCanvas.style.background = "var(--outgoing-chat-bg)";
  document.body.appendChild(rainCanvas);

  const fontSize = 16;
  const columns = Math.floor(window.innerWidth / fontSize);
  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops.push(0);
  }

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charArray = characters.split("");

  rainCanvas.width = window.innerWidth;
  rainCanvas.height = window.innerHeight;
  rainCanvas.style.position = "fixed";
  rainCanvas.style.top = "0";
  rainCanvas.style.left = "0";
  rainCanvas.style.zIndex = "-1";

  function draw() {
    context.fillStyle = "rgba(0,0,0,0.20)";
    context.fillRect(0, 0, rainCanvas.width, rainCanvas.height);
    context.font = "700 " + fontSize + "px monospace";
    context.fillStyle = "#75a99c";

    for (let i = 0; i < columns; i++) {
      const char = charArray[Math.floor(Math.random() * charArray.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      context.fillText(char, x, y);

      if (y >= rainCanvas.height && Math.random() > 0.99) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  draw();
  setInterval(draw, 35);
}






