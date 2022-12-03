const DEBUG = true;

const socket = io();

//SELECTIONS
const xScore = document.getElementById("x");
const oScore = document.getElementById("o");
const xHScore = document.getElementById("xH");
const oHScore = document.getElementById("oH");
const messageBox = document.getElementById("popUpInfo");
const theMessage = document.getElementById("theMessage");
const update = document.getElementById("updates");
const togProg = document.getElementById("saveProg");
const modal = document.getElementById("highScore");
const btn = document.getElementById("highScoreBtn");
const span = document.getElementsByClassName("close")[0];

//VARIABLES
var turn = true; // true:x false:o
var getBox;

var xPoints = 0;
var oPoints = 0;

var xHighScore = 0;
var oHighScore = 0;

//ARRAYS

//CONSTRUCTORS

//OBJECTS
let boxSpace = {};

// --------------------------------------------------------------------------------------------------------------------------------------
//                                                               SOCKET WORKS

let restrictedMode = true;
let playerInfo = window.localStorage.getItem("playerInfo");

if (playerInfo == undefined || playerInfo == null || playerInfo == "") {
	window.location.replace("/");
} else {
	playerInfo = JSON.parse(playerInfo);
	const { gid } = Qs.parse(location.search, {
		ignoreQueryPrefix: true,
	});
	if (DEBUG) console.log(gid);
	socket.emit("loadGame", gid);
}

socket.on("gameUpdate", (gameObj) => {
	window.localStorage.setItem("currentGame", gameObj.id);
	console.log(gameObj);
	boxSpace = gameObj.board;

	document.getElementById(`${gameObj.starter}-player`).innerHTML = gameObj.host.username;
	if (gameObj.opponent.id != null) {
		if(gameObj.starter == 'x') document.getElementById(`o-player`).innerHTML = gameObj.opponent.username;
		else document.getElementById(`x-player`).innerHTML = gameObj.opponent.username;
		restrictedMode = !restrictedMode;
	} 
	else document.getElementById(`o-player`).innerHTML = "not joined yet";
});

// --------------------------------------------------------------------------------------------------------------------------------------

//FUNCTIONS
function boxClick(number) {
	getBox = document.getElementById(number);
	var symbol;

	if (boxSpace[number]["occupied"]) {
		btnError.play();
		return alert("Invalid Move\n\nBox is preoccupied!");
	}
	btnClick.play();
	if (turn) {
		symbol = "X";
		turn = false;
	} else {
		symbol = "O";
		turn = true;
	}
	boxSpace[number]["occupied"] = true;
	boxSpace[number]["by"] = symbol;

	getBox.innerHTML = `<h1>${symbol}</h1>`;

	checkWin();
}

function checkWin() {
	var gm = [];
	var gmo = [];
	var winner = "none";

	for (var i in boxSpace) {
		gm.push(boxSpace[i]["by"]);
		gmo.push(boxSpace[i]["occupied"]);
	}

	if (gm[0] == gm[1] && gm[0] == gm[2] && gm[0] != "none") {
		winner = gm[0];
	} else if (gm[3] == gm[4] && gm[3] == gm[5] && gm[3] != "none") {
		winner = gm[3];
	} else if (gm[6] == gm[7] && gm[6] == gm[8] && gm[6] != "none") {
		winner = gm[6];
	} else if (gm[0] == gm[4] && gm[0] == gm[8] && gm[0] != "none") {
		winner = gm[0];
	} else if (gm[2] == gm[4] && gm[2] == gm[6] && gm[2] != "none") {
		winner = gm[2];
	} else if (gm[3] == gm[4] && gm[3] == gm[5] && gm[3] != "none") {
		winner = gm[4];
	} else if (gm[6] == gm[7] && gm[6] == gm[8] && gm[6] != "none") {
		winner = gm[6];
	} else if (gm[2] == gm[5] && gm[2] == gm[8] && gm[2] != "none") {
		winner = gm[2];
	} else if (gm[0] == gm[3] && gm[0] == gm[6] && gm[0] != "none") {
		winner = gm[0];
	} else if (gm[1] == gm[4] && gm[1] == gm[7] && gm[1] != "none") {
		winner = gm[1];
	} else if (
		gmo[0] == gmo[1] &&
		gmo[0] == gmo[2] &&
		gmo[0] == gmo[3] &&
		gmo[0] == gmo[4] &&
		gmo[0] == gmo[5] &&
		gmo[0] == gmo[6] &&
		gmo[0] == gmo[7] &&
		gmo[0] == gmo[8] &&
		gmo[0] != false
	) {
		winner = "draw";
	}

	if (winner == "none") {
		return;
	}

	if (winner != "draw") {
		winMessage("The Winner is", winner);
		update.innerHTML = `\'${winner}\' won the last match!`;
		if (winner == "X") {
			xPoints++;
			turn = true;
		} else {
			oPoints++;
			turn = false;
		}
	} else {
		winMessage("Oopsy! It's a", winner);
		update.innerHTML = "Last Match was A Draw!";
	}

	for (var num in boxSpace) {
		boxSpace[num]["by"] = "none";
		boxSpace[num]["occupied"] = false;
		document.getElementById(num).innerHTML = "";
	}
	xScore.innerHTML = xPoints;
	oScore.innerHTML = oPoints;

	if (xPoints >= xHighScore) {
		xHighScore = xPoints;
	}
	if (oPoints >= oHighScore) {
		oHighScore = oPoints;
	}

	xHScore.innerHTML = xHighScore;
	oHScore.innerHTML = oHighScore;
}

function restart(ask) {
	if (confirm(`Do you want to ${ask} the game?`)) {
		for (var num in boxSpace) {
			boxSpace[num]["by"] = "none";
			boxSpace[num]["occupied"] = false;
			document.getElementById(num).innerHTML = "";
		}
		xScore.innerHTML = 0;
		oScore.innerHTML = 0;
		update.innerHTML = "Game Restarted";
	}
}

function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}

function winMessage(m, winner) {
	popUp.play();
	messageBox.style.opacity = "1";
	messageBox.style.pointerEvents = "all";
	var message = `
		<h3 id="messageHead">${m}....</h3>
						<h1 class="message">${winner}</h1>
		`;
	theMessage.innerHTML = message;
}

function closeMessage() {
	popUp.play();
	messageBox.style.opacity = "0";
	messageBox.style.pointerEvents = "none";
}

// When the user clicks on the button, open the modal
btn.onclick = function () {
	popUp.play();
	modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	popUp.play();
	modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		popUp.play();
		modal.style.display = "none";
	}
};

