let arrBombs = [];
let arrOpen = [];

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
            let container = document.querySelector('div');
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
        
        if (!arrBombs.includes(j)){
            arrBombs.push(j);
        } else {
            i--;
        }
    }
    return arrBombs;
}
arrOpen = arrBombs;
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

//открытие клеток
function clickCell(e) {
    let target = e.target.dataset.number;
    console.log(target)
    console.log(typeof target)
    if (arrBombs.includes(Number(target))) {
        /* e.target.textContent = 'БУМ' */
        playLoose()

        
    } else {
        let neighbors = findNeighbors(target);
        let intersection = arrBombs.filter(element => neighbors.includes(element));
        e.target.textContent = String(intersection.length)
    }
    arrOpen.push(target);
    if (arrOpen.length == 100) {
        playWin();
    }
}

//проигрышь
function playLoose() {
  let container = document.querySelector('div');  
  container.innerHTML = '';
  let span = document.createElement('span');
  span.classList.add('failure');
  span.innerHTML = 'GAME OVER';
  container.append(span);
  /* let imgContainer = document.createElement('div');
  imgContainer.classList.add('imgContainer');
  container.append(imgContainer);
  let img = document.createElement('img');
  img.src = './assets/imgs/sadsmile.png';
  imgContainer.append(img); */


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
export {addContainer, addCells, makeBombs, findNeighbors, clickCell, playLoose};
export default arrBombs;