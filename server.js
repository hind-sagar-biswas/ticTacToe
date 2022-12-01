const DEBUG = true;

const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const games = require("./utils/games");

const app = express();
const server = http.createServer(app);
const io = socketio(server);


// Static
app.use(express.static(path.join(__dirname, "public")));

// Client connection
io.on("connection", (socket) => {
	console.log(`A new connection: ${socket.id}`);
});

const port = 3000;

server.listen(port, () => {
	console.log(`Game server listening on http://localhost:${port}/`);
});
