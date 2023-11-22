// Array of predictive text options
let predictiveTextOptions = [];

fetch('www/getPredictiveText.php')
    .then(response => response.json())
    .then(data => {
        console.log('Predictive Text Options:', data);
        predictiveTextOptions = data;
        predictiveTextOptions.sort();
    })
    .catch(error => console.error('Error fetching predictive text options:', error));

const input = document.getElementById("chat-input");
const suggestion = document.getElementById("suggestion");

// Event listener for input changes
input.addEventListener("input", () => {
    clearSuggestion();
    const currentInput = input.value.trim(); // Trim leading and trailing spaces
    const regex = new RegExp("^" + currentInput, "i");

    const matchingSuggestions = predictiveTextOptions.filter(option =>
        regex.test(option.toLowerCase())
    );

    if (matchingSuggestions.length > 0 && currentInput) {
        matchingSuggestions.forEach(suggest => {
            const suggestionItem = document.createElement("div");
            suggestionItem.textContent = suggest;
            suggestionItem.classList.add("suggestion-item");
            suggestionItem.addEventListener("click", () => {
                applySuggestion(suggest);
                clearSuggestion();
            });
            suggestion.appendChild(suggestionItem);
        });
    }
});


// Event listener for Enter key press
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && suggestion.childElementCount > 0) {
        e.preventDefault();
        applySuggestion(suggestion.textContent.trim());
        clearSuggestion();
    }
});

const applySuggestion = (selectedSuggestion) => {
    input.value = selectedSuggestion;
    clearSuggestion();
};



const clearSuggestion = () => {
    suggestion.innerHTML = "";
};









// // Array of predictive text options---------------suggestion forn js
// let predictiveTextOptions = [
//   "Where is Mr. Jomar's room?",
//   "Where is Mrs. Sheila's room?",
//   "history",
//   "who is gollum",
// ];
// predictiveTextOptions.sort();

// const input = document.getElementById("chat-input");
// const suggestion = document.getElementById("suggestion");

// // Event listener for input changes
// input.addEventListener("input", () => {
//   clearSuggestion();
//   const inputWords = input.value.split(" ");
//   const lastWord = inputWords[inputWords.length - 1];
//   const regex = new RegExp("^" + lastWord, "i");

//   const matchingSuggestions = predictiveTextOptions.filter(option =>
//     regex.test(option.toLowerCase())
//   );

//   if (matchingSuggestions.length > 0 && lastWord !== "") {
//     matchingSuggestions.forEach(suggest => {
//       const suggestionItem = document.createElement("div");
//       suggestionItem.textContent = suggest;
//       suggestionItem.classList.add("suggestion-item");
//       suggestionItem.addEventListener("click", () => {
//         applySuggestion(suggest);
//         clearSuggestion();
//       });
//       suggestion.appendChild(suggestionItem);
//     });
//   }
// });

// // Event listener for Enter key press
// input.addEventListener("keydown", (e) => {
//   if (e.key === "Enter" && suggestion.childElementCount > 0) {
//     e.preventDefault();
//     applySuggestion(suggestion.textContent.trim());
//     clearSuggestion();
//   }
// });

// const applySuggestion = (selectedSuggestion) => {
//   const currentInput = input.value;
//   const updatedInput = currentInput.replace(/\S+$/, "");
//   input.value = updatedInput + selectedSuggestion;
// };

// const clearSuggestion = () => {
//   suggestion.innerHTML = "";
// };

// sendButton.style.display = "block";









// // Array of predictive text options---------------2nd version not clickable ssuggestion
// let predictiveTextOptions = [
//   "Where is Mr. Jomar's room?",
//   "Where is Mrs. Sheila's room?",
//   "history",
//   "who is gollum",
// ];
// predictiveTextOptions.sort();

// const input = document.getElementById("chat-input");
// const suggestion = document.getElementById("suggestion");

// // Event listener for input changes
// input.addEventListener("input", () => {
//   clearSuggestion();
//   const inputWords = input.value.split(" ");
//   const lastWord = inputWords[inputWords.length - 1];
//   const regex = new RegExp("^" + lastWord, "i");

//   const matchingSuggestions = predictiveTextOptions.filter(option =>
//     regex.test(option.toLowerCase())
//   );

//   if (matchingSuggestions.length > 0 && lastWord !== "") {
//     matchingSuggestions.forEach(suggest => {
//       const suggestionItem = document.createElement("div");
//       suggestionItem.textContent = suggest;
//       suggestion.appendChild(suggestionItem);
//     });
//   }
// });

// // Event listener for Enter key press
// input.addEventListener("keydown", (e) => {
//   if (e.key === "Enter" && suggestion.childElementCount > 0) {
//     e.preventDefault();
//     const currentInput = input.value;
//     const updatedInput = currentInput.replace(/\S+$/, "");
//     input.value = updatedInput + suggestion.textContent.trim();
//     clearSuggestion();
//   }
// });

// const clearSuggestion = () => {
//   suggestion.innerHTML = "";
// };

// sendButton.style.display = "block";









// // 1st version
// let predictiveTextOptions = [
//   "Where is Mr. Jomar's room?",
//   "Where is Mrs. Sheila's room?",
//   "history",
//   "who is gollum",
// ];
// predictiveTextOptions.sort();

// const input = document.getElementById("chat-input");
// const suggestion = document.getElementById("suggestion");

// // Event listener for input changes
// input.addEventListener("input", () => {
//   clearSuggestion();
//   const regex = new RegExp("^" + input.value, "i");

//   for (let i in predictiveTextOptions) {
//     if (regex.test(predictiveTextOptions[i]) && input.value !== "") {
//       suggestion.textContent = predictiveTextOptions[i];
//       break;
//     }
//   }
// });

// // Event listener for Enter key press
// input.addEventListener("keydown", (e) => {
//   if (e.key === "Enter" && suggestion.textContent !== "") {
//     e.preventDefault();
//     input.value = suggestion.textContent;
//     clearSuggestion();
//   }
// });

// const clearSuggestion = () => {
//   suggestion.textContent = "";
// };

// sendButton.style.display = "block";
