const express = require('express');
const router = express.Router();
const RasPiTankController = require('../database/controllers/MotorController');
const apiUtil = require('./apiUtils');
const verifyToken = require('./auth/TokenManager.js');

// Create a new Motor
router.post('/v1/:resource' ,function (req, res) {
	const resource = req.params.resource;

	if (resource == 'addMotor') {
		RasPiTankController.createMotor(req.body, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});
//crete motor v2 with authentication
router.post('/v2/:resource',verifyToken ,function (req, res) {
	const resource = req.params.resource;

	if (resource == 'addMotor') {
		RasPiTankController.createMotor(req.body, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});
// Find a Motor by its Id
router.get('/v1/:resource/:Id', function (req, res) {
	const resource = req.params.resource;
	const Id = req.params.Id;

	if (resource == 'getMotorById') {
		RasPiTankController.findMotorById(Id, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

// Find all Motors
router.get('/v1/:resource', function (req, res) {
	const resource = req.params.resource;

	if (resource == 'getAllMotors') {
		RasPiTankController.findAllMotors(req.query, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

// Update a Motor by its Id
router.put('/v1/:resource/:Id', function (req, res) {
	const resource = req.params.resource;
	const Id = req.params.Id;

	if (resource == 'updateMotorById') {
		RasPiTankController.findByIdAndUpdate(Id, req.body, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

// Delete a Motor by its Id
router.delete('/v1/:resource/:Id', function (req, res) {
	const resource = req.params.resource;
	const Id = req.params.Id;

	if (resource == 'deleteMotorById') {
		RasPiTankController.deleteMotorById(Id, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

module.exports = router;
