/*-------------------------------- Constants --------------------------------*/
// 4) Define the required constants:
// 4.2) Challenge: The name of celebrities with each jackpot case (for example: Beyonce for 4 rabbits)

const zodiacsArray = 
[
  {zodiac: 'rat', url: "./assets/designs_rat.png"},
  {zodiac: 'ox', url: "./assets/designs_ox.png"},
  {zodiac: 'tiger', url: "./assets/designs_tiger.png"},
  {zodiac: 'rabbit', url: "./assets/designs_rabbit.png"},
  {zodiac: 'dragon', url: "./assets/designs_dragon.png"},
  {zodiac: 'snake', url: "./assets/designs_snake.png"},
  {zodiac: 'horse', url: "./assets/designs_horse.png"},
  {zodiac: 'goat', url: "./assets/designs_goat.png"},
  {zodiac: 'monkey', url: "./assets/designs_monkey.png"},
  {zodiac: 'rooster', url: "./assets/designs_rooster.png"},
  {zodiac: 'dog', url: "./assets/designs_dog.png"},
  {zodiac: 'pig', url: "./assets/designs_pig.png"}
]

/*---------------------------- Variables (state & etc) ----------------------------*/
let slotMachineArray, scoresArray, turn, round, isWinner, sumA, sumB
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
const oxImg = document.querySelector('#ox-img')
// const choosePlayer = document.querySelector('#choose-player')


/*----------------------------- Event Listeners -----------------------------*/
playBtn.addEventListener("click", handlePlay)
replayBtn.addEventListener("click", init)
oxImg.addEventListener('click', (evt) => {
  oxSays.volume = .20
  oxSays.play()
})
// choosePlayer('click', choosePlayer)


/*-------------------------------- Functions --------------------------------*/
init()


// 3.1) That initialize function should initialize the state variables:
function init() {
  slotMachineArray = [slot1, slot2, slot3, slot4]
  slotMachineArray.forEach(slot => {
    // Question - how does this work? is event.target an object?
    slot.src = zodiacsArray[2].url
    slot.target = zodiacsArray[2]
  })

  turn = 1
  isWinner = null
  round = 0
  sumA = 0
  sumB = 0

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

  playBtn.removeAttribute("hidden")
  replayBtn.setAttribute("hidden", true)
  winnerDisplay.setAttribute("hidden", true)
  turnBoard.textContent = ""
  turnBoard.removeAttribute("hidden")
  // reset score board

}

// 5) Next, the app should wait for the user to click which player he/she/they wants to play with
function choosePlayer(evt) {
  if(evt.target.textContent === 'A') {
    turn = 1
  } else if (evt.target.textContent === 'B') {
    turn = -1
  }
}
  

// 6) Next, the app should wait for the user to click a play button and call handlePlay()
function handlePlay() {
  let randZodIdx
  for(let i=0; i<slotMachineArray.length; i++) {
    randZodIdx = Math.floor(Math.random() * zodiacsArray.length)
    slotMachineArray[i].src = zodiacsArray[randZodIdx].url
    slotMachineArray[i].target = zodiacsArray[randZodIdx]
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
}


function updateScore() {
  let score = 0
  // console.log(`scoreBoard: ${scoreBoard}`) // why does this print with score as textContent even though it should be cleared to ""
  // apply time delay to see if the textContent element has been reset in HTML

  // make it into an object
  const animalsArray = 
  [
    {name: 'rat', count: 0}, 
    {name: 'ox', count: 0}, 
    {name: 'tiger', count: 0}, 
    {name: 'rabbit', count: 0}, 
    {name: 'dragon', count: 0}, 
    {name: 'snake', count: 0}, 
    {name: 'horse', count: 0}, 
    {name: 'goat', count: 0}, 
    {name: 'monkey', count: 0}, 
    {name: 'rooster', count: 0}, 
    {name: 'dog', count: 0}, 
    {name: 'pig', count: 0}
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
    // setTimeout(function() {
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
    // }, 1000);
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

// let timer = setInterval(function(){
//   let timeLeft = 10
//   timeLeft -= 1
//   if(timeLeft < 0) {
//     countdownEl.textContent = 'Finished!'
//     confetti.start(500)
//     clearInterval(timer)
//   }
//   // console.log(timeLeft)
// }, 1000)

// let timer = setInterval(function(){
//   if(timeLeft < 0) {
//     countdownEl.textContent = 'Finished!'
//     confetti.start(500)
//     clearInterval(timer)
//   }
//   // console.log(timeLeft)
// }, 1000)



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
9. when score updates, spaces on score board changes --> need adjustment
// 10. add confetti
11. change 'alt' in image tag to a corresponding animal name. 
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
27. scroll effect 
28. there's a bug when you hit play again during the time delay before total sdcores are revealed, it shows the total sdcore right away.
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
*/

/* What was most difficult
1. scoreboard - whether to store and display the scores separately for each player each round.

*/