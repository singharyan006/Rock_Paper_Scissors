// ========== Game State Variables ==========
let humanScore = 0;
let computerScore = 0;
let round = 1;
const maxRounds = 5;

// ========== DOM Element References ==========
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const resultDisplay = document.getElementById('round-result');
const playAgainBtn = document.getElementById('play-again');
const choiceButtons = document.querySelectorAll('.choice-btn');

// Set default result text
resultDisplay.textContent = `Results`;

// ========== Game Logic ==========

// Function to randomly generate computer's choice
const getComputerChoice = () => {
    let num = Math.random();
    if (num < 1 / 3) return "rock";
    else if (num < 2 / 3) return "paper";
    else return "scissor";
};

// Function to play a single round of the game
const playRound = (humanSelection) => {
    const computerSelection = getComputerChoice();

    if (humanSelection === computerSelection) {
        return "It's a tie!";
    } else if (
        (humanSelection === "rock" && computerSelection === "scissor") ||
        (humanSelection === "paper" && computerSelection === "rock") ||
        (humanSelection === "scissor" && computerSelection === "paper")
    ) {
        humanScore++;
        return `You win! ${humanSelection} beats ${computerSelection}`;
    } else {
        computerScore++;
        return `You lose! ${computerSelection} beats ${humanSelection}`;
    }
};

// Function to update the UI after each round
const updateUI = (message) => {
    playerScoreDisplay.textContent = humanScore;
    computerScoreDisplay.textContent = computerScore;
    resultDisplay.textContent = `Round ${round}: ${message}`;
};

// Function to handle end of the game logic
const endGame = () => {
    let finalMsg = "🤝 It's a draw!";
    if (humanScore > computerScore) finalMsg = "🎉 You won the game!";
    else if (humanScore < computerScore) finalMsg = "😢 You lost the game!";

    resultDisplay.textContent = `Game Over! ${finalMsg}`;

    // Disable choice buttons and show "Play Again"
    choiceButtons.forEach(btn => btn.disabled = true);
    playAgainBtn.style.display = 'inline-block';
};

// ========== Event Listeners ==========

// Add event listener to each choice button
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (round > maxRounds) return;

        // Extract player's choice from image alt attribute
        const img = button.querySelector('img');
        const humanChoice = img.alt.toLowerCase();

        // Play round and update result
        const result = playRound(humanChoice);
        updateUI(result);
        round++;

        // End game after final round
        if (round > maxRounds) {
            endGame();
        }
    });
});

// Handle play again button click
playAgainBtn.addEventListener('click', () => {
    humanScore = 0;
    computerScore = 0;
    round = 1;
    updateUI("Let's Start Again");
    choiceButtons.forEach(btn => btn.disabled = false);
    playAgainBtn.style.display = 'none';
});

// ========== Modal: How to Play ==========
const howToPlayLink = document.getElementById('how-to-play-link');
const modal = document.getElementById('how-to-play-modal');
const closeModal = document.getElementById('close-modal');

// Show "How to Play" modal on link click
howToPlayLink.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
});

// Close "How to Play" modal on × click
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal if clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// ========== Modal: About ==========
const aboutLink = document.getElementById('about-link');
const aboutModal = document.getElementById('about-modal');
const closeAbout = document.getElementById('close-about');

// Show "About" modal on link click
aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    aboutModal.style.display = 'flex';
});

// Close "About" modal on × click
closeAbout.addEventListener('click', () => {
    aboutModal.style.display = 'none';
});

// Close modal if clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
        aboutModal.style.display = 'none';
    }
});
