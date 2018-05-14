import {EventEmitter} from 'events';
import dispatcher from '../dispatcher/dispatcher.js';
import jwt_decode from 'jwt-decode';

class LoginStore extends EventEmitter {
	constructor() {
		super();
		this.user = null;
		this.jwt = null;
		this.admin = true;
	}

	actionHandler(action) {
		console.log(action);
		switch (action.type) {
			case 'LOGIN_USER': {
				console.log(action.jwt);
				this.loginUser(action.jwt);
				break;
			}
			case 'LOGIN_JWT': {
				this.loginJwt(action.jwt);
				break;
			}
			case 'LOGOUT_USER': {
				this.logoutUser();
				break;
			}
			default: {
				break;
			}
		}
		;
	}

	loginUser(jwt) {
		this.jwt = jwt;
		this.user = jwt_decode(this.jwt);
		console.log(this.user);
		console.log(this.jwt);
		this.emit('change');
	}

	loginJwt(jwt) {
		this.jwt = jwt;
		this.user = jwt_decode(this.jwt);
		this.emit('change');
	}

	logoutUser() {
		this.jwt = null;
		this.user = null;
		this.emit('change');
	}

	getUser() {
		return this.user;
	}

	getJwt() {
		return this.jwt;
	}

	isLoggedIn() {
		return !!this.user;
	}

	isAdmin() {
		return this.admin;
	}
}

const loginStore = new LoginStore();

dispatcher.register(loginStore.actionHandler.bind(loginStore));

export default loginStore;
