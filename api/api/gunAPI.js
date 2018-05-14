const express = require('express');
const router = express.Router();
const RasPiTankController = require('../database/controllers/GunController');
const apiUtil = require('./apiUtils');
const verifyToken = require('./auth/TokenManager.js');


// Create a new Gun
router.post('/v1/:resource', function (req, res) {
	const resource = req.params.resource;

	if (resource == 'addGun') {
		RasPiTankController.createGun(req.body, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});
// Create a new Gun v2 with added authentication
router.post('/v2/:resource', verifyToken, function (req, res) {
	const resource = req.params.resource;

	if (resource == 'addGun') {
		RasPiTankController.createGun(req.body, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

// Find a Gun by its Id
router.get('/v1/:resource/:Id', function (req, res) {
	const resource = req.params.resource;
	const Id = req.params.Id;

	if (resource == 'getGunById') {
		RasPiTankController.findGunById(Id, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

// Find all Guns
router.get('/v1/:resource', function (req, res) {
	const resource = req.params.resource;

	if (resource == 'getAllGuns') {
		RasPiTankController.findAllGuns(req.query, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

// Update a Gun by its Id
router.put('/v1/:resource/:Id', function (req, res) {
	const resource = req.params.resource;
	const Id = req.params.Id;

	if (resource == 'updateGunById') {
		RasPiTankController.findGunByIdAndUpdate(Id, req.body, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

// Delete a Gun by its Id
router.delete('/v1/:resource/:Id', function (req, res) {
	const resource = req.params.resource;
	const Id = req.params.Id;

	if (resource == 'deleteGunById') {
		RasPiTankController.findGunById(Id, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

module.exports = router;
