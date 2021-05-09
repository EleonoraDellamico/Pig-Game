'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let playing = true;

const init = function() {
	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;
	player0El.classList.remove('player--winner');
	player1El.classList.remove('player--winner');
	player0El.classList.add('player--activer');
	player1El.classList.remove('player--winner');
};

const scores = [ 0, 0 ]; // to store the scores
let currentScore = 0;
let activePlayer = 0;

const switchPlayer = function() {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0El.classList.toggle('player--active');
	player1El.classList.toggle('player--active');
};

//Rolldice
const rollDice = function() {
	if (playing) {
		//1. generating a random dice roll
		const dice = Math.trunc(Math.random() * 6) + 1;
		//console.log(dice);
		//2. dispaly the dice
		diceEl.classList.remove('hidden');
		diceEl.src = `dice-${dice}.png`;
		//3. checked for roll 1: if true switch for the next player
		if (dice !== 1) {
			// add dice to the current score
			currentScore += dice;
			// we have to define the active player
			document.getElementById(`current--${activePlayer}`).textContent = currentScore;
		} else {
			// switch to next player
			switchPlayer();
		}
	}
};

//Rolling the dice functionality
btnRoll.addEventListener('click', rollDice);

//Hold the result

btnHold.addEventListener('click', function() {
	if (playing) {
		//1.add current score
		scores[activePlayer] += currentScore;
		//console.log(scores[activePlayer]);
		// scores[1] = scores[1] + currentScore
		document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
		//2.check if score is 100
		if (scores[activePlayer] >= 20) {
			//finish game
			playing = false;
			diceEl.classList.add('hidden');
			document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
			document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
		} else {
			//switch to teh mnext player
			switchPlayer();
		}
	}
});
//reseting the game
btnNew.addEventListener('click', function() {
	init();
	/* 	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;
	player0El.classList.remove('player--winner');
	player1El.classList.remove('player--winner');
	player0El.classList.add('player--activer');
	player1El.classList.remove('player--winner'); */
	/* document.getElementById(`current--${activePlayer}`).textContent = 0;
	document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
	document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
	document.getElementById(`score--${activePlayer}`).textContent = 0;
	diceEl.classList.add('hidden'); */
	if (!playing) {
		rollDice();
	}
});
