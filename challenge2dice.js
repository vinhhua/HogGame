/*
GAME WITH 2 DICE INSTEAD OF 1
*/


var scores, roundScore, activePlayer, gamePlaying;
const WIN_SCORE = 100;

init();

/*
    This part is the eventListener of the roll button.
    When the button is clicked, it will simulate the dice rolling and then will do some DOM manipulation to change
    all the attributes in HTML and change the round scores, add the score to the total scores decleared globally.
 */
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // Random number from 1 to 6
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // Display the result from dice
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // If the round score isn't 1 then add it to total
        if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});


/*
    eventListener for the Hold button. If the game is still going then will add the scores to
    the array of scores based on the currentPlayer, whether 0 or 1 in the round.
    And then do some DOM manipulation and display the dice, game status onto the browser.
    Also check for the winning condition and to switch state of player.
*/
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add the current player's score to the global score.
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = docuemnt.querySelector('.final-score').value;
        var winningScore;

        if (input) {
            winningScore = input;
        } else {
            winningScore = WIN_SCORE;
        }

        // Winning game condition check everytime a button hold is clicked.
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'YOU WON :)';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

/* 
    Check and switch between the current player, if 0 then switch to 1 and vice versa.
    Also take care of the DOM and display, toggle the panel of the player's sides.
*/
function nextPlayer() {
    // Switch between player.
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('dice-1').style.display = 'none';
    document.querySelector('dice-2').style.display = 'none';
}

/*
    Initializes all the global variables and this is where the state of the game starts.
*/
function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// If a new game button is clicked then restart the game.
document.querySelector('.btn-new').addEventListener('click', init);