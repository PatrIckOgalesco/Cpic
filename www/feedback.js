$(document).ready(function() {
            function clearTextarea() {
                $('#userInput').val('');
            }

            function showNotification(message) {
                alert(message);
            }

            $('#feedbackForm').submit(function(event) {
                event.preventDefault(); // Prevent the default form submission

                var feedbackText = $('#userInput').val().trim();

                if (feedbackText !== '') {
                    $.ajax({
                        type: 'POST',
                        url: './www/process_feedback.php',
                        data: { userInput: feedbackText }, // Send only non-empty feedback
                        success: function(response) {
                            showNotification('Feedback Submitted Successfully😊😉');
                            clearTextarea();
                        },
                        error: function(error) {
                            alert('Error submitting feedback: ' + error.responseText);
                        }
                    });
                } else {
                    alert('Please Enter Your Feedback Before submitting🤔.');
                }
            });
        });