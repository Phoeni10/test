import './styles/styles.css'
import './styles/styles.scss'
import { addContainer, addCells, makeBombs, clickCell, makeFlag, clickFirstCell, makeInfoField, makeBtnNewGame, restartNewGame, makeDisplayTimeClicks, startTimer, addSoundBtn} from './functions'


addContainer();
makeInfoField();
addCells(10, 10);
makeBtnNewGame();
makeDisplayTimeClicks();
addSoundBtn();
/* makeBombs(10); */
let cells = document.querySelectorAll('.cell');
let btnNewGame = document.querySelector('.btnNewGame')
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
