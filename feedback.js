document.getElementById('send-feedback-btn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const feedbackText = document.getElementById('feedback').value;

    if (feedbackText.trim() === "" || email.trim() === "") {
        alert("Please provide your email and feedback.");
        return;
    }

    const templateParams = {
        email: email,
        name: name,
        feedback: feedbackText,
        gameId: "Memory Game"
    };

    emailjs.send('service_mlrua6s', 'template_wcveen7', templateParams)
        .then(function(response) {
            Swal.fire("Success!", "Feedback sent successfully!", "success");
            document.getElementById('email').value = "";
            document.getElementById('name').value = "";
            document.getElementById('feedback').value = "";
        }, function(error) {
            Swal.fire("Error!", "There was an error sending your feedback.", "error");
        });
});
