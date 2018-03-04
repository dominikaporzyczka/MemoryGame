const deck = document.querySelector('#deck');
const restartBtn = document.querySelector('.restart');
const moves = document.querySelector('#moves');
let boardHTML;
let board;
let openCardIndex = -1;
let allowClick = true;
let moveCounter = 0;

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
        });
    }
}

function matchingCards(index, card) {
    if (openCardIndex >= 0 && openCardIndex !== index) {

        if (board[openCardIndex] === board[index]) {
            boardHTML[openCardIndex].classList.add("match");
            card.classList.add("match");

            openCardIndex = -1;

            updateMoveCounter();
        } else {
            allowClick = false;

            setTimeout(function () {
                boardHTML[openCardIndex].classList.remove("open");
                card.classList.remove("open");
                openCardIndex = -1;

                allowClick = true;
            }, 800);

            updateMoveCounter();
        }
    } else {
        openCardIndex = index;
    }
}

function updateMoveCounter(reset = false) {
    if (reset) {
        moveCounter = 0;
    } else {
        moveCounter += 1;
    }

    moves.textContent = moveCounter;
}

function setUpGame() {
    board = prepareBoard();
    prepareHTML(board, deck);
    addEventListenerForCards();
    updateMoveCounter(true);
}

setUpGame();
restartBtn.addEventListener('click', setUpGame);