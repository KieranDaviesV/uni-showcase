import React from 'react';
import * as userActions from '../../actions/userActions.js';
import {Form, FormGroup, FormControl, Button, Row, Col} from 'react-bootstrap';
import Navbar from './NavBar.js';
import loginStore from '../../stores/loginStore.js';
import userStore from '../../stores/userStores.js';
import {Redirect} from 'react-router';
import image from '../images/splashscreen.png';
import Auth from '../../services/AuthService.js';


export default class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			type: 'password',
			redirect: false,
		};

		this.showHide = this.showHide.bind(this);
		this.signUp = this.signUp.bind(this);
	}

	showHide(e) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			type: this.state.type === 'input' ? 'password' : 'input',
		});
	}

	signUp = (e) => {
		e.preventDefault();

		let userObject = {
			firstName: this.firstName.value,
			lastName: this.lastName.value,
			emailAddress: this.email.value,
			userName: this.userName.value,
			dateOfBirth: this.dob.value,
			password: this.password.value,
		};

		userActions.createUser(userObject);
		let self = this;
		Auth.login(userObject.userName, userObject.password)
				.then(function(response){
					self.setState({
						redirect: true
					})
				}, function(err){
					console.log(err);
				})
	};

	render() {

		if (loginStore.isLoggedIn()) {
			return <Redirect to='/'/>;
		}
		if(this.state.redirect){
			return <Redirect to='/'/>;
		}
		return (
			<div className="splashScreenContainer">

				<Navbar/>

				<div className="loginAndRegistryContainer">
					<h1>Register</h1>

					<Form onSubmit={this.signUp}>
						<FormGroup controlId="formInlineName">
							<FormControl
								inputRef={input => this.firstName = input}
								type="text"
								placeholder="First Name"
								required
							/>

							<br/>

							<FormControl
								inputRef={input => this.lastName = input}
								type="text"
								placeholder="Last Name"
								required
							/>

							<br/>

							<FormControl
								inputRef={input => this.email = input}
								type="text"
								placeholder="Email Address"
								required
							/>

							<br/>

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

							<FormControl
								inputRef={input => this.dob = input}
								type="date"
								placeholder="Date of Birth"
								required
							/>

							<br/>

							<Button type="submit">Sign Me Up, Sir!</Button>

						</FormGroup>
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
