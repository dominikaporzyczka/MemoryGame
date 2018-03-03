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