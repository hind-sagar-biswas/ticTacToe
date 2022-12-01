const gameboard = require('./../utils/gameboard');

const games = [];

const createGame = (host, point) => {
	gameboard.setupBoard();
};


module.exports = {
    createGame,
};