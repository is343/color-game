var difficulty = 6;
var colors = [];
//picking one of the colors as the question
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var h1 = document.querySelector("h1");
var modeButtons = document.querySelectorAll(".mode");


//initial square setup
init();

function init() {
    // adding function to the reset button
    resetButton.addEventListener("click", reset);
    addListenersToSquares();
    difficultyButtonSetup();
    // reset is doing the initial setup of the board
    reset();
}




//resetting evertthing
function reset() {
    colors = getColors(difficulty);
    pickedColor = colors[pickColor(difficulty)];
    // display which color as the question
    colorDisplay.textContent = pickedColor;
    h1.style.backgroundColor = "steelblue";
    colorTheSquares();
    resetButton.textContent = "New colors";
    messageDisplay.textContent = "";
}




function pickColor(difficulty) {
    return Math.floor(Math.random() * difficulty);
}

function colorTheSquares() {
    for (var i = 0; i < squares.length; i++) {
        //initial colors
        squares[i].style.backgroundColor = colors[i];
    }
}


function addListenersToSquares() {
    for (var i = 0; i < squares.length; i++) {
        //click listeners
        squares[i].addEventListener("click", function() {
            //grab color of picked square
            var clickedColor = this.style.backgroundColor;
            //compare colors
            if (clickedColor === pickedColor) {
                h1.style.backgroundColor = pickedColor;
                changeColors(pickedColor, difficulty);
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play again?";
            } else {
                //setting the square to match the background color
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again";
            }
        });
    }
}


//changing colors after you win
function changeColors(color, difficulty) {
    for (var i = 0; i < difficulty; i++) {
        squares[i].style.backgroundColor = color;
    }
}

//getting random colors
function getColors(num) {
    var newColors = [];

    function getNum() {
        return Math.floor(Math.random() * 256)
    };
    for (var i = 0; i < num; i++) {
        var red = getNum();
        var green = getNum();
        var blue = getNum();
        newColors[i] = "rgb(" + red + ", " + green + ", " + blue + ")";
    };
    // if easy game, set last 3 square's colors to match background
    if (num < 6) {
        for (var i = num; i < 6; i++) {
            newColors[i] = "#232323";
        };
    }
    return newColors
}


// add listeners to difficulty buttons
function difficultyButtonSetup() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? difficulty = 3 : difficulty = 6;
            reset();

        });
    }
}