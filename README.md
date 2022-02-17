# Chinese Zodiac Slot Machine

## A Javascript-based slot machine game

## Why I Started This
- I decided to take the GA SEI course with the immediate goal of building my company's brand new website, which is a zodiac-based friend discovery app, on my own toward the end of the course.
- A form of slot machine was already in the feature plan, and since it was also on the list of recommended game to build, I chose to build a slot machine game.
- A variation of this product will be integrated into the website in the future. 

## Getting Started
- <a href="https://chinese-zodiac-slot-machine.surge.sh/">Game Link</a>
- You need 2 players to play the game.
- Each player will choose a zodiac avatar, and play the slot machine as the selected avatar.
- Each player gets to spin the slot machine for 3 rounds.
- After three rounds of slot machine, the player with higher sum of score gets to win. 
- Scoring system: 
  - Four of a kind - 1000 points
  - Three of a kind - 100 points 
  - Two of a kind - 10 points (two pairs - 20 points)

## Screenshots
<img src="https://i.imgur.com/TGwyUzE.png" display="inline" width="160px" height="280x" alt="screenshot-1">
<img src="https://i.imgur.com/u6XYpsE.png" display="inline" width="160px" height="280x" alt="screenshot-2">
<img src="https://i.imgur.com/1i1WnUs.png" display="inline" width="160px" height="280x" alt="screenshot-3">
<img src="https://i.imgur.com/nxs5Zql.png" display="inline" width="160px" height="280x" alt="screenshot-4">
<img src="https://i.imgur.com/cDT2YrO.png" display="inline" width="160px" height="280x" alt="screenshot-7">
<img src="https://i.imgur.com/d2UmKmv.png" display="inline" width="160px" height="280x" alt="screenshot-8">

## Technologies Used 
- JavaScript, HTML, CSS, etc.

## Credits
- Slot machine effect: https://github.com/tognee/JavascriptSlotMachine/blob/master/index.html
- Emojis: Hang5 (https://www.hangfive.co), Stipop (https://stipop.io)
- Inspirations: General Assembly UX project team (Jason Kim, Sabrina Saffer, Ala Fard, Kim Pham)

## Original Wireframes
<img src="https://i.imgur.com/ceKYjms_d.webp?maxwidth=1520&fidelity=grand"  alt="wireframes">

## Original Website Sketch
<img src="https://i.imgur.com/odACAaA_d.webp?maxwidth=760&fidelity=grand" alt="UI-Sketch">

## Challenges
- As the app gets more developed, I keep finding more stuff to want to add or fix, but I realized that it becomes incrementally harder to do so. 
  - The design elements are all relative. 
  - Hiding/Showing elements - more difficult as more features and css were added.
  - When I change one stuff, I need to track where I hide and show the elements. 
  - At some point I felt that the return wasn't big enough to spend couple hours to fix a minor bug. 
  - I have to find a better architecture to code more efficiently for scalability. 
- Creating the scoreboard was more challenging than initially expected 
  - Should I store and display the scores separately for each player each round?
  - If i do space-around, the scoreboard alignment looks distorted until when all of the scores are uopdated. 
- Slot machine effect - it was difficult to find good reference with easy-to-follow documentation for self-implementation.
- Image size. Original size was 3000px X 3000px so when set as a backgground image, it didn't show. I thought there was something wrong with the way I coded. But I realized that it was too large that only the clear background of the image was showing on the screen, making it look like nothing was showing.
- Implementing tool tip (boostrap) was more challenging than I expected. Maybe it was because I wasn't familiar with how to use Bootstrap as a resource.
- Finding free animal sound files. The sites kept asking me to sign up right before letting me download the files. Also, it was difficult to find good rat, rabbit, and monkey sound files.

## Findings/Questions
- .target is the same level is .textContent
- innerHTML not equal to .textContent?
- Does whatever is in the textContent get automatically printed to HTML?
- What is target? just an object? can i replace it by any object?
- Are InnerHTML, innerText, textContent all on the same level?
- InnerHTML, innerText, textContent - if i assigned different strings to each. Which takes precedence?
- selecting each square to update is much easier than having one button to do all the work. 
- what does font-size: 62.5%; do?
- what does min-height do?
- what does 100vh do?
- what does view port do?
- the screen doesn't move to center when body width is defined in body css. 
- vh, vp, vw, min, max
- when do you have to pass through "evt" as a parameter for addeventlisteners?
- what does "session contents restored from 2/12/2022 at 4:20:50 PM" mean? Shown in terminal
- things like audio variable should go under variables (state) section?
- set at flex-start and then adjusting the margins is easier - than doing space-around - contrary to what i thought in the beginning.
- what's em and rem? em = 1 font size
- img src vs. div background-image for slot machine - functionally different? which is more sophisticated way?
- give padding to main rather than giving margin/padding to the elements inside. 
- // console.log(`scoreBoard: ${scoreBoard}`) // why does this print with score as textContent even though it should be cleared to "". apply time delay to see if the textContent element has been reset in HTML
- #score-board-B > .score-board-b-turn ==> why doesn't this work?
- queryselectorall didn't work - socreboard

## Next Steps (backlog)
- Play animal sound when player is chosen (before play button is clicked)
- Present winning zodiac's traits after the game is over. 
- Clean up code/refactor
- Adjust scoreboard box size
- Favicon gets dynamically updated. 
- Nintendo Switch/phone skin as background
- Sound effect for spin.
- animal sound when choosing player: Choose one of 12 zodiacs and they play the sound. 
- refactor scoresArray 
- winner's total scores are highlighted and colored.
- better way to initialize scoresArray.
- desktop responsive (media query): adjust to real-size desktop and mobile later
- show which zodiac the zodiacs in each pillar gets along with.
- Clean up css (code-level) area with structure
- choose player among 12 zodiacs and their sound is played when won. when there's a tie, a cat's sound is played. 
- bug: when you hit play again while spin is ongoing before total scores are revealed, it shows the total sdcore right away.
- bug: If you chooose somewhere in between the animals, it returns error in choose player
- build animation to slide up select area
- replace select player area using nav scrollspy.
- refactor doShuffle(): integrate 4 spin functions into one.
- favicon gets dynamically updated. 
- winner zodiac's sound plays afteer winning
- remove button after the 6th play so user can't click it. 
- share toggle
- show player's name at the end. 
- tool tip : line break
- choose player - title color changes based on who is picking
- make it so that shuffle button cannot be clicked twice. 
- turn/winner display should move down to bottom. 
- accept name from the player
- animal sound when choosing a zodiac. (with icon, before play button is clicked)
- when an animal is chosen (before selected), the chosen area background becomes colored with 0.5 opacity. 
- select player area - hide (animation - slide up & down), sound
- clean up code/refactor: css clean up
- CTA button - download
- Show which zodiac you get along with
- implement spin sound
- update scoreboard using append child: - use yeezy/taylor method to add score list to score board, Use createElement. Use ternary, use appendChild
- Adjust chance of winning in accordance with zodiac selection 
- you put in your bday, and a zodiac is chosen
- show official results board (historical rankings)
- scoreboard box size adjust