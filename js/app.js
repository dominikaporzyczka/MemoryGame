const container = document.querySelector('#container');
let board;

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
    const listOfCard = document.createElement('ul');
    listOfCard.classList.add('deck');

    for(let i = 0; i < board.length; i++) {
        const newCard = document.createElement('li');
        newCard.classList.add('card');
        newCard.innerHTML = board[i];
    
        listOfCard.appendChild(newCard);
    }

    container.appendChild(listOfCard);
}

function reverseCard(index, card) {
    card.classList.add('open');
}

function addEventListenerForCards() {
    const cards = document.querySelectorAll('.card');
    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function() {
            reverseCard(i, cards[i]);
        });
    }
}

function setUpGame() {
    board = prepareBoard();
    prepareHTML(board, container);
    addEventListenerForCards();
}

setUpGame();