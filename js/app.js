const game = {
    board: null,
    openCardIndex: -1,
    allowClick: true,
    moveCounter: 0,
    pairsCounter: 0,
    starsCounter: 3,
    timeCounter: 0,
    timeInterval: null,

    ui: {
        boardHTML: null,
        deck: document.querySelector('#deck'),
        restartBtn: document.querySelectorAll('.restart'),
        moves: document.querySelector('#moves'),
        stars: document.querySelectorAll('.stars li'),
        gameBoard: document.querySelector('#container'),
        winningMessage: document.querySelector('#winning-message'),
        movesFinalResult: document.querySelector('.moves-final-result'),
        numberOfStars: document.querySelector('.number-of-stars'),
        timeOfTheGame: document.querySelector('.time-of-the-game'),
        displayedTime: document.querySelector('#displayed-time')
    }
}

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
    game.boardHTML = document.querySelectorAll('.card');
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
    for (let i = 0; i < game.boardHTML.length; i++) {
        game.boardHTML[i].addEventListener('click', function () {
            if (game.allowClick) {
                reverseCard(i, game.boardHTML[i]);
            }

            if (!game.timeInterval) {
                game.timeInterval = setInterval(function () {
                    game.timeCounter += 1;
                    game.ui.displayedTime.textContent = game.timeCounter;
                }, 1000);
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
    if (game.openCardIndex >= 0 && game.openCardIndex !== index) {
        // if cards match
        if (game.board[game.openCardIndex] === game.board[index]) {
            animateCorrectCards(card);
            updateMoveCounter();
            countTheNumberOfCardPairs();
        } else {  // if cards do not match
            game.allowClick = false;
            animateWrongCards(card);
            updateMoveCounter();
        }
    } else { // assigns the index of the first clicked card
        game.openCardIndex = index;
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
        game.boardHTML[game.openCardIndex].classList.add('match', 'animated', matchAnimate);
        card.classList.add('match', 'animated', matchAnimate);
        // reset index
        game.openCardIndex = -1;
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
        game.boardHTML[game.openCardIndex].classList.add('animated', wrongAnimate, 'wrong-match');
        card.classList.add('animated', wrongAnimate, 'wrong-match');
    }, 300);

    // remove animation
    setTimeout(function () {
        game.boardHTML[game.openCardIndex].classList.remove('animated', wrongAnimate);
        card.classList.remove('animated', wrongAnimate);
    }, 700);

    // reverse cards
    setTimeout(function () {
        game.boardHTML[game.openCardIndex].classList.remove('open', 'wrong-match');
        card.classList.remove('open', 'wrong-match');
        // reset index
        game.openCardIndex = -1;
        game.allowClick = true;
    }, 900);
}

/**
 * @description Updates move counter and call disableStars function
 * @param  {boolean} reset=false (true means start new game)
 */
function updateMoveCounter(reset = false) {
    game.moveCounter = reset ? 0 : game.moveCounter + 1;
    game.ui.moves.textContent = game.moveCounter;
    disableStars();
}

/**
 * @description Disables stars after specific number of moves
 */
function disableStars() {
    if (game.moveCounter === 16) {
        game.ui.stars[2].classList.add('disable');
        game.starsCounter -= 1;
    } else if (game.moveCounter === 25) {
        game.ui.stars[1].classList.add('disable');
        game.starsCounter -= 1;
    }
}

/**
 * @description Enables all stars
 */
function enableStars() {
    for (let i = 0; i < game.ui.stars.length; i++) {
        game.ui.stars[i].classList.remove('disable');
    }
    // reset stars counter
    game.starsCounter = 3;
}

/**
 * @description Counts the number of card pairs and checks if they are all already
 * @param  {boolean} reset=false (true means start new game)
 */
function countTheNumberOfCardPairs(reset = false) {
    if (reset) {
        game.pairsCounter = 0;
    } else {
        game.pairsCounter += 1;
        if (game.pairsCounter === 8) {
            clearInterval(game.timeInterval);
            showTheWinningMessage();
        }
    }
}

/**
 * @description Shows the winning message with final results
 */
function showTheWinningMessage() {
    setTimeout(function () {
        game.ui.winningMessage.classList.add('enable');
        game.ui.gameBoard.classList.add('disable');

        game.ui.movesFinalResult.textContent = game.moveCounter;
        game.ui.numberOfStars.textContent = game.starsCounter;
        game.ui.timeOfTheGame.textContent = game.timeCounter;
    }, 400);
}

/**
 * @description Hides the winning message and displays the game board
 */
function hideTheWinningMessage() {
    game.ui.winningMessage.classList.remove('enable');
    game.ui.gameBoard.classList.remove('disable');
}

/**
 * @description Sets all basic variables to starting values
 */
function resetBasicVariables() {
    game.openCardIndex = -1;
    game.timeCounter = 0;
    clearInterval(game.timeInterval);
    game.timeInterval = null;
    game.ui.displayedTime.textContent = 0;
}

/**
 * @description Sets up game
 */
function setUpGame() {
    game.board = prepareBoard();
    resetBasicVariables();
    prepareHTML(game.board, game.ui.deck);
    addEventListenerForCards();
    updateMoveCounter(true);
    enableStars();
    countTheNumberOfCardPairs(true);
    hideTheWinningMessage();
}

// add click event listeners for restart game button
for (let i = 0; i < game.ui.restartBtn.length; i++) {
    game.ui.restartBtn[i].addEventListener('click', setUpGame);
}

setUpGame();