import APIManager from '../utils/APIManager.js';
import * as loginActions from '../actions/loginActions.js';

class AuthService {

	login(username, password) {
		return new Promise(function (resolve, reject) {
			let url = 'authentication/v1/login';
			const payload = {
				userName: username,
				password: password,
			};
			APIManager.post(url, payload, (err, response) => {
				if (err) {
					// alert("Error: ", err.message);
					return reject(Error(err.message));
				}
				console.log(response);
				if (response === null || response === undefined) {
					return reject(Error('this response is empty'));
				}
				let jwt = response.token;
				loginActions.loginUser(jwt);
				return resolve(response);
			});
		});

		// return true;
	}
}

export default new AuthService();
