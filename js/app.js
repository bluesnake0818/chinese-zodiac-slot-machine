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

/*---------------------------- Variables (state) ----------------------------*/
let slotMachineArray, scoresArray, turn, round, isWinner, objIndex, sumA, sumB


/*------------------------ Cached Element References ------------------------*/
// 2.1) slotMachine that ttore the 4 div elements that represent the slots in the slot machine.
const slotMachine = document.querySelector('.slot-machine')
const winnerDisplay = document.querySelector('#winner-display')
const turnBoard = document.querySelector('#turn-board')
const replayBtn = document.querySelector('#replay-button')
const playBtn = document.querySelector('#play-button')
const scoreBoard = document.querySelector('#score-board')

// const scoreBoardA = document.querySelector('#score-board-A')
// const scoreBoardB = document.querySelector('#score-board-B')

/*----------------------------- Event Listeners -----------------------------*/
playBtn.addEventListener("click", handlePlay)
replayBtn.addEventListener("click", init)


/*-------------------------------- Functions --------------------------------*/
init()


// 3.1) That initialize function should initialize the state variables:
function init() {
  slotMachineArray = [slot1, slot2, slot3, slot4]
  slotMachineArray.forEach(slot => {
    // Question - how does this work? is event.target an object?
    slot.target = null
    console.log(`slot: ${slot}`)
    console.log(`slot.target: ${slot.target}`)
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

  playBtn.removeAttribute("hidden")
  replayBtn.setAttribute("hidden", true)
  winnerDisplay.setAttribute("hidden", true)
  turnBoard.textContent = ""
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
    playBtn.setAttribute("hidden", true)
    replayBtn.removeAttribute("hidden")
    getWinner()
  }
}


function updateScore() {
  let score = 0
  // console.log(`scoreBoard: ${scoreBoard}`) // why does this print with score as textContent even though it should be cleared to ""
  // apply time delay to see if the textContent element has been reset in HTML

  if (slotMachineArray[0].target.zodiac === slotMachineArray[1].target.zodiac
    && slotMachineArray[0].target.zodiac === slotMachineArray[2].target.zodiac
    && slotMachineArray[0].target.zodiac === slotMachineArray[3].target.zodiac) {
      score = 1000
    } else if ((slotMachineArray[0].target.zodiac === slotMachineArray[1].target.zodiac) && (slotMachineArray[0].target.zodiac === slotMachineArray[2].target.zodiac)
    || (slotMachineArray[0].target.zodiac === slotMachineArray[2].target.zodiac) && (slotMachineArray[0].target.zodiac === slotMachineArray[3].target.zodiac)
    || (slotMachineArray[1].target.zodiac === slotMachineArray[2].target.zodiac) && (slotMachineArray[1].target.zodiac === slotMachineArray[3].target.zodiac)
    || (slotMachineArray[0].target.zodiac === slotMachineArray[1].target.zodiac) && (slotMachineArray[0].target.zodiac === slotMachineArray[3].target.zodiac)
    ) {
      score = 100
    } else if (slotMachineArray[0].target.zodiac === slotMachineArray[1].target.zodiac 
      || slotMachineArray[0].target.zodiac === slotMachineArray[2].target.zodiac 
      || slotMachineArray[0].target.zodiac === slotMachineArray[3].target.zodiac 
      || slotMachineArray[1].target.zodiac === slotMachineArray[2].target.zodiac 
      || slotMachineArray[1].target.zodiac === slotMachineArray[3].target.zodiac 
      || slotMachineArray[2].target.zodiac === slotMachineArray[3].target.zodiac) {
        if (slotMachineArray[0].target.zodiac === slotMachineArray[1].target.zodiac && slotMachineArray[2].target.zodiac === slotMachineArray[3].target.zodiac) {
          score = 20
        } else if (slotMachineArray[0].target.zodiac === slotMachineArray[2].target.zodiac && slotMachineArray[1].target.zodiac === slotMachineArray[3].target.zodiac) {
          score = 20
        } else if (slotMachineArray[0].target.zodiac === slotMachineArray[3].target.zodiac && slotMachineArray[1].target.zodiac === slotMachineArray[2].target.zodiac) {
          score = 20
        } else {
          score = 10
        }
      } else {
        score = 0
      }
      
  // 6.3.3) update scoresArray using "round" and "turn" variables.
  // use yeezy/taylor method to add score list to score board, , use createElement
  // use ternary, use appendChild

  // 6.3.4) update scoreboard  
  // objIndex = scoresArray.findIndex((obj => obj.player === turn && obj.round === round))
  for(let i=0; i< scoresArray.length; i++) {
    if(scoresArray[i].target.round === round) {
      scoresArray[i].target.score = score 
      console.log(scoresArray[i].target.score)
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
    turnBoard.textContent = turn === 1 ? "Player A" : "Player B"
  } else {
    winnerDisplay.removeAttribute("hidden")
    if (isWinner === 'T') {
      winnerDisplay.textContent = "The game is tied."
    } else {
      winnerDisplay.textContent = isWinner === 1 ? "Player A wins!" : "Player B wins!"
    }
  }

  renderScore()
}


function renderScore () {

  if(round < 6) {
    for(let i=0; i<scoresArray.length; i++) {
      if(scoresArray[i].target.player === turn && scoresArray[i].target.round === round) {
        scoresArray[i].textContent = `Player ${turn} - Round ${round} Score: ${scoresArray[i].target.score}`
      }
    }
  } else {
    scoresArray[6].textContent = `Player A - Total Scores: ${scoresArray[6].target.score}`
    scoresArray[7].textContent = `Player B - Total Scores: ${scoresArray[7].target.score}`
  }

}



/*-------------------------------- Pseudocode --------------------------------*/

/* To Do List
// 1. Total scores to update automatically when Round 3 (round === 5) is over.
2. refactor updateScore()
// 3. When player A wins, "Player B wins!" is displayed
4. refactor scoresArray 
// 5. clean up how scores are displayed on HTML (score-board)
6. scoreboard elements don't get cleared after reset.
7. zodiac animals don't get reset
8. time delay for total scores and winner display after 6th play.
9. when score updates, spaces on score board changes --> need adjustment
10. add confetti/favicon
11. change 'alt' in image tag to a corresponding animal name. 
12. button to change color each turn/player
13. see who's winner - then total score and winner is revealed. 
14. winner's total scores are highlighted and colored.
15. choose player
16. display win logic in the corner
17. better way to initialize scoresArray.

*/

/* Findings / questions
1. .target is the same level is .textContent
2. innerHTML not equal to .textContent?
3. is whatever is in the textContent get automatically printed to HTML?
4. what is target? just an object? can i replace it by any object?
5. Are InnerHTML, innerText, textContent all on the same level?
6. InnerHTML, innerText, textContent - if i assigned different strings to each. Which takes precedence?
7. selecting each square to update is much easier than having one button to do all the work. 

*/

/* What was most difficult
1. scoreboard - whether to store and display the scores separately for each player each round.

*/














/*
1) Define the required variables used to track the state of the game.
  1.1) Use an array (slotMachineArray) to represent the slots in the slot machine for each turn in each round.
  1.2) Use ScoresArray1, ScoresArray2 to track scores. keep score of each player each round. Array of arrays.
  1.3) Use a turn variable to track whose turn it is.
  1.4) use a round variable to track which round it is
  1.5) Use a winner variable to represent three different game states:
    a player that won
    a tie has occurred
    or a game that is still in play.

2) Store cached element references.
2.1) slotMachine that ttore the 4 div elements that represent the slots in the slot machine.
These can be accessed by <section class ="Slot-Machine">
div id = slot 1
div id = slot 2
div id = slot 3
div id = slot 4

2.2) Store the element that displays the game status (winner/tie) on the page.
2.3) Store the element that displays the scoreboard on the page.
2.4) Store the element that displays the turn on the page.
2.5) replay button.
2.6) play button.
2.7) scoresBoard


3) Upon loading, the app should invoke init()
3.1) That initialize function should initialize the state variables:
3.1.1) Initialize the slot machine array to 4 nulls to represent empty squares.
The 4 elements will "map" to each slot.
Index 0 represents the far left square.
Index 3 represents the far right square.
3.1.2) Initialize whose turn it is to A (player '1').
Player 'B' will be represented by -1.
3.1.3) Initialize the winner variable to null.
This represents that there is no winner or a tie yet.
The winner variable will hold the player value (1 or -1) if there's a winner.
The winner will hold a 'T' if there's a tie.
3.1.4) Initialize the two arrays that keep track of each player's scores.
3.1.5) Initialize the round (1,2,3) to zero.

4) Define the required constants:
4.1) an array called zodiacsArray that stores all 12 zodiacs (String and Image) from Rat to Pig in order.
[
[RAT, https://www.imgur.com/rat (img of rat)]
.
.
.
[PIG, https://www.imgur.com/rat (img of pig)]
]
4.2) Challenge: The name of celebrities with each jackpot case (for example: Beyonce for 4 rabbits)

5) Next, the app should wait for the user to click which player he/she/they wants to play with
5.1) choosePlayer(evt) is invoked
5.2) if Player A is chosen, turn variable is updated to 1.
5.3) if Player B is chosen, turn variable is updated to -1.

6) Next, the app should wait for the user to click a play button and call handlePlay()
handlePlay() will...

6.1) loop over the slotMachineArray and update each section in the array with a selected zodiac (image) from the zodiacs Array from left to right.
In each of the four loops:
6.1.1) a random number between 0-11 will be chosen and this index will be used to retrieve a zodiac image from the zodiacsArray.
6.1.2) The image from 6.1.1 will be assigned to slotMachineArray[i].innerHTML (?)

6.2) Change the turn by multiplying turn by -1 (this flips a 1 to -1, and vice-versa).

6.3) invoke updateScore (). updateScore() will:
6.3.1) Loop over the slotMachine array (which represents the slots on the page), and for each iteration:
6.3.2) See if there's a pair, triple, or a jackpot (four of the same kind)
6.3.3) update scoresArray using "round" and "turn" variables.
6.3.4) update scoreboard
6.3.2) round++

6.4) call getWinner()
6.4.1) Calculate and store Total Scores: Run "Nested Loop" over scoresArray and if the first three element is not null, calculate total scores and update the last value in each of the two arrays within the scoresArray.

6.4.2) If total scores are the same, update isWinner variable to 'T'. If Player A's score is bigger, update isWinner variable to 1. If Player B's score is bigger, update isWinner variable to -1.
6.4.3) Otherwise return null.

6.5) All state has been updated, so invoke render() to render the state to the page.

7) The render function should:
7.1) Render a message reflecting the current game state:
7.1.1) If winner has a value other than null (game still in progress), render whose turn it is.
7.1.2) If winner is equal to 'T' (tie), render a tie message.
7.1.3) Otherwise, render a congratulatory message to which player has won.

8) Handle a player clicking the replay button:
8.1) Add a replay button to the HTML document
8.2) Store the new replay button element
8.3) Do steps 3) (initialize the state variables) and 7) (render).
*/