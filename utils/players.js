const players = [];

// Add new player
const addPlayer = (username, id) => {
	const player = { id, username };
	players.push(player);
	return player;
};

// Get current player
const getCurrentPlayer = (id) => {
	return players.find((player) => player.id === id);
};

// remove player
const removePlayer = (id) => {
	const index = players.findIndex((player) => player.id === id);
	if (index !== -1) return players.splice(index, 1)[0];
};

module.exports = {
	addPlayer,
    getCurrentPlayer,
    removePlayer,
};