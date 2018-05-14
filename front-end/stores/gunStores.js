import {EventEmitter} from 'events';
import dispatcher from '../dispatcher/dispatcher.js';
import APIManager from '../utils/APIManager.js';


class GunStore extends EventEmitter {
	constructor() {
		super();

		this.guns = [];
		this.gunById;
		this.mainURL = 'gun/v1/';
	}

	getAll() {
		return this.guns;
	}

	createGun(gunObject) {
		let url = this.mainURL + 'addGun';

		APIManager.post(url, gunObject, (err, response) => {
			if (err) {
				alert('Error: ' + err.message);
				return;
			}
			this.receiveGuns();
		});
	}

	//receives from the database and updates the list
	receiveGuns() {
		let url = this.mainURL + 'getAllGuns';
		APIManager.get(url, null, (err, response) => {
			if (err) {
				alert('Error: ' + err.message);
				return;
			}
			this.guns = [];
			let gunResponse = response.message;
			console.log(response);
			console.log('This response: ' + gunResponse);
			this.guns.push({
				guns: gunResponse,
			});
			this.emit('change');
		});
	}

	//deletes from the database and updates the list
	deleteGun(gunId) {
		let url = this.mainURL + 'deleteMotorById/' + gunId;
		APIManager.delete(url, null, (err, response) => {
			if (err) {
				alert('Error: ' + err.message);
				return;
			}
			this.receiveGuns();
		});
	}

	receiveGunById(gunId) {
		let url = this.mainURL + 'getGunById/' + gunId;
		APIManager.get(url, null, (err, response) => {
			if (err) {
				alert('Error: ' + err.message);
				return;
			}
			this.gunById = response.message;
		});
	}

	//this handles updating the client by id
	updateGunById(gunObject) {
		let url = this.mainURL + 'updateGunById/' + gunObject._id;

		APIManager.put(url, gunObject, (err, response) => {
			if (err) {
				alert('Error:' + err.message);
				return;
			}
			this.receiveGuns();
		});
	}

	actionHandler(action) {
		console.log('Action received', action);
		switch (action.type) {
			case 'CREATE_GUN': {
				//add the code for creating the a motor
				this.createGun(action.object);
				break;
			}
			case 'RECEIVE_GUNS': {
				this.receiveGuns();
				break;
			}
			case 'DELETE_GUN': {
				this.deleteGun(action.id);
				break;
			}
			case 'UPDATE_GUN_BY_ID': {
				this.updateMotorById(action.object);
				break;
			}
		}
	}
}

const gunStore = new GunStore;
dispatcher.register(gunStore.actionHandler.bind(gunStore));

window.gunStore = gunStore;

export default gunStore;
