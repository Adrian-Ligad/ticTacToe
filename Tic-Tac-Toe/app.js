document.getElementsByTagName("th")[0].addEventListener("click", () => {click(0, state, [0,0])})
document.getElementsByTagName("th")[1].addEventListener("click", () => {click(1, state, [0,1])})
document.getElementsByTagName("th")[2].addEventListener("click", () => {click(2, state, [0,2])})
document.getElementsByTagName("th")[3].addEventListener("click", () => {click(3, state, [1,0])})
document.getElementsByTagName("th")[4].addEventListener("click", () => {click(4, state, [1,1])})
document.getElementsByTagName("th")[5].addEventListener("click", () => {click(5, state, [1,2])})
document.getElementsByTagName("th")[6].addEventListener("click", () => {click(6, state, [2,0])})
document.getElementsByTagName("th")[7].addEventListener("click", () => {click(7, state, [2,1])})
document.getElementsByTagName("th")[8].addEventListener("click", () => {click(8, state, [2,2])})
document.getElementById("reset").addEventListener("click", () => {reset()})
document.getElementById("button1").addEventListener("click",()=>{addPerson(1)})
document.getElementById("button2").addEventListener("click",()=>{addPerson(2)})
var state = "X";
var numberCount = 0;
var matrix = [[0,0,0],
              [0,0,0],
              [0,0,0]]
//function for adding players
var addPerson = (number) => {
    inputText = document.getElementById(`input${number}`).value
    if (inputText !== "") {
        document.getElementById(`p${number}Name`).innerHTML = inputText
    }
}
//function for resetting elements on page
var reset = () => {
    var table = document.getElementById("ticTacToe").childNodes[1]
    for (let i = 0; i < table.childNodes.length-1; i = i + 2) {
        var tableRow = table.childNodes[i];
        for (let j = 1; j < tableRow.childNodes.length - 1; j = j + 2) {
            if (tableRow.childNodes[j].childNodes.length === 1) { 
                tableRow.childNodes[j].removeChild(tableRow.childNodes[j].childNodes[0])
            }
        }
    }
    document.getElementById("winnerPage").innerHTML = '';
    document.getElementById("DONE").innerHTML = '';
    numberCount = 0;
    matrix = [[0,0,0],
              [0,0,0],
              [0,0,0]]
}
// helper function for winning
var winner = (num) => {
    var node = document.getElementById("winnerPage")
    var determine = num;
    var name = document.getElementById(`p${determine}Name`).innerHTML
    var textNode = document.createTextNode(`${name} wins!`)
    var number = document.getElementById(`p${determine}Tally`).innerHTML
    number++
    document.getElementById(`p${determine}Tally`).innerHTML = number;
    node.appendChild(textNode)
    if (num === 1) {
        state = "X"
    } else {
        state = "O"
    }
}
//main on-event listener function
var click = (idNumber, states, array) => {
    if (document.getElementById("winnerPage").childNodes.length === 0) {
//PUTTING DOWN BOARD LETTERS ******************************************************************************************************
        var onNode = document.getElementsByTagName("th")[idNumber]
//checks to see if there's something in the box- if there's not, then continue
        if (!onNode.childNodes[0]) {
            var node = document.createElement(`div`)
            node.setAttribute("id",`${idNumber}`)
            var textNode = document.createTextNode(states)
//checks to see if the state is X/O to put an X/O
            if (states === "X") {
                states = "O";
                matrix[array[0]][[array[1]]] = 1
            } else if (states === "O") {
                states = "X";
                matrix[array[0]][[array[1]]] = 2
            }
//appends letter to the div
            state = states;
            node.appendChild(textNode);
            numberCount++
            if (node.innerHTML === "X") {
                node.setAttribute("style", "color: red; font-size: 100px")
            } else {
                node.setAttribute("style", "color: blue; font-size: 100px")
            }
            onNode.appendChild(node)
// if there's already an X/O, then remove X/O and let the next thing placed down be an X/O
        } else if (document.getElementById(idNumber).childNodes[0].nodeValue === "X" || document.getElementById(idNumber).childNodes[0].nodeValue === "O") {
            state = document.getElementById(idNumber).childNodes[0].nodeValue
            onNode.removeChild(onNode.childNodes[0])
            matrix[array[0]][[array[1]]] = 0
            numberCount--
        }
//ROW CHECKERS******************************************************************************************************************
// row checker to see if there's a winner
        if (document.getElementById("winnerPage").childNodes.length === 0) {
            for (var row of matrix) {
                var xCount = 0;
                var oCount = 0;
                for (let i = 0; i < row.length; i++) {
                    if (row[i] === 1) {
                        xCount++
                    } else if (row[i] === 2) {
                        oCount++
                    }
                }
                if (xCount === 3) {
                    winner(1);
                } else if (oCount === 3) {
                    winner(2);
                } 
            }
//column checker to see if there's a winner
            for (let i = 0; i < matrix.length; i++) {
                xCount = 0;
                oCount = 0;
                for (var row of matrix) {
                    if (row[i] === 1) {
                        xCount++
                    } else if (row[i] === 2) {
                        oCount++
                    }
                }
                if (xCount === 3) {
                    winner(1);
                } else if (oCount === 3) {
                    winner(2);
                }
            }
//diagonals checker to see if there's a winner
            if ((matrix[0][0] === 1 && matrix[1][1] === 1 && matrix[2][2] === 1) || (matrix[2][0] === 1 && matrix[1][1] === 1 && matrix[0][2] === 1)) {
                winner(1)
            } else if ((matrix[0][0] === 2 && matrix[1][1] === 2 && matrix[2][2] === 2) || (matrix[2][0] === 2 && matrix[1][1] === 2 && matrix[0][2] === 2)) {
                winner(2)
            }
        }
//if noone wins and the board is filled up
        if ((document.getElementById("winnerPage").childNodes.length === 1 || numberCount === 9) && !document.getElementById("DONE").childNodes[0]) {
            if (document.getElementById("winnerPage").childNodes.length === 0) {
                var node = document.getElementById("winnerPage")
                var textNode = document.createTextNode("YOU'RE BOTH LOSERS")
                node.appendChild(textNode)
            }
            node = document.getElementById("DONE")
            textNode = document.createTextNode(" NO MORE MOVES LEFT TO MAKE ")
            node.appendChild(textNode)
        }
    }
}

