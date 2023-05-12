//selecting all the grid elements 

let first = document.querySelector("#one");
let second = document.querySelector("#two");
let third = document.querySelector("#third");
let fourth = document.querySelector("#four");
let five = document.querySelector("#five");
let six = document.querySelector("#six");
let seven = document.querySelector("#seven");
let eight = document.querySelector("#eight");
let nine = document.querySelector("#nine");


// all the sounds for the effects 
let victory = new Audio('vicAud.mp3');
let click = new Audio('click12.aac');
let wrongClick = new Audio('wrongclickTrimmed.wav');
let gameStart = new Audio('gamestart.mp3');

// some more selectors 
let gameBoard = document.querySelector(".board");           //it is the container of all the grid elements 

let gamebutton = document.querySelector(".button");         // selecting the button for start/reset

let notice = document.querySelector(".gameStatement");      // select the notice tag / game statement heading 

let gamePlay = false;                                       // game play is set initally false because game is not started yet 

let turn = "X";   // first turn is for the person x 
let count = 0;    // count variable is to count the number of clicks 

let cell = [first, second, third, fourth, five, six, seven, eight, nine];  // cell array contains the name of grid blocks 
// console.log(cell);


// Function Name: Callback Function
// Usage: 
// Dependency: 
// Input Parameters: 
// Function Arguments: 
// Global Variables: 


gamebutton.addEventListener("click", function (e) {  // adding click event listner to gamebutton 

    gameStart.play();       // playing the sound of gamestart on click 
    if (gamePlay == false) 
    {
        gamePlay = true;    // starting the game on click 
        count = 0;          // starting the game with count=0

        gamebutton.innerHTML = "Press to reset"  // changing the game button text and functionality so that It can be used to  reset the game from starting 
        notice.innerHTML = "Players X's Turn"    // telling about the players turn

    } 
    else 
    {
        gamePlay = false;                // if game is false setting it to true so that player can restart from 
        gamebutton.innerHTML = "Start";  // setting the start button / now the click on gamebutton will restart the game 
        clearAll()                       // clearing all the data (zero and cross ) from the grid so that player can restart 
        notice.innerHTML = ""            // no notice
        turn = "X"                       // intialising the turn to x ( as X is the first player when we start the game  )
    }
})



gameBoard.addEventListener("click", function (e) { // adding event listner to game board using the concept of event delegation so that every grid block gets the event listner through one event listner

    if (gamePlay == true) {                        // if game play is true then only the the user is allowed to change the grid 
        let pressedCell = e.target;                // getting the clicked grid from e.target ( e is the object given by the browser)
        if (pressedCell.innerHTML == "") {         // if pressed grid is empty then only user can change the data 
            count = count + 1;                     // increasing the count on every valid click 
            click.play();                          // on click play the sound 
            if (turn == "X") {                     // if turn = x then we have to make that grid data as x 
                pressedCell.innerHTML = "X";       //  setting the data(X) in gird 
                pressedCell.style.color="red"
                turn = "0"                         // for the next turn changing the turn to zero
            } else {
                pressedCell.innerHTML = "0"        // setting the data to 0 in the gird 
                pressedCell.style.color="#3C486B"
                turn = "X"                         // chaning the turn for the next term 
            }

            notice.innerHTML = `${turn} 's turn`;  // using the "template literal" to  change the notice according to turn 

            // console.log(count);
            let flag = winnerChecker();        // winner checker is function that return true on winning ( it checks the whole grid after every click )
            if (flag == false) {               // if there is no winner we have to check for the grid is it was full or not 
                if (count == 9) {              // using one more if to check weather the count is 9 or not as there is no winner and no spaces left in the gird we have to restart the game 
                    notice.innerHTML = "TIE "  // if the above condition is true it means that the match is a tie ( no winner )
                    gamebutton.innerHTML = "New Game is Starting ";  // changing the button text 
                    setTimeout(function () {   // using the set timeout function so that the game restart after 3 seconds 
                        gamebutton.click();    // clicking on the gamebutton as it reset the game 
                    }, 3000)
                }

            }

        } else {
            //console.log("wrongClick");   
            wrongClick.play();           // if someone clicks on the grid block which is not empty it will play the wrong sound     
        }

    } else {
        //console.log("wrongClick");   
        wrongClick.play();      // if the game is not started yet and someone click on the gird it will play the wrong click sound 
    }
})


function clearAll() {   // it is the clearAll function which clear all the data of the grid when user wants like when user clicks on reset or when there is a tie etc ;
    for (let ele = 0; ele < cell.length; ele++) {   // for loop to go on every grid 
        cell[ele].innerHTML = ""           // clearing the grid data ;
    }
}


function winnerChecker() {  // it is the winner checker function which checks is there any winner either 0 or X 

    //console.log("Winner checker called")
    //console.log(first.innerHTML);

    // getting all the text from all the grid and storing in variables 

    let one = first.innerHTML;
    let two = second.innerHTML;
    let three = third.innerHTML;
    let four = fourth.innerHTML;
    let fivth = five.innerHTML;
    let sixth = six.innerHTML;
    let seventh = seven.innerHTML;
    let eighth = eight.innerHTML;
    let ninth = nine.innerHTML;

    //console.log(one , two , three , four , fivth,sixth,seventh,eighth,ninth)

    // [123 , 456 , 789 , 147 , 258 , 369 , 159 , 357 ] these all are the grid conditions  where if the data is same either ( 0 or X) respective player is winned 

    if ((one == "X" && two == "X" && three == "X") || (three == "X" && sixth == "X" && ninth == "X") || (seventh == "X" && eighth == "X" && ninth == "X") || (one == "X" && four == "X" && seventh == "X") || (one == "X" && fivth == "X" && ninth == "X") || (seventh == "X" && fivth == "X" && three == "X") || (four == "X" && fivth == "X" && sixth == "X") || (two == "X" && fivth == "X" && eighth == "X")) {
        // checking for the all the condition if the X player win the game 

        notice.innerHTML = "Player X Won The Game";  // if the above condition is true then the player X won the game and setting the inner html for notice tag to same 


        gamebutton.innerHTML = "New Game is Starting ";  // setting the game button to the game is starting as one of the player already won the game 
        setTimeout(function () {   // using the set timeout function so that the game restart after 3 seconds 
            gamebutton.click();        // clicking on the gamebutton as it reset the game 
        }, 3000)

        victory.play();   // this is the sound for the winner as player X won the game 

        return true;     // returning true as there is a winner 

    } else if ((one == "0" && two == "0" && three == "0") || (three == "0" && sixth == "0" && ninth == "0") || (seventh == "0" && eighth == "0" && ninth == "0") || (one == "0" && four == "0" && seventh == "0") || (one == "0" && fivth == "0" && ninth == "0") || (seventh == "0" && fivth == "0" && three == "0") || (four == "0" && fivth == "0" && sixth == "0") || (two == "X" && fivth == "X" && eighth == "X")) {
        notice.innerHTML = "Player 0 Won The Game";

        gamebutton.innerHTML = "New Game is Starting ";
        setTimeout(function () {  // using the set timeout function so that the game restart after 3 seconds 
            gamebutton.click();        // clicking on the gamebutton as it reset the game 
        }, 3000)
        victory.play();   // this is the sound for the winning as player 0 won the game 

        return true;  // returning true as their is a winner 
    }

    return false;  // if it doesnot statisy the condition which means there is no winner so returning false ;


}


