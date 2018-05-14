const mongoose = require('mongoose');

const motorTable = mongoose.Schema({

	motorName: {
		type: String,
		default: false
	},
	motorPrice: {
		type: Number,
		default: false
	},
	motorDescription: {
		type: String,
		default: false
	},
	motorSpeed: {
		type: Number,
		default: false
	},
	dateCreated: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('rasPiTankMotor', motorTable);


// [{
// 	"motorName": "Motor 1",
// 	"motorPrice": "10",
// 	"motorDescription": "First motor",
// 	"motorSpeed": 100
// },
// {
// 	"motorName": "Motor 2",
// 	"motorPrice": "20",
// 	"motorDescription": "Second motor",
// 	"motorSpeed": 200
// },
// {
// 	"motorName": "Motor 3",
// 	"motorPrice": "30",
// 	"motorDescription": "Third motor",
// 	"motorSpeed": 300
// }]
