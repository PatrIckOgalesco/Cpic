      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      const phrases = ["Campus Guidance!", "Virtual Assistant!", "Chatbot Navigator!"];
      const el = document.getElementById("typewriter");

      let sleepTime = 100;

      let curPhraseIndex = 0;

      const writeLoop = async () => {
        while (true) {
          let curWord = phrases[curPhraseIndex];

          for (let i = 0; i < curWord.length; i++) {
            el.innerText = curWord.substring(0, i + 1);
            await sleep(sleepTime);
          }

          await sleep(sleepTime * 10);

          for (let i = curWord.length; i > 0; i--) {
            el.innerText = curWord.substring(0, i - 1);
            await sleep(sleepTime);
          }

          await sleep(sleepTime * 5);

          if (curPhraseIndex === phrases.length - 1) {
            curPhraseIndex = 0;
          } else {
            curPhraseIndex++;
          }
        }
      };

      writeLoop();






// function sleep(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// const phrases = ["Campus Guidance!", "Virtual Assistant!", "Chatbot Navigator!"];
// const el = document.getElementById("typewriter");

// const typePhrase = async (phrase) => {
//     for (let i = 0; i < phrase.length; i++) {
//         el.innerText = phrase.substring(0, i + 1);
//         await sleep(100); // Adjust speed here, if needed
//     }
//     await sleep(1000); // Adjust the pause after typing
// };

// const erasePhrase = async () => {
//     for (let i = el.innerText.length; i > 0; i--) {
//         el.innerText = el.innerText.substring(0, i - 1);
//         await sleep(50); // Adjust speed here, if needed
//     }
//     await sleep(500); // Adjust the pause after erasing
// };

// const writeLoop = async () => {
//     while (true) {
//         for (const phrase of phrases) {
//             await typePhrase(phrase);
//             await erasePhrase();
//         }
//     }
// };

// writeLoop();
