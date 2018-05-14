//Import the schema from the modules
const gunTable = require('../models/gunTable.js');

module.exports = {

	// Create a new Gun
	createGun: function (params, callback) {
		gunTable.create(params, function (err, gunTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, gunTable);
		});
	},

	// Find a Gun by its Id
	findGunById: function (Id, callback) {
		gunTable.findById(Id, function (err, gunTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, gunTable);
		});
	},

	// Find all Guns and limit the returning results to 50
	findAllGuns: function (params, callback) {
		gunTable.find(params, function (err, gunTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, gunTable);
		}).limit(50);
	},

	// Update a Gun by its Id
	findGunByIdAndUpdate: function (Id, params, callback) {
		gunTable.findByIdAndUpdate(Id, {$set: params}, {new: true}, function (err, gunTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, gunTable);
		});
	},

	// Delete a Gun by its Id
	findGunById: function (Id, callback) {
		gunTable.findByIdAndRemove(Id, function (err, gunTable) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, gunTable);
		});
	},
};
