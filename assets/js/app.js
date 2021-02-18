//SELECTIONS
const xScore = document.getElementById('x');
const oScore = document.getElementById('o');
const xHScore = document.getElementById('xH');
const oHScore = document.getElementById('oH');
const messageBox = document.getElementById('popUpInfo');
const theMessage = document.getElementById('theMessage');
const update = document.getElementById('updates');
const togProg = document.getElementById('saveProg');
const modal = document.getElementById("highScore");
const btn = document.getElementById("highScoreBtn");
const span = document.getElementsByClassName("close")[0];

//VARIABLES
var turn = true // true:x false:o
var getBox;

var xPoints = 0;
var oPoints = 0;

var xHighScore = 0;
var oHighScore = 0;

var saveProgress = false;

//ARRAYS


//CONSTRUCTORS


//OBJECTS
var boxSpace = {
		one: {
				occupied: false,
				by: 'none'
		},
		two: {
				occupied: false,
				by: 'none'
		},
		three: {
				occupied: false,
				by: 'none'
		},
		four: {
				occupied: false,
				by: 'none'
		},
		five: {
				occupied: false,
				by: 'none'
		},
		six: {
				occupied: false,
				by: 'none'
		},
		seven: {
				occupied: false,
				by: 'none'
		},
		eight: {
				occupied: false,
				by: 'none'
		},
		nine: {
				occupied: false,
				by: 'none'
		},
}

//FUNCTIONS
function toggleProgress() {
		if(!saveProgress) {
				if(confirm('Progress will be saved from now. Press \'ok\' to ensure.')) {
						saveProgress = true;
						togProg.classList.add('save-on');
						localStorage.setItem('saveProgress', 'yes');
				}else {
						alert('You cancelled the progress save!');
				}
		}else {
	    if(confirm('Progress will be not saved from now and the past progress would be lost. Press \'ok\' to ensure.')) {
				saveProgress = false;
				togProg.classList.remove('save-on');
				restart('disable progress saving on');
		xHScore.innerHTML = 0;
		oHScore.innerHTML = 0;
		for(var num in boxSpace){
				localStorage.setItem(num, boxSpace[num]['by'] + '_!_' + boxSpace[num]['occupied']);
				}
		localStorage.setItem('xHS', 0);
		localStorage.setItem('oHS', 0);
		localStorage.setItem('xS', 0);
		localStorage.setItem('oS', 0);
		localStorage.setItem('turn', turn);
		localStorage.setItem('saveProgress', 'no');
		update.innerHTML = 'Save Progress Disabled.';
	}else {
			alert('you cancelled the action!');
	}
		}
}

function loadMemory() {
		for(var num in boxSpace){
						var arrNum = localStorage.getItem(num).split('_!_');
						boxSpace[num]['by'] = arrNum[0]
					  if(arrNum[0] != 'none') {
				document.getElementById(num).innerHTML = `<h1>${arrNum[0]}</h1>`;
					  }
						if(arrNum[1] == 'false' || !arrNum[1]) {
								boxSpace[num]['occupied'] = false;
						}else {
								boxSpace[num]['occupied'] = true;
						}
		}
		
		if(localStorage.getItem('turn') == 'true' || localStorage.getItem('turn')) {
				turn = true;
		}else {
				turn = false;
		}
		
		var xPoints = localStorage.getItem('xS');
		var oPoints = localStorage.getItem('oS');
		
		var xHighScore = localStorage.getItem('xSH');
		var oHighScore = localStorage.getItem('oSH');
		
		if(localStorage.getItem('saveProgress') == 'yes') {
				saveProgress = true;
		}else {
				saveProgress = false;
		}
		
		xScore.innerHTML = xPoints;
		oScore.innerHTML = oPoints;
		
		xHScore.innerHTML = xHighScore;
		oHScore.innerHTML = oHighScore;
}


function boxClick(number) {
		getBox = document.getElementById(number);
		var symbol;
		
		if(boxSpace[number]['occupied']) {
				btnError.play();
				return alert('Invalid Move\n\nBox is preoccupied!');
		}
		btnClick.play();
		if(turn) {
				symbol = 'X';
				turn = false;
		}else {
				symbol = 'O';
				turn = true;
		}
		boxSpace[number]['occupied'] = true;
		boxSpace[number]['by'] = symbol;
		
		getBox.innerHTML = `<h1>${symbol}</h1>`;
		
		checkWin();
		if(saveProgress) {
				saveTheProgress();
		}
}

function checkWin() {
		var gm = [];
		var gmo = [];
		var winner = 'none';
		
		
		for(var i in boxSpace){
				gm.push(boxSpace[i]['by']);
				gmo.push(boxSpace[i]['occupied']);
		}
		
		if(gm[0] == gm[1] && gm[0] == gm[2] && gm[0] != 'none') {
				winner = gm[0];
		}else if(gm[3] == gm[4] && gm[3] == gm[5] && gm[3] != 'none') {
				winner = gm[3];
		}else if(gm[6] == gm[7] && gm[6] == gm[8] && gm[6] != 'none') {
				winner = gm[6];
		}else if(gm[0] == gm[4] && gm[0] == gm[8] && gm[0] != 'none') {
				winner = gm[0];
		}else if(gm[2] == gm[4] && gm[2] == gm[6] && gm[2] != 'none') {
				winner = gm[2];
		}else if(gm[3] == gm[4] && gm[3] == gm[5] && gm[3] != 'none') {
				winner = gm[4];
		}else if(gm[6] == gm[7] && gm[6] == gm[8] && gm[6] != 'none') {
				winner = gm[6];
		}else if(gm[2] == gm[5] && gm[2] == gm[8] && gm[2] != 'none') {
				winner = gm[2];
		}else if(gm[0] == gm[3] && gm[0] == gm[6] && gm[0] != 'none') {
				winner = gm[0];
		}else if(gm[1] == gm[4] && gm[1] == gm[7] && gm[1] != 'none') {
				winner = gm[1];
		}else if(gmo[0] == gmo[1] && gmo[0] == gmo[2] && gmo[0] == gmo[3] && gmo[0] == gmo[4] && gmo[0] == gmo[5] && gmo[0] == gmo[6] && gmo[0] == gmo[7] && gmo[0] == gmo[8] && gmo[0] != false) {
				winner = 'draw';
		}
		
		if(winner == 'none') {
				return;
		}
		
		if(winner != 'draw') {
				winMessage('The Winner is', winner);
				update.innerHTML = `\'${winner}\' won the last match!`;
				if(winner == 'X') {
						xPoints++
						turn = true;
				}else {
						oPoints++
						turn = false;
				}
		}else {
			  winMessage('Oopsy! It\'s a', winner);
				update.innerHTML = 'Last Match was A Draw!';
		}
		
		for(var num in boxSpace){
				boxSpace[num]['by'] = 'none';
				boxSpace[num]['occupied'] = false;
				document.getElementById(num).innerHTML = "";
		}
		xScore.innerHTML = xPoints;
		oScore.innerHTML = oPoints;
		
		if(xPoints >= xHighScore) {
				xHighScore = xPoints;
		}
		if(oPoints >= oHighScore) {
				oHighScore = oPoints
		}
		
		xHScore.innerHTML = xHighScore;
		oHScore.innerHTML = oHighScore;
}

function restart(ask) {
		if(confirm(`Do you want to ${ask} the game?`)) {
				for(var num in boxSpace){
						boxSpace[num]['by'] = 'none';
						boxSpace[num]['occupied'] = false;
						document.getElementById(num).innerHTML = "";
				}
				xScore.innerHTML = 0;
				oScore.innerHTML = 0;
				update.innerHTML = 'Game Restarted';
		}
}

function reset() {
		restart('reset everything on');
		xHScore.innerHTML = 0;
		oHScore.innerHTML = 0;
		for(var num in boxSpace){
						localStorage.setItem(num, boxSpace[num]['by'] + '_!_' + boxSpace[num]['occupied']);
				}
		localStorage.setItem('xHS', 0);
		localStorage.setItem('oHS', 0);
		localStorage.setItem('xS', 0);
		localStorage.setItem('oS', 0);
		localStorage.setItem('turn', 'true');
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

function saveTheProgress() {
		for(var num in boxSpace){
						localStorage.setItem(num, boxSpace[num]['by'] + '_!_' + boxSpace[num]['occupied']);
				}
		localStorage.setItem('xHS', xHighScore);
		localStorage.setItem('oHS', oHighScore);
		localStorage.setItem('xS', xPoints);
		localStorage.setItem('oS', oPoints);
		localStorage.setItem('turn', turn);
		localStorage.setItem('stored', 'yes');
		localStorage.setItem('saveProgress', 'yes');
}

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  popUp.play();
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  popUp.play();
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    popUp.play();
    modal.style.display = "none";
  }
}


//INVOKES

if(localStorage.getItem('stored') != null && localStorage.getItem('stored') == 'yes' && localStorage.getItem('saveProgress') != 'no') {
		loadMemory();
		saveProgress = true;
		togProg.classList.add('save-on');
}
