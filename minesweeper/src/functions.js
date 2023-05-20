let arrBombs = [];
let arrOpen = [...arrBombs];

let counterBombs = localStorage.getItem('bombs');
let flags = 0;
let time = 0;
let clicks = 0;
let timerID;

55555555555555555555555555

2222222222222222222222222222222222222222222222
222
1111111111111111111111111111111
7777777777777777777777777777777777777777

let body = document.querySelector('body');


11111111111111111111111111111111111111



// добавить  для игры поле
function addContainer(j) {
    let container = document.createElement('div');
    container.classList.add(`container${j}`);
    container.id = 'container';
    
    body.append(container);
}

//разбить поле на ячейки
function addCells(rows, cols) {
    let k = 1;
    for (let i = 1; i <= rows; i++) {
        for (let i = 1; i <= cols; i++) {
            let container = document.querySelector("#container");
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-number', `${k}`);
            container.append(cell);
            k++;
        }
    }
}

// закидываем 10 бомб случайно в игровое поле
function makeBombs(numberBomb) {
    for (let i = 0; i < numberBomb; i++) {
        let j = Math.floor(Math.random() * 100) + 1;
        
        if (!arrBombs.includes(j) /* || j == e.target.dataset.number */){
            arrBombs.push(j);
        } else {
            i--;
        }
    }
    /* bombs = numberBomb; */
    return arrBombs;
}
// определяем соседей клетки
function findNeighbors(num) {
    let arrNeighbors = [];
    let number = Number(num)
    if (number == 1) {
        arrNeighbors.push(number + 1 , number + 10, number + 11);
    } else if (number == 10) {
        arrNeighbors.push(number - 1, number + 9, number + 10);
    } else if (number == 91) {
        arrNeighbors.push(number -10, number -9 , number + 1);
    } else if (number == 100) {
        arrNeighbors.push(number - 11, number - 10, number - 1);
    } else if (number <= 2 & number >= 9) {
        arrNeighbors.push(number - 1, number + 1 , number + 9, number + 10, number + 11);
    } else if (number <= 92 & number >= 99) {
        arrNeighbors.push(number - 11, number - 10 , number - 9, number - 1, number + 1);
    } else if ([11, 21, 31, 41, 51, 61, 71, 81].includes(number)) {
        arrNeighbors.push(number - 10, number - 9 , number + 1, number + 10, number + 11);
    } else if ([20, 30, 40, 50, 60, 70, 80, 90].includes(number)) {
        arrNeighbors.push(number - 11, number - 10 , number - 1, number + 9, number + 10);
    } else {
        arrNeighbors.push(number - 11, number - 10 , number - 9, number - 1, number + 1, number + 9, number + 10, number + 11);
    }
    console.log(arrNeighbors);
    return (arrNeighbors);    
}

//открытие первой клетки, нельзя проиграть
function clickFirstCell(e) {
    let btnSound = document.querySelector('.btnSound');
    if (btnSound.classList.contains('soundOn')) {
        audioClick();
    }
    let bombs = localStorage.getItem('bombs');
    makeBombs(bombs);
    startTimer();
    let target = e.target.dataset.number;
    arrOpen.push(target);

    let neighbors = findNeighbors(target);
    let intersection = arrBombs.filter(element => neighbors.includes(element));
    e.target.textContent = String(intersection.length)
    let cell = e.target;
    makeColorNumber(cell);
    e.target.classList.add('opened');
    e.target.classList.add('first');// проверка срабаттываения первого клика, потом убрать
    
    let displayBombs = document.querySelector('.displayBombs');
    displayBombs.innerHTML = `Bombs: ${counterBombs}`;
    
        
    let cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        cell.removeEventListener('click', clickFirstCell);
        cell.addEventListener('click', clickCell)
    }

    let displayClicks = document.querySelector('.displayClicks');
    clicks += 1;
    displayClicks.innerHTML = `Clicks: ${clicks}`;
}

//открытие клеток
function clickCell(e) {
    let btnSound = document.querySelector('.btnSound');
    if (btnSound.classList.contains('soundOn')) {
        audioClick();
    }
    let target = e.target.dataset.number;
    clicks += 1;
    let displayClicks = document.querySelector('.displayClicks');
    displayClicks.innerHTML = `Clicks: ${clicks}`;
    if (arrBombs.includes(Number(target))) {
        playLoose()
    } else {
        let neighbors = findNeighbors(target);
        let intersection = arrBombs.filter(element => neighbors.includes(element));
        let cell = e.target;
        e.target.textContent = String(intersection.length)
        makeColorNumber(cell)
        e.target.classList.add('opened');
    }
    if (!arrOpen.includes(target)) {
        arrOpen.push(target);
    }
    console.log(arrOpen);
    console.log(arrBombs);
    if (arrOpen.length == 100 || arrOpen.length == 100 & flags == 10) {
        playWin();
    } 
    this.removeEventListener('click', clickCell);
}

//проигрышь
function playLoose() {
  clearInterval(timerID);  
  let container = document.querySelector('#container');  
  container.innerHTML = '';
  let span = document.createElement('span');
  span.classList.add('failure');

  span.innerHTML = '<img src = "bomb.png">';
  let a = setInterval(() => span.innerHTML = '', 1000);
  
  let b = setInterval(() => span.innerHTML = '<img src = "bomb.png">', 2000);
  setTimeout(() => { clearInterval(a); clearInterval(b); }, 6000);
  setTimeout(() => span.innerHTML = '<img src = "fire.png">',6500);
  setTimeout(() => span.innerHTML = 'GAME OVER',7500);

  container.append(span);
  let btnSound = document.querySelector('.btnSound');
    if (btnSound.classList.contains('soundOn')) {
        audioGameOver();
    }
  

}

//выйгрышь
function playWin() {
    clearInterval(timerID);
    let container = document.querySelector('div');  
    container.innerHTML = '';
    let span = document.createElement('span');
    span.classList.add('victory');
    span.innerHTML = 'CONGRATULATIONS YOU WIN';
    container.append(span);
    let btnSound = document.querySelector('.btnSound');
    if (btnSound.classList.contains('soundOn')) {
        audioVictory();
    }
    
}
// установка флажков
function makeFlag(e) {
  e.preventDefault();
  e.target.classList.toggle('closed');
  if (e.target.classList.contains('closed')) {
    counterBombs -= 1;
    flags += 1;
    let displayBombs = document.querySelector('.displayBombs');
    displayBombs.innerHTML = `Bombs: ${counterBombs}`;

    let displayFlags = document.querySelector('.displayFlags');
    displayFlags.innerHTML = `Flags: ${flags}`;
    this.removeEventListener('click', clickCell);
  } else {
    counterBombs += 1;
    flags -= 1;
    let displayFlags = document.querySelector('.displayFlags');
    displayFlags.innerHTML = `Flags: ${flags}`;
    let displayBombs = document.querySelector('.displayBombs');
    displayBombs.innerHTML = `Bombs: ${counterBombs}`;
    this.addEventListener('click', clickCell)
  };
}

//размещение инфомационного поля
function makeInfoField() {
    let infoField = document.createElement('div');
    infoField.classList.add('infofield');
  
    body.append(infoField);
    makeDisplayBombs();
    makeDisplayFlags();
}

//дисплей оставшихся мин
function makeDisplayBombs() {
    let infoField = document.querySelector('.infofield');
    let displayBombs = document.createElement('div');
    displayBombs.classList.add('displayBombs');
    displayBombs.innerHTML = `Bombs: ${counterBombs}`;
    infoField.append(displayBombs);

}

//дисплей установленных флажков
function makeDisplayFlags() {
    let infoField = document.querySelector('.infofield');
    let displayFlags = document.createElement('div');
    displayFlags.classList.add('displayFlags');
    displayFlags.innerHTML = `Flags: ${flags}`;
    infoField.append(displayFlags);
    
}

function makeColorNumber(target) {
    if (target.textContent == 1) {
        target.classList.add('blue')
    } else if (target.textContent == 2) {
        target.classList.add('green')
    }
    else if (target.textContent == 3) {
        target.classList.add('orange')
    } else if (target.textContent == 4) {
        target.classList.add('red')
    } else if (target.textContent == 5) {
        target.classList.add('darkblue')
    } else if (target.textContent == 6) {
        target.classList.add('brown')
    } else {
        target.classList.add('black')
    }
    console.log(target)
}

//добавление кнопки для рестарта новой игры
function makeBtnNewGame() {
    let infoField = document.createElement('div');
    infoField.classList.add('infofield2');

    body.append(infoField);
    let button = document.createElement('button');
    button.classList.add('btnNewGame');
    button.textContent = 'New Game';
    infoField.append(button);

}

//рестарт игры кнопкой
function restartNewGame() {
    let container = document.querySelector('#container');
    container.innerHTML = '';
    
    counterBombs = 0;
    let displayBombs = document.querySelector('.displayBombs');
    displayBombs.innerHTML = `Bombs: ${counterBombs}`;

    time = 0;
    let displayTime = document.querySelector('.displayTime');
    displayTime.innerHTML = `Time: ${time}`;

    clicks = 0;
    let displayClicks = document.querySelector('.displayClicks');
    displayClicks.innerHTML = `Clicks: ${clicks}`;

    flags = 0;
    let displayFlags = document.querySelector('.displayFlags');
    displayFlags.innerHTML = `Flags: ${flags}`;
    
    clearInterval(timerID);

    addCells(10, 10);
    let cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        cell.addEventListener('click', clickFirstCell)
        cell.addEventListener('contextmenu', makeFlag)
    };
    
}

//добавление времени игры икол-во ходов
function makeDisplayTimeClicks() {
    let infoField = document.createElement('div');
    infoField.classList.add('infofield');
    
    body.append(infoField);

    let displayTime = document.createElement('div');
    displayTime.classList.add('displayTime');
    displayTime.innerHTML = `Time: ${time}`;
    infoField.append(displayTime);

    let displayClicks = document.createElement('div');
    displayClicks.classList.add('displayClicks');
    displayClicks.innerHTML = `Clicks: ${clicks}`;
    infoField.append(displayClicks);

}

//запуск таймера
function startTimer() {
    let displayTime = document.querySelector('.displayTime');
    displayTime.innerHTML = `Time: ${time}`;
    timerID = setInterval((function(){
        displayTime.innerHTML = `Time: ${time}`;
        time += 1
    }), 1000);
}

//открытие соседних клеток, если по соседству этой клетки нету бомб
/* function openFreeCells(e) {
    if (e.target.textContent == 0) {

    }
} */

//Добавление звуковых эфектов
function audioClick() {
    let audio = new Audio(); 
    audio.src = 'click.mp3';
    audio.autoplay = true; 
}

function audioVictory() {
    let audio = new Audio(); 
    audio.src = 'victory.mp3';
    audio.autoplay = true; 
}

function audioGameOver() {
    let audio = new Audio(); 
    audio.src = 'gameover.mp3';
    audio.autoplay = true; 
}

//добавление переключателя звука
function addSoundBtn() {
    let infoField = document.querySelector('.infofield2');
    let btn = document.createElement('div');
    btn.classList.add('btnSound');
    infoField.append(btn);
}

//выбор сложности игры 
function addDifficultyGame() {
    let infoField = document.createElement('div');
    infoField.classList.add('infofield2');
    
    body.append(infoField);

    let btnEasy = document.createElement('button');
    btnEasy.classList.add('btnEasy');
    btnEasy.textContent = 'Easy';
    infoField.append(btnEasy);

    let btnNormal = document.createElement('button');
    btnNormal.classList.add('btnNormal');
    btnNormal.textContent = 'Normal';
    infoField.append(btnNormal);

    let btnDifficult = document.createElement('button');
    btnDifficult.classList.add('btnDifficult');
    btnDifficult.textContent = 'Difficult';
    infoField.append(btnDifficult);
}

//сложность игры
function gameEasyMode() {
    arrOpen = [];
    arrBombs = [];
    if (document.querySelector('.btnNewGame')) {
        let cells = document.querySelectorAll('.cell');
        let btnNewGame = document.querySelector('.btnNewGame');
        let btnSound = document.querySelector('.btnSound');
        let btnEasy = document.querySelector('.btnEasy');
        let btnNormal = document.querySelector('.btnNormal');
        let btnDifficult = document.querySelector('.btnDifficult');
        let btnBombs = document.querySelector('.btn-bombs');

        for (let cell of cells) {
            cell.removeEventListener('click', clickFirstCell)
            cell.removeEventListener('click', clickCell)
            cell.removeEventListener('contextmenu', makeFlag)
        };
        btnNewGame.removeEventListener('click', restartNewGame)
        
        btnSound.removeEventListener('click', () => btnSound.classList.toggle('soundOn'));
        btnEasy.removeEventListener('click', gameEasyMode);
        btnNormal.removeEventListener('click', gameNormalMode);
        btnDifficult.removeEventListener('click', gameDifficultMode);
        btnBombs.removeEventListener('click', setBombs);
    }

    
    body.innerHTML = '';
    addContainer(10);
    makeInfoField();
    addCells(10, 10);
    makeBtnNewGame();
    makeDisplayTimeClicks();
    addSoundBtn();
    addDifficultyGame();
    inputBombs();
  
    counterBombs = localStorage.getItem('bombs');
    let displayBombs = document.querySelector('.displayBombs');
    displayBombs.innerHTML = `Bombs: ${counterBombs}`;

    clearInterval(timerID);
    time = 0;
    let displayTime = document.querySelector('.displayTime');
    displayTime.innerHTML = `Time: ${time}`;

    clicks = 0;
    let displayClicks = document.querySelector('.displayClicks');
    displayClicks.innerHTML = `Clicks: ${clicks}`;

    flags = 0;
    let displayFlags = document.querySelector('.displayFlags');
    displayFlags.innerHTML = `Flags: ${flags}`;

    let cells = document.querySelectorAll('.cell');
    let btnNewGame = document.querySelector('.btnNewGame');
    let btnSound = document.querySelector('.btnSound');
    let btnEasy = document.querySelector('.btnEasy');
    let btnNormal = document.querySelector('.btnNormal');
    let btnDifficult = document.querySelector('.btnDifficult');
    let btnBombs = document.querySelector('.btn-bombs');

    btnNewGame.addEventListener('click', restartNewGame)

    for (let cell of cells) {
        cell.addEventListener('click', clickFirstCell)
        cell.addEventListener('contextmenu', makeFlag)
    };

    

    btnSound.addEventListener('click', () => btnSound.classList.toggle('soundOn'));
 
    btnEasy.addEventListener('click', gameEasyMode);
    
    btnNormal.addEventListener('click', gameNormalMode);
    
    btnDifficult.addEventListener('click', gameDifficultMode);
 
    btnBombs.addEventListener('click', setBombs);

    console.log('easy')
    localStorage.setItem('game-mode', 'easy');
}

function gameNormalMode() {
    arrOpen = [];
    arrBombs = [];
    if (document.querySelector('.btnNewGame')) {
        let cells = document.querySelectorAll('.cell');
        let btnNewGame = document.querySelector('.btnNewGame');
        let btnSound = document.querySelector('.btnSound');
        let btnEasy = document.querySelector('.btnEasy');
        let btnNormal = document.querySelector('.btnNormal');
        let btnDifficult = document.querySelector('.btnDifficult');
        let btnBombs = document.querySelector('.btn-bombs');

        for (let cell of cells) {
            cell.removeEventListener('click', clickFirstCell)
            cell.removeEventListener('click', clickCell)
            cell.removeEventListener('contextmenu', makeFlag)
        };
        btnNewGame.removeEventListener('click', restartNewGame)
        
        btnSound.removeEventListener('click', () => btnSound.classList.toggle('soundOn'));
        btnEasy.removeEventListener('click', gameEasyMode);
        btnNormal.removeEventListener('click', gameNormalMode);
        btnDifficult.removeEventListener('click', gameDifficultMode);
        btnBombs.removeEventListener('click', setBombs);
    }

    
    body.innerHTML = '';
    addContainer(15);
    makeInfoField();
    addCells(15, 15);
    makeBtnNewGame();
    makeDisplayTimeClicks();
    addSoundBtn();
    addDifficultyGame();
    inputBombs();

    counterBombs = localStorage.getItem('bombs');
    let displayBombs = document.querySelector('.displayBombs');
    displayBombs.innerHTML = `Bombs: ${counterBombs}`;

    clearInterval(timerID);    
    time = 0;
    let displayTime = document.querySelector('.displayTime');
    displayTime.innerHTML = `Time: ${time}`;

    clicks = 0;
    let displayClicks = document.querySelector('.displayClicks');
    displayClicks.innerHTML = `Clicks: ${clicks}`;

    flags = 0;
    let displayFlags = document.querySelector('.displayFlags');
    displayFlags.innerHTML = `Flags: ${flags}`;

    let cells = document.querySelectorAll('.cell');
    let btnNewGame = document.querySelector('.btnNewGame');
    let btnSound = document.querySelector('.btnSound');
    let btnEasy = document.querySelector('.btnEasy');
    let btnNormal = document.querySelector('.btnNormal');
    let btnDifficult = document.querySelector('.btnDifficult');
    let btnBombs = document.querySelector('.btn-bombs');

    btnNewGame.addEventListener('click', restartNewGame)

    for (let cell of cells) {
        cell.addEventListener('click', clickFirstCell)
        cell.addEventListener('contextmenu', makeFlag)
    };

    
    btnSound.addEventListener('click', () => btnSound.classList.toggle('soundOn'));
 
    btnEasy.addEventListener('click', gameEasyMode);
    
    btnNormal.addEventListener('click', gameNormalMode);
    
    btnDifficult.addEventListener('click', gameDifficultMode);
 
    btnBombs.addEventListener('click', setBombs);

    console.log('norm')
    localStorage.setItem('game-mode', 'normal');
}

function gameDifficultMode() {
    arrOpen = [];
    arrBombs = [];
    if (document.querySelector('.btnNewGame')) {
        let cells = document.querySelectorAll('.cell');
        let btnNewGame = document.querySelector('.btnNewGame');
        let btnSound = document.querySelector('.btnSound');
        let btnEasy = document.querySelector('.btnEasy');
        let btnNormal = document.querySelector('.btnNormal');
        let btnDifficult = document.querySelector('.btnDifficult');
        let btnBombs = document.querySelector('.btn-bombs');

        for (let cell of cells) {
            cell.removeEventListener('click', clickFirstCell)
            cell.removeEventListener('click', clickCell)
            cell.removeEventListener('contextmenu', makeFlag)
        };
        btnNewGame.removeEventListener('click', restartNewGame)
        
        btnSound.removeEventListener('click', () => btnSound.classList.toggle('soundOn'));
        btnEasy.removeEventListener('click', gameEasyMode);
        btnNormal.removeEventListener('click', gameNormalMode);
        btnDifficult.removeEventListener('click', gameDifficultMode);
        btnBombs.removeEventListener('click', setBombs);
    }

    
    body.innerHTML = '';
    addContainer(25);
    makeInfoField();
    addCells(25, 25);
    makeBtnNewGame();
    makeDisplayTimeClicks();
    addSoundBtn();
    addDifficultyGame();
    inputBombs();

    counterBombs = localStorage.getItem('bombs');
    let displayBombs = document.querySelector('.displayBombs');
    displayBombs.innerHTML = `Bombs: ${counterBombs}`;

    clearInterval(timerID);
    time = 0;
    let displayTime = document.querySelector('.displayTime');
    displayTime.innerHTML = `Time: ${time}`;

    clicks = 0;
    let displayClicks = document.querySelector('.displayClicks');
    displayClicks.innerHTML = `Clicks: ${clicks}`;

    flags = 0;
    let displayFlags = document.querySelector('.displayFlags');
    displayFlags.innerHTML = `Flags: ${flags}`;
 
    let cells = document.querySelectorAll('.cell');
    let btnNewGame = document.querySelector('.btnNewGame');
    let btnSound = document.querySelector('.btnSound');
    let btnEasy = document.querySelector('.btnEasy');
    let btnNormal = document.querySelector('.btnNormal');
    let btnDifficult = document.querySelector('.btnDifficult');
    let btnBombs = document.querySelector('.btn-bombs');

    btnNewGame.addEventListener('click', restartNewGame)

    for (let cell of cells) {
        cell.addEventListener('click', clickFirstCell)
        cell.addEventListener('contextmenu', makeFlag)
    };


    btnSound.addEventListener('click', () => btnSound.classList.toggle('soundOn'));
 
    btnEasy.addEventListener('click', gameEasyMode);
    
    btnNormal.addEventListener('click', gameNormalMode);
    
    btnDifficult.addEventListener('click', gameDifficultMode);
 
    btnBombs.addEventListener('click', setBombs);

    console.log('dif')
    
    localStorage.setItem('game-mode', 'difficult');
}

//добавление возможности установки бомб
//добавление инпута с кол-вом бомб

function inputBombs() {
    let infoField = document.createElement('div');
    infoField.classList.add('infofield2');
    
    body.append(infoField);

    let input = document.createElement('input');
    input.id = 'input';
    input.type = 'number';
    input.setAttribute('min', 10);
    input.setAttribute('max', 100);
    let label = document.createElement('label');
    label.classList.add('label');
    label.setAttribute('for', 'input');
    label.textContent = 'Range of bombs 10 - 100:';
    infoField.append(label);
    infoField.append(input);

    let button = document.createElement('button');
    button.classList.add('btn-bombs');
    infoField.append(button);

}

function setBombs() {
    let input = document.querySelector('#input');
    let bombs = input.value;
    
    localStorage.setItem('bombs', bombs);
    location.reload()
}

//закгрузка сложности игры (при обновлении страницы и при нажатии кнопки сложности игры)
function loadGame() {
    if (localStorage.getItem('game-mode') == 'easy') {
        gameEasyMode()
    } else if (localStorage.getItem('game-mode') == 'normal') {
        gameNormalMode()
    } else if (localStorage.getItem('game-mode') == 'difficult') {
        gameDifficultMode()
    }
}

export {addContainer, addCells, makeBombs, findNeighbors, clickCell, playLoose, makeFlag, clickFirstCell,
     makeInfoField, makeBtnNewGame, restartNewGame, makeDisplayTimeClicks, startTimer, addSoundBtn, addDifficultyGame, gameEasyMode, gameNormalMode, gameDifficultMode, inputBombs, setBombs, loadGame};
