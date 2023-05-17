import './styles/styles.css'
import './styles/styles.scss'
import { addContainer, addCells, makeBombs, clickCell, makeFlag, clickFirstCell, makeInfoField, 
    makeBtnNewGame, restartNewGame, makeDisplayTimeClicks, startTimer, addSoundBtn, addDifficultyGame, 
    gameEasyMode, gameNormalMode, gameDifficultMode} from './functions'
let rows = 10;
let cols = 10;

addContainer();
makeInfoField();
addCells(rows, cols);
makeBtnNewGame();
makeDisplayTimeClicks();
addSoundBtn();
addDifficultyGame();
/* makeBombs(10); */
let cells = document.querySelectorAll('.cell');
let btnNewGame = document.querySelector('.btnNewGame');

/* for (let cell of cells) {
    cell.addEventListener('click', clickCell)
}; */

btnNewGame.addEventListener('click', restartNewGame)

for (let cell of cells) {
    cell.addEventListener('click', clickFirstCell)
};

for (let cell of cells) {
    cell.addEventListener('contextmenu', makeFlag)
};

let btnSound = document.querySelector('.btnSound');

btnSound.addEventListener('click', () => btnSound.classList.toggle('soundOn'));

let btnEasy = document.querySelector('.btnEasy');
btnEasy.addEventListener('click', gameEasyMode);
let btnNormal = document.querySelector('.btnNormal');
btnNormal.addEventListener('click', gameNormalMode);
let btnDifficult = document.querySelector('.btnDifficult');
btnDifficult.addEventListener('click', gameDifficultMode);
