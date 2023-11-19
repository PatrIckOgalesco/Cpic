// Assuming you have an element to display feedback, let's call it feedbackDisplay
const feedbackDisplay = document.getElementById("feedbackDisplay");

document.getElementById("sendButton").addEventListener("click", function () {
    // Get user input
    const userInput = document.getElementById("userInput").value;

    // Check if the input is not empty
    if (userInput.trim() !== "") {
        // Send the input to the server (PHP file)
        fetch('www/sendFeedback.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'userInput=' + encodeURIComponent(userInput),
        })
            .then(response => response.text())
            .then(data => {
                // Display feedback response (optional)
                feedbackDisplay.textContent = data;

                // Close the notification after successfully submitting feedback
                closeNotification();
            })
            .catch(error => console.error('Error sending feedback:', error));

        // Clear the input field after sending feedback
        document.getElementById("userInput").value = "";
    } else {
        // Display a message if the input is empty (optional)
        feedbackDisplay.textContent = "Please enter feedback before sending.";
    }
});

// Close the feedback display when the "Close" button is clicked
document.getElementById("close").addEventListener("click", function () {
    // Add your code to close the feedback display here
    // For example, you might have something like feedbackModal.style.display = "none";
    closeNotification();
});
