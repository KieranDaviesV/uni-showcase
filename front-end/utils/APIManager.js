import superagent from 'superagent';

// const serverUrl = 'http://localhost:9000/api/';
const serverUrl = 'http://10.10.10.165:9000/api/';

export default {
	//get request helper
	get: (url, params, callback) => {
		superagent
			.get(serverUrl + url)
			.query(params)
			.set('Accept', 'application/json')
			.end((err, response) => {
				if (err) {
					callback(err, null);
					return;
				}

				const confirmation = response.body.confirmation;

				if (confirmation !== 'success') {
					callback({message: response.body.message}, null);
					return;
				}

				callback(null, response.body);
			})

	},

	//post request helper
	post: (url, body, callback) => {
		superagent
			.post(serverUrl + url)
			.send(body)
			.set('Accept', 'application/json')
			.end((err, response) => {
				if (err){
					callback(err, null);
					return;
				}

				const confirmation = response.body.confirmation;

				if(confirmation !== 'success'){
					callback({message: response.body.message}, null);
					return;
				}
				callback(null, response.body);
			})
	},

	// add the access token to the request

	postKey: (url,body, jwt, callback) => {
		console.log(jwt);
		superagent
			.post(serverUrl + url)
			.send(body)
			.set('x-access-token', jwt)
			.end((err, response) => {
				if (err) {
					callback(err, null);
					return;
				}

				const confirmation = response.body.confirmation;

				if (confirmation !== 'success') {
					callback({message: response.body.message}, null);
					return;
				}
				callback(null, response.body);
			});
	},

	//put request helper
	put: (url, body, callback) => {
		superagent
			.put(serverUrl + url)
			.send(body)
			.set('Accept', 'application/json')
			.end((err, response) => {
				if(err){
					callback(err, null);
					return;
				}
				const confirmation = response.body.confirmation;

				if(confirmation !== 'success'){
					callback({message: response.body.message}, null);
					return;
				}
				callback(null, response.body);
			})
	},

	delete: (url,params, callback) => {
		superagent
			.del(serverUrl + url)
			.query(params)
			.set('Accept', 'application/json')
			.end((err, response) => {
				if(err){
                    callback(err, null);
					return;
				}
				const confirmation = response.body.confirmation;

				if(confirmation !== ' success'){
					callback({message: response.body.message}, null);
					return;
				}
				callback(null, response.body);
			})
	}
}
