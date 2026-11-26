document.addEventListener('DOMContentLoaded', () => {
    let cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';

    let inputWrapper = document.createElement('div');
    inputWrapper.className = 'input-wrapper';

    let input = document.createElement('input');
    input.type = 'text';
    input.className = 'question-input';

    let errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(errorMsg);

    let ball = document.createElement('div');
    ball.className = 'ball-container';

    let answerText = document.createElement('div');
    answerText.className = 'answer-text';
    answerText.textContent = 'Yes';

    ball.appendChild(answerText);

    cardContainer.appendChild(inputWrapper);
    cardContainer.appendChild(ball);

    document.body.appendChild(cardContainer);

    let answers = [
        'Yes', 'No', 'Ask again', 'Definite', 
        'Maybe', 'Never', 'Outlook good', 'Signs point to yes'
    ];

    let getPrediction = function() {
        let query = input.value.trim();

        if (!query) {
            showError('Будь ласка, введіть запитання!');
            return;
        }

        if (query.length < 3) {
            showError('Запитання занадто коротке!');
            return;
        }

        hideError();

        if (!ball.classList.contains('shaking')) {
            ball.classList.add('shaking');
            answerText.style.opacity = '0';

            setTimeout(() => {
                let randomIndex = Math.floor(Math.random() * answers.length);
                answerText.textContent = answers[randomIndex];
                answerText.style.opacity = '1';
                ball.classList.remove('shaking');
            }, 500);
        }
    };

    let showError = function(msg) {
        errorMsg.textContent = msg;
        errorMsg.classList.add('visible');
        input.style.borderColor = '#ff5555';
    };

    let hideError = function() {
        errorMsg.textContent = '';
        errorMsg.classList.remove('visible');
        input.style.borderColor = '#b8a3e0';
    };

    ball.addEventListener('click', getPrediction);

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            getPrediction();
        }
    });

    input.addEventListener('input', () => {
        if (input.value.trim().length > 0) {
            hideError();
        }
    });
});