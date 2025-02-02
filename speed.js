const typingText = document.querySelector('.typingText p');
const input = document.querySelector('.wrapper .inputFeild');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadPara() {
    const paragraph = ["He stepped gingerly onto the bridge knowing that enchantment awaited on the other side.",
        "Warm beer on a cold day isn't my idea of fun.",
        "The secret ingredient to his wonderful life was crime.",
        "He took one look at what was under the table and noped the hell out of there.",
        "You can't compare apples and oranges, but what about bananas and pineapples?",
        "Jeanne wished she has chosen the red button.",
        "He decided water-skiing on a frozen lake wasn’t a good idea.",
        "A kangaroo is really just a rabbit on steroids.",
        "They ran around the corner to find that they had traveled back in time.",
        "His get rich quick scheme was to grow a cactus farm.",
        "He had reached the point where he was paranoid about being paranoid.",
        "After exploring the abandoned building, he started to believe in ghosts.",
        "That is an appealing treasure map that I can't read.",
        "He was so preoccupied with whether or not he could that he failed to stop to consider if he should.",
        "Of course, she loves her pink bunny slippers."];

    const randomindex = Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML = '';
    for (const char of paragraph[randomindex]) {
        console.log(char);
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', () => input.focus());
    typingText.addEventListener("click", () => {
        input.focus()
    })
}


function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if (charIndex < char.length && timeLeft > 0) {
        if (!isTyping) { 
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }
        if (char[charIndex].innerHTML === typedChar) {
            char[charIndex].classList.add('correct');
            console.log('correct');
        }
        else {
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log('incorrect');
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    }
    else {
        clearInterval(timer);
        input.value = '';
    }
}

function initTime() {
    if (timeLeft > 0) {
        timeLeft--
        time.innerText = timeLeft;
        let wpmVal = Math.round(((charIndex - mistake) / 5) / (maxTime - timeLeft) * 60);
        wpm.innerText = wpmVal;
    }
    else {
        clearInterval(timer);
    }
}
function reset(){
    loadPara();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText= timeLeft;
    input.value='';
    charIndex = 0;
    mistake =0;
    isTyping = false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
}
document.addEventListener("DOMContentLoaded", () => {
    loadParagraph(); 
});

input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
loadPara();