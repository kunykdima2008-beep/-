const IMAGES = ['🍎', '🍐', '🍋', '🍑', '🍒'];

let currentAttempt = 1;
const maxAttempts = 3;
let userName = '';

const userNameEl = document.getElementById('user-name');
const attemptsEl = document.getElementById('attempts-info');
const generateBtn = document.getElementById('generate-btn');
const messageEl = document.getElementById('message');

function initGame() {
    while (!userName || userName.trim() === '') {
        userName = prompt('Будь ласка, введіть ваше ім’я:');
        if (userName === null) {
            userName = 'Гравець'; // Дефолтное имя, если пользователь нажал Отмена
        } else {
            userName = userName.trim();
        }
    }
    userNameEl.textContent = userName;
    updateAttemptsText();
}

function updateAttemptsText() {
    attemptsEl.textContent = `Спроба ${currentAttempt} з ${maxAttempts}`;
}

// Перешифровка (Fisher-Yates shuffle) для гарантированной неповторяемости в колонке
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function generateGrid() {
    const gridData = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    for (let col = 0; col < 3; col++) {
        // Перемешиваем список картинок и берем первые 3 уникальные
        const shuffledImages = shuffle(IMAGES);
        for (let row = 0; row < 3; row++) {
            gridData[row][col] = shuffledImages[row];
        }
    }

    return gridData;
}

function renderGrid(gridData) {
    let index = 0;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.getElementById(`c${index}`);
            cell.textContent = gridData[row][col];
            index++;
        }
    }
}

function checkWin(gridData) {
    for (let row = 0; row < 3; row++) {
        if (
            gridData[row][0] === gridData[row][1] &&
            gridData[row][1] === gridData[row][2]
        ) {
            return true;
        }
    }
    return false;
}

generateBtn.addEventListener('click', () => {
    if (currentAttempt > maxAttempts) return;

    const gridData = generateGrid();
    renderGrid(gridData);

    const isWin = checkWin(gridData);

    if (isWin) {
        messageEl.textContent = `Вітаємо, ${userName}! Ви виграли! 🎉`;
        messageEl.className = 'message win';
        generateBtn.disabled = true;
        return;
    }

    if (currentAttempt === maxAttempts) {
        messageEl.textContent = `На жаль, ${userName}, спроби вичерпано. Ви програли. ❌`;
        messageEl.className = 'message lose';
        generateBtn.disabled = true;
    } else {
        currentAttempt++;
        updateAttemptsText();
    }
});

window.addEventListener('DOMContentLoaded', initGame);