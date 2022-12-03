const DEBUG = true;

const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const games = require("./utils/games");
const players = require("./utils/players");

const app = express();
const server = http.createServer(app);
const io = socketio(server);


// Static
app.use(express.static(path.join(__dirname, "public")));

// Client connection
io.on("connection", (socket) => {
	if(DEBUG) console.log(`=> A new connection @ socket: ${socket.id}`);

	socket.on('createPlayer', (username) => {
		const player = players.addPlayer(socket.id, username);
		if (DEBUG) console.log(`=> Player joined -> ${player.username}[${player.id}]`);
		socket.emit('playerInfo', player);
	});

	socket.on('startGame', (playerId, point, starter) => {
		const host = players.getCurrentPlayer(playerId);
		const game = games.createGame(host, point, starter);

		if (DEBUG) console.log(`=> A new game started -> gameId: ${game.id} by ${game.host.username}`);
		socket.emit('gameUpdate', game);
	});

	socket.on('joinGame', (playerId, gameId) => {
		const game = games.joinGame(gameId, playerId);
		socket.emit("gameUpdate", game);
	});
});

const port = 3000;

server.listen(port, () => {
	if (DEBUG) console.log(`Game server listening on http://localhost:${port}/`);
	if (DEBUG) console.log(`App is on DEBUG mode!\n-\n-`);
});
