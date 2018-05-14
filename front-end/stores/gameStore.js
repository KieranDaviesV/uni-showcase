import {EventEmitter} from 'events';
import dispatcher from '../dispatcher/dispatcher.js';
import APIManager from '../utils/APIManager.js';


class GameStore extends EventEmitter {
	constructor() {
		super();

		this.games = [];
		this.singleGame;
		this.mainURL = 'game/v1/';
	}

	getAll() {
		return this.games;
	}

	getSingleGame() {
		return this.singleGame;
	}

	createGame(gameObject) {
		let url = this.mainURL + 'addGame';

		let savedJwt = localStorage.getItem('jwt');

		if (savedJwt == null) {
			alert('Error: no token provided, please login');
			return;
		}

		APIManager.postKey(url, gameObject, savedJwt, (err, response) => {
			if (err) {
				alert('Error: ' + err.message);
				return;
			}

			this.games.push({
				gameObject,
			});

			this.emit('change');
		});

		console.log(this.games);
	}

	receiveGames() {
		let url = this.mainURL + 'getAllGames';
		APIManager.get(url, null, (err, response) => {
			if (err) {
				alert('Error: ' + err.message);
				return;
			}
			this.games = [];
			let gameResponse = response.message;
			console.log(response);
			console.log('This response: ' + gameResponse);
			this.games.push({
				games: gameResponse,
			});
			this.emit('change');
		});
	}

	receiveGameById(gameId) {
		let url = this.mainURL + 'getGameById/' + gameId;

		APIManager.get(url, null, (err, response) => {
			if (err) {
				alert('ERROR: ' + err.message);
				return;
			}
			this.singleGame = response.message;
			this.emit('change');
		});
	}

	//this handles updating the client by id
	updateGameById(gameId) {
		let url = this.mainURL + 'updateGameById/' + gameId;

		APIManager.put(url, userObject, (err, response) => {
			if (err) {
				alert('Error:' + err.message);
				return;
			}
			this.receiveGames();
		});
	}

	deleteGameById(gameId) {
		let url = this.mainURL + 'deleteGameById/' + gameId;

		APIManager.delete(url, null, (err, response) => {
			if (err) {
				alert('Error: ' + err.message);
				return;
			}
			this.receiveGames();
		});
	}

	actionHandler(action) {
		console.log('Action received', action);
		switch (action.type) {
			case 'CREATE_GAME': {
				//add the code for creating the a user
				this.createUser(action.object);
				break;
			}
			case 'RECEIVE_GAMES': {
				this.recieveUsers();
				break;
			}
			case 'RECEIVE_BY_GAME_ID': {
				this.receiveUserByuserName(action.object.id);
				break;
			}
			case 'UPDATE_GAME_BY_GAME_ID': {
				this.updateUserById(action.object);
				break;
			}
		}
	}
}

const gameStore = new GameStore();

window.gameStore = gameStore;
dispatcher.register(gameStore.actionHandler.bind(userStore));

export default gameStore;
