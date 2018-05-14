//Import the schema from the modules
const gameTable = require('../models/gameTable.js');

module.exports = {

	// Create a new Game
	createGame: function (params, callback) {
		const game = new gameTable({

			points: params.points,
			kills: params.kills,
			wins: params.wins,
			losses: params.losses,
			draws: params.draws,
			hitsDealt: params.hitsDealt,
			hitsTaken: params.hitsTaken,
			accuracy: params.accuracy,

			players: params.playerId

		});
		gameTable.create(game, function (err, gameTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, gameTable);
		});
	},

	// Find a Game by its Id
	// Also returns all players for the game
	findGameById: function (Id, callback) {
		gameTable.findById(Id, function (err, gameTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, gameTable);
		}).populate('players');
	},

	// Find all Games and limit the returning results to 50
	findAllGames: function (params, callback) {
		gameTable.find(params, function (err, gameTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, gameTable);
		}).limit(50);
	},

	// Update a Game by its Id
	findGameByIdAndUpdate: function (Id, params, callback) {
		gameTable.findByIdAndUpdate(Id, {$set: params}, {new: true}, function (err, gameTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, gameTable);
		});
	},

	// Delete a Game by its Id
	deleteGameById: function (Id, callback) {
		gameTable.findByIdAndRemove(Id, function (err, gameTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, gameTable);
		});
	},
};
