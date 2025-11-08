const symbols = [
    '⭐', 
    '😉​', 
    '​❤️', 
    '🔥', 
    '🏠', 
    '🌳', 
    '👑', 
    '🎃'
];
const cards = [...symbols, ...symbols];

let matchedCards = [];
let flippedCards = [];

// Shuffle function using Lodash
const shuffleCards = (array) => _.shuffle(array);

// Initialize game fuction to set up the memory game
const initializeGame = () => {
    const board = document.getElementById('game-container');
    const shuffledCards = shuffleCards(cards);
    // Use map function to create the values for the cards
    const cardElements = shuffledCards.map((value) => createCard(value));
    // Append the values
    cardElements.forEach(card => board.appendChild(card));
};

// Create the elements for the cards
const createCard = (value) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    
    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('back');
    cardBack.textContent = value;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    
    card.addEventListener('click', flipCard);
    return card;
};

// Check fuction to verify the pairing matches
const checkMatchingPairs = () => {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedCards.push(firstCard, secondCard);
    } else {
        [firstCard, secondCard].forEach(card => {
            card.classList.remove('flipped');
        });
    }
    
    flippedCards = [];
    
};

// Function to flip the card
const flipCard = (event) => {
    const card = event.currentTarget;
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
        card.classList.add('flipped');
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            setTimeout(checkMatchingPairs, 500);
        }
    }
};

// Initialize the game, use try/catch in case an unexpected error ocurrs
try {
    initializeGame();
} catch (error) {
    console.error('An error has ocurred', error);
}

