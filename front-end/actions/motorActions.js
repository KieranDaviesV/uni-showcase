import dispatcher from '../dispatcher/dispatcher.js';

export function createMotor(object) {
	dispatcher.dispatch({
		type: 'CREATE_MOTOR',
		object,
	});
}

export function reloadMotor() {
	dispatcher.dispatch({
		type: 'RECEIVE_MOTORS',
	});
}

export function deleteMotor(motorId) {
	dispatcher.dispatch({
		type: 'DELETE_MOTOR',
		id: motorId,
	});
}

export function updateMotorById(motorObject) {
	dispatcher.dispatch({
		type: 'UPDATE_MOTOR_BY_ID',
		motorObject,
	});
}
