import dispatcher from '../dispatcher/dispatcher.js';

export function createGun(object) {
	dispatcher.dispatch({
		type: 'CREATE_GUN',
		object,
	});
}

export function reloadGun() {
	dispatcher.dispatch({
		type: 'RECEIVE_GUNS',
	});
}

export function deleteGun(gunId) {
	dispatcher.dispatch({
		type: 'DELETE_GUN',
		id: gunId,
	});
}

export function updateGunById(gunObject) {
	dispatcher.dispatch({
		type: 'UPDATE_GUN_BY_ID',
		gunObject,
	});
}
