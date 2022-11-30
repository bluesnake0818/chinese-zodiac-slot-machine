/*-------------------------------- Constants --------------------------------*/
const oxSays = new Audio('../audio/ox.mp3')
const zodiacsArray = 
[
  {zodiac: 'Rat', enemy: "Horse", tag:"a1", url: "./assets/designs_rat.png", desc: 'Rat is a cunning animal.', luck: 'Luck: +2'},
  {zodiac: 'Ox', enemy: "Goat", tag:"a2", url: "./assets/designs_ox.png", desc: 'Ox is a diligent animal.', luck: 'Luck: +3'},
  {zodiac: 'Tiger', enemy: "Monkey", tag:"a3", url: "./assets/designs_tiger.png", desc: 'Tiger is a courageous animal.', luck: 'Luck: +10'},
  {zodiac: 'Rabbit', enemy: "Rooster", tag:"a4", url: "./assets/designs_rabbit.png", desc: 'Rabbit is an opportunistic animal.', luck: 'Luck: +12'},
  {zodiac: 'Dragon', enemy: "Dog", tag:"a5", url: "./assets/designs_dragon.png", desc: 'Dragon is a legendary animal.', luck: 'Luck: +25'},
  {zodiac: 'Snake', enemy: "Pig", tag:"a6", url: "./assets/designs_snake.png", desc: 'Snake is a wise animal.', luck: 'Luck: +1'},
  {zodiac: 'Horse', enemy: "Rat", tag:"a7", url: "./assets/designs_horse.png", desc: 'Horse is a free-spirited animal.', luck: 'Luck: -2'},
  {zodiac: 'Goat', enemy: "Ox", tag:"a8", url: "./assets/designs_goat.png", desc: 'Goat is a peaceful animal.', luck: 'Luck: -10'},
  {zodiac: 'Monkey', enemy: "Tiger", tag:"a9", url: "./assets/designs_monkey.png", desc: 'Monkey is a playful animal.', luck: 'Luck: -100'},
  {zodiac: 'Rooster', enemy: "Rabbit", tag:"a10", url: "./assets/designs_rooster.png", desc: 'Rooster is a worried animal.', luck: 'Luck: +20'},
  {zodiac: 'Dog', enemy: "Dragon", tag:"a11", url: "./assets/designs_dog.png", desc: 'Dog is a friendly animal.', luck: 'Luck: +35'},
  {zodiac: 'Pig', enemy: "Pig", tag:"a12", url: "./assets/designs_pig.png", desc: 'Pig is a hungry animal.', luck: 'Luck: +40'}
]

/*---------------------------- Variables (state & etc) ----------------------------*/
let slotMachineArray, scoresArray, turn, round, isWinner, sumA, sumB, playerAName, playerBName, count, numberSlot4

/*------------------------ Cached Element References ------------------------*/
const choosePlayer = document.querySelector('#choose-player')
const slotMachine = document.querySelector('#slot-machine')
const scoreBoard = document.querySelector('#score-board')
const installBtn = document.querySelector('#install-button-area')

const favicon = document.querySelector('#favicon')
const tooltips = document.querySelectorAll('[data-toggle="tooltip"]')
tooltips.forEach(tooltip => tooltip.tooltip())

/*----------------------------- Event Listeners -----------------------------*/
slotMachine.querySelector('#replay-button').addEventListener("click", init)
choosePlayer.querySelector('#scroll').addEventListener("click", showPlayer)
choosePlayer.querySelector('#select-button').addEventListener("click", selectPlayer)
choosePlayer.querySelector('#play-button').addEventListener("click", handlePlay)
slotMachine.querySelector('#shuffle-button').addEventListener("click", handleShuffle)
installBtn.addEventListener("click", ()=>{ 
  window.open("https://hangfive.page.link/SnPr")})

/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  slotMachineArray = [slot1, slot2, slot3, slot4]
  slotMachineArray.forEach(slot => {
    slot.className = "a3"
  })
  
  turn = 1
  isWinner = null
  round = 0
  sumA = 0
  sumB = 0
  playerAName = ''
  playerBName = ''
  
  scoresArray = [score0, score1, score2, score3, score4, score5, score6, score7]
  
  score0.target = {player: 1, round: 0, score: 0, note: ''}
  score1.target = {player: -1, round: 1, score: 0, note: ''}
  score2.target = {player: 1, round: 2, score: 0, note: ''}
  score3.target = {player: -1, round: 3, score: 0, note: 'sum'}
  score4.target = {player: 1, round: 4, score: 0, note: ''}
  score5.target = {player: -1, round: 5, score: 0, note: ''}
  score6.target = {player: 1, round: 6, score: 0, note: ''}
  score7.target = {player: -1, round: 7, score: 0, note: 'sum'}
  
  scoresArray.forEach(score => {
    score.textContent = ''
  })
  
  showElement(choosePlayer)
  hideElement(slotMachine)
  hideElement(scoreBoard)
  hideElement(installBtn)
  showElement(choosePlayer, '#title')
  showElement(choosePlayer, '#show-player')
  
  hideElement(choosePlayer, '#select-button')
  hideElement(choosePlayer, '#play-button')
  hideElement(choosePlayer, '#instructions')
  hideElement(slotMachine, '#replay-button')

  setClassName(choosePlayer, '#title', '')
  setClassName(choosePlayer, '#show-player', '')  
  setClassName(choosePlayer, '#player-a-img', '')
  setClassName(choosePlayer, '#player-b-img', '')
  setClassName(choosePlayer, '#play-button', '')
  setClassName(scoreBoard, '#score-board-B', '')

  setClassName(choosePlayer, '#select-button', 'btn select-button')
  setClassName(choosePlayer, '#demo-img', 'a1')
  setClassName(slotMachine, '#shuffle-button', 'btn shuffle-button-player-a')
  setClassName(scoreBoard, '#score-board-A', 'score-board-a-turn')
  setClassName(slotMachine, '#turn-board', 'Turn: Player A')
  choosePlayer.querySelector('#player-preview').classList.remove('animate-out')

  choosePlayer.querySelector('#player-desc').textContent = zodiacsArray[0].desc
  choosePlayer.querySelector('#player-luck').textContent = zodiacsArray[0].luck
  choosePlayer.querySelector('#player-enemy').textContent = zodiacsArray[0].enemy
  
  setTextContent(slotMachine, '#turn-board', '')
  setTextContent(slotMachine, '#winner-display', '')
  
  slotMachine.querySelector('#turn-board').style.color = '#6661F1'
  scoreBoard.querySelector('#scoreboard-title').title= "2 of a kind: 10 / 3 of a kind: 100 / 4 of a kind: 1000"
  
}




function showPlayer(evt) {
  showElement(choosePlayer, '#select-button')
  if(turn===1) {
    setClassName(choosePlayer, '#select-button', 'btn select-button animate-in')
  } else {
    setClassName(choosePlayer, '#select-button', 'btn select-button-b animate-in')
  }
  
  for(let i=0; i<zodiacsArray.length; i++) {
    if(zodiacsArray[i].zodiac === evt.target.id) {
      choosePlayer.querySelector('#demo-img').className = zodiacsArray[i].tag
      choosePlayer.querySelector('#player-desc').textContent = zodiacsArray[i].desc
      choosePlayer.querySelector('#player-luck').textContent = zodiacsArray[i].luck
      choosePlayer.querySelector('#player-enemy').textContent = `Worst Opponent: ${zodiacsArray[i].enemy}`
      if(turn === 1) {
        playerAName = zodiacsArray[i].zodiac
      } else {
        playerBName = zodiacsArray[i].zodiac
      }
    }
  }
}

function selectPlayer() {
  showElement(choosePlayer, '#select-button')
  
  if (turn === 1) {
    let zodIdx = zodiacsArray.findIndex(element => element.zodiac === playerAName)
    let zodName = `${zodiacsArray[zodIdx].zodiac}`
    let zodTag = `${zodiacsArray[zodIdx].tag}-p`
    scoreBoard.querySelector('#player-a-name').className = zodTag
    setTextContent(scoreBoard, '#player-a-name', '')
    
    turn = turn * -1
    setTextContent(choosePlayer, '#title', 'Player B, choose Your zodiac')
    setClassName(choosePlayer, '#select-button', 'btn select-button-b')
    hideElement(choosePlayer, '#select-button')
    choosePlayer.querySelector('#player-a-img').className = choosePlayer.querySelector('#demo-img').className
    choosePlayer.querySelector(`#${zodName}`).className = 'selection-img selected-a'

  } else {
    if(playerBName === playerAName) {
      alert("You must pick a different player")
    } else {  
      let zodIdx = zodiacsArray.findIndex(element => element.zodiac === playerBName)
      let zodName = `${zodiacsArray[zodIdx].zodiac}`
      let zodTag = `${zodiacsArray[zodIdx].tag}-p`
      choosePlayer.querySelector("#player-b-img").className = choosePlayer.querySelector('#demo-img').className
      choosePlayer.querySelector(`#${zodName}`).className = 'selection-img selected-b'
      scoreBoard.querySelector('#player-b-name').className = zodTag
      setTextContent(scoreBoard, '#player-b-name', '')

      turn = turn * -1
      
      setClassName(choosePlayer, '#title', 'animate-out')
      setClassName(choosePlayer, '#show-player', 'animate-out')
      setClassName(choosePlayer, '#select-button', 'btn select-button-b animate-out') 
      
      setTimeout(function() {
        hideElement(choosePlayer, '#title')
        hideElement(choosePlayer, '#show-player')
        hideElement(choosePlayer, '#select-button')
        showElement(choosePlayer, '#instructions')
        showElement(choosePlayer, '#play-button')
        setClassName(choosePlayer, '#play-button', 'btn animate-in')
      }, (1000))
    }
  }
}

function handlePlay() {
  choosePlayer.querySelector(`#${playerAName}`).className = 'selection-img'
  choosePlayer.querySelector(`#${playerBName}`).className = 'selection-img'
  choosePlayer.querySelector('#player-preview').classList.add('animate-out')
  choosePlayer.querySelector('#play-button').classList.add('animate-out')
  choosePlayer.querySelector('#instructions').classList.add('animate-out')

  setTimeout(function() {
    hideElement(choosePlayer)
    showElement(scoreBoard)
    showElement(slotMachine)
    showElement(slotMachine, '#turn-board')
    showElement(slotMachine, '#shuffle-button')
    
  }, (1000))
}


function handleShuffle() {
  shuffle()
  setTimeout(function() {
    showElement(scoreBoard, '#scoreboard-title')
    showElement(scoreBoard)
    for(let i=0; i<slotMachineArray.length; i++) {
      let zodTag = slotMachineArray[i].className
      let zodIdx = zodiacsArray.findIndex(element => element.tag === zodTag)
      slotMachineArray[i].target = zodiacsArray[zodIdx]      
    }

    updateScore()
    render()
    turn = turn * -1
    round++
    
    if(round === 6) {
      hideElement(slotMachine, '#shuffle-button')
      setTimeout(function() {
        showElement(slotMachine, '#replay-button')
        showElement(installBtn)
        getWinner()
      }, 1000);
    }
  }, (numberSlot4*50+1000))
}



function shuffle(){
  let numChanges = randomInt(1,4)*7
  let numberSlot1 = numChanges+randomInt(1,7)
  let numberSlot2 = numChanges+2*7+randomInt(1,7)	
  let numberSlot3 = numChanges+4*7+randomInt(1,7)
  numberSlot4 = numChanges+6*7+randomInt(1,7)

  // test code
  // let numChanges = 1
  // let numberSlot1 = 2
  // let numberSlot2 = 3
  // let numberSlot3 = 4
  // numberSlot4 = 5

  
  let i1 = 0
  let i2 = 0
  let i3 = 0
  let i4 = 0
  
  let slot1 = setInterval(spin1, 50);
  let slot2 = setInterval(spin2, 50);
  let slot3 = setInterval(spin3, 50);
  let slot4 = setInterval(spin4, 50);
  
  function spin1(){
    i1++;
    if (i1>=numberSlot1){
      clearInterval(slot1);
      return null;
    }
    let slotTile = document.getElementById("slot1");
    
    if (slotTile.className==="a12"){
      slotTile.className = "a0";
    }
    slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
  }
  
  function spin2(){
    i2++;
    if (i2>=numberSlot2){
      clearInterval(slot2);
      return null;
    }
    
    let slotTile = document.getElementById("slot2");
    if (slotTile.className==="a12"){
      slotTile.className = "a0";
    }
    slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
  }
  
  function spin3(){
    i3++;
    if (i3>=numberSlot3){
      clearInterval(slot3);
      return null;
    }
    
    let slotTile = document.getElementById("slot3");
    if (slotTile.className==="a12"){
      slotTile.className = "a0";
    }
    slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
  }
  
  function spin4(){
    i4++;
    if (i4>=numberSlot4){
      clearInterval(slot4);
      return null;
    }
    let slotTile = document.getElementById("slot4");
    if (slotTile.className==="a12"){
      slotTile.className = "a0";
    }
    
    slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
  }
}

function randomInt(min, max){
  return Math.floor((Math.random() * (max-min+1)) + min);
}


function updateScore() {
  let score = 0
  const animalsArray = 
  [
    {name: 'Rat', count: 0}, 
    {name: 'Ox', count: 0}, 
    {name: 'Tiger', count: 0}, 
    {name: 'Rabbit', count: 0}, 
    {name: 'Dragon', count: 0}, 
    {name: 'Snake', count: 0}, 
    {name: 'Horse', count: 0}, 
    {name: 'Goat', count: 0}, 
    {name: 'Monkey', count: 0}, 
    {name: 'Rooster', count: 0}, 
    {name: 'Dog', count: 0}, 
    {name: 'Pig', count: 0}
  ]
  
  for(let i=0; i<slotMachineArray.length;i++) {
    for(let j=0; j<animalsArray.length; j++){
      if (animalsArray[j].name === slotMachineArray[i].target.zodiac) {
        animalsArray[j].count++
      }
    }
  }
  
  animalsArray.forEach(zodiac => {
    if(zodiac.count === 4) {
      score = score + 1000
    } else if (zodiac.count === 3) {
      score = score + 100
    } else if (zodiac.count === 2) {
      score = score + 10
    } else {
      score = score + 0
    }
  })
  
  for(let i=0; i< scoresArray.length; i++) {
    if(scoresArray[i].target.round === round) {
      scoresArray[i].target.score = score 
    }
  }
}


function getWinner() {
  for(let i=0; i< scoresArray.length; i++) {
    if(scoresArray[i].target.player === 1) {
      sumA = sumA + scoresArray[i].target.score
    } else if (scoresArray[i].target.player === -1){
      sumB = sumB + scoresArray[i].target.score
    }
  }
  if(sumA === sumB) {
    isWinner = 'T'
  } else if (sumA > sumB) {
    isWinner = 1
  } else {
    isWinner = -1
  } 
  scoresArray[6].target.score = sumA
  scoresArray[7].target.score = sumB
  render()
}

function render() {
  if(isWinner === null) {
    slotMachine.querySelector('#turn-board').textContent = turn === -1 ? "Turn: Player A" : "Turn: Player B"
    if (turn === 1) {
      slotMachine.querySelector('#turn-board').style.color = '#ff6969'
    } else {
      slotMachine.querySelector('#turn-board').style.color = '#6661F1'
    }
  } else {
    hideElement(slotMachine, '#turn-board')
    if (isWinner === 'T') {
      slotMachine.querySelector('#winner-display').textContent = "The game is tied."
    } else {
      slotMachine.querySelector('#winner-display').textContent = isWinner === 1 ? "Player A Wins!" : "Player B Wins!"
      confetti.start(500)
      oxSays.volume = .10
      oxSays.play()
    }
    showElement(slotMachine, '#winner-display')
  }
  
  if(round < 6) {
    if(turn === 1) {
      slotMachine.querySelector('#shuffle-button').className = 'btn shuffle-button-player-b'
      scoreBoard.querySelector('#score-board-B').className = 'score-board-b-turn'
      setClassName(scoreBoard, '#score-board-A', '')
    } else {
      slotMachine.querySelector('#shuffle-button').className = 'btn shuffle-button-player-a'
      if (round < 5) {
      scoreBoard.querySelector('#score-board-A').className = 'score-board-a-turn'
      }
      setClassName(scoreBoard, '#score-board-B', '')
    }
  } else {
    setClassName(scoreBoard, '#score-board-A', '')
    setClassName(scoreBoard, '#score-board-B', '')
  }

  renderScore()
}


function renderScore() {
  if(round < 6) {
    for(let i=0; i<scoresArray.length; i++) {
      if(scoresArray[i].target.player === turn && scoresArray[i].target.round === round) {
        scoresArray[i].textContent = `${scoresArray[i].target.score}`
      }
    }
  } else {    
    scoresArray[6].textContent = `${scoresArray[6].target.score}`
    scoresArray[7].textContent = `${scoresArray[7].target.score}`
  }
  
}




function showElement(dom_ref, element) {
  if(element === undefined)
  {
    dom_ref.removeAttribute("hidden")
  } else {
    dom_ref.querySelector(element).removeAttribute("hidden")
  }

}

function hideElement(dom_ref, element) {
  if(element === undefined)
  {
    dom_ref.setAttribute("hidden", true)
  } else {
    dom_ref.querySelector(element).setAttribute("hidden", true)
  }
}

function setClassName(dom_ref, element, name) {
  dom_ref.querySelector(element).className = name
}

function setTextContent(dom_ref, element, name) {
  dom_ref.querySelector(element).textContent = name
}
