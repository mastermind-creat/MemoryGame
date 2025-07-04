document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { name: 'image1', img: 'images/img1.jpg' },
        { name: 'image2', img: 'images/img2.jpg' },
        { name: 'image3', img: 'images/img3.jpg' },
        { name: 'image4', img: 'images/img4.jpg' },
        { name: 'image5', img: 'images/img5.jpg' },
        { name: 'image6', img: 'images/img6.jpg' },
        { name: 'image7', img: 'images/img7.jpg' },
        { name: 'image8', img: 'images/img8.jpg' },
        { name: 'image9', img: 'images/img9.jpg' },
        { name: 'image10', img: 'images/img10.jpg' },
        { name: 'image11', img: 'images/img11.jpg' },
        { name: 'image12', img: 'images/img12.jpg' }
    ];

    // Load audio with error handling
    const loadAudio = (src) => {
        try {
            const audio = new Audio(src);
            audio.onerror = () => console.error(`Failed to load audio: ${src}`);
            return audio;
        } catch (e) {
            console.error(`Error creating audio for ${src}: ${e}`);
            return null;
        }
    };

    const flipSound = loadAudio('audio/flip.wav');
    const matchSound = loadAudio('audio/match.wav');
    const winSound = loadAudio('audio/win.mp3');
    const backgroundMusic = loadAudio('audio/background.mp3');

    if (backgroundMusic) {
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.5;
    }

    let moves = 0;
    let matchedPairs = 0;
    let score = 0; // New: Scoring system
    let firstCard, secondCard;
    let countdownTimer;
    let countdownTime = 30;
    let gameStarted = false;
    let isPaused = false; // New: Pause state
    let currentLevel = 1;
    // Extended levels with varied durations and pairs
    const levels = {
        1: { pairs: 8, time: 40, scoreBase: 100 },
        2: { pairs: 10, time: 38, scoreBase: 150 },
        3: { pairs: 12, time: 35, scoreBase: 200 },
        4: { pairs: 14, time: 32, scoreBase: 250 },
        5: { pairs: 16, time: 30, scoreBase: 300 },
        6: { pairs: 18, time: 28, scoreBase: 350 },
        7: { pairs: 20, time: 25, scoreBase: 400 },
        8: { pairs: 22, time: 22, scoreBase: 450 } // New: Extended to 8 levels
    };

    const memoryGrid = document.querySelector('.memory-grid');
    const moveCounter = document.getElementById('move-counter');
    const timerDisplay = document.getElementById('timer');
    const scoreDisplay = document.getElementById('score'); // New: Score display (add to HTML)
    const endgameMessage = document.getElementById('endgame-message');
    const startButton = document.getElementById('start-btn');
    const pauseButton = document.getElementById('pause-btn'); // New: Pause button (add to HTML)
    const levelDisplay = document.getElementById('current-level');

    // Load high score from localStorage
    let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
    const highScoreDisplay = document.getElementById('high-score'); // New: High score display (add to HTML)
    if (highScoreDisplay) highScoreDisplay.textContent = highScore;

    function initializeGame() {
        if (winSound) {
            winSound.pause();
            winSound.currentTime = 0;
        }

        const numberOfCards = levels[currentLevel].pairs;
        countdownTime = levels[currentLevel].time;
        const selectedCards = cardsArray.slice(0, numberOfCards / 2);
        if (selectedCards.length < numberOfCards / 2) {
            console.error('Not enough card images for level', currentLevel);
            Swal.fire('Error', 'Not enough card images for this level!', 'error');
            return;
        }
        const cardsToPlay = [...selectedCards, ...selectedCards];
        const shuffledCards = shuffle(cardsToPlay);
        memoryGrid.innerHTML = '';
        shuffledCards.forEach(card => {
            const cardElement = createCardElement(card);
            memoryGrid.appendChild(cardElement);
        });
        updateLevelDisplay();
        resetGameVariables();
        updateGridLayout(numberOfCards); // New: Adjust grid layout
    }

    function updateLevelDisplay() {
        levelDisplay.textContent = currentLevel;
        if (scoreDisplay) scoreDisplay.textContent = score;
    }

    function resetGameVariables() {
        moves = 0;
        matchedPairs = 0;
        firstCard = null;
        secondCard = null;
        moveCounter.textContent = moves;
        if (scoreDisplay) scoreDisplay.textContent = score;
        clearInterval(countdownTimer);
        timerDisplay.textContent = formatTime(countdownTime);
        timerDisplay.classList.remove('danger', 'flash-animation');
        gameStarted = false;
        isPaused = false;
        if (pauseButton) pauseButton.textContent = 'Pause';
    }

    // New: Dynamic grid layout for responsiveness
    function updateGridLayout(numberOfCards) {
        const columns = Math.ceil(Math.sqrt(numberOfCards));
        memoryGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }

    function createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.dataset.name = card.name;
        cardDiv.setAttribute('tabindex', '0'); // Accessibility: Make focusable
        cardDiv.setAttribute('aria-label', `Card ${card.name}`); // Accessibility: Screen reader support

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        const frontImg = document.createElement('img');
        frontImg.src = card.img;
        frontImg.alt = card.name;
        frontImg.onerror = () => {
            console.error(`Failed to load image: ${card.img}`);
            frontImg.src = 'images/fallback.jpg'; // Fallback image
        };
        cardFront.appendChild(frontImg);

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const backImg = document.createElement('img');
        backImg.src = 'images/f18d2f9782a9b7a4deaa3cb49c6b029d.jpg';
        backImg.alt = 'PlayStation Logo';
        cardBack.appendChild(backImg);

        cardDiv.appendChild(cardFront);
        cardDiv.appendChild(cardBack);
        cardDiv.addEventListener('click', handleCardClick);
        cardDiv.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') handleCardClick(e); // Accessibility: Keyboard support
        });

        return cardDiv;
    }

    function handleCardClick(event) {
        if (!gameStarted || isPaused) return;

        const clickedCard = event.target.closest('.card');
        if (!clickedCard.classList.contains('flipped') && !secondCard) {
            if (flipSound) flipSound.play();
            clickedCard.classList.add('flipped');
            if (!firstCard) {
                firstCard = clickedCard;
            } else {
                secondCard = clickedCard;
                checkForMatch();
            }
        }
    }

    function checkForMatch() {
        moves++;
        moveCounter.textContent = moves;
        if (firstCard.dataset.name === secondCard.dataset.name) {
            matchedPairs++;
            if (matchSound) matchSound.play();
            // New: Add score for match (base score per match)
            score += 50;
            if (scoreDisplay) scoreDisplay.textContent = score;
            resetSelection();
            if (matchedPairs === levels[currentLevel].pairs / 2) {
                completeLevel();
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetSelection();
            }, 1000);
        }
    }

    function resetSelection() {
        firstCard = null;
        secondCard = null;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
        return array;
    }

    function startCountdown() {
        timerDisplay.textContent = formatTime(countdownTime);
        countdownTimer = setInterval(() => {
            if (!isPaused) {
                countdownTime--;
                updateTimerDisplay();
                if (countdownTime <= 0) {
                    clearInterval(countdownTimer);
                    endGame(false);
                }
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = formatTime(countdownTime);
        if (countdownTime <= 5) {
            timerDisplay.classList.add('danger', 'flash-animation');
        } else {
            timerDisplay.classList.remove('danger', 'flash-animation');
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function completeLevel() {
        clearInterval(countdownTimer);
        if (winSound) {
            winSound.currentTime = 0;
            winSound.play();
        }
        // New: Add level completion bonus (base score + time bonus)
        score += levels[currentLevel].scoreBase + countdownTime * 10;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            if (highScoreDisplay) highScoreDisplay.textContent = highScore;
        }
        createConfettiOnGameEnd();

        Swal.fire({
            title: `Level ${currentLevel} Complete!`,
            text: `Score: ${score}. Proceed to the next level?`,
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                currentLevel++;
                if (currentLevel <= Object.keys(levels).length) {
                    initializeGame();
                } else {
                    endGame(true);
                }
            } else {
                endgameMessage.style.display = 'block';
            }
        });
    }

    function endGame(win) {
        clearInterval(countdownTimer);
        Swal.fire({
            title: win ? 'Congratulations!' : 'Time’s Up!',
            text: win ? `You completed all levels! Final Score: ${score}` : 'Try again or end game?',
            icon: win ? 'success' : 'error',
            showCancelButton: !win,
            confirmButtonText: win ? 'Play Again' : 'Retry',
            cancelButtonText: 'End'
        }).then((result) => {
            if (result.isConfirmed) {
                score = 0; // Reset score
                currentLevel = 1; // Restart from level 1
                initializeGame();
            } else if (!win) {
                endgameMessage.style.display = 'block';
            }
        });
    }

    // New: Pause functionality
    if (pauseButton) {
        pauseButton.addEventListener('click', () => {
            if (gameStarted) {
                isPaused = !isPaused;
                pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
                if (isPaused && backgroundMusic) backgroundMusic.pause();
                else if (!isPaused && backgroundMusic) backgroundMusic.play();
                Swal.fire({
                    title: isPaused ? 'Game Paused' : 'Game Resumed',
                    text: isPaused ? 'Press Resume to continue' : '',
                    icon: 'info',
                    timer: isPaused ? null : 1000,
                    showConfirmButton: isPaused
                });
            }
        });
    }

    startButton.addEventListener('click', () => {
        if (!gameStarted) {
            gameStarted = true;
            startCountdown();
            if (backgroundMusic && backgroundMusic.paused) {
                backgroundMusic.play().catch(e => console.error('Background music failed to play:', e));
            }
        }
    });

    // Add this after DOMContentLoaded and after all other event listeners
    const playAgainButton = document.getElementById('startButton');
    if (playAgainButton) {
        playAgainButton.addEventListener('click', () => {
            score = 0;
            currentLevel = 1;
            if (scoreDisplay) scoreDisplay.textContent = score;
            if (levelDisplay) levelDisplay.textContent = currentLevel;
            endgameMessage.style.display = 'none';
            initializeGame();
            // Optionally show a Bootstrap alert for feedback
            if (window.jQuery) {
                $('.game-container').prepend(`
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        Game restarted! Good luck!
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            }
        });
    }

    initializeGame();
});