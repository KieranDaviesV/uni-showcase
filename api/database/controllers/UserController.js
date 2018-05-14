//Import the schema from the modules
const userTable = require('../models/userTable.js');

module.exports = {

	// Create a new User
	createUser: function (params, callback) {
		const user = new userTable({

			firstName: params.firstName,
			lastName: params.lastName,
			emailAddress: params.emailAddress,
			userName: params.userName,
			dateOfBirth: params.dateOfBirth,
			password: params.password,
			ownedMotors: params.motorId,

			ownedGuns: params.gunId,

		});
		userTable.create(user, function (err, userTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, userTable);
		});
	},

	// Find a User by their UserName
	// Also returns all owned upgrades details
	findUserByUserName: function (name, params, callback) {
		userTable.find({userName: name}, params, function (err, userTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, userTable);
		}).populate('ownedMotors ownedGuns');
	},

	// Find all Users and limit the returning results to 50
	findAllUsers: function (params, callback) {
		userTable.find(params, function (err, userTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, userTable);
		}).limit(50);
	},

	// Update a User by their UserName
	findByIdAndUpdate: function (Id, params, callback) {
		userTable.findByIdAndUpdate(Id, {$set: params}, {new: true}, function (err, userTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, userTable);
		});
	}
	// findUserByUserNameAndPassword: function(userObject, params, callback){
	// 	userTable.find({
	// 		username: userObject.user,
	// 		password: userObject.password},
	// 		params, function(err, userTable)){
	// 			if(err){
	// 				callback(err, null);
	// 				return;
	// 			}
	// 			callback(null,userTable);
	// 		})
	// }
	// // Delete a User by their UserName
	// findUserByUserName: function (name, params, callback) {
	// 	userTable.findAndRemove({userName: name}, params, function (err, userTable) {
	// 		if (err) {
	// 			callback(err, null);
	// 			return;
	// 		}
	// 		callback(null, userTable);
	// 	});
	// }
};
