let playerScore = 0;
let computerScore = 0;

function playRound(selection1, selection2) {
    if (selection1 === selection2)
        return 0;
    if (selection1 === 'rock') {
        if (selection2 === 'scissors')
            return 1;
        else
            return -1;
    }
    else if (selection1 === 'scissors') {
        if (selection2 === 'rock')
            return -1;
        else
            return 1;
    }
    else // if (selection1 === 'paper')
    {
        if (selection2 === 'rock')
            return 1;
        else
            return -1;
    }
}

function computerPlay() {
    let randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber == 0)
        return 'rock';
    else if (randomNumber == 1)
        return 'scissors';
    else
        return 'paper';
}

function toggleButton(isDisabled) {
    const buttons = document.querySelector('.buttons');
    buttons.childNodes.forEach(
        (button) => {
            button.disabled = isDisabled;
        }
    )
}

function reset() {
    playerScore = 0;
    computerScore = 0;
    document.querySelector('#playerScore').nextElementSibling.textContent = 0;
    document.querySelector('#computerScore').nextElementSibling.textContent = 0;
    document.querySelector('#announce').textContent = ' ';
    toggleButton(false);
}



const tryAgainButton = document.querySelector('#tryAgain');
tryAgainButton.addEventListener('click', () => {
    reset();
})

function game(playerSelection, computerSelection) {
    let playerScoreText = document.querySelector('#playerScore').nextElementSibling;
    let computerScoreText = document.querySelector('#computerScore').nextElementSibling;
    let announce = document.querySelector('#announce');

    let result = playRound(playerSelection, computerSelection);
    if (result > 0) {
        announce.textContent = `You win! ${playerSelection} beats ${computerSelection}`;
        ++playerScore;
        playerScoreText.textContent = playerScore;
    }
    else if (result < 0) {
        announce.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
        ++computerScore;
        computerScoreText.textContent = computerScore;
    }
    else {
        announce.textContent = 'Tie!!!';
    }

    if (playerScore == 5) {
        announce.textContent = 'Congratulations! You WIN the game!!!';
        toggleButton(true);
    }
    else if (computerScore == 5) {
        announce.textContent = 'GAME OVER! You lose!';
        toggleButton(true);
    }
}

const buttons = document.querySelector('.buttons');
buttons.childNodes.forEach((button) => {
    button.addEventListener('click', () => {
        let playerSelection = button.id;
        let computerSelection = computerPlay();
        game(playerSelection, computerSelection);
    });
});

window.addEventListener('keydown', function(e) 
{
    let clickedButton = document.querySelector(`button[data-key="${e.key}"]`);
    if (clickedButton.disabled == true) return;
    let playerSelection = clickedButton.id;
    if (playerSelection === 'tryAgain')
        reset();
    else
        game(playerSelection, computerPlay());

});