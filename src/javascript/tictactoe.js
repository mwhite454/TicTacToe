var globals = {},
    isOccupied=false,
    selectedDifficulty = 0,
    winRate = [0, 0, 0];

$(document).ready(function(){
  defaultStart();
  $('.tile').hover(showGamePiece, hideGamePiece);
  $('.dismiss').click(hideMessage);
  $('.btn').click(defaultStart);
  $('html').keyup(function(e){
    if(e.which>=49 && e.which<=57){
      var keyValue = e.which - 48;
      keyValue = keyValue * 10;
      console.log(keyValue);
      showAIMessage(keyValue);
      selectedDifficulty = keyValue;
      defaultStart();
    } else if (e.which == 48) {
      showAIDisabled();
      selectedDifficulty = 0;
      defaultStart();
    } else if (e.which == 13) {
      showWinRate();
    }
  });
/// end document ready statement
});


function defaultStart(){
  var aiPlayer = new AI(selectedDifficulty);
  isOccupied = false;
  globals.game = new Game(aiPlayer);
  aiPlayer.plays(globals.game);
  globals.game.start();
  console.log(globals.game.currentState.board);
  $(".tile").html("").removeClass("occupied");
}



/*
 * click on game tile behavior and control
 * if an empty cell is clicked when the game is running and its the human player's turn
 * get the index of the clickd cell, create the next game state, update the UI, and
 * advance the game to the new created state
 */
 $(".tile").each(function() {
   var $this = $(this);
   $this.click(function() {
     if(globals.game.status === "running" && !$this.hasClass('occupied')) {
         var indx = parseInt($this.data("indx"));
         var next = new State(globals.game.currentState);
         next.board[indx] = globals.game.currentState.turn;
         $( this ).html(globals.game.currentState.turn);
         $( this ).addClass(globals.game.currentState.markClass).addClass("occupied");
         next.advanceTurn();
         globals.game.advanceTo(next);
     } else if (globals.game.status === "running" && $this.hasClass('occupied')){
       invalidMoveMessage();
     }
   })
 });

function checkOccupied(tile){
  var pattern = new RegExp("occupied");
  isOccupied = pattern.test(tile);
}

function winMessage(player){
  $(".gameStatus").html(player + " won!");
  $(".messageIcon").removeClass("info").addClass("win");
  $(".message").addClass("playerWin visible").removeClass("hiddenFade start");
  setTimeout(hideMessage, 3000);
}

function showAIMessage(probability){
  $(".gameStatus").html("Shall we play a game? <em> Currently set to "+ probability + "% effectiveness.</em>");
  $(".messageIcon").removeClass("win").addClass("info");
  $(".message").addClass("aiStart visible").removeClass("hiddenFade start catWin playerWin");
  setTimeout(hideMessage, 3000);
}

function showWinRate(){
  $(".gameStatus").html("X Wins: " + winRate[0] + " | O Wins: " + winRate[1] + " | Cat: " + winRate[2]);
  $(".messageIcon").removeClass("win").addClass("info");
  $(".message").addClass("aiStart visible").removeClass("hiddenFade start catWin playerWin");
  setTimeout(hideMessage, 3000);
}

function showAIDisabled(){
  $(".gameStatus").html("AI Disabled.");
  $(".messageIcon").removeClass("win").addClass("info");
  $(".message").addClass("aiStart visible").removeClass("hiddenFade start");
  setTimeout(hideMessage, 3000);
}

function catWinMessage(){
  $(".gameStatus").html("Cat's game!");
  $(".messageIcon").removeClass("win").addClass("info");
  $(".message").addClass("catWin visible").removeClass("hiddenFade start");
  setTimeout(hideMessage, 3000);
}

function invalidMoveMessage(){
  $(".gameStatus").html("You can't go there. <em>That space is already taken!</em>");
  $(".messageIcon").removeClass("win").addClass("info");
  $(".message").addClass("catWin visible").removeClass("hiddenFade start");
  setTimeout(hideMessage, 3000);
}

function hideMessage(){
  $(".message").addClass("hiddenFade").removeClass("visible");
}

function showGamePiece(){
  var tileClasses = $(this).prop("class");
  checkOccupied(tileClasses);
  if(!isOccupied){
    $( this ).html(globals.game.currentState.turn);
    $( this ).removeClass("noughts crosses").addClass(globals.game.currentState.markClass);
  };
}

function hideGamePiece(){
  var tileClasses = $(this).prop("class");
  checkOccupied(tileClasses);
    if(!isOccupied){
      $( this ).html("");
      $( this ).removeClass(globals.game.currentState.markClass);
    };
}

//AI's insert function
function insertAt(indx, symbol) {
    var board = $('.tile');
    var targetCell = $(board[indx]);

    if(!targetCell.hasClass('occupied')) {
        targetCell.html(symbol);
        targetCell.addClass('occupied ' + globals.game.currentState.markClass);
    }
  }
