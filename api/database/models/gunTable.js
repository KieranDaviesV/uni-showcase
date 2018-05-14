const mongoose = require('mongoose');

const gunTable = mongoose.Schema({

	gunName: {
		type: String,
		default: false
	},
	gunPrice: {
		type: Number,
		default: false
	},
	gunDescription: {
		type: String,
		default: false
	},
	gunAmmo: {
		type: Number,
		default: false
	},
	gunDamage: {
		type: Number,
		default: false
	},
	gunReloadTime: {
		type: Number,
		default: false
	},
	dateCreated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('rasPiTankGun', gunTable);

// [{
// 	"gunName": "Gun 1",
// 	"gunPrice": 10,
// 	"gunDescription": "First gun",
// 	"gunAmmo": 10,
// 	"gunDamage": 10,
// 	"gunReloadTime": 1
// },
// {
// 	"gunName": "Gun 2",
// 	"gunPrice": 20,
// 	"gunDescription": "Second gun",
// 	"gunAmmo": 20,
// 	"gunDamage": 20,
// 	"gunReloadTime": 2
// },
// {
// 	"gunName": "Gun 3",
// 	"gunPrice": 30,
// 	"gunDescription": "Third gun",
// 	"gunAmmo": 30,
// 	"gunDamage": 30,
// 	"gunReloadTime": 3
// }]
