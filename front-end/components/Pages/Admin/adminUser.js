import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button,ListGroup, ListGroupItem} from 'react-bootstrap';
import { Row, Col, Container } from 'react-grid-system';

import AdminAuthenticatedComponent from '../../adminAuthenticatedComponent.js';
import * as userActions from '../../../actions/userActions.js';
import userStore from '../../../stores/userStores.js';


export default AdminAuthenticatedComponent(class AdminGun extends Component{
  constructor(){
    super();
    this.state = {
      users: userStore.getAll()
    }
  }
  //this sets up the listener which is similar to websockets
	componentWillMount(){
		userStore.on("change", this.getUser);
		this.recieveGuns();
	}
  getUser = () =>{
  this.setState({
    users:userStore.getAll(),
  });
  // console.log(this.state.motors[0].motors);
}

  recieveGuns = ()=>{
    userActions.reloadUser();
  }
  render(){
    let list;
    if(this.state.users.length > 0){
      list = this.state.users[0].users.map(listItem => {
        return(
          <div id="box">
            <div className="box-top">
              {listItem.userName}
            </div>
            <div className="box-panel">
              {listItem.firstName} {listItem.sureName}
            </div>
          </div>
          // {/* <ListGroupItem  header={listItem.userName}>{listItem.firstName} {listItem.surName}</ListGroupItem> */}

        )
      })
    }
    return(
    <div className="adminContainer">
      <Container>

      <Row className="show-grid">
        <Col xs={2} md={2}>

        </Col>
        <Col xs={8} md={8}>
          <ListGroup>
            {list}
          </ListGroup>
        </Col>

        <Col xs={2} md={2}>

        </Col>
      </Row>
    </Container>

    </div>
    );
  }



})
