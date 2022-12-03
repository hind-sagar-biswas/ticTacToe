const gameboard = require('./../utils/gameboard');
const players = require('./../utils/players');

const games = [];

// Create new game
const createGame = (host, point, starter) => {
    const game = {
        id: new Date().getTime(),
        host,
        starter,
        point,
        opponent: {
            id: null,
            username: "Not joined Yet"
        },
        board: gameboard.setupBoard(),
    };
    games.push(game);
    return game;
};


// Join Game
const joinGame = (gameId, playerId) => {
	const gameIndex = games.find((game) => game.id === gameId);
	const currentPlayer = players.getCurrentPlayer(playerId);
    games[gameIndex].opponent = currentPlayer;
    return games[gameIndex];
};

// Get game
const getGame = (gameId) => {
    const index = games.findIndex((game) => { return game.id == gameId; });
    const game = games[index];
	return game;
};

// Destroy game
const destroyGame = (gameId) => {
    const index = games.findIndex((game) => game.id === gameId);
	if (index !== -1) return games.splice(index, 1)[0];
};

module.exports = {
    createGame,
    joinGame,
    getGame,
    destroyGame,
};