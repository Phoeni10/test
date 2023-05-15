import './styles/styles.css'
import './styles/styles.scss'
import arrBombs from './functions';
import { addContainer, addCells, makeBombs, clickCell, makeFlag} from './functions'


addContainer();
addCells(10, 10);
makeBombs(10);
let cells = document.querySelectorAll('.cell');

for (let cell of cells) {
    cell.addEventListener('click', clickCell)
};

for (let cell of cells) {
    cell.addEventListener('contextmenu', makeFlag)
};