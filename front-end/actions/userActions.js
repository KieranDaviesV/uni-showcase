import dispatcher from '../dispatcher/dispatcher.js';

export function createUser(object) {
	console.log(object);
	dispatcher.dispatch({
		type: 'CREATE_USER',
		object,
	});
}

export function reloadUser() {
	dispatcher.dispatch({
		type: 'RECIEVE_USERS',
	});
}

export function recieveByUserName(userName) {
	dispatcher.dispatch({
		type: 'RECIEVE_BY_USERNAME',
		username: userName,
	});
}

export function updateUserById(object) {
	dispatcher.dispatch({
		type: 'UPDATE_USER_BY_ID',
		object,
	});
}
