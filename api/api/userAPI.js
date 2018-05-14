const express = require('express');
const router = express.Router();
const RasPiTankController = require('../database/controllers/UserController');
const apiUtil = require('./apiUtils');

// Create a new User
router.post('/v1/:resource', function (req, res) {
	const resource = req.params.resource;

	if (resource == 'addUser') {
		RasPiTankController.createUser(req.body, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

// Find a User by their UserName
router.get('/v1/:resource/:name', function (req, res) {
	const resource = req.params.resource;
	const name = req.params.name;

	if (resource == 'getByUserName') {
		RasPiTankController.findUserByUserName(name, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

// Find all Users
router.get('/v1/:resource', function (req, res) {
	const resource = req.params.resource;
	console.log(resource);
	if (resource == 'getAllUsers') {
		RasPiTankController.findAllUsers(req.query, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

// Update a User by their UserName
router.put('/v1/:resource/:Id', function (req, res) {
	const resource = req.params.resource;
	const Id = req.params.Id;

	if (resource == 'updateUserById') {
		RasPiTankController.findByIdAndUpdate(Id, req.body, function (err, results) {
			apiUtil.JSONOutput(res, err, results);
		});
	}
});

// Upon Deleting User, should this just deactivate their account instead???
// router.delete('/v1/:resource/:name', function(req, res) {
// 	const resource = req.params.resource;
// 	const name = req.params.name;
//
// 	if(resource == 'deleteByUserName'){
// 		RasPiTankController.findUserByUserName(name, function(err, results){
// 			apiUtil.JSONOutput(res, err, results);
// 		});
// 	}
// });

module.exports = router;
