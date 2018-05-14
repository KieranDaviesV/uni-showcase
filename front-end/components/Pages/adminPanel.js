import React, {Component} from 'react';
import AdminAuthenticatedComponent from '../adminAuthenticatedComponent.js';
import {Link} from 'react-router-dom';
import './admin.css';

export default AdminAuthenticatedComponent(class AdminPanel extends Component{
  render(){
    return(
      <div>
        <div id="mainNav">
          <ul className="list-inline" >
            <li>
              <Link to='/'> Home </Link>
            </li>
            <li>
              <Link to='/admin/motor'>Motor</Link>
            </li>
            <li>
              <Link to='/admin/gun'>Gun</Link>
            </li>
            <li>
              <Link to='/admin/user'>User</Link>
            </li>
          </ul>
        </div>
        <h1>
          Admin Panel
        </h1>
        <p>
          Welcome to the admin panel
        </p>
      </div>
    )
  }
})
