document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { name: 'image1', img: 'images/img1.jpg' },
        { name: 'image1', img: 'images/img1.jpg' },
        { name: 'image2', img: 'images/img2.jpg' },
        { name: 'image2', img: 'images/img2.jpg' },
        { name: 'image3', img: 'images/img3.jpg' },
        { name: 'image3', img: 'images/img3.jpg' },
        { name: 'image4', img: 'images/img4.jpg' },
        { name: 'image4', img: 'images/img4.jpg' },
        { name: 'image5', img: 'images/img5.jpg' },
        { name: 'image5', img: 'images/img5.jpg' },
        { name: 'image6', img: 'images/img6.jpg' },
        { name: 'image6', img: 'images/img6.jpg' },
        { name: 'image7', img: 'images/img7.jpg' },
        { name: 'image7', img: 'images/img7.jpg' },
        { name: 'image8', img: 'images/img8.jpg' },
        { name: 'image8', img: 'images/img8.jpg' }
    ];

    // Audio Files
    const flipSound = new Audio('audio/flip.wav');
    const matchSound = new Audio('audio/match.wav');
    const winSound = new Audio('audio/win.mp3');

    // Game Variables
    let moves = 0;
    let matchedPairs = 0;
    let firstCard, secondCard;
    let timer;
    let timeElapsed = 0;
    let gameStarted = false;

    const memoryGrid = document.querySelector('.memory-grid');
    const moveCounter = document.getElementById('move-counter');
    const timerDisplay = document.getElementById('timer');
    const endgameMessage = document.getElementById('endgame-message');
    const restartButton = document.getElementById('restart-btn');

    // Shuffle the cards and generate the grid
    function initializeGame() {
        const shuffledCards = shuffle(cardsArray);
        shuffledCards.forEach(card => {
            const cardElement = createCardElement(card);
            memoryGrid.appendChild(cardElement);
        });
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
        cardBack.innerHTML = `<img src="images/logo.jpg" alt="PlayStation Logo">`; // Use PlayStation logo image

        cardDiv.appendChild(cardFront);
        cardDiv.appendChild(cardBack);
        cardDiv.addEventListener('click', handleCardClick);

        return cardDiv;
    }

    function handleCardClick(event) {
        const clickedCard = event.target.closest('.card');

        if (!gameStarted) {
            startTimer();
            gameStarted = true;
        }

        if (!clickedCard.classList.contains('flipped') && !secondCard) {
            flipSound.play(); // Play flip sound
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
            matchSound.play(); // Play match sound
            resetSelection();
            if (matchedPairs === cardsArray.length / 2) {
                endGame();
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

    function startTimer() {
        timer = setInterval(() => {
            timeElapsed++;
            const minutes = Math.floor(timeElapsed / 60);
            const seconds = timeElapsed % 60;
            timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }, 1000);
    }

    function endGame() {
        clearInterval(timer);
        winSound.play(); // Play win sound
        createConfettiOnGameEnd(); // Trigger confetti effect on game end
        endgameMessage.style.display = 'block';
    }

    restartButton.addEventListener('click', () => {
        // Stop the win sound if it's playing
        winSound.pause();
        winSound.currentTime = 0; // Reset the audio to the start

        // Clear the memory grid and reinitialize the game
        memoryGrid.innerHTML = '';
        initializeGame();
        
        // Reset game variables
        moves = 0;
        matchedPairs = 0;
        firstCard = null;
        secondCard = null;
        moveCounter.textContent = moves;
        timerDisplay.textContent = '00:00';
        endgameMessage.style.display = 'none';
        gameStarted = false;
        timeElapsed = 0;

        // Clear any existing timer
        clearInterval(timer);
    });

    initializeGame();
});