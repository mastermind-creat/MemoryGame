# Memory Game

This Memory Game is an engaging web-based card-matching game where players flip cards to find matching pairs within a time limit. The game features multiple levels, a scoring system, sound effects, confetti animations, and a feedback form integrated with EmailJS for user input.

## Features

- **Card Matching**: Flip two cards at a time to find matching pairs.
- **Multiple Levels**: 8 levels with increasing difficulty (8 to 22 pairs, decreasing time limits).
- **Scoring System**: Earn 50 points per match, plus a level completion bonus based on time remaining.
- **High Score Persistence**: Tracks and saves the highest score using `localStorage`.
- **Move Counter**: Displays the number of moves made.
- **Timer**: Shows remaining time per level, with a flashing warning when low.
- **Pause/Resume**: Pause the game to take a break, with music and timer paused.
- **Sound Effects**: Includes sounds for card flips, matches, level completion, and background music.
- **Confetti Animation**: Celebrates level completion with a colorful confetti effect that fades out.
- **Feedback Form**: Allows players to submit feedback via EmailJS with score and level included.
- **Responsive Design**: Adapts to various screen sizes, with optimized card sizes and particle counts for mobile.
- **Accessibility**: Supports keyboard navigation (Enter/Space to flip cards) and screen readers with ARIA labels.

## Demo

Play the game by opening `index.html` in a web browser.

## How to Play

1. Click or tap the **Start Game** button to begin.
2. Flip two cards by clicking or tapping (or using Enter/Space for accessibility).
3. If the cards match, they stay revealed; if not, they flip back after a short delay.
4. Match all pairs within the time limit to complete the level and earn points.
5. Use the **Pause** button to pause/resume the game.
6. Progress through 8 levels with increasing card counts and decreasing time.
7. At the end of a level or game, choose to continue, retry, or submit feedback.
8. Your score (50 points per match + time-based bonus) and high score are displayed.

## Technology Stack

- **HTML5**: Structures the game interface and feedback form.
- **CSS3**: Styles the game layout, animations, and responsive design.
- **JavaScript**: Handles game logic, animations, and interactivity.
- **EmailJS**: Sends feedback emails with player input, score, and level.
- **SweetAlert2**: Displays polished alerts for level completion, game over, and feedback submission.
- **Bootstrap 4**: Provides responsive layout and modal components.
- **Font Awesome & Bootstrap Icons**: Adds icons for moves, timer, score, and high score.
- **HTML5 Canvas**: Powers the confetti animation.

## Project Structure
memory-game/
│
├── images/                 # Folder containing card images and fallback
│   ├── img1.jpg
│   ├── img2.jpg
│   ├── ...
│   ├── f18d2f9782a9b7a4deaa3cb49c6b029d.jpg  # Card back (PlayStation logo)
│   └── fallback.jpg        # Fallback image for missing card images
├── audio/                  # Folder containing sound effects
│   ├── flip.wav
│   ├── match.wav
│   ├── win.mp3
│   └── background.mp3
├── style.css               # Styles for game layout and animations
├── script.js               # Main game logic (levels, scoring, pause, etc.)
├── feedback.js             # Handles feedback form submissions via EmailJS
├── confetti.js             # Manages confetti animation for level completion
├── index.html              # Main HTML file for the game interface
└── README.md               # Project documentation


## Setup

1. Clone the repository or download the files.
2. Ensure all images (`images/`) and audio files (`audio/`) are present, including `fallback.jpg` for error handling.
3. Open `index.html` in a modern web browser to start the game.

### EmailJS Setup

1. Create an [EmailJS](https://www.emailjs.com/) account to enable feedback emails.
2. In `index.html`, ensure EmailJS is initialized with your user ID:
   ```javascript
   emailjs.init("qU2NlZClNfJyjoXMz");