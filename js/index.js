function FillBody() {
    const wrapper = document.createElement("div");
    wrapper.classList.add('wrapper');
    const gallow = document.createElement("div");
    gallow.classList.add('gallow');
    const img = document.createElement("img");
    img.src = '../img/gallows.svg';
    img.classList.add('gallowImg');
    const head = document.createElement("img");
    head.src = '../img/head.svg';
    head.classList.add('hangman');
    head.classList.add('head');
    const body = document.createElement("img");
    body.src = '../img/body.svg';
    body.classList.add('hangman');
    body.classList.add('body');
    const handLeft = document.createElement("img");
    handLeft.src = '../img/hand-one.svg';
    handLeft.classList.add('hangman');
    handLeft.classList.add('handLeft');
    const handRight = document.createElement("img");
    handRight.src = '../img/hand-two.svg';
    handRight.classList.add('hangman');
    handRight.classList.add('handRight');
    const legLeft = document.createElement("img");
    legLeft.src = '../img/leg-one.svg';
    legLeft.classList.add('hangman');
    legLeft.classList.add('legLeft');
    const legRight = document.createElement("img");
    legRight.src = '../img/leg-two.svg';
    legRight.classList.add('hangman');
    legRight.classList.add('legRight');
    const h1 = document.createElement("h1");
    h1.innerText = 'HANGMAN GAME';
    h1.classList.add('nameOfGame');
    const panel = document.createElement("div");
    panel.classList.add('panel');
    const word = document.createElement("ul");
    word.classList.add('word');
    const hint = document.createElement("h2");
    hint.classList.add('hint');
    const guesses = document.createElement("h2");
    guesses.classList.add('guesses');
    guesses.innerText = 'Incorrect guesses: ';
    const span = document.createElement("span");
    span.innerText = '0 / 6'
    const keyboard = document.createElement("div");
    keyboard.classList.add('keyboard');

    const bgModal = document.createElement("div");
    bgModal.classList.add('background_modal');
    const modal = document.createElement("div");
    modal.classList.add('modal');
    const resultText = document.createElement("h2");
    const correctWord = document.createElement("p");
    correctWord.innerText = 'The correct word: ';
    const correctWordSpan = document.createElement("span");
    const playAgainBtn = document.createElement("button");
    playAgainBtn.classList.add('playAgain');
    playAgainBtn.innerText = 'play again';

    wrapper.append(gallow);
    wrapper.append(panel);
    gallow.append(img);
    gallow.append(head);
    gallow.append(body);
    gallow.append(handLeft);
    gallow.append(handRight);
    gallow.append(legLeft);
    gallow.append(legRight);
    gallow.append(h1);
    panel.append(word);
    panel.append(hint);
    panel.append(guesses);
    panel.append(keyboard);
    guesses.append(span);

    bgModal.append(modal);
    modal.append(resultText);
    modal.append(correctWord);
    correctWord.append(correctWordSpan);
    modal.append(playAgainBtn);

    for (let i = 97; i <= 122; i++) {
        const btn = document.createElement("button");
        btn.innerText = String.fromCharCode(i);
        keyboard.append(btn);
        btn.addEventListener("click", (event) => OpenWord(event.target, String.fromCharCode(i)));
    }

    document.body.append(wrapper);
    document.body.append(bgModal);
}

let currentWord = '';
let guesses = 0;
let quessedLetters = [];
let pickedLetters = [];
let keys = {};

function RandomWord() {
    const currentWordAndHint = words[Math.floor(Math.random() * words.length)];
    currentWord = currentWordAndHint.word;
    console.log(currentWord);
    document.querySelector('.word').innerHTML = currentWordAndHint.word.split('').map(() => `<li class="letter"></li>`).join('');
    document.querySelector('.hint').innerText = `Hint: ${currentWordAndHint.hint}`;
}

function OpenWord(target, letter) {
    if (currentWord.includes(letter)) {
        currentWord.split('').forEach((currentLetter, index) => {
            if (currentLetter === letter) {
                quessedLetters.push(letter);
                document.querySelectorAll('li')[index].innerText = currentLetter;
                document.querySelectorAll('li')[index].classList.add('guessed');
            }
        });
        if (currentWord.length === quessedLetters.length) {
            GetResultOfGame(true, currentWord);
        }
    }
    else {
        guesses++;
        document.querySelector('.guesses span').innerText = `${guesses} / 6`;
        ChangeHangman(guesses);
        if (guesses === 6) {
            GetResultOfGame(false, currentWord);
        }
    }
    pickedLetters.push(letter);
    target.disabled = true;
}

function OpenWordKeyboard(letter) {
    if (currentWord.includes(letter)) {
        currentWord.split('').forEach((currentLetter, index) => {
            if (currentLetter === letter) {
                quessedLetters.push(letter);
                document.querySelectorAll('li')[index].innerText = currentLetter;
                document.querySelectorAll('li')[index].classList.add('guessed');
            }
        });
        if (currentWord.length === quessedLetters.length) {
            GetResultOfGame(true, currentWord);
        }
    }
    else {
        guesses++;
        document.querySelector('.guesses span').innerText = `${guesses} / 6`;
        ChangeHangman(guesses);
        if (guesses === 6) {
            GetResultOfGame(false, currentWord);
        }
    }
}

function ChangeHangman(guesses) {
    switch (guesses) {
        case 1:
            document.querySelector('.head').classList.add('showed');
            break;
        case 2:
            document.querySelector('.body').classList.add('showed');
            break;
        case 3:
            document.querySelector('.handLeft').classList.add('showed');
            break;
        case 4:
            document.querySelector('.handRight').classList.add('showed');
            break;
        case 5:
            document.querySelector('.legLeft').classList.add('showed');
            break;
        case 6:
            document.querySelector('.legRight').classList.add('showed');
            break;
    }
}

function GetResultOfGame(result, word) {
    if (result === true) {
        document.querySelector('.modal h2').innerText = 'You Won!';
    }
    else {
        document.querySelector('.modal h2').innerText = 'Game Over!';
    }
    document.querySelector('.modal p span').innerText = word;
    document.querySelector('.keyboard').classList.add('disabled');
    setTimeout(() => {
        document.querySelector('.background_modal').classList.add('opened');
    }, 400)
}

function PlayAgain() {
    guesses = 0;
    quessedLetters = [];
    pickedLetters = [];
    keys = {};
    document.querySelector('.head').classList.remove('showed');
    document.querySelector('.body').classList.remove('showed');
    document.querySelector('.handLeft').classList.remove('showed');
    document.querySelector('.handRight').classList.remove('showed');
    document.querySelector('.legLeft').classList.remove('showed');
    document.querySelector('.legRight').classList.remove('showed');
    document.querySelector('.guesses span').innerText = `${guesses} / 6`;
    document.querySelector('.keyboard').classList.remove('disabled');
    document.querySelector('.keyboard').querySelectorAll('button').forEach((button) => button.disabled = false);
    RandomWord();
    document.querySelector('.background_modal').classList.remove('opened');
}

FillBody();
RandomWord();

document.addEventListener("keydown", (event) => {
    let key = event.key.toLowerCase();
    if (!keys[key] && /^[a-z]$/.test(key) && !pickedLetters.includes(key) && !document.querySelector('.keyboard').classList.contains('disabled')) {
        OpenWordKeyboard(key);
        document.querySelectorAll('.keyboard button').forEach((button) => {
            if (button.textContent === key) {
                button.disabled = true;
            }
        });
    }
    keys[key] = true;
});

document.querySelector('.modal button').addEventListener("click", PlayAgain);