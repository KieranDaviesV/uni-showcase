import dispatcher from '../dispatcher/dispatcher.js';

// import RouterContainer from "../services/routerContainer.js";

export function loginUser(jwt) {
	// RouterContainer.get().transitionTo('/');
	let savedJwt = localStorage.getItem('jwt');

	// console.log(savedJwt);

	dispatcher.dispatch({
		type: 'LOGIN_USER',
		jwt: jwt,
	});

	if (savedJwt !== jwt || savedJwt == null) {
		localStorage.setItem('jwt', jwt);
	}
	// RouterContainer.get().transitionTo('/');
}

export function updateJWT() {
	let jwt = localStorage.getItem('jwt');
	if (jwt == null) {
		console.log('No JWT saved');
		return;
	}

	dispatcher.dispatch({
		type: 'LOGIN_JWT',
		jwt: jwt,
	});
}

export function logout() {

	localStorage.removeItem('jwt');

	dispatcher.dispatch({
		type: 'LOGOUT_USER',
	});
}
