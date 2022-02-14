/*-------------------------------- Constants --------------------------------*/
// 4) Define the required constants:
// 4.2) Challenge: The name of celebrities with each jackpot case (for example: Beyonce for 4 rabbits)

const zodiacsArray = 
[
  {zodiac: 'Rat', tag:"a1", url: "./assets/designs_rat.png", desc: 'Rat is a cunning animal.', luck: 'Luck: +2'},
  {zodiac: 'Ox', tag:"a2", url: "./assets/designs_ox.png", desc: 'Ox is a diligent animal.', luck: 'Luck: +3'},
  {zodiac: 'Tiger', tag:"a3", url: "./assets/designs_tiger.png", desc: 'Tiger is a courageous animal.', luck: 'Luck: +10'},
  {zodiac: 'Rabbit', tag:"a4", url: "./assets/designs_rabbit.png", desc: 'Rabbit is an opportunistic animal', luck: 'Luck: +12'},
  {zodiac: 'Dragon', tag:"a5", url: "./assets/designs_dragon.png", desc: 'Dragon is a legendary animal.', luck: 'Luck: +25'},
  {zodiac: 'Snake', tag:"a6", url: "./assets/designs_snake.png", desc: 'Snake is a wise animal.', luck: 'Luck: +1'},
  {zodiac: 'Horse', tag:"a7", url: "./assets/designs_horse.png", desc: 'Horse is a free-spirited animal.', luck: 'Luck: -2'},
  {zodiac: 'Goat', tag:"a8", url: "./assets/designs_goat.png", desc: 'Goat is a peaceful animal.', luck: 'Luck: -10'},
  {zodiac: 'Monkey', tag:"a9", url: "./assets/designs_monkey.png", desc: 'Monkey is a playful animal.', luck: 'Luck: -100'},
  {zodiac: 'Rooster', tag:"a10", url: "./assets/designs_rooster.png", desc: 'Rooster is a worried animal.', luck: 'Luck: +20'},
  {zodiac: 'Dog', tag:"a11", url: "./assets/designs_dog.png", desc: 'Dog is a friendly animal.', luck: 'Luck: +35'},
  {zodiac: 'Pig', tag:"a12", url: "./assets/designs_pig.png", desc: 'Pig is a hungry animal.', luck: 'Luck: +40'}
]

/*---------------------------- Variables (state & etc) ----------------------------*/
let slotMachineArray, scoresArray, turn, round, isWinner, sumA, sumB, playerAName, playerBName, count, numberSlot4
const oxSays = new Audio('../audio/ox.mp3')
const favicon = document.querySelector('#favicon')
// var scrollSpy = new bootstrap.ScrollSpy(document.body, {
//   target: '#navbar-example'
// })

/*------------------------ Cached Element References ------------------------*/
// 2.1) slotMachine that ttore the 4 div elements that represent the slots in the slot machine.
const slotMachine = document.querySelector('.slot-machine')
const winnerDisplay = document.querySelector('#winner-display')
const turnBoard = document.querySelector('#turn-board')
const replayBtn = document.querySelector('#replay-button')
const playBtn = document.querySelector('#play-button')
const scoreBoard = document.querySelector('#score-board')
// const oxImg = document.querySelector('#ox-img')
const choosePlayer = document.querySelector('#choose-player')
const showPlayerArea = document.querySelector('#show-player')
// const playerImg = document.querySelector('#player-img')
const playerDesc = document.querySelector('#player-desc')
const playerLuck = document.querySelector('#player-luck')
const selectBtn = document.querySelector('#select-button')
const playerA = document.querySelector('#player-a-name')
const playerB = document.querySelector('#player-b-name')
// const doSpin = document.querySelector('#spin')
const scoreboardTitle = document.querySelector('#scoreboard-section-title')
const tooltip = document.querySelector('#tool-tip')



/*----------------------------- Event Listeners -----------------------------*/
playBtn.addEventListener("click", handlePlay)
replayBtn.addEventListener("click", init)
// oxImg.addEventListener('click', (evt) => {
//   oxSays.volume = .20
//   oxSays.play()
// })
// choosePlayer('click', choosePlayer)
showPlayerArea.addEventListener("click", showPlayer)
selectBtn.addEventListener("click", selectPlayer)
// doSpin.addEventListener('click', doSlot)
// $(document).ready(function(){
//   $('[data-toggle="tooltip"]').tooltip();   
// });

/*-------------------------------- Functions --------------------------------*/

init()




// 3.1) That initialize function should initialize the state variables:
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
    score.textContent = ""
  })
  
  slotMachine.setAttribute("hidden", true)
  playBtn.setAttribute("hidden", true)
  scoreBoard.setAttribute("hidden", true)
  scoreboardTitle.setAttribute("hidden", true)
  tooltip.setAttribute("hidden", true)

  // playBtn.removeAttribute("hidden")
  replayBtn.setAttribute("hidden", true)
  winnerDisplay.setAttribute("hidden", true)
  turnBoard.textContent = ""
  turnBoard.removeAttribute("hidden")
  // reset score board
  
  choosePlayer.textContent = "Player A, choose your zodiac."
  choosePlayer.removeAttribute("hidden")
  showPlayerArea.removeAttribute("hidden")
  // selectBtn.removeAttribute("hidden")
  selectBtn.setAttribute("hidden", true)
  
  // render()
}





function handlePlay() {
  // let randZodIdx

  doSlot()

  setTimeout(function() {
    for(let i=0; i<slotMachineArray.length; i++) {
      let zodTag = slotMachineArray[i].className
      let zodIdx = zodiacsArray.findIndex(element => element.tag === zodTag)
      console.log(`idx: ${zodIdx}`)
      slotMachineArray[i].target = zodiacsArray[zodIdx]
      console.log(`slot machine array: ${slotMachineArray[i].target.zodiac}`)
    //   console.log(`zodiac arrays: ${zodiacsArray[i].target}`)
      
    }
    

    updateScore()
    render()
    turn = turn * -1
    round++
    
    if(round === 6) {
      // add time delay
      setTimeout(function() {
        playBtn.setAttribute("hidden", true)
        replayBtn.removeAttribute("hidden")
        getWinner()
      }, 1000);
    }
  }, (numberSlot4*50+1000))
}


function updateScore() {
  let score = 0
  // console.log(`scoreBoard: ${scoreBoard}`) // why does this print with score as textContent even though it should be cleared to ""
  // apply time delay to see if the textContent element has been reset in HTML
  
  // make it into an object
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
  
  // iterate over slotMachineArray to count how many each zodiac appeared each time slot machine is played. 
  for(let i=0; i<slotMachineArray.length;i++) {
    for(let j=0; j<animalsArray.length; j++){
      if (animalsArray[j].name === slotMachineArray[i].target.zodiac) {
        animalsArray[j].count++
      }
    }
  }
  
  // use find() to find score
  // iterate over animalsarray to check how many times each animal appeared and update score variable. 
  animalsArray.forEach(zodiac => {
    if(zodiac.count === 4) {
      score = score + 1000
    } else if (zodiac.count === 3) {
      score = score + 100
    } else if (zodiac.count === 2) {
      // calculate two pairs
      score = score + 10
    } else {
      score = score + 0
    }
  })
  
  // 6.3.3) update scoresArray using "round" and "turn" variables.
  // use yeezy/taylor method to add score list to score board, , use createElement
  // use ternary, use appendChild
  
  // 6.3.4) update scoreboard  
  for(let i=0; i< scoresArray.length; i++) {
    if(scoresArray[i].target.round === round) {
      scoresArray[i].target.score = score 
    }
    
  }
}



function getWinner() {
  for(let i=0; i< scoresArray.length; i++) {
    // use reduce
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
    turnBoard.textContent = turn === 1 ? "Turn: Player A" : "Turn: Player B"
  } else {
    if (isWinner === 'T') {
      winnerDisplay.textContent = "The game is tied."
    } else {
      winnerDisplay.textContent = isWinner === 1 ? "Player A Wins!" : "Player B Wins!"
      confetti.start(500)
      oxSays.volume = .20
      oxSays.play()
    }
    winnerDisplay.removeAttribute("hidden")
    turnBoard.setAttribute("hidden", true)
  }
  
  renderScore()
}


function renderScore () {
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

function showPlayer(evt) {
  // playerImg.src = evt.target.src
  selectBtn.removeAttribute("hidden")
  for(let i=0; i<zodiacsArray.length; i++) {
    if(zodiacsArray[i].zodiac === evt.target.id) {
      playerDesc.textContent = zodiacsArray[i].desc
      playerLuck.textContent = zodiacsArray[i].luck
      if(turn === 1) {
        playerAName = zodiacsArray[i].zodiac
      } else {
        playerBName = zodiacsArray[i].zodiac
      }
    }
  }
    
}

function doSlot(){
	let numChanges = randomInt(1,4)*7
	let numberSlot1 = numChanges+randomInt(1,7)
	let numberSlot2 = numChanges+2*7+randomInt(1,7)	
	let numberSlot3 = numChanges+4*7+randomInt(1,7)
  numberSlot4 = numChanges+6*7+randomInt(1,7)

  console.log (numberSlot4)

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
	// returns a random integer between min and max inclusive
	return Math.floor((Math.random() * (max-min+1)) + min);
}





// function selectPlayer(evt) {
//   if(evt.target.textContent === 'A') {
//     turn = 1
//   } else if (evt.target.textContent === 'B') {
//     turn = -1
//   }
// }


function selectPlayer() {
  selectBtn.removeAttribute("hidden")
  if (turn === 1) {
  let zodIdx = zodiacsArray.findIndex(element => element.zodiac === playerAName)
  let zodTag = `${zodiacsArray[zodIdx].tag}-p`
  playerA.className = zodTag
  playerA.textContent = ""
  //time delay -- slide animation
  //assign turn 
    turn = turn * -1
  choosePlayer.textContent = "Player B, choose Your zodiac"
  // selectBtn.className.add = "player-b-select-btn"
  } else {
    if(playerBName === playerAName) {
    alert("You must pick a different player")
    } else {  
    let zodIdx = zodiacsArray.findIndex(element => element.zodiac === playerBName)
    let zodTag = `${zodiacsArray[zodIdx].tag}-p`
    playerB.className = zodTag
    playerB.textContent = ""
    choosePlayer.setAttribute("hidden", true)
    showPlayerArea.setAttribute("hidden", true)
    selectBtn.setAttribute("hidden", true)

    slotMachine.removeAttribute("hidden")
    playBtn.removeAttribute("hidden")
    scoreBoardTitle.removeAttribute("hidden")
    scoreBoard.removeAttribute("hidden")
    tooltip.removeAttribute("hidden")
    turnBoard.removeAttribute("hidden")
    turn = turn * -1
    }

  }


}




/*-------------------------------- Pseudocode --------------------------------*/

/* To Do List
// 1. Total scores to update automatically when Round 3 (round === 5) is over.
// 2. refactor updateScore()
// 3. When player A wins, "Player B wins!" is displayed
4. refactor scoresArray 
// 5. clean up how scores are displayed on HTML (score-board)
// 6. scoreboard elements don't get cleared after reset.
// 7. zodiac animals don't get reset
// 8. time delay for total scores and winner display after 6th play.
// 9. when score updates, spaces on score board changes --> need adjustment
// 10. add confetti
// 11. change 'alt' in image tag to a corresponding animal name. 
12. button to change color each turn/player
13. see who's winner - then total score and winner is revealed. 
14. winner's total scores are highlighted and colored.
15. choose player - if player is chosen, play button shows and choose player section disappears.
// 16. display win logic in the corner
17. better way to initialize scoresArray.
18. adjust to real-size desktop and mobile later
19. desktop responsive (media query)
20. instructions - tool tip
21. show which zodiac the zodiacs in each pillar gets along with.
22. clearn up css (code-level) area with structure
// 23. create empty scoreboard shell to begin with --> four div(flex) areas with stub
24. Create phone frame around the screen
25. choose player among 12 zodiacs and their sound is played when won. when there's a tie, a cat's sound is played. 
// 26. add favicon
26. choose one of 12 zodiacs and they play the sound. and change to their favicon
// 27. scroll effect 
28. there's a bug when you hit play again during the time delay before total sdcores are revealed, it shows the total sdcore right away.
29. chooose somewhere in between the animals, it returns error in choose player
30. refactor show player() with event bubbling
31. build animation to slide up select area
32. "Zodiac Image" Alt Too big.
33. replace select player area with scrollspy.
34. turn is opposite
35. integrate 4 spin functions into one.
36.choose player with nav scrollspy
37. favicon gets updated. 
38. select button only shows when a zodiac is clcicked. 
39. click zodiac tool tip.
40. winner's music plays afteer winning
41. remove button after the 6th play so user can't click it. 
42. share toggle
43. insert player's name at the end. 
*/

/*
Feb 14 - 
    // a. slot machine effect
    b. select player area - hide (animation - slide up & down), sound
    c. Tool Tip
    d. css
    e. buttom --> "spin", span the width. 
    f. get rid of x's turn and instead highlight border of scoreboard or the background of the rectangle. 
    g. select --> show who's turn to play. can't select the same player. 
Feb 15 - 
    a. CTA - download
    b. Who you get along with
    c. update score area with chosen zodiac's image. 
    d. spin sound
Feb 16 - 
    a. Adjust chance of winning in accordance with zodiac selection 
    b. you put in your bday, and the animal is chosen
    c. show official results board
Feb 17 - 
    a. Clean up code
    b. refactor
    c. user test
    d. write readme 

Feb 16 - 
    a. GA events
*/

/* Findings / questions
1. .target is the same level is .textContent
2. innerHTML not equal to .textContent?
3. is whatever is in the textContent get automatically printed to HTML?
4. what is target? just an object? can i replace it by any object?
5. Are InnerHTML, innerText, textContent all on the same level?
6. InnerHTML, innerText, textContent - if i assigned different strings to each. Which takes precedence?
7. selecting each square to update is much easier than having one button to do all the work. 
8. what does font-size: 62.5%; do?
9. what does min-height do?
10. what does 100vh do?
11. what does view port do?
12. the screen doesn't move to center when body width is defined in body css. 
13. vh, vp, vw, min, max
14. when you do pass through (evt) as a parameter for addeventlisteners
15. what does session contents restored from 2/12/2022 at 4:20:50 PM mean?
16. things like audio variable shoudl go under variables (state)?
17. set at flex-start and then adjusting the margins is easier - than space around - contrary to what i thought at the beginning.
18. what's em and rem
19. img src vs. div background-image for slot machine
20. give padding to main rather than giving margin/padding to  elements inside. 
*/

/* What was most difficult
1. scoreboard - whether to store and display the scores separately for each player each round.
2. slot machine effect - fidning the resource/documentation
3. image size
*/