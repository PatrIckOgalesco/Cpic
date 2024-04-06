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



