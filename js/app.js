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

function prepareBoard() {
    const cards = [...basicSet, ...basicSet];
    shuffle(cards);

    return cards;
}

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

    boardHTML = document.querySelectorAll('.card');
}

function reverseCard(index, card) {
    card.classList.add('open');
    matchingCards(index, card);
}

function addEventListenerForCards() {
    for (let i = 0; i < boardHTML.length; i++) {
        boardHTML[i].addEventListener('click', function () {
            if (allowClick) {
                reverseCard(i, boardHTML[i]);
            }

            if (!startTime) {
                startTime = new Date();
            }
        });
    }
}

function matchingCards(index, card) {
    if (openCardIndex >= 0 && openCardIndex !== index) {

        if (board[openCardIndex] === board[index]) {
            animateCorrectCards(card);
            updateMoveCounter();
            countTheNumberOfCardPairs();
        } else {
            allowClick = false;
            animateWrongCards(card);
            updateMoveCounter();
        }
    } else {
        openCardIndex = index;
    }
}

function animateCorrectCards(card) {
    const matchAnimate = 'rubberBand';
    setTimeout(function () {
        boardHTML[openCardIndex].classList.add('match', 'animated', matchAnimate);
        card.classList.add('match', 'animated', matchAnimate);
        openCardIndex = -1;
    }, 300);
}

function animateWrongCards(card) {
    const wrongAnimate = 'jello';
    setTimeout(function () {
        boardHTML[openCardIndex].classList.add('animated', wrongAnimate, 'wrong-match');
        card.classList.add('animated', wrongAnimate, 'wrong-match');
    }, 300);
    setTimeout(function () {
        boardHTML[openCardIndex].classList.remove('animated', wrongAnimate);
        card.classList.remove('animated', wrongAnimate);
    }, 700);
    setTimeout(function () {
        boardHTML[openCardIndex].classList.remove('open', 'wrong-match');
        card.classList.remove('open', 'wrong-match');
        openCardIndex = -1;
        allowClick = true;
    }, 900);
}

function updateMoveCounter(reset = false) {
    if (reset) {
        moveCounter = 0;
    } else {
        moveCounter += 1;
    }

    moves.textContent = moveCounter;
    disableStars();
}

function disableStars() {
    if (moveCounter === 16) {
        stars[2].classList.add('disable');
        starsCounter -= 1;
    } else if (moveCounter === 25) {
        stars[1].classList.add('disable');
        starsCounter -= 1;
    }
}

function enableStars() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].classList.remove('disable');
    }

    starsCounter = 3;
}

function countTheNumberOfCardPairs(reset = false) {
    if (reset) {
        pairsCounter = 0;
    } else {
        pairsCounter += 1;

        if (pairsCounter === 8) {
            endTime = new Date();
            showTheWinningMessage();
        }
    }
}

function showTheWinningMessage() {
    setTimeout(function () {
        winningMessage.classList.add('enable');
        gameBoard.classList.add('disable');

        movesFinalResult.textContent = moveCounter;
        numberOfStars.textContent = starsCounter;
        timeOfTheGame.textContent = calcTime(startTime, endTime);
    }, 400);
}

function hideTheWinningMessage() {
    winningMessage.classList.remove('enable');
    gameBoard.classList.remove('disable');
}

function setUpGame() {
    board = prepareBoard();
    startTime = null;
    //reset index
    openCardIndex = -1;
    prepareHTML(board, deck);
    addEventListenerForCards();
    updateMoveCounter(true);
    enableStars();
    countTheNumberOfCardPairs(true);
    hideTheWinningMessage();
}

for (let i = 0; i < restartBtn.length; i++) {
    restartBtn[i].addEventListener('click', setUpGame);
}

setUpGame();