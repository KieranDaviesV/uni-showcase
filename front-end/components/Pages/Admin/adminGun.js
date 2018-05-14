import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button,ListGroup, ListGroupItem} from 'react-bootstrap';

import AdminAuthenticatedComponent from '../../adminAuthenticatedComponent.js';
import * as gunActions from '../../../actions/gunActions.js';
import gunStore from '../../../stores/gunStores.js';
import { Row, Col, Container } from 'react-grid-system';


export default AdminAuthenticatedComponent(class AdminGun extends Component{
  constructor(){
    super();
    this.state = {
      guns: gunStore.getAll()
    }
  }
  //this sets up the listener which is similar to websockets
	componentWillMount(){
		gunStore.on("change", this.getGuns);
		this.recieveGuns();
	}
  getGuns = () =>{
  this.setState({
    guns:gunStore.getAll(),
  });
  // console.log(this.state.motors[0].motors);
}

  addGun = (e) =>{
    e.preventDefault();
    // console.log("hi");
    let gunObject = {
      gunName: this.gunName.value,
	    gunPrice: this.gunPrice.value,
	    gunDescription: this.gunDescription.value,
	    gunAmmo: this.gunAmmo.value,
      gunDamage: this.gunDamage.value,
      gunReloadTime: this.gunReloadTime.value
    }

    gunActions.createGun(gunObject);
  }
  recieveGuns = ()=>{
    gunActions.reloadGun();
  }
  render(){
    let list;
    if(this.state.guns.length > 0){
      list = this.state.guns[0].guns.map(listItem => {
        return(
          <div id="box">
            <div className="box-top">
              {listItem.gunName}
            </div>
            <div className="box-panel">
              {listItem.gunDescription} £{listItem.gunPrice}
            </div>
          </div>
          // {/* <ListGroupItem  header={listItem.gunName}>{listItem.gunDescription} £{listItem.gunPrice}</ListGroupItem> */}

        )
      })
    }
    return(
    <div className="adminContainer">
      <Row className="show-grid">
        <Col xs={2} md={2}>

        </Col>
        <Col xs={4} md={4}>
          {/* <ListGroup> */}
            {list}
          {/* </ListGroup> */}
        </Col>
        <Col xs={4} md={4}>
          <Form horizontal onSubmit={this.addGun} >
            <FormGroup>
              <FormControl inputRef={input => this.gunName = input}
                type="text"
                placeholder="Gun Name"
                required/><br/>
              <FormControl inputRef={input => this.gunPrice = input}
                type="text"
                placeholder="Gun price"
                required
              /><br/>
              <FormControl inputRef={input => this.gunDescription = input}
                type="text"
                 placeholder="Gun Description"
                 required
                /><br/>
              <FormControl inputRef={input => this.gunAmmo = input}
                type="text"
                 placeholder="Gun Ammo "
                 required
              /><br/>
                <FormControl inputRef={input => this.gunDamage = input}
                  type="text"
                  placeholder="Gun Damage "
                  required
                /><br/>
                  <FormControl inputRef={input => this.gunReloadTime = input}
                    type="text"
                    placeholder="Gun reload time "
                    required
                  /><br/>
                <Button type="submit">Add Gun</Button>
            </FormGroup>
          </Form>
        </Col>
        <Col xs={2} md={2}>

        </Col>
      </Row>

    </div>
    );
  }



})
