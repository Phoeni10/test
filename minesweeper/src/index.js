import './styles/styles.css'
import './styles/styles.scss'
import { addContainer, addCells, makeBombs, findNeighbors, clickCell, playLoose, makeFlag, clickFirstCell,
    makeInfoField, makeBtnNewGame, restartNewGame, makeDisplayTimeClicks, startTimer, addSoundBtn, addDifficultyGame, gameEasyMode, gameNormalMode, gameDifficultMode, inputBombs, setBombs, loadGame } from './functions'

    /* localStorage.clear(); */
    console.log(localStorage.length);
    if (!localStorage.getItem('game-mode')) {
        localStorage.setItem('game-mode', 'easy');
    }
    
    if (!localStorage.getItem('bombs')) {
        localStorage.setItem('bombs', 10);
    }
    
    document.addEventListener('DOMContentLoaded', loadGame());

    