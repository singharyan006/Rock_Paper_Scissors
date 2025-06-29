
// Printing a Welcome Message
console.log(`Hello and Welcome to the game!!`);

//Function to randomly generate computer's choice
const getComputerChoice = () => {
    let num = Math.random(); //generating a random number
    if (num < 1 / 3) {
        return "rock"; // first third : rock 
    }
    else if (num < 2 / 3) {
        return "paper"; // second third : paper
    }
    else {
        return "scissor"; // last third : scissor
    }
};

// Function to get Human's choice via prompt and validate it
const getHumanChoice = () => {
    let input;

    // Keep prompting the user until a valid input is received
    while (true) {
        // Prompt the user for input and convert it to lowercase for uniformity
        input = prompt("Enter your choice ['Rock', 'Paper', 'Scissor']").toLowerCase();

        // Check if the input is one of the valid choices
        if (["rock", "paper", "scissor"].includes(input)) {
            return input;
        }

        // If input is invalid, alert the user and repeat the loop
        alert("Invalid input! Please enter Rock, Paper, or Scissor.");
    }
}

// Initialsing scores for both the players
let humanScore = 0;
let computerScore = 0;

// Function to play a single round of the game
const playRound = () => {
    // getting and tackling case sensitivity of user's input by converting to lower case
    let humanSelection = getHumanChoice();
    // getting computer's choice
    let computerSelection = getComputerChoice();

    // Check for a tie
    if (humanSelection === computerSelection) {
        return "It's a tie!";
    }
    // User's winning cases 
    else if (
        (humanSelection === "rock" && computerSelection === "scissor") ||
        (humanSelection === "paper" && computerSelection === "rock") ||
        (humanSelection === "scissor" && computerSelection === "paper")
    ) {
        humanScore++; // Increment user's score
        return `You win! ${humanSelection} beats ${computerSelection}`;
    }

    // Otherwise, the computer wins
    else {
        computerScore++; // Increment computer's score
        return `You lose! ${computerSelection} beats ${humanSelection}`;
    }
}

// Function to play the game for a given number of rounds
const playGame = (rounds) => {
    // Loop through the specified number of rounds
    for (let i = 0; i < rounds; i++) {
        // Play a round and display the result for each round
        console.log(`Round ${i + 1}:`, playRound());
    }

    // Print the final scores after all rounds are completed
    console.log(`\nFinal Scores:
    ${userName}: ${humanScore}
    Computer: ${computerScore}`);

    // Announce the overall winner or if it's a draw
    if (humanScore > computerScore) {
        console.log("🎉 You won the game!");
    }
    else if (humanScore < computerScore) {
        console.log("😢 You lost the game!");
    } else {
        console.log("🤝 It's a draw!");
    }
}


console.log(playGame(5));


