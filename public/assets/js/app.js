const DEBUG = true;

const socket = io();
const startgameForm = document.getElementById("startgame-form");

let username, starter, point

let playerInfo = window.localStorage.getItem("playerInfo");
if (playerInfo != undefined || playerInfo != null || playerInfo != "")
	playerInfo = JSON.parse(playerInfo);

socket.on("playerInfo", (player) => {
    if (DEBUG) console.log(player);
	window.localStorage.setItem("playerInfo", JSON.stringify(player));
	playerInfo = JSON.parse(window.localStorage.getItem("playerInfo"));

	socket.emit("startGame", player.id, point, starter);
});

socket.on("gameUpdate", (gameObj) => {
	window.localStorage.setItem("currentGame", gameObj.id);
	window.location.href = `/play.html?gid=${gameObj.id}`;
});

if (startgameForm != null) {
     if (DEBUG) console.log("form exists");
	startgameForm.addEventListener("submit", (e) => {
		e.preventDefault();

		username = e.target.elements.username.value;
		starter = e.target.elements.starter.value;
		point = e.target.elements.winPoints.value;

        if (DEBUG) console.log(username);

		socket.emit("createPlayer", username);

        return false;
	});
} else {
}
