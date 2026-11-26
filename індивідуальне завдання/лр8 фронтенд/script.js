let userName = "User";
let userScoreValue = 0;
let computerScoreValue = 0;
let gameOver = false;

let userNameLabel = document.getElementById('userNameLabel');
let userScore = document.getElementById('userScore');
let computerScore = document.getElementById('computerScore');
let userNumber = document.getElementById('userNumber');
let computerNumber = document.getElementById('computerNumber');
let generateBtn = document.getElementById('generateBtn');
let message = document.getElementById('message');
let resetBtn = document.getElementById('resetBtn');

function initGame() {
    let inputName = prompt("Введіть ваше ім'я:", "Гравець");
    
    if (inputName !== null) {
        inputName = inputName.trim();
        if (inputName !== "") {
            userName = inputName;
        }
    }
    userNameLabel.textContent = userName;
}

window.onload = initGame;

generateBtn.addEventListener('click', function() {
    if (gameOver) return;

    let uNum = Math.floor(Math.random() * 10) + 1;
    let cNum = Math.floor(Math.random() * 10) + 1;

    userNumber.textContent = uNum;
    computerNumber.textContent = cNum;

    if (uNum > cNum) {
        userScoreValue++;
        userScore.textContent = userScoreValue;
        message.textContent = `${userName} виграє цей раунд! (+1 бал)`;
        message.style.color = "#00b894";
    } else if (cNum > uNum) {
        computerScoreValue++;
        computerScore.textContent = computerScoreValue;
        message.textContent = `Комп'ютер виграє цей раунд! (+1 бал)`;
        message.style.color = "#d63031";
    } else {
        message.textContent = `Нічия у цьому раунді! Бали не нараховані.`;
        message.style.color = "#fdcb6e";
    }

    if (userScoreValue === 3 || computerScoreValue === 3) {
        gameOver = true;
        generateBtn.disabled = true;
        resetBtn.style.display = "block";

        if (userScoreValue === 3) {
            message.textContent = ` Вітаємо, ${userName}! Ви перемогли у матчі!`;
            message.style.color = "#00b894";
        } else {
            message.textContent = ` Комп'ютер переміг у матчі! Спробуйте ще раз.`;
            message.style.color = "#d63031";
        }
    }
});

resetBtn.addEventListener('click', function() {
    userScoreValue = 0;
    computerScoreValue = 0;
    gameOver = false;
    
    userScore.textContent = "0";
    computerScore.textContent = "0";
    userNumber.textContent = "?";
    computerNumber.textContent = "?";
    
    message.textContent = "Нова гра розпочалась! Тисніть Generate.";
    message.style.color = "#0984e3";
    
    generateBtn.disabled = false;
    resetBtn.style.display = "none";
});