//сохранение 10 последних результатов
class saveLastResults {
    results = [];
  
    show() {
      alert(this.results.join('\r\n'));
    }
        
    dequeue() {
      this.results.shift()
    }
  
    enqueue(element) {
      if (this.results.length == 10) {
        this.dequeue()
      }
      this.results.push(element)
    }
  
    length() {
      return this.results.length
    }
    
  
  }

  let saveLastResult = new saveLastResults;

  function saveResults() {
    let level = localStorage.getItem('game-mode');
    let bombs = localStorage.getItem('bombs');
    let displayTime = document.querySelector('.displayTime');
    let time = displayTime.innerHTML;
    
    saveLastResult.enqueue(`Level: ${level} Bombs: ${bombs} - ${time}sec`);
    let result = JSON.stringify(saveLastResult.results)
    localStorage.setItem('results', result);
  }

  //кнопка показа последних 10 результатов
    function makeBtnResult() {
        let infoField = document.createElement('div');
        infoField.classList.add('infofield2');
        let body = document.querySelector('body');
        body.append(infoField);
        let btn = document.createElement('button');
        btn.classList.add('btnResult');
        btn.textContent = 'Results';
        infoField.append(btn);
        btn.addEventListener('click', showResults);
    }
    
    function showResults() {
        saveLastResult.results = JSON.parse(localStorage.getItem('results'));
    }

export {saveLastResults, saveResults, showResults, makeBtnResult};