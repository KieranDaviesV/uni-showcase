import React from 'react';
import Auth from '../../services/AuthService.js';
import * as loginActions from '../../actions/loginActions.js';
import {Form, FormControl, Button, Row, Col} from 'react-bootstrap';
import {Redirect} from 'react-router';
import loginStore from '../../stores/loginStore.js';
import NavBar from './NavBar.js';
import image from '../images/splashscreen.png';
import './loginAndRegistry.css';


const style = {
	marginTop: '120px',
};

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			user: '',
			password: '',
			redirect: false,
		};
		this.login = this.login.bind(this);
	}

	login = (e) => {
		e.preventDefault();

		if (this.userName.value === '' || this.password.value === '') {
			console.log('No details');
			return;
		}
		let self = this;
		this.setState({
			user: this.userName.value,
			password: this.password.value,
		}, function () {
			Auth.login(this.state.user, this.state.password)
				.then(function (response) {
					self.setState({redirect: true});
					console.log(response);
				}, function (err) {
					console.log(err);
					alert("Login failure");
				});

		});
	};
	checkIfjwt = () => {
		loginActions.updateJWT();
		if (loginStore.isLoggedIn()) {
			this.setState({
				redirect: true,
			});
		}
	};

	render() {
		this.checkIfjwt();
		const redirect = this.state.redirect;

		if (redirect) {
			this.setState({
				redirect: false,
			});
			return <Redirect to='/'/>;
		}
		return (
			<div className="splashScreenContainer">

				<NavBar/>

				<div className="loginAndRegistryContainer">
					<h1>Login</h1>

					<Form onSubmit={this.login}>
						<FormControl
							inputRef={input => this.userName = input}
							type="text"
							placeholder="User Name"
							required
						/>

						<br/>

						<FormControl
							inputRef={input => this.password = input}
							type="password"
							placeholder="Password"
							required
						/>

						<br/>

						<Button type="submit">GO!</Button>

					</Form>
				</div>

				<img
					className="imgStyle"
					alt="Splashscreen background"
					src={image}
				/>

			</div>
		);
	}
}
