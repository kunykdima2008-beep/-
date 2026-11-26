let DECK = [
    { name: '6', points: 6 },
    { name: '7', points: 7 },
    { name: '8', points: 8 },
    { name: '9', points: 9 },
    { name: '10', points: 10 },
    { name: 'J', fullName: 'Валет', points: 2 },
    { name: 'Q', fullName: 'Дама', points: 3 },
    { name: 'K', fullName: 'Король', points: 4 },
    { name: 'A', fullName: 'Туз', points: 11 }
];

let SUITS = [
    { symbol: '♠', color: 'black' },
    { symbol: '♣', color: 'black' },
    { symbol: '♥', color: 'red' },
    { symbol: '♦', color: 'red' }
];

let userName = "User";
let userTotalScore = 0;
let computerTotalScore = 0;
let currentAttempt = 0;
let maxAttempts = 3;

let userNameLabel = document.getElementById('user-name-label');
let userScoreElem = document.getElementById('user-score');
let computerScoreElem = document.getElementById('computer-score');
let attemptLabel = document.getElementById('attempt-label');
let btnGenerate = document.getElementById('btn-generate');
let resultMessage = document.getElementById('result-message');
let btnReset = document.getElementById('btn-reset');

let userCardElem = document.getElementById('user-card');
let computerCardElem = document.getElementById('computer-card');

function initGame() {
    let inputName = prompt("Введіть ваше ім'я:", "User");
    
    if (inputName !== null && inputName.trim() !== "") {
        userName = inputName.trim();
    } else {
        userName = "Гравець";
    }
    
    userNameLabel.textContent = userName;
    updateAttemptLabel();
}

function updateAttemptLabel() {
    attemptLabel.textContent = `Спроба ${currentAttempt} з ${maxAttempts}`;
}

function getRandomCard() {
    let cardObj = DECK[Math.floor(Math.random() * DECK.length)];
    let suitObj = SUITS[Math.floor(Math.random() * SUITS.length)];
    return { ...cardObj, suit: suitObj.symbol, color: suitObj.color };
}

function renderCard(cardElement, cardData) {
    cardElement.style.visibility = 'visible';
    
    cardElement.classList.remove('red', 'black');
    cardElement.classList.add(cardData.color);

    if (cardData.color === 'red') {
        cardElement.style.borderColor = '#d63031';
    } else {
        cardElement.style.borderColor = '#2d3436';
    }

    let randomRotation = (Math.random() * 6 - 3).toFixed(1);
    cardElement.style.transform = `rotate(${randomRotation}deg) scale(1.03)`;
    setTimeout(() => {
        cardElement.style.transform = `rotate(0deg) scale(1)`;
    }, 200);

    let values = cardElement.querySelectorAll('.card-value');
    let suits = cardElement.querySelectorAll('.card-suit');

    values.forEach(v => v.textContent = cardData.name);
    suits.forEach(s => s.textContent = cardData.suit);
}

btnGenerate.addEventListener('click', () => {
    if (currentAttempt >= maxAttempts) return;

    currentAttempt++;
    updateAttemptLabel();

    let userCard = getRandomCard();
    let computerCard = getRandomCard();

    userTotalScore += userCard.points;
    computerTotalScore += computerCard.points;

    renderCard(userCardElem, userCard);
    renderCard(computerCardElem, computerCard);

    userScoreElem.textContent = userTotalScore;
    computerScoreElem.textContent = computerTotalScore;

    highlightScore(userScoreElem);
    highlightScore(computerScoreElem);

    if (currentAttempt === maxAttempts) {
        endGame();
    }
});

function highlightScore(elem) {
    elem.style.transform = 'scale(1.15)';
    elem.style.backgroundColor = '#f1c40f';
    setTimeout(() => {
        elem.style.transform = 'scale(1)';
        elem.style.backgroundColor = '#00a8ff';
    }, 300);
}

function endGame() {
    btnGenerate.disabled = true;
    btnGenerate.style.opacity = '0.6';
    
    resultMessage.style.display = 'block';
    btnReset.style.display = 'inline-block';

    if (userTotalScore > computerTotalScore) {
        resultMessage.textContent = ` Переміг ${userName}! (${userTotalScore} проти ${computerTotalScore})`;
        resultMessage.style.backgroundColor = '#d4edda';
        resultMessage.style.color = '#155724';
        resultMessage.style.border = '1px solid #c3e6cb';
    } else if (computerTotalScore > userTotalScore) {
        resultMessage.textContent = ` Переміг Computer! (${computerTotalScore} проти ${userTotalScore})`;
        resultMessage.style.backgroundColor = '#f8d7da';
        resultMessage.style.color = '#721c24';
        resultMessage.style.border = '1px solid #f5c6cb';
    } else {
        resultMessage.textContent = ` Нічия! (${userTotalScore} : ${computerTotalScore})`;
        resultMessage.style.backgroundColor = '#fff3cd';
        resultMessage.style.color = '#856404';
        resultMessage.style.border = '1px solid #ffeeba';
    }
}

window.onload = initGame;