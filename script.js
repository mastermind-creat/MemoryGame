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

    const flipSound = new Audio('audio/flip.wav');
    const matchSound = new Audio('audio/match.wav');
    const winSound = new Audio('audio/win.mp3');
    const backgroundMusic = new Audio('audio/background.mp3');

    backgroundMusic.loop = true; // Enable looping
    backgroundMusic.volume = 0.5; // Adjust volume if needed

    let moves = 0;
    let matchedPairs = 0;
    let firstCard, secondCard;
    let countdownTimer;
    let countdownTime = 30; // Start countdown time
    let gameStarted = false;
    let currentLevel = 1;
    const levels = {
        1: { pairs: 8, time: 30 },
        2: { pairs: 10, time: 28 },
        3: { pairs: 12, time: 26 },
        4: { pairs: 14, time: 24 },
        5: { pairs: 16, time: 22 } // Level 5 with 16 pairs
    };

    const memoryGrid = document.querySelector('.memory-grid');
    const moveCounter = document.getElementById('move-counter');
    const timerDisplay = document.getElementById('timer');
    const endgameMessage = document.getElementById('endgame-message');
    const startButton = document.getElementById('start-btn');
    const levelDisplay = document.getElementById('current-level');

    function initializeGame() {
        winSound.pause();
        winSound.currentTime = 0;

        const numberOfCards = levels[currentLevel].pairs;
        countdownTime = levels[currentLevel].time; // Set countdown time based on current level
        const selectedCards = cardsArray.slice(0, numberOfCards / 2);
        const cardsToPlay = [...selectedCards, ...selectedCards];
        const shuffledCards = shuffle(cardsToPlay);
        memoryGrid.innerHTML = '';
        shuffledCards.forEach(card => {
            const cardElement = createCardElement(card);
            memoryGrid.appendChild(cardElement);
        });
        updateLevelDisplay();
        resetGameVariables();
    }

    function updateLevelDisplay() {
        levelDisplay.textContent = currentLevel;
    }

    function resetGameVariables() {
        moves = 0;
        matchedPairs = 0;
        firstCard = null;
        secondCard = null;
        moveCounter.textContent = moves;
        clearInterval(countdownTimer);
        timerDisplay.textContent = formatTime(countdownTime);
        timerDisplay.classList.remove('danger', 'flash-animation');
        gameStarted = false;
    }

    function createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.dataset.name = card.name;

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.innerHTML = `<img src="${card.img}" alt="${card.name}">`;

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.innerHTML = `<img src="images/f18d2f9782a9b7a4deaa3cb49c6b029d.jpg" alt="PlayStation Logo">`;

        cardDiv.appendChild(cardFront);
        cardDiv.appendChild(cardBack);
        cardDiv.addEventListener('click', handleCardClick);

        return cardDiv;
    }

    function handleCardClick(event) {
        if (!gameStarted) return;

        const clickedCard = event.target.closest('.card');
        if (!clickedCard.classList.contains('flipped') && !secondCard) {
            flipSound.play();
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
            matchSound.play();
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
            countdownTime--;
            updateTimerDisplay();
            if (countdownTime <= 0) {
                clearInterval(countdownTimer);
                endGame(false);
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
        winSound.currentTime = 0;
        winSound.play();
        createConfettiOnGameEnd();

        Swal.fire({
            title: `Level ${currentLevel} Complete!`,
            text: "Proceed to the next level?",
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
                    endgameMessage.style.display = 'block';
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
            text: win ? 'You completed all levels!' : 'Try again or end game?',
            icon: win ? 'success' : 'error',
            showCancelButton: !win,
            confirmButtonText: win ? 'Play Again' : 'Retry',
            cancelButtonText: 'End'
        }).then((result) => {
            if (result.isConfirmed) {
                initializeGame();
            } else if (!win) {
                endgameMessage.style.display = 'block';
            }
        });
    }

    startButton.addEventListener('click', () => {
        if (!gameStarted) {
            gameStarted = true;
            startCountdown();
            // Start background music on first start
            if (backgroundMusic.paused) {
                backgroundMusic.play();
            }
        }
    });

    initializeGame();
});
