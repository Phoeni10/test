import './styles/styles.css'
import './styles/styles.scss'
import arrBombs from './functions';
import { addContainer, addCells, makeBombs, findNeighbors } from './functions'


addContainer();
addCells(10, 10);
makeBombs(10);
let cells = document.querySelectorAll('.cell');

for (let cell of cells) {
    cell.addEventListener('click', function(e) {
        let target = e.target.dataset.number;
        console.log(target)
        console.log(typeof target)
        if (arrBombs.includes(Number(target))) {
            /* e.target.textContent = 'БУМ' */
            let bomb = document.createElement('img');
            bomb.src = '../src/assets/imgs/fire.png';
            let cell = document.querySelector('div[data-number =" '+target+'"]')
            console.log(cell)
            cell.append(bomb);

            target.append(bomb);
        } else {
            let neighbors = findNeighbors(target);
            let intersection = arrBombs.filter(element => neighbors.includes(element));
            e.target.textContent = String(intersection.length)
        }
        
    });
    
};