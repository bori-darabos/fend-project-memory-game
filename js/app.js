/*
 * Create a list that holds all of your cards
 */
var icons = ["fa fa-anchor","fa fa-anchor","fa fa-leaf","fa fa-leaf","fa fa-bicycle","fa fa-bicycle","fa fa-diamond","fa fa-diamond","fa fa-bomb","fa fa-bomb","fa fa-paper-plane-o","fa fa-paper-plane-o","fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube"]

const cardsContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];

let modal = document.getElementById("resultPanel");

// close icon in modal
let closeIcon = document.querySelector('.close');

let star = '<i class="fa fa-star"></i>';


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


shuffle(icons);

/*
 * Setup the cards and the game
 */
function init() {
  for(let i = 0; i < icons.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card"); 
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cardsContainer.appendChild(card);


    //Add click event to each card
    click(card);
        }
  modal.style.visibility = 'hidden';
  openCards =[];
}   


/*
 * Click event
 */

// First Click Indicator
let isFirstClick = true;

function click (card) {
  // Create card click event
    card.addEventListener("click", function() {

      if(isFirstClick) {
      // Start our timer
      startTimer();
      // Change our First Click indicator's value
      isFirstClick = false;
      }

      const currentCard = this;
      const previousCard = openedCards[0];

      //If a card is opened
      if(openedCards.length === 1) {

        card.classList.add("open","show", "disable");
        openedCards.push(this);

        //We should compare 2 opened cards
        compare(currentCard, previousCard);        

      } else {
      //No opened cards

        currentCard.classList.add("open","show", "disable");
        openedCards.push(this);

      }

    });
}


/*
 * Compare 2 cards
 */
function compare(currentCard, previousCard) {

  //Add new move
  addMove();


  //Matcher
  if(currentCard.innerHTML === previousCard.innerHTML){

            //Matched
            currentCard.classList.add("match");
            previousCard.classList.add("match");

            matchedCards.push(currentCard, previousCard);

            openedCards = [];



            // Check if the game is Over
            isOver();

        } else {
          
            // 500 ms TIMEOUT:
            setTimeout(function() {
              currentCard.classList.remove("open","show", "disable");
              previousCard.classList.remove("open","show", "disable");
              openedCards = [];
            }, 200);

            openedCards = [];
        }



}


/*
 * Check if game is over
 */
function isOver() {
   if(matchedCards.length === icons.length) {

    // Stop our timer
    stopTimer();

    // Show modal
    modal.style.visibility = 'visible';

    // declare star rating variable
    var rating = document.querySelector(".stars").innerHTML;

    //showing move, rating, time on modal
    document.getElementById("numberOfSteps").innerHTML = moves;
    document.getElementById("rating").innerHTML = rating;
    document.getElementById("time").innerHTML = totalSeconds + " seconds in total";

    // closeicon on modal
    closer();
   }
}

function closer() {
  closeIcon.addEventListener('click', function(e){
  modal.style.visibility = 'hidden';
    //Delete all cards
  cardsContainer.innerHTML = "";

  init();
  reset();

  stopTimer()
  });
}

/*
 * Add moves
 */
const movesContainer = document.querySelector(".moves")
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;

  //Set the rating
  rating();
  

}

/*
 * Rating
 */
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = star + star + star;
function rating() {

    if( moves < 10) {
        starsContainer.innerHTML = star + star + star;
    } else if( moves < 15) {
        starsContainer.innerHTML = star + star;
    } else {
        starsContainer.innerHTML = star;
    }
}



/*
 * Timer
 */
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 0;
    minute = 0;
    second = 0;
    hour = 0;

// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds + 's';

function startTimer() {
    liveTimer = setInterval(function() {
        // Increase the totalSeconds by 1
        totalSeconds++;
        // Update the HTML Container with the new time
        timerContainer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

function stopTimer() {
    minute = 0 ;
    second =  0 ;
    hour = 0;
    timerContainer.innerHTML =  0 ; 
    clearInterval(liveTimer) ;
}


/*
 * Restart button
 */
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {

  //Delete all cards
  cardsContainer.innerHTML = "";

  shuffle(icons);

  //Call 'init' to create new cards
  init();

  reset(restartBtn);

  //Reset related variables
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  starsContainer.innerHTML = star + star + star;

  stopTimer();

});

/*
 * Reset All Game Variables
 */
function reset() {
    // Empty the `matchedCards` array
    matchedCards = [];

    // Reset `moves`
    moves = 0;
    movesContainer.innerHTML = moves;

    // Reset `rating`
    starsContainer.innerHTML = star + star + star;

    stopTimer();
    isFirstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds + "s";

}

//Start the game for the first time
init();





/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
