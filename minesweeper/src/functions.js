import {arrBombs, arrOpen} from './varaibles' 

let bombs = 0;
let flags = 0;


// добавить  для игры поле
function addContainer() {
    let container = document.createElement('div');
    container.classList.add('container');
    let body = document.querySelector('body');
    body.append(container);
}

//разбить поле на ячейки
function addCells(rows, cols) {
    let k = 1;
    for (let i = 1; i <= rows; i++) {
        for (let i = 1; i <= cols; i++) {
            let container = document.querySelector('.container');
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
    bombs = numberBomb;
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
    makeBombs(10);
    let target = e.target.dataset.number;
    arrOpen.push(target);
    console.log(arrOpen);
    console.log(arrBombs);
    let neighbors = findNeighbors(target);
    let intersection = arrBombs.filter(element => neighbors.includes(element));
    e.target.textContent = String(intersection.length)
    e.target.classList.add('opened');
    
    let displayBombs = document.querySelector('.displayBombs');
    displayBombs.innerHTML = `Bombs: ${bombs}`;
    
        
    let cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        cell.removeEventListener('click', clickFirstCell);
        cell.addEventListener('click', clickCell)
    } 
    
}

//открытие клеток
function clickCell(e) {
    let target = e.target.dataset.number;
    if (arrBombs.includes(Number(target))) {
        playLoose()
    } else {
        let neighbors = findNeighbors(target);
        let intersection = arrBombs.filter(element => neighbors.includes(element));
        e.target.textContent = String(intersection.length)
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
  let container = document.querySelector('.container');  
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

}

//выйгрышь
function playWin() {
    let container = document.querySelector('div');  
    container.innerHTML = '';
    let span = document.createElement('span');
    span.classList.add('victory');
    span.innerHTML = 'CONGRATULATIONS YOU WIN';
    container.append(span);
}
// установка флажков
function makeFlag(e) {
  e.preventDefault();
  e.target.classList.toggle('closed');
  if (e.target.classList.contains('closed')) {
    bombs -= 1;
    flags += 1;
    let displayBombs = document.querySelector('.displayBombs');
    displayBombs.innerHTML = `Bombs: ${bombs}`;

    let displayFlags = document.querySelector('.displayFlags');
    displayFlags.innerHTML = `Flags: ${flags}`;
    this.removeEventListener('click', clickCell);
  } else {
    bombs += 1;
    flags -= 1;
    let displayFlags = document.querySelector('.displayFlags');
    displayFlags.innerHTML = `Flags: ${flags}`;
    let displayBombs = document.querySelector('.displayBombs');
    displayBombs.innerHTML = `Bombs: ${bombs}`;
    this.addEventListener('click', clickCell)
  };
}

//размещение инфомационного поля
function makeInfoField() {
    let infoField = document.createElement('div');
    infoField.classList.add('infofield');
    let body = document.querySelector('body');
    body.append(infoField);
    makeDisplayBombs();
    makeDisplayFlags();
}

//дисплей оставшихся мин
function makeDisplayBombs() {
    let infoField = document.querySelector('.infofield');
    let displayBombs = document.createElement('div');
    displayBombs.classList.add('displayBombs');
    displayBombs.innerHTML = `Bombs: ${bombs}`;
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

export {addContainer, addCells, makeBombs, findNeighbors, clickCell, playLoose, makeFlag, clickFirstCell, makeInfoField};
