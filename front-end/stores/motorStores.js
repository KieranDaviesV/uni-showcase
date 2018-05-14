import {EventEmitter} from 'events';
import dispatcher from '../dispatcher/dispatcher.js';
import APIManager from '../utils/APIManager.js';


class MotorStore extends EventEmitter {
	constructor() {

		super();
		this.motors = [];
		this.mainURL = 'motor/v1/';
		this.motorById;
	}

	//receives the motors list
	getAll() {
		return this.motors;
	}

	//retrieves the motor by the id for the last motor by id retrieved
	//maybe this is the wrong way todo this
	getById() {
		if (this.motorById) {
			return this.motorById;
		}
		return;
	}

	//adds to the database and then updates the list
	createMotor(motorObject) {
		let url = this.mainURL + 'addMotor';
		let savedJwt = localStorage.getItem('jwt');

		if (savedJwt == null) {
			alert('Error: no token provided, please login');
			return;
		}

		APIManager.post(url, motorObject, (err, response) => {
			if (err) {
				alert('Error: ' + err.message);
				return;
			}

			this.motors.push({
				motors: motorObject,
			});
			this.emit('change');
			console.log(this.motors);
		});
	}

	//receives from the database and updates the list
	receiveMotors() {
		let url = this.mainURL + 'getAllMotors';
		APIManager.get(url, null, (err, response) => {
			if (err) {
				alert('Error: ' + err.message);
				return;
			}
			this.motors = [];
			let motorResponse = response.message;
			console.log(response);
			console.log('This response: ' + motorResponse);
			this.motors.push({
				motors: motorResponse,
			});
			this.emit('change');
		});
	}

	//deletes from the database and updates the list
	deleteMotor(motorId) {
		let url = this.mainURL + 'deleteMotorById/' + motorId;
		APIManager.delete(url, null, (err, response) => {
			if (err) {
				alert('Error: ' + err.message);
				return;
			}
			this.receiveMotors();
		});
	}

	receiveMotorById(motorId) {
		let url = this.mainURL + 'getMotorById/' + motorId;
		APIManager.get(url, null, (err, response) => {
			if (err) {
				alert('Error: ' + err.message);
				return;
			}
			this.motorById = response.message;
		});
	}

	//this handles updating the client by id
	updateMotorById(motorObject) {
		let url = this.mainURL + 'updateMotorById/' + motorObject._id;

		APIManager.put(url, motorObject, (err, response) => {
			if (err) {
				alert('Error:' + err.message);
				return;
			}
			this.receiveMotors();
		});
	}

	//this handles the different commands coming from the actions file
	actionHandler(action) {
		console.log('Action received', action);
		switch (action.type) {
			case 'CREATE_MOTOR': {
				this.createMotor(action.object);
				break;
			}
			case 'RECEIVE_MOTORS': {
				this.receiveMotors();
				console.log(this.motors);
				break;
			}
			case 'DELETE_MOTOR': {
				this.deleteMotor(action.id);
				break;
			}
			case 'UPDATE_MOTOR_BY_ID': {
				this.updateMotorById(action.object);
				break;
			}
		}
	}


}

const motorStore = new MotorStore;
dispatcher.register(motorStore.actionHandler.bind(motorStore));


window.motorStore = motorStore;

export default motorStore;
