/*-------------------------------- Constants --------------------------------*/
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
let tooltips = document.querySelectorAll('[data-toggle="tooltip"]')
const oxSays = new Audio('../audio/ox.mp3')
const favicon = document.querySelector('#favicon')

/*------------------------ Cached Element References ------------------------*/
const choosePlayer = document.querySelector('#choose-player')
const slotMachine = document.querySelector('#slot-machine')
const scoreBoard = document.querySelector('#score-board')

/*----------------------------- Event Listeners -----------------------------*/
slotMachine.querySelector('#replay-button').addEventListener("click", init)
choosePlayer.querySelector('#scroll').addEventListener("click", showPlayer)
choosePlayer.querySelector('#select-button').addEventListener("click", selectPlayer)
choosePlayer.querySelector('#play-button').addEventListener("click", handlePlay)
slotMachine.querySelector('#shuffle-button').addEventListener("click", handleShuffle)
tooltips.forEach(tooltip => tooltip.tooltip())

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
    score.textContent = ""
  })
  
  choosePlayer.querySelector('#title').textContent = "Player A, choose your zodiac."
  choosePlayer.removeAttribute("hidden")
  choosePlayer.querySelector('#select-button').setAttribute("hidden", true)
  choosePlayer.querySelector('#play-button').setAttribute("hidden", true)
  choosePlayer.querySelector('#select-button').className = 'btn select-button'
  choosePlayer.querySelector('#title').className = ''
  choosePlayer.querySelector('#show-player').className = ''
  choosePlayer.querySelector('#demo-img').className = ''
  choosePlayer.querySelector('#title').removeAttribute('hidden')
  choosePlayer.querySelector('#show-player').removeAttribute('hidden')
  
  slotMachine.setAttribute("hidden", true)
  slotMachine.querySelector('#replay-button').setAttribute("hidden", true)
  slotMachine.querySelector('#turn-board').textContent = ""
  slotMachine.querySelector('#winner-display').textContent = ""
  slotMachine.querySelector('#turn-board').textContent = "Turn: Player A"
  slotMachine.querySelector('#turn-board').style.color = '#6661F1'
  slotMachine.querySelector('#shuffle-button').className = 'btn shuffle-button-player-a'
  
  scoreBoard.setAttribute("hidden", true)
  scoreBoard.querySelector('#score-board-A').className = 'score-board-a-turn'
  scoreBoard.querySelector('#score-board-B').className = ''
  scoreBoard.querySelector('#scoreboard-title').title= "2 of a kind: 10 / 3 of a kind: 100 / 4 of a kind: 1000"
}

function handlePlay() {
  //hide and show elements that are in selectPlayer() all go here
  choosePlayer.setAttribute("hidden", true)
  slotMachine.removeAttribute("hidden")
  slotMachine.querySelector('#turn-board').removeAttribute("hidden")
  slotMachine.querySelector('#shuffle-button').removeAttribute("hidden")
  scoreBoard.removeAttribute("hidden")

  choosePlayer.querySelector(`#${playerAName}`).className = 'selection-img'
  choosePlayer.querySelector(`#${playerBName}`).className = 'selection-img'
}

function showPlayer(evt) {
  choosePlayer.querySelector('#select-button').removeAttribute("hidden")
  choosePlayer.querySelector('#select-button').className = 'btn select-button animate-in'
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
  choosePlayer.querySelector('#select-button').removeAttribute("hidden")
  
  if (turn === 1) {
    let zodIdx = zodiacsArray.findIndex(element => element.zodiac === playerAName)
    let zodName = `${zodiacsArray[zodIdx].zodiac}`
    let zodTag = `${zodiacsArray[zodIdx].tag}-p`
    scoreBoard.querySelector('#player-a-name').className = zodTag
    scoreBoard.querySelector('#player-a-name').textContent = ""
    //time delay -- slide animation
    turn = turn * -1
    choosePlayer.querySelector('#title').textContent = "Player B, choose Your zodiac"
    choosePlayer.querySelector('.select-button').className = 'btn select-button-b'
    choosePlayer.querySelector('#select-button').setAttribute("hidden",true)
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
      scoreBoard.querySelector('#player-b-name').textContent = ""

      turn = turn * -1
      
      
      choosePlayer.querySelector('#title').className = 'animate-out'
      choosePlayer.querySelector('#show-player').className = 'animate-out'
      choosePlayer.querySelector('#select-button').className = 'btn animate-out'
      
      
      setTimeout(function() {
      choosePlayer.querySelector('#title').setAttribute('hidden', true)
      choosePlayer.querySelector('#show-player').setAttribute('hidden', true)
      choosePlayer.querySelector('#select-button').setAttribute('hidden', true)
      
      
      choosePlayer.querySelector("#play-button").removeAttribute('hidden')
      choosePlayer.querySelector('#play-button').className = 'btn animate-in'
      }, (1000))
    }
  }
  
}

function handleShuffle() {
  shuffle()
  
  setTimeout(function() {
    scoreBoard.querySelector('#scoreboard-title').removeAttribute("hidden")
    scoreBoard.removeAttribute("hidden")
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
      slotMachine.querySelector('#shuffle-button').setAttribute("hidden", true)
      setTimeout(function() {
        slotMachine.querySelector('#replay-button').removeAttribute("hidden")
        getWinner()
      }, 1000);
    }
  }, (numberSlot4*50+1000))
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
  
  // iterate over slotMachineArray to count how many each zodiac appeared each time slot machine is played. 
  for(let i=0; i<slotMachineArray.length;i++) {
    for(let j=0; j<animalsArray.length; j++){
      if (animalsArray[j].name === slotMachineArray[i].target.zodiac) {
        animalsArray[j].count++
      }
    }
  }
  
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
    slotMachine.querySelector('#turn-board').textContent = turn === -1 ? "Turn: Player A" : "Turn: Player B"
    if (turn === 1) {
      slotMachine.querySelector('#turn-board').style.color = '#ff6969'
    } else {
      slotMachine.querySelector('#turn-board').style.color = '#6661F1'
    }
  } else {
    slotMachine.querySelector('#turn-board').setAttribute("hidden", true)
    if (isWinner === 'T') {
      slotMachine.querySelector('#winner-display').textContent = "The game is tied."
    } else {
      slotMachine.querySelector('#winner-display').textContent = isWinner === 1 ? "Player A Wins!" : "Player B Wins!"
      confetti.start(500)
      oxSays.volume = .20
      oxSays.play()
    }
    slotMachine.querySelector('#winner-display').removeAttribute("hidden")
  }
  
  // if(round => 5) {
  //   scoreBoard.querySelector('#score-board-A').className = ''
  // //   scoreBoard.querySelector('#score-board-B').className = ''
  // } else {
  if(turn === 1) {
    slotMachine.querySelector('#shuffle-button').className = 'btn shuffle-button-player-b'
    scoreBoard.querySelector('#score-board-B').className = 'score-board-b-turn'
    scoreBoard.querySelector('#score-board-A').className = ''
  } else {
    slotMachine.querySelector('#shuffle-button').className = 'btn shuffle-button-player-a'
    scoreBoard.querySelector('#score-board-A').className = 'score-board-a-turn'
    scoreBoard.querySelector('#score-board-B').className = ''
  }
  // }

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


function shuffle(){
  let numChanges = randomInt(1,4)*7
	let numberSlot1 = numChanges+randomInt(1,7)
	let numberSlot2 = numChanges+2*7+randomInt(1,7)	
	let numberSlot3 = numChanges+4*7+randomInt(1,7)
  numberSlot4 = numChanges+6*7+randomInt(1,7)
  
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


/*-------------------------------- Pseudocode --------------------------------*/

/* Deprecated

// const showPlayerArea = document.querySelector('#show-player')
// const selectBtn = document.querySelector('#select-button')
// const shuffleBtn = document.querySelector('#shuffle-button')
// const winnerDisplay = document.querySelector('#winner-display')
// const turnBoard = document.querySelector('#turn-board')
// const replayBtn = document.querySelector('#replay-button')

// const scoreboardTitle = document.querySelector('#scoreboard-section-title')
// const playerA = document.querySelector('#player-a-name')
// const playerB = document.querySelector('#player-b-name')

// const tooltip = document.querySelector('#tool-tip')

// const oxImg = document.querySelector('#ox-img')

// oxImg.addEventListener('click', (evt) => {
  //   oxSays.volume = .20
  //   oxSays.play()
  // })
  // choosePlayer('click', choosePlayer)
  
  // showPlayerArea.removeAttribute("hidden")
  
  // selectBtn.setAttribute("hidden", true)
  // scoreboardTitle.setAttribute("hidden", true)
  // tooltip.setAttribute("hidden", true)
  // shuffleBtn.setAttribute("hidden", true)
  // replayBtn.setAttribute("hidden", true)
  // winnerDisplay.setAttribute("hidden", true)
  // turnBoard.removeAttribute("hidden")
  
  
  // playerImg.src = evt.target.src
  // selectBtn.className.add = "player-b-select-btn"
  // favicon.href =  "./assets/designs_dragon.png"
  // showPlayerArea.setAttribute("hidden", true)
  // selectBtn.setAttribute("hidden", true)
  // shuffleBtn.removeAttribute("hidden")
  // scoreboardTitle.removeAttribute("hidden")
  // tooltip.removeAttribute("hidden")
  // turnBoard.removeAttribute("hidden")
  */
 
 
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
// 32. "Zodiac Image" Alt Too big.
33. replace select player area with scrollspy.
34. turn is opposite
35. integrate 4 spin functions into one.
36. choose player with nav scrollspy
37. favicon gets updated. 
38. select button only shows when a zodiac is clcicked. 
39. click zodiac tool tip.
40. winner's music plays afteer winning
41. remove button after the 6th play so user can't click it. 
42. share toggle
43. insert player's name at the end. 
44. gameboy skin
45. replay - updates selectPlayer.
46. Turn --> change button with alternating color
47. show who each player chosen
48.   // use yeezy/taylor method to add score list to score board, , use createElement. // use ternary, use appendChild
49. tool tip : line break
// 50. borderline of scoreboard area
51. bug that scoreboard doesn't disappaear when game is over
52. when selecting zodiac, it shows on the bottom before going to slot machine
53. animation between select player and slot machine
54. choose player - animal doesn't reset to original position 
55. choose player - title color changes based on who is picking
56. make it so that shuffle button cannot be clicked twice. 
57. turn/winner display should move down to bottom. 
58. take away scroll and show all 12. description sits outside. 
59. accept name from the player
60. once chosen, the bg image of the zodiac becomes red.
61. animal sound when choosing.
62. selection area to fade in and out. 
63. classList add
64. ways to show you've referenced a code (give the credit)
*/

/*
Feb 14 - 
    // a. slot machine effect
    b. select player area - hide (animation - slide up & down), sound
    // c. Tool Tip
    d. css
    e. buttom --> "spin", span the width. 
    f. get rid of x's turn and instead highlight border of scoreboard or the background of the rectangle. 
    g. select --> show who's turn to play. can't select the same player. 
Feb 15 - 
    a. CTA - download
    b. Who you get along with
    // c. update score area with chosen zodiac's image. 
    d. spin sound
    e. update scoreboard with append child
    f. refactor doShuffle()
    // g. check if two pairs are working
    // h. two pairs
    i. when everything is done, confetti and sound should play last. 
Feb 16 - 
    a. Adjust chance of winning in accordance with zodiac selection 
    b. you put in your bday, and the animal is chosen
    c. show official results board
Feb 17 - 
    a. Clean up code
    b. refactor
    c. user test
    d. write readme 

Feb 18 - 
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
21. // console.log(`scoreBoard: ${scoreBoard}`) // why does this print with score as textContent even though it should be cleared to "". apply time delay to see if the textContent element has been reset in HTML
22. #score-board-B > .score-board-b-turn { why doesn't this work?
23. unit 1 assessment : why does font size from body change
*/

/* What was most difficult
1. scoreboard - whether to store and display the scores separately for each player each round.
2. slot machine effect - fidning the resource/documentation
3. image size
4. tool tip
*/