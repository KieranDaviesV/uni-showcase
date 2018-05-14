const mongoose = require('mongoose');

const userTable = mongoose.Schema({

	firstName: {
		type: String,
		default: '',
		require: true
	},

	lastName: {
		type: String,
		default: '',
		require: true
	},

	emailAddress: {
		type: String,
		default: '',
		require: true
	},

	userName: {
		type: String,
		default: '',
		require: true
	},

	password: {
		type: String,
		default: '',
		require: true
	},
	
	dateOfBirth: {
		type: Date,
		default: '',
		require: true
	},

	dateCreated: {
		type: Date,
		default: Date.now
	},

	tanks: [{
		tankName: {
			type: String,
			default: '',
			require: true
		},
		tankMotor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'rasPiTankMotor',
			default: ''
		},
		ownedGuns: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'rasPiTankGun',
			default: ''
		}
	}],

	ownedMotors: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'rasPiTankMotor',
		default: ''
	}],

	ownedGuns: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'rasPiTankGun',
		default: ''
	}]
});

module.exports = mongoose.model('rasPiTankUser', userTable);

// [{
// 	"firstName": "First",
// 	"lastName": "Last",
// 	"emailAddress": "e@mail.com",
// 	"userName": "userName",
// 	"dateOfBirth": ""
// },
// {
// 	"firstName": "First2",
// 	"lastName": "Last2",
// 	"emailAddress": "e2@mail.com",
// 	"userName": "userName2",
// 	"dateOfBirth": ""
// },
// {
// 	"firstName": "First3",
// 	"lastName": "Last3",
// 	"emailAddress": "e3@mail.com",
// 	"userName": "userName3",
// 	"dateOfBirth": ""
// }]

// {
//     "confirmation": "success",
//     "message": {
//         "firstName": "Robin",
//         "lastName": "Davies",
//         "emailAddress": "robin@gmail.com",
//         "userName": "robin",
//         "password": "password",
//         "dateOfBirth": null,
//         "ownedMotors": [
//             "5ae112292e9d78000f918dab",
//             "5ae112292e9d78000f918dac"
//         ],
//         "ownedGuns": [
//             "5ae0ef7f2e9d78000f918da6",
//             "5ae0ef7f2e9d78000f918da7"
//         ],
//         "dateCreated": "2018-04-25T21:56:46.421Z",
//         "tanks": [
//             {
//                 "tankName": "Fast Tank",
//                 "_id": "5ae114122e9d78000f918db8"
//             }
//         ]
//     }
// }
