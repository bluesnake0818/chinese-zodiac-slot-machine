/*-------------------------------- Constants --------------------------------*/
// 4) Define the required constants:
// 4.1) an array called zodiacsArray that stores all 12 zodiacs (String and Image) from Rat to Pig in order.
// [
// [RAT, https://www.imgur.com/rat (img of rat)]
// .
// .
// .
// [PIG, https://www.imgur.com/rat (img of pig)]
// ]
// 4.2) Challenge: The name of celebrities with each jackpot case (for example: Beyonce for 4 rabbits)
const zodiacsArray = 
[
  ['rat', "./assets/designs_rat.png"],
  ['ox', "./assets/designs_ox.png"],
  ['tiger', "./assets/designs_tiger.png"],
  ['rabbit', "./assets/designs_rabbit.png"],
  ['dragon', "./assets/designs_dragon.png"],
  ['snake', "./assets/designs_snake.png"],
  ['horse', "./assets/designs_horse.png"],
  ['goat', "./assets/designs_goat.png"],
  ['monkey', "./assets/designs_monkey.png"],
  ['rooster', "./assets/designs_rooster.png"],
  ['dog', "./assets/designs_dog.png"],
  ['pig', "./assets/designs_pig.png"]
]

/*---------------------------- Variables (state) ----------------------------*/
// 1) Define the required variables used to track the state of the game.
//   1.1) Use an array (slotMachineArray) to represent the slots in the slot machine for each turn in each round.
//   1.2) Use ScoresArray1, ScoresArray2 to track scores. keep score of each player each round. Array of arrays.
//   1.3) Use a turn variable to track whose turn it is.
//   1.4) use a round variable to track which round it is
//   1.5) Use a winner variable to represent three different game states:
//     a player that won
//     a tie has occurred
//     or a game that is still in play.
let slotMachineArray, scoresArrayA, scoresArrayB, turn, round, isWinner


/*------------------------ Cached Element References ------------------------*/
// 2.1) slotMachine that ttore the 4 div elements that represent the slots in the slot machine.
//These can be accessed by <section class ="Slot-Machine">
const slotMachine = document.querySelector('slot-machine')
// 2.2) Store the element that displays the game status (winner/tie) on the page.
const winnerDisplay = document.querySelector('winner-display')
// 2.4) Store the element that displays the turn on the page.
const turnBoard = document.querySelector('turn-board')
// 2.5) replay button.
const replayBtn = document.querySelector('replay-button')
// 2.6) play button.
const playBtn = document.querySelector('play-button')
// 2.7) scoresBoard
const scoreBoard = document.querySelector('score-board')

/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/
// 3) Upon loading, the app should invoke init()
init()


// 3.1) That initialize function should initialize the state variables:

function init() {
  // 3.1.1) Initialize the slot machine array to 4 nulls to represent empty squares.
    // The 4 elements will "map" to each slot.
    // Index 0 represents the far left square.
    // Index 3 represents the far right square.
  slotMachineArray = [slot1, slot2, slot3, slot4]
  slotMachineArray.forEach(slot => {
    slot.target.value = null
    slot.target.innerHTML = ""
  });
  // 3.1.2) Initialize whose turn it is to A (player '1').
    // Player 'B' will be represented by -1.
  turn = 1
  
  // 3.1.3) Initialize the winner variable to null.
  // This represents that there is no winner or a tie yet.
  // The winner variable will hold the player value (1 or -1) if there's a winner.
  // The winner will hold a 'T' if there's a tie.
  isWinner = null

  // 3.1.4) Initialize the two arrays that keep track of each player's scores.
  scoresArrayA = []
  scoresArrayB = []
  // 3.1.5) Initialize the round (1,2,3) to zero.
  round = 0
}

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