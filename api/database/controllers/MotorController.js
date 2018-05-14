//Import the schema from the modules
const motorTable = require('../models/motorTable.js');

module.exports = {

	// Create a new Motor
	createMotor: function (params, callback) {
		motorTable.create(params, function (err, motorTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, motorTable);
		});
	},

	// Find a Motor by its Id
	findMotorById: function (Id, callback) {
		motorTable.findById(Id, function (err, motorTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, motorTable);
		});
	},

	// Find all Motors and limit the returning results to 50
	findAllMotors: function (params, callback) {
		motorTable.find(params, function (err, motorTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, motorTable);
		}).limit(50);
	},

	// Update a Motor by its Id
	findByIdAndUpdate: function (Id, params, callback) {
		motorTable.findByIdAndUpdate(Id, {$set: params}, {new: true}, function (err, motorTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, motorTable);
		});
	},

	// Delete a Motor by its Id
	deleteMotorById: function (Id, callback) {
		motorTable.findByIdAndRemove(Id, function (err, motorTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, motorTable);
		});
	},

};
