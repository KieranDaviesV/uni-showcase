import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button,ListGroup, ListGroupItem} from 'react-bootstrap';

import AdminAuthenticatedComponent from '../../adminAuthenticatedComponent.js';
import * as motorActions from '../../../actions/motorActions.js';
import motorStore from '../../../stores/motorStores.js';
import { Row, Col, Container } from 'react-grid-system';


export default AdminAuthenticatedComponent(class AdminMotor extends Component{
  constructor(){
    super();
    this.state = {
      motors: motorStore.getAll()
    }
  }
  //this sets up the listener which is similar to websockets
	componentWillMount(){
		motorStore.on("change", this.getMotors);
		this.recieveMotors();
	}
  getMotors = () =>{
  this.setState({
    motors:motorStore.getAll(),
  });
  console.log(this.state.motors[0].motors);
}

  addMotor = (e) =>{
    e.preventDefault();
    console.log("hi");
    let motorObjct = {
      motorName: this.motorName.value,
	    motorPrice: this.motorPrice.value,
	    motorDescription: this.motorDescription.value,
	    motorSpeed: this.motorSpeed.value
    }
    motorActions.createMotor(motorObjct);
  }
  recieveMotors = ()=>{
    motorActions.reloadMotor();
  }
  render(){
    let list;
    if(this.state.motors.length > 0){
      list = this.state.motors[0].motors.map(listItem => {
        return(

          <div id="box">
            <div className="box-top">
              {listItem.motorName}
            </div>
            <div className="box-panel">
              {listItem.motorDescription} £{listItem.motorPrice}
            </div>
          </div>
          // {/* <ListGroupItem  header={listItem.motorName}>{listItem.motorDescription} £{listItem.motorPrice}</ListGroupItem> */}

        )
      })
    }
    return(
    <div className="adminContainer">
      <Container>

      <Row className="show-grid">
        <Col xs={2} md={2}>

        </Col>
        <Col xs={4} md={4}>
          <ListGroup>
            {list}
          </ListGroup>
        </Col>
        <Col xs={4} md={4}>
          <Form horizontal onSubmit={this.addMotor} >
            <FormGroup>
              <FormControl inputRef={input => this.motorName = input}
                type="text" placeholder="Motor Name" required/><br/>
              <FormControl inputRef={input => this.motorPrice = input}
                type="text" placeholder="Motor price" required/><br/>
              <FormControl inputRef={input => this.motorDescription = input}
                type="text" placeholder="Motor Description" required/><br/>
              <FormControl inputRef={input => this.motorSpeed = input}
                type="text" placeholder="Motor Speed" required/><br/>
                <Button type="submit">Add Motor</Button>
            </FormGroup>
          </Form>
        </Col>
        <Col xs={2} md={2}>

        </Col>
      </Row>
    </Container>

    </div>
    );
  }



})
