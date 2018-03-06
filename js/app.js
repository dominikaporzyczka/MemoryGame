const deck = document.querySelector('#deck');
const restartBtn = document.querySelectorAll('.restart');
const moves = document.querySelector('#moves');
const stars = document.querySelectorAll('.stars li');
const gameBoard = document.querySelector('#container');
const winningMessage = document.querySelector('#winning-message');
const movesFinalResult = document.querySelector('.moves-final-result');
const numberOfStars = document.querySelector('.number-of-stars');
const timeOfTheGame = document.querySelector('.time-of-the-game');
let boardHTML;
let board;
let openCardIndex = -1;
let allowClick = true;
let moveCounter = 0;
let pairsCounter = 0;
let starsCounter = 3;
let startTime, endTime;

const basicSet = [
    '<i class="far fa-gem icon"></i>',
    '<i class="far fa-paper-plane icon"></i>',
    '<i class="fas fa-anchor icon"></i>',
    '<i class="fas fa-bomb icon"></i>',
    '<i class="fas fa-paw icon"></i>',
    '<i class="fas fa-bolt icon"></i>',
    '<i class="fas fa-cube icon"></i>',
    '<i class="fas fa-leaf icon"></i>'
];

/**
 * @description Prepares board of cards by doubling basicSet array
 * @returns {array} Array with cards
 */
function prepareBoard() {
    const cards = [...basicSet, ...basicSet];
    // function from tools.js
    shuffle(cards);

    return cards;
}

/**
 * @description Prepares HTML elements coresponding to the cards and append them to the container
 * @param {array} board - The array with cards
 * @param {Element} container - The element containing board with cards
 */
function prepareHTML(board, container) {
    const listOfCard = document.createDocumentFragment();

    for (let i = 0; i < board.length; i++) {
        const newCard = document.createElement('li');
        newCard.classList.add('card');
        newCard.innerHTML = board[i];

        listOfCard.appendChild(newCard);
    }

    container.innerHTML = "";
    container.appendChild(listOfCard);
    // assigning created elements with 'card' class to variable
    boardHTML = document.querySelectorAll('.card');
}

/**
 * @description Reverses card by adding a class 'open' and call the matchingCards function
 * @param {number} index - index of clicked card
 * @param {Node} card - clicked card
 */
function reverseCard(index, card) {
    card.classList.add('open');
    matchingCards(index, card);
}

/**
 * @description Adds click event listeners for all cards
 */
function addEventListenerForCards() {
    // iterating through NodeList of cards
    for (let i = 0; i < boardHTML.length; i++) {
        boardHTML[i].addEventListener('click', function () {
            if (allowClick) {
                reverseCard(i, boardHTML[i]);
            }
            // start measuring time if it is the first click in the game
            if (!startTime) {
                startTime = new Date();
            }
        });
    }
}

/**
 * @description Compares two reversed card
 * @param  {number} index - index of clicked card
 * @param  {Node} card - clicked card
 */
function matchingCards(index, card) {
    // the condition is met if the first card is already clicked and it is not the same card
    if (openCardIndex >= 0 && openCardIndex !== index) {
        // if cards match
        if (board[openCardIndex] === board[index]) {
            animateCorrectCards(card);
            updateMoveCounter();
            countTheNumberOfCardPairs();
        } else {  // if cards do not match
            allowClick = false;
            animateWrongCards(card);
            updateMoveCounter();
        }
    } else { // assigns the index of the first clicked card
        openCardIndex = index;
    }
}

/**
 * @description Animates matched cards
 * @param  {Node} card - clicked card 
 */
function animateCorrectCards(card) {
    const matchAnimate = 'rubberBand';
    // add animation after reverse cards
    setTimeout(function () {
        boardHTML[openCardIndex].classList.add('match', 'animated', matchAnimate);
        card.classList.add('match', 'animated', matchAnimate);
        // reset index
        openCardIndex = -1;
    }, 300);
}

/**
 * @description Animates mismatched cards
 * @param  {Node} card - clicked card 
 */
function animateWrongCards(card) {
    const wrongAnimate = 'jello';
    // add animation after reverse cards
    setTimeout(function () {
        boardHTML[openCardIndex].classList.add('animated', wrongAnimate, 'wrong-match');
        card.classList.add('animated', wrongAnimate, 'wrong-match');
    }, 300);

    // remove animation
    setTimeout(function () {
        boardHTML[openCardIndex].classList.remove('animated', wrongAnimate);
        card.classList.remove('animated', wrongAnimate);
    }, 700);

    // reverse cards
    setTimeout(function () {
        boardHTML[openCardIndex].classList.remove('open', 'wrong-match');
        card.classList.remove('open', 'wrong-match');
        // reset index
        openCardIndex = -1;
        allowClick = true;
    }, 900);
}
/**
 * @description Updates move counter and call disableStars function
 * @param  {boolean} reset=false (true means start new game)
 */
function updateMoveCounter(reset = false) {
    moveCounter = reset ? 0 : moveCounter += 1;
    moves.textContent = moveCounter;
    disableStars();
}

/**
 * @description Disables stars after specific number of moves
 */
function disableStars() {
    if (moveCounter === 16) {
        stars[2].classList.add('disable');
        starsCounter -= 1;
    } else if (moveCounter === 25) {
        stars[1].classList.add('disable');
        starsCounter -= 1;
    }
}

/**
 * @description Enables all stars
 */
function enableStars() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].classList.remove('disable');
    }
    // reset stars counter
    starsCounter = 3;
}

/**
 * @description Counts the number of card pairs and checks if they are all already
 * @param  {boolean} reset=false (true means start new game)
 */
function countTheNumberOfCardPairs(reset = false) {
    if (reset) {
        pairsCounter = 0;
    } else {
        pairsCounter += 1;
        if (pairsCounter === 8) {
            // end measuring time when game is finish
            endTime = new Date();
            showTheWinningMessage();
        }
    }
}

/**
 * @description Shows the winning message with final results
 */
function showTheWinningMessage() {
    setTimeout(function () {
        winningMessage.classList.add('enable');
        gameBoard.classList.add('disable');

        movesFinalResult.textContent = moveCounter;
        numberOfStars.textContent = starsCounter;
        // function from tools.js
        timeOfTheGame.textContent = calcTime(startTime, endTime);
    }, 400);
}

/**
 * @description Hides the winning message and displays the game board
 */
function hideTheWinningMessage() {
    winningMessage.classList.remove('enable');
    gameBoard.classList.remove('disable');
}

/**
 * @description Sets up game
 */
function setUpGame() {
    board = prepareBoard();
    // reset time
    startTime = null;
    prepareHTML(board, deck);
    addEventListenerForCards();
    updateMoveCounter(true);
    enableStars();
    countTheNumberOfCardPairs(true);
    hideTheWinningMessage();
}

// add click event listeners for restart game button
for (let i = 0; i < restartBtn.length; i++) {
    restartBtn[i].addEventListener('click', setUpGame);
}

setUpGame();