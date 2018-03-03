const container = document.querySelector('#container');

const basicSet = [
    '<i class="far fa-gem"></i>',
    '<i class="far fa-paper-plane"></i>',
    '<i class="fas fa-anchor"></i>',
    '<i class="fas fa-bomb"></i>',
    '<i class="fas fa-paw"></i>',
    '<i class="fas fa-bolt"></i>',
    '<i class="fas fa-cube"></i>',
    '<i class="fas fa-leaf"></i>'
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
        newCard.innerHTML = board[i];

        listOfCard.appendChild(newCard);
    }

    container.appendChild(listOfCard);
}