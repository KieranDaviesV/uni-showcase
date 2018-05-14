import React from 'react';
import {Link} from 'react-router-dom';
import * as loginActions from '../../actions/loginActions.js';
import {Redirect} from 'react-router';
import loginStore from '../../stores/loginStore.js';
import userIcon from './../images/soldier.png';
// import './loginAndRegistry.css';

export default class NavBar extends React.Component {
	constructor() {
		super();
		this.state = {
			redirect: false,
		};
	}

	logout = () => {
		loginActions.logout();
		this.setState({redirect: true});
		this.forceUpdate();
	};

	render() {
		if (this.state.redirect) {
			this.setState({redirect: false});
			return <Redirect to='/login'/>;
		}

		let loginChange;
		if (loginStore.isLoggedIn()) {
			loginChange = <a onClick={this.logout}>Logout</a>;
		} else {
			loginChange = <Link to='/login'>Login</Link>;
		}
		let admin;
		if(loginStore.admin){
			admin = <Link to='/admin'>Admin</Link>;
		}
		return (
			<div>

				<div className="logout">
					<img src={userIcon} alt="user icon"/>

					<div className="options">
						{loginChange}
						<Link to='/register'>Register</Link>
						{admin}
					</div>
				</div>

			</div>
		);
	}
}
