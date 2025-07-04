let humanScore = 0;
let computerScore = 0;
let round = 1;
const maxRounds = 5;

const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const resultDisplay = document.getElementById('round-result');
const playAgainBtn = document.getElementById('play-again');
const choiceButtons = document.querySelectorAll('.choice-btn');

const getComputerChoice = () => {
    let num = Math.random();
    if (num < 1 / 3) return "rock";
    else if (num < 2 / 3) return "paper";
    else return "scissor";
};

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

const updateUI = (message) => {
    playerScoreDisplay.textContent = humanScore;
    computerScoreDisplay.textContent = computerScore;
    resultDisplay.textContent = `Round ${round}: ${message}`;
};

const endGame = () => {
    let finalMsg = "🤝 It's a draw!";
    if (humanScore > computerScore) finalMsg = "🎉 You won the game!";
    else if (humanScore < computerScore) finalMsg = "😢 You lost the game!";

    resultDisplay.textContent = `Game Over! ${finalMsg}`;
    choiceButtons.forEach(btn => btn.disabled = true);
    playAgainBtn.style.display = 'inline-block';
};

choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (round > maxRounds) return;

        const img = button.querySelector('img');
        const humanChoice = img.alt.toLowerCase();

        const result = playRound(humanChoice);
        updateUI(result);
        round++;

        if (round > maxRounds) {
            endGame();
        }
    });
});

playAgainBtn.addEventListener('click', () => {
    humanScore = 0;
    computerScore = 0;
    round = 1;
    updateUI("Round 1: Result");
    choiceButtons.forEach(btn => btn.disabled = false);
    playAgainBtn.style.display = 'none';
});
