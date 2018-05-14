import dispatcher from '../dispatcher/dispatcher.js';

export function createGame(object) {
	dispatcher.dispatch({
		type: 'CREATE_GAME',
		object,
	});
}

export function reloadGames() {
	dispatcher.dispatch({
		type: 'RECEIVE_GAMES',
	});
}

export function recieveByGameId(id) {
	dispatcher.dispatch({
		type: 'RECEIVE_BY_GAME_ID',
		id: id,
	});
}

export function updateUserById(object) {
	dispatcher.dispatch({
		type: 'UPDATE_USER_BY_ID',
		object,
	});
}
