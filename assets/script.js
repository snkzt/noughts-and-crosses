let countTurn= 0;
let countXwin = 0;
let countOwin = 0;
let countWin = 0;
let countTie = 0;


const cells = Array.from(document.querySelectorAll(".cell"));
let xArr = [];
let oArr = [];
const winPattern = [
  [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
] 

document.getElementById("grid").addEventListener("click", turn);

function turn(event) {
  if (event.target.childNodes.length === 0) {
    countTurn++;
    if (countTurn % 2 === 1) {
      const x = document.createElement("IMG");
      x.setAttribute("class", "x");
      x.setAttribute("src", "image/X.png");
      event.target.appendChild(x);
    } else {
      const o = document.createElement("IMG");
      o.setAttribute("class", "o");
      o.setAttribute("src", "image/O.png");
      event.target.appendChild(o);
    }
    checkWin();
  } 
  if (countWin === 0) {
    checkTie();
  }
}


function checkWin() {
  if (countTurn > 4) {
    makeArr();
    winPattern.forEach(function(pattern) {
      for (let i = 0; i < xArr.length; i++) {
        if (parseInt(xArr[i]) === pattern[0]) {
          if (xArr[i+1] && parseInt(xArr[i+1]) === pattern[1]) {
            if (xArr[i+2] && parseInt(xArr[i+2]) === pattern[2]) {
              xWin();
            }
          }
        }
      }
        for (let j = 0; j < oArr.length; j++) {
          if (parseInt(oArr[j]) === pattern[0]) {
            if (oArr[j+1] && parseInt(oArr[j+1]) === pattern[1]) {
              if (oArr[j+2] && parseInt(oArr[j+2]) === pattern[2]) {
                oWin();
              }
            }
          }
        }
      })
      xArr = [];
      oArr = [];
    }
  }


  

function xWin() {
  judgeX();
  countXwin++;
  countWin++;
  scoreUpdate();
  askContinue();
}

function oWin() {
  judgeO();
  countOwin++;
  countWin++;
  scoreUpdate();
  askContinue();
}


function checkTie() {
  if (countTurn === 9) {
    judgeTie();
    countTie++;
    scoreUpdate();
    askContinue();
  }
}

function makeArr() {
  cells.forEach(function(element){ 
    if (element.childNodes.length === 1) {
      element.childNodes.forEach (function (eachNode) {
        if (eachNode.className === "x") { 
          xArr.push(element.id);
        } else if (eachNode.className === "o") {
            oArr.push(element.id);    
        }
      })
    }
  })
}

function judgeX() {
  document.querySelector(".judge").style.visibility = "visible";
  const nodeX = document.createElement("P");
  const textnodeX = document.createTextNode("X win!");
  nodeX.appendChild(textnodeX);
  document.getElementById("verdict").appendChild(nodeX);
  document.getElementById("grid").removeEventListener("click", turn);
}

function judgeO() {
  document.querySelector(".judge").style.visibility = "visible";
  const nodeO = document.createElement("P");
  const textnodeO = document.createTextNode("O win!");
  nodeO.appendChild(textnodeO);
  document.getElementById("verdict").appendChild(nodeO);
  document.getElementById("grid").removeEventListener("click", turn);
}

function judgeTie() {
  document.querySelector(".judge").style.visibility = "visible";
  const nodeT = document.createElement("P");
  const textnodeT = document.createTextNode("Tie game!");
  nodeT.appendChild(textnodeT);
  document.getElementById("verdict").appendChild(nodeT);
  document.getElementById("grid").removeEventListener("click", turn);
}

function scoreUpdate() {
  document.getElementById("countX").innerText = countXwin;
  document.getElementById("countO").innerText = countOwin;
  document.getElementById("tie").innerText = countTie;
}

function askContinue() {
  document.querySelector(".judge").addEventListener("click", checkContinue);
}

//check continue after a game over -> yes: clear all cells but scoreboard, No: reload the page
function checkContinue(event) {
  if (event.target.id === "first") {
    document.querySelector(".judge").style.visibility = "hidden";
    document.getElementById("grid").addEventListener("click", turn);
    countTurn = 0;
    const xs = Array.from(document.querySelectorAll(".x"));
    const os = Array.from(document.querySelectorAll(".o"));
    xs.forEach (xElement => xElement.remove());
    os.forEach (oElement => oElement.remove());
    document.getElementById("verdict").querySelector("P").remove();
  } else if (event.target.id === "second") {
    document.location.reload();
    document.querySelector(".judge").style.visibility = "hidden";
  }  
}

//check continue during a game -> yes: keep the status as is, No: reload the page
document.querySelector(".reload").addEventListener("click", showDialogue);

function showDialogue() {
  document.querySelector(".dialogue").style.visibility = "visible";
  document.querySelector(".dialogue").addEventListener("click", checkRefresh);
}

function checkRefresh(event) {
  if (event.target.id === "secondary") {
    document.location.reload();
    document.querySelector(".dialogue").style.visibility = "hidden";
  } else if (event.target.id === "primary") {
    document.querySelector(".dialogue").style.visibility = "hidden";
  }  
}

