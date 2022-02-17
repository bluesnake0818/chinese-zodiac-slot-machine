# Chinese Zodiac Slot Machine

## A Javascript-based slot machine game

## Getting Started
- <a href="https://chinese-zodiac-slot-machine.surge.sh/">Game Link</a>
- You need 2 players to play the game.
- Each player will choose a zodiac avatar, and play the slot machine as an avatar.

## Screenshots
<img src="https://i.imgur.com/TGwyUzE.png" width="160px" height="280x" alt="screenshot-1">
<img src="https://i.imgur.com/u6XYpsE.png" width="160px" height="280x" alt="screenshot-2">
<img src="https://i.imgur.com/1i1WnUs.png" width="160px" height="280x" alt="screenshot-3">
<img src="https://i.imgur.com/nxs5Zql.png" width="160px" height="280x" alt="screenshot-4">
<img src="https://i.imgur.com/cDT2YrO.png" width="160px" height="280x" alt="screenshot-7">
<img src="https://i.imgur.com/d2UmKmv.png" width="160px" height="280x" alt="screenshot-8">

## Technologies Used 
- JavaScript, HTML, CSS, etc.

## Credits
- Slot machine effect: https://github.com/tognee/JavascriptSlotMachine/blob/master/index.html

## Why I Started This
- I started this project to create a marketing material for our company's product. 

## Challenges
- The more I develop it, I keep finding more stuff to want to add or fix, but it becomes incrementally harder to add or fix stuff because the design elements are all relative. When I change one stuff, I need to track where I hide and show the elements. At some point I feel like is it worth it to spend couple hours to fix a minor bug. I have to find a better architecture to do it more efficiently later when it scales. 
- Scoreboard - whether to store and display the scores separately for each player each round.
- Slot machine effect - fidning good reference with easy-to-follow documentation for self-implementation.
- Hiding/Showing elements - more difficult as there were more features and css were added.
- Image size. Original size was 3000px X 3000px so when set as a bg image, it didn't show. I thought there was something wrong with the way I coded.
- Implementing tool tip
- Finding free animal sound files. Also, it was difficult to find good rat, rabbit, and monkey sound files
- Fixing items were incrementally more difficult as more features were added - non-scalable code.


## Findings/Questions
- .target is the same level is .textContent
- innerHTML not equal to .textContent?
- is whatever is in the textContent get automatically printed to HTML?
- what is target? just an object? can i replace it by any object?
- Are InnerHTML, innerText, textContent all on the same level?
- InnerHTML, innerText, textContent - if i assigned different strings to each. Which takes precedence?
- selecting each square to update is much easier than having one button to do all the work. 
- what does font-size: 62.5%; do?
- what does min-height do?
- what does 100vh do?
- what does view port do?
- the screen doesn't move to center when body width is defined in body css. 
- vh, vp, vw, min, max
- when you do pass through (evt) as a parameter for addeventlisteners
- what does session contents restored from 2/12/2022 at 4:20:50 PM mean?
- things like audio variable shoudl go under variables (state)?
- set at flex-start and then adjusting the margins is easier - than space around - contrary to what i thought at the beginning.
- what's em and rem
- img src vs. div background-image for slot machine
- give padding to main rather than giving margin/padding to  elements inside. 
- // console.log(`scoreBoard: ${scoreBoard}`) // why does this print with score as textContent even though it should be cleared to "". apply time delay to see if the textContent element has been reset in HTML
- #score-board-B > .score-board-b-turn { why doesn't this work?
- unit 1 assessment : why does font size from body change
- queryselectorall didn't work

## Next Steps (backlog)
- Play animal sound when choosing player
- Clean up code/refactor
- Present winning zodiac's traits when game is over. 
- Adjust scoreboard box size
- Favicon gets dynamically updated. 
- Nintendo Switch skin
- Sound effect for spin.
- Choose one of 12 zodiacs and they play the sound. and change to their favicon
- refactor scoresArray 
- see who's winner - then total score and winner is revealed. 
- winner's total scores are highlighted and colored.
- better way to initialize scoresArray.
- adjust to real-size desktop and mobile later
- desktop responsive (media query)
- show which zodiac the zodiacs in each pillar gets along with.
- clearn up css (code-level) area with structure
- Create phone frame around the screen
- choose player among 12 zodiacs and their sound is played when won. when there's a tie, a cat's sound is played. 
- there's a bug when you hit play again during the time delay before total sdcores are revealed, it shows the total sdcore right away.
- chooose somewhere in between the animals, it returns error in choose player
- refactor show player() with event bubbling
- build animation to slide up select area
- replace select player area with scrollspy.
- turn is opposite
- integrate 4 spin functions into one.
- choose player with nav scrollspy
- favicon gets dynamically updated. 
- click zodiac tool tip.
- winner's music plays afteer winning
- remove button after the 6th play so user can't click it. 
- share toggle
- insert player's name at the end. 
- gameboy skin
- Turn --> change button with alternating color
- show who each player chosen
- use yeezy/taylor method to add score list to score board, Use createElement. Use ternary, use appendChild
- tool tip : line break
- bug that scoreboard doesn't disappaear when game is over
- choose player - title color changes based on who is picking
- make it so that shuffle button cannot be clicked twice. 
- turn/winner display should move down to bottom. 
- accept name from the player
- animal sound when choosing. (with icon, before play button is clicked)
- when an animal is chosen (before selected), the chosen area background becomes colored with 0.5 opacity. 
- select player area - hide (animation - slide up & down), sound
- css clean up
- buttom --> "spin", span the width. 
- get rid of x's turn and instead highlight border of scoreboard or the background of the rectangle. 
- select --> show who's turn to play. can't select the same player. 
- CTA - download
- Who you get along with
- spin sound
- update scoreboard with append child
- refactor doShuffle()
- when everything is done, confetti and sound should play last. 
- Adjust chance of winning in accordance with zodiac selection 
- you put in your bday, and the animal is chosen
- show official results board
- animal sound when choosing player
- clean up code/refactor
- show winner's traits at the end. 
- scoreboard box adjust