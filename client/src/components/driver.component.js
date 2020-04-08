import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import DefaultImg from '../default-img/driver-default-img.png';
import {
  Switch,
  Link
} from "react-router-dom";


export default class driverProfile extends Component {

  constructor(props) {
    super(props)
    // Setting up functions
    this.onChangeAssignedTo = this.onChangeAssignedTo.bind(this);
    this.onChangeTruckType = this.onChangeTruckType.bind(this);
    this.createTruck = this.createTruck.bind(this);
    this.showTrucks = this.showTrucks.bind(this);
    this.deleteTruck = this.deleteTruck.bind(this);

    this.toggleAddTruckForm = this.toggleAddTruckForm.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.uploadImage = this.uploadImage.bind(this);

    this.onChangeUserOldPassword = this.onChangeUserOldPassword.bind(this);
    this.onChangeUserNewPassword = this.onChangeUserNewPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      multerImage: DefaultImg,
      oldPassword: '',
      newPassword: '',
      showForm: false,
      showAddTruckForm: false,
      truckType: 'Sprinter',
      assigned_to: 'none',
      trucks: [],
      truckId: ''
    }
  }

  onChangeAssignedTo(e) {
    const id = localStorage.getItem('id');
    let assignedTo = e.target.value;
    assignedTo = 'me' ? id : 'none';
    this.setState({assigned_to: assignedTo})
  }

  onChangeTruckType(e) {
    this.setState({truckType: e.target.value})
  }

  createTruck(e) {
    e.preventDefault()
    const id = localStorage.getItem('id');
    const truckObj = {
      token: localStorage.getItem('token'),
      created_by: id,
      assigned_to: this.state.assigned_to,
      status: 'IS',
      type: this.state.truckType
    };

    axios.post('http://localhost:4000/api/trucks/', truckObj)
      .then(function (res) {
        console.log(res.data.truck); 
     })
     .catch(function (error) {
       console.log("There is a problem during truck, check insereted data", error);
     })
     
    this.setState({assigned_to: '', truckType: ''})

    console.log(`Truck successfully created!`);
    console.log(`Type: ${this.state.truckType}`);
    console.log(`Assigned to: ${this.state.assigned_to}`);
  }

  showTrucks(e) {
    e.preventDefault()
    const id = localStorage.getItem('id');
    axios.get('http://localhost:4000/api/driver/' + id)
      .then(res => {
        const trucks = res.data;
        this.setState({ trucks });
      })
     .catch(function (error) {
       console.log("Look like user has no trucks..", error);
     })
  }

  toggleAddTruckForm(e) {
    e.preventDefault();
    this.setState({
      showAddTruckForm: !this.state.showAddTruckForm
    })
  }

  toggleForm(e) {
    e.preventDefault();
    this.setState({
      showForm: !this.state.showForm
    })
  }

  deleteTruck(e, id) {
    e.preventDefault();

    axios.delete(`http://localhost:4000/api/driver/bin/${id}`)
      .then(res => {
          const trucks = res.data;
          this.setState({ trucks });
      })
      .catch(err => alert("truck not deleted", err))
  }

  setDefaultImg( e, uploadType ) {
    if ( uploadType === "multer" ) {
      this.setState({
        multerImage: e.target.files[0]
      });
    } 
  }

  uploadImage( e, method ) {

    if( method === "multer" ) {
      let imageFormObj = new FormData();

      imageFormObj.append( "imageName", "multer-image-" + Date.now());
      imageFormObj.append( "imageData", e.target.files[0]);
    
      //store a readable instance of 
      //the image being uploaded using multer
      this.setState({
        multerImage: URL.createObjectURL(e.target.files[0])
      });

      const id = localStorage.getItem('id');
      axios.post('http://localhost:4000/api/user/image/' + id, imageFormObj)
        .then((data) => {
          if( data.data.success) {
            alert("Image has been successfully uploaded using multer ");
            this.setDefaultImg(e.persist(), "multer");
          }
        })
        .catch((err) => {
          console.log("Error while uploading image using multer.", err);
          this.setDefaultImg("multer");
        })
    }
  }

  onChangeUserOldPassword(e) {
    this.setState({oldPassword: e.target.value})
  }

  onChangeUserNewPassword(e) {
    this.setState({newPassword: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    const userObj = {
      token: localStorage.getItem('token'),
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword
    };

    const id = localStorage.getItem('id');
    axios.put('http://localhost:4000/api/users/'+ id, userObj)
     
      .then((res) => {
        alert(res.data);
      })
      .catch(err => alert("SERVER ERROR TO CLIENT:", err))
     
    this.setState({ newPassword: ''})

    console.log(`User successfully changed password!`);
    console.log(`old Password: ${this.state.oldPassword}`);
    console.log(`new Password: ${this.state.newPassword}`);
  }

  render() {
    let name = localStorage.getItem('name');
    let role = localStorage.getItem('role');

    return (
      <>
        <div className="form-wrapper">
          <h3>
            <Row>
              <Col xs={12} sm={8}><h2>{ name } <span role="img" aria-label="2 finger icon">✌️</span></h2></Col>
              <Col xs={6} sm={4}><Badge variant="secondary"> { role } profile </Badge></Col>
            </Row>
          </h3>
            
          <div className="profile">
             <div className="profile__img">
                <input type="file" 
                        className="image-inpt" 
                        onChange={(e) => this.uploadImage(e, "multer")}>
                </input>
                <img src={ this.state.multerImage} 
                    alt="upload-yourphoto"
                    className="image">
                </img>
             </div>
        
            <div className="profile__data">
                <div className="profile__btn">
                  <Button variant="outline-danger" size="sm" block="block" type="submit" onClick={ this.toggleAddTruckForm }>
                    Add truck
                  </Button>
                </div>
                { this.state.showAddTruckForm ? (
                  <Form onSubmit={ this.createTruck } className="profile__add">
                    <Form.Group controlId="truck-type">
                      <Form.Label>Select truck type</Form.Label>
                      <Form.Control as="select" value={this.state.truckType} onChange={this.onChangeTruckType}>
                        <option value="Sprinter">Sprinter</option>
                        <option value="Small Straight">Small Straight</option>
                        <option value="Large Straight">Large Straight</option>
                      </Form.Control>
          
                      <Form.Label>Assigned to</Form.Label>
                      <Form.Control as="select" value={this.state.assigned_to} onChange={this.onChangeAssignedTo}>
                        <option value="me">me</option>
                        <option value="none">none</option>
                      </Form.Control>
                    </Form.Group>
          
                    <Button variant="outline-primary" size="lg" block="block" type="submit">
                      Create Truck
                    </Button>
                  </Form>
                ) : (
                  <></>
                )}
                
                <div className="profile__btn">
                  <Button variant="outline-warning" size="sm" block="block" type="submit" onClick={ this.showTrucks }>
                    My trucks
                  </Button>
                </div>
              </div>
          </div>
              
          <div className="buttons">
            <Row className="buttons__block">
              <Col><Button variant="secondary" onClick={ this.toggleForm }>Change password</Button></Col>
            </Row>
            <Row>
              <Col>
                <Switch>
                  <>
                    <Link to="/reset">
                        Reset password
                    </Link>
                  </>
                </Switch>
              </Col>
            </Row>
          </div>
          
          { this.state.showForm ?
            (<Form onSubmit={ this.onSubmit }>
        
              <Form.Group controlId="oldPassword">
                <Form.Label>Old password</Form.Label>
                <Form.Control type="password" value={this.state.oldPassword} onChange={this.onChangeUserOldPassword}/>
              </Form.Group>
          
              <Form.Group controlId="newPassword">
                <Form.Label>New password</Form.Label>
                <Form.Control type="password" value={this.state.newPassword} onChange={this.onChangeUserNewPassword}/>
              </Form.Group>
        
              <Button variant="danger" size="lg" block="block" type="submit">
                Change password
              </Button>
            </Form>
          ) : (
            <></>
          ) 
          }
        </div>
        <div className="trucks">
            <ul className="trucks__list">
              
              {this.state.trucks.map(function(truck, index){
                return (
                    <li key={index} className="trucks__item">
                      <Button variant="outline-warning" size="sm" block="block" type="submit"  
                      onClick={ () => this.deleteTruck(truck._id)}  
                      // onClick={ this.deleteTruck(truck._id).bind(this)} 
                      >
                        Delete
                      </Button>
                      <div className="trucks__img"></div>
                      <p>Assigned to: {truck.assigned_to.length > 4 ? 'me' : 'none'}</p>
                      <p>Status: {truck.status}</p>
                      <p>Type: {truck.type}</p>
                    </li>
                  )
                }
              )}
            </ul>
          </div>
      </>
    );
  }
}