document.addEventListener('DOMContentLoaded', function () {
    const feedbackDisplay = document.getElementById("feedbackDisplay");

    document.getElementById("sendbutton").addEventListener("click", function () {
        // Get user input
        const userFeedback = document.getElementById("userInput").value;

        // Check if the input is not empty
        if (userFeedback.trim() !== "") {
            // Send the input to the server (PHP file)
            fetch('www/sendFeedback.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'userFeedback=' + encodeURIComponent(userFeedback),
            })
                .then(response => response.text())
                .then(data => {
                    // Display feedback response (optional)
                    feedbackDisplay.textContent = data;

                    // Close the notification after successfully submitting feedback
                    closeNotification();

                    // Clear the input field after sending feedback
                    document.getElementById("userInput").value = "";
                })
                .catch(error => console.error('Error sending feedback:', error));
        } else {
            // Display a message if the input is empty (optional)
            feedbackDisplay.textContent = "Please enter feedback before sending.";
        }
    });
});
