const mongoose = require('mongoose');

const gameTable = mongoose.Schema({

	points: {
		type: Number,
		default: false
	},

	kills: {
		type: Number,
		default: false
	},

	wins: {
		type: Number,
		default: false
	},

	losses: {
		type: Number,
		default: false
	},

	draws: {
		type: Number,
		default: false
	},

	hitsDealt: {
		type: Number,
		default: false
	},

	hitsTaken: {
		type: Number,
		default: false
	},

	accuracy: {
		type: Number,
		default: false
	},

	dateCreated: {
		type: Date,
		default: Date.now
	},

	players: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'rasPiTankUser',
		default: ''
	}]
});

module.exports = mongoose.model('rasPiTankGame', gameTable);

// [{
// 	"points": 1111111111,
// 	"kills": 1111111111,
// 	"wins": 1111111111,
// 	"losses": 1111111111,
// 	"draws": 1111111111,
// 	"hitsDealt": 1111111111,
// 	"hitsTaken": 1111111111,
// 	"accuracy": 11.11,
// },
// {
// 	"points": 2222222222,
// 	"kills": 2222222222,
// 	"wins": 2222222222,
// 	"losses": 2222222222,
// 	"draws": 2222222222,
// 	"hitsDealt": 2222222222,
// 	"hitsTaken": 2222222222,
// 	"accuracy": 22.22,
// },
// {
// 	"points": 3333333333,
// 	"kills": 3333333333,
// 	"wins": 3333333333,
// 	"losses": 3333333333,
// 	"draws": 3333333333,
// 	"hitsDealt": 3333333333,
// 	"hitsTaken": 3333333333,
// 	"accuracy": 33.33,
// }]


// {
// 	"points": 20,
// 	"kills": 3,
// 	"wins": 4,
// 	"losses": 2, 
// 	"draws": 1,
// 	"hitsDealt": 45,
// 	"hitsTaken":23,
// 	"accuracy": 56,
// 	"players": ["5ae0f99e2e9d78000f918da9"]
// }