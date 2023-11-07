// function createMatrixRain() {
//   const currentTheme = localStorage.getItem("themeColor");

//   if (currentTheme === "dark_mode") {
//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");
//     canvas.style.background = "var(--outgoing-chat-bg)";
//     body.appendChild(canvas);

//     const fontSize = 16;
//     const columns = Math.floor(window.innerWidth / fontSize);
//     const drops = [];
//     for (let i = 0; i < columns; i++) {
//       drops.push(0);
//     }

//     const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     const charArray = characters.split("");

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     canvas.style.position = "fixed";
//     canvas.style.top = "0";
//     canvas.style.left = "0";
//     canvas.style.zIndex = "-1";

//     function draw() {
//       context.fillStyle = "rgba(0,0,0,0.30)";
//       context.fillRect(0, 0, canvas.width, canvas.height);
//       context.font = "700 " + fontSize + "px monospace";
//       context.fillStyle = "#75a99c";

//       for (let i = 0; i < columns; i++) {
//         const char = charArray[Math.floor(Math.random() * charArray.length)];
//         const x = i * fontSize;
//         const y = drops[i] * fontSize;
//         context.fillText(char, x, y);

//         if (y >= canvas.height && Math.random() > 0.99) {
//           drops[i] = 0;
//         }
//         drops[i]++;
//       }
//     }

//     draw();
//     setInterval(draw, 35);
//   }
// }

// createMatrixRain();
