document.getElementById('send-feedback-btn').addEventListener('click', function() {
    const feedbackText = document.getElementById('feedback').value;
    const userName = document.getElementById('name').value; // Get user name
    
    if (userName.trim() === "" || feedbackText.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please provide both name and feedback before sending.'
        });
        return;
    }

    const templateParams = {
        name: userName,  // Add the name to the parameters
        feedback: feedbackText,
        gameId: "Memory Game"
    };

    // Send feedback using EmailJS
    emailjs.send('service_mlrua6s', 'template_wcveen7', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            Swal.fire({
                icon: 'success',
                title: 'Thank you!',
                text: 'Your feedback has been sent successfully.',
            });
            document.getElementById('name').value = ""; // Clear name input
            document.getElementById('feedback').value = ""; // Clear feedback textarea
        }, function(error) {
            console.log('FAILED...', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'There was an error sending your feedback. Please try again later.'
            });
        });
});