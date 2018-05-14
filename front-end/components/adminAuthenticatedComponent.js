import React from 'react';
import loginStore from "../stores/loginStore";
import * as loginActions from '../actions/loginActions.js';
import { Redirect } from 'react-router';
// import Navbar from './NavBar.js';
//
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

export default (ComposedComponent) => {
  return class AdminAuthenticatedComponent extends React.Component{
    constructor(){
      super();
      this.state = this.getLoginState();
      this.checkIfjwt = this.checkIfjwt.bind(this);
    }
    getLoginState(){
      let redirect = false;
      if(!loginStore.isLoggedIn() || !loginStore.admin){
        redirect = true;
      }

      return {
        userLoggedIn: loginStore.isLoggedIn(),
        user: loginStore.user,
        jwt: loginStore.jwt,
        admin: loginStore.admin,
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
      }else if(this.state)
      return(
        <div>
          {/* <Navbar /> */}
          <ComposedComponent
            {...this.props}
            user={this.state.user}
            jwt={this.state.jwt}
            admin={this.state.admin}
            userLoggedIn={this.state.userLoggedIn} />
        </div>

      )
    }
  }
}
