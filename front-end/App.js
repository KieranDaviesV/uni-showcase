import React, { Component } from 'react';
import Router from './components/Routes.js';

import './App.css';
import * as PlayerActons from './components/GamePlayActions/PlayerActions.js';


export default class App extends Component {
	setJwt = () =>{
		console.log("This works x");
		PlayerActons.setJwt();
	}
	render() {
		this.setJwt();
		return (
			<div className="App">

				<Router/>

			</div>
		);
	}
}
