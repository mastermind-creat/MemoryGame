# Memory Game

This Memory Game is a fun and interactive web-based card-matching game where players flip cards to find pairs. The game features sound effects, a timer, a move counter, and a feedback form integrated with EmailJS for user input.

## Features

- **Flip cards to match pairs**: Players click on cards to reveal images and match them.
- **Move counter**: Tracks the number of moves made by the player.
- **Timer**: Displays the time elapsed since the game started.
- **Sound effects**: Plays sounds for card flips, successful matches, and when the game is won.
- **Confetti animation**: Celebrates when the player wins the game with a confetti effect.
- **Feedback form**: Allows users to send feedback after completing the game via EmailJS.
- **Responsive design**: The game is responsive and adjusts well to different screen sizes.

## Demo

You can play the Memory Game by opening `index.html` in your browser.

## How to Play

1. Flip two cards at a time by clicking on them.
2. If the two flipped cards match, they stay revealed. If they do not match, they flip back after a short delay.
3. The game ends when all pairs are matched.
4. At the end of the game, you can restart the game or send feedback.

## Technology Stack

- **HTML5**: For structuring the game and feedback form.
- **CSS3**: For styling the game and layout.
- **JavaScript**: For the game logic, animations, and interactivity.
- **EmailJS**: Used to send feedback via email.
- **SweetAlert**: Used for displaying nice alert messages for feedback form submission.

## Project Structure

memory-game/ │ ├── images/                 # Folder containing images used for the memory cards │   ├── img1.jpg │   ├── img2.jpg │   └── ...
├── audio/                  # Folder containing sound effects │   ├── flip.wav │   ├── match.wav │   └── win.mp3 ├── style.css               # CSS for styling the game layout ├── script.js               # JavaScript file containing the main game logic ├── feedback.js             # JavaScript file handling feedback form submissions ├── confetti.js             # JavaScript file for confetti effect ├── index.html              # Main HTML file for the game interface └── README.md               # Project documentation

## Setup

1. Clone the repository or download the files.
2. Open `index.html` in your browser to start the game.

### EmailJS Setup

1. You need an [EmailJS](https://www.emailjs.com/) account to send feedback emails.
2. In `index.html`, initialize EmailJS using your user ID:
   ```javascript
   emailjs.init("YOUR_USER_ID");

3. Update the service ID and template ID in the feedback.js file to match your EmailJS account.



emailjs.send('your_service_id', 'your_template_id', templateParams)

Game Logic

The cards are shuffled at the start of each game.

Players can flip two cards at a time, and the game checks if they match.

If all pairs are matched, the game ends, and a congratulatory message with confetti is displayed.

The game keeps track of moves and time taken to complete the game.


Feedback Form

At the end of the game, players are prompted to send feedback:

The form captures the player's name and feedback message.

Feedback is sent via EmailJS, and SweetAlert provides feedback on submission success or failure.


Audio

The game uses three audio effects:

Flip sound: Played when a card is flipped.

Match sound: Played when a pair of cards is matched.

Win sound: Played when the game is won.


License

This project is open-source and free to use.

Enjoy the game!

This `README.md` provides an overview of the project, how to set it up, the game's features, and how it works. Let me know if you need any adjustments or additional information!
