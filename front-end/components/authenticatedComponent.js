import React from 'react';
import loginStore from '../stores/loginStore';
import * as loginActions from '../actions/loginActions.js';
import {Redirect} from 'react-router';
// import Navbar from './Pages/NavBar.js';

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component{
    constructor(){
      super();
      this.state = this.getLoginState();
      this.checkIfjwt = this.checkIfjwt.bind(this);
    }
    getLoginState(){
      let redirect = false;
      if(!loginStore.isLoggedIn()){
        redirect = true;
      }

      return {
        userLoggedIn: loginStore.isLoggedIn(),
        user: loginStore.user,
        jwt: loginStore.jwt,
        redirect: redirect
      };
    }
    componentWillMount(){
      loginStore.on("change", this.getLoginState);
      this.checkIfjwt();
    }
    checkIfjwt = () => {
      loginActions.updateJWT();
      this.state = this.getLoginState();
    }
    render(){
      // console.log(this.state);
      if(this.state.redirect){
        return <Redirect to='/login'/>;
      }
      return(
        <div>
          <ComposedComponent
            {...this.props}
            user={this.state.user}
            jwt={this.state.jwt}
            userLoggedIn={this.state.userLoggedIn} />
        </div>
			)
		}
	}
}
