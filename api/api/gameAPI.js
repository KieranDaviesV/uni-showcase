const express = require('express');
const router = express.Router();
const RasPiTankController = require('../database/controllers/GameController');
const apiUtil = require('./apiUtils');
const verifyToken = require('./auth/TokenManager.js');

// Create a new Game
router.post('/v1/:resource', function (req, res) {
	const resource = req.params.resource;

	if (resource == 'addGame') {
		RasPiTankController.createGame(req.body, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});
//create a game v2 with added authentication
router.post('/v2/:resource', verifyToken, function (req, res) {
	const resource = req.params.resource;

	if (resource == 'addGame') {
		RasPiTankController.createGame(req.body, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});
// Find a Game by its Id
router.get('/v1/:resource/:Id', function (req, res) {
	const resource = req.params.resource;
	const Id = req.params.Id;

	if (resource == 'getGameById') {
		RasPiTankController.findGameById(Id, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

// Find all Games
router.get('/v1/:resource', function (req, res) {
	const resource = req.params.resource;

	if (resource == 'getAllGames') {
		RasPiTankController.findAllGames(req.query, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

// Update a Game by its Id
router.put('/v1/:resource/:Id', function (req, res) {
	const resource = req.params.resource;
	const Id = req.params.Id;

	if (resource == 'updateGameById') {
		RasPiTankController.findGameByIdAndUpdate(Id, req.body, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

// Delete a Game by its Id
router.delete('/v1/:resource/:Id', function (req, res) {
	const resource = req.params.resource;
	const Id = req.params.Id;

	if (resource == 'deleteGameById') {
		RasPiTankController.deleteGameById(Id, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

module.exports = router;
