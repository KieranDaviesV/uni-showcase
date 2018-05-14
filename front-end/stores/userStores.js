import {EventEmitter} from 'events';
import dispatcher from '../dispatcher/dispatcher.js';
import APIManager from '../utils/APIManager.js';


class UsersStore extends EventEmitter {
	constructor() {
		super();
		this.users = [];
		this.userByUsername = [];
		this.mainURL = 'user/v1/';
	}

	actionHandler(action) {
		console.log('Action received', action);

		switch (action.type) {
			case 'CREATE_USER': {
				this.createUser(action.object);
				break;
			}
			case 'RECIEVE_USERS': {
				this.receiveUsers();
				break;
			}
			case 'RECEIVE_BY_USERNAME': {
				this.receiveUserByUserName(action.object.userName);
				break;
			}
			case 'UPDATE_USER_BY_ID': {
				this.updateUserById(action.object);
				break;
			}
			default: {
				break;
			}
		}
	}

	createUser(userObject) {
		console.log('store being called');
		let url = this.mainURL + 'addUser';

		APIManager.post(url, userObject, (err, response) => {
			if (err) {
				alert('Error: ' + err.message);
				return;
			}

			this.receiveUsers();
			this.emit('change');
		});
		console.log(this.users);
	}

	receiveUsers() {
		let url = this.mainURL + 'getAllUsers';
		APIManager.get(url, null, (err, response) => {
			if (err) {
				alert('Error: ' + err.message);
				return;
			}
			this.users = [];
			let userResponse = response.message;
			console.log(response);
			console.log('This response: ' + userResponse);
			this.users.push({
				users: userResponse,
			});
			this.emit('change');
		});
	}

	receiveUserByUserName(userName) {
		let url = this.mainURL + 'getUserByUserName/' + userName;
		APIManager.get(url, null, (err, response) => {
			if (err) {
				alert('Error: ' + err.message);
				return;
			}
			this.userByUsername = response.message;
		});
	}

	//this handles updating the client by id
	updateUserById(userObject) {
		let url = this.mainURL + 'updateUserById/' + userObject._id;

		APIManager.put(url, userObject, (err, response) => {
			if (err) {
				alert('Error:' + err.message);
				return;
			}
			this.receiveUsers();
		});
	}

	getAll() {
		return this.users;
	}

	getActiveUser() {
		return this.userByUsername;
	}
}

const userStore = new UsersStore();

window.userStore = userStore;

dispatcher.register(userStore.actionHandler.bind(userStore));


export default userStore;
