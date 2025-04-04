'use strict';

let numbers = [1, 3, 6, 8, 11, 13, 16, 18, 1, 4, 6, 9, 11, 14, 16, 19, 2, 4, 7, 9, 12, 14, 17, 19, 2, 5, 7, 10, 12, 15, 17, 20, 3, 5, 8, 10, 13, 15, 18, 20];
let shuffledNumbers = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createGrid() {
    const grid = document.querySelector('.grid');
    grid.innerHTML = '';
    shuffledNumbers = shuffle([...numbers]);

    shuffledNumbers.forEach((number, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.dataset.index = index;
        card.dataset.value = number;
        card.addEventListener('click', handleCardClick);
        grid.appendChild(card);
    });
}

function handleCardClick(event) {
    if (lockBoard) return;
    const clickedCard = event.target;

    if (!clickedCard.classList.contains('hidden') || clickedCard === firstCard) return;

    clickedCard.textContent = clickedCard.dataset.value;
    clickedCard.classList.remove('hidden');

    if (!firstCard) {
        firstCard = clickedCard;
        return;
    }

    secondCard = clickedCard;
    lockBoard = true;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    } else {
        setTimeout(() => {
            firstCard.classList.add('hidden');
            firstCard.textContent = '';
            secondCard.classList.add('hidden');
            secondCard.textContent = '';
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, 1000);
    }
}

function initGame() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    createGrid();
}

initGame();