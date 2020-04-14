import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import DefaultImg from '../default-img/shipper-default-img.png';
import {
  Switch,
  Link
} from "react-router-dom";


export default class shipperProfile extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeUserOldPassword = this.onChangeUserOldPassword.bind(this);
    this.onChangeUserNewPassword = this.onChangeUserNewPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

   // Setting up state
    this.state = {
      multerImage: DefaultImg,
      oldPassword: '',
      newPassword: ''
    }
  }

  // setDefaultImg( uploadType,  newImg) {
  setDefaultImg( uploadType) {
    if ( uploadType === "multer" ) {
      this.setState({
        multerImage: DefaultImg
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
            // let newImg = data.data.document.imageData;
            // this.setDefaultImg("multer", newImg);
            this.setDefaultImg("multer");
          }
        })
        .catch((err) => {
          alert("Error while uploading image using multer.");
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
      newPassword: this.state.newPassword
    };

    const id = localStorage.getItem('id');
    axios.put('http://localhost:4000/users/' + id, userObj)
     
      .then((res) => {
        console.log(res.data)
        
        console.log('user successfully updated')
      })
      .catch(err => console.log("SERVER ERROR TO CLIENT:", err))
     
      this.setState({ newPassword: ''})

    console.log(`User successfully changed password!`);
    console.log(`Password: ${this.state.newPassword}`);
  }

  render() {
    let name = localStorage.getItem('name');
    let role = localStorage.getItem('role');

    return (
    <div className="form-wrapper">
      <h3>
         <Row>
          <Col xs={12} sm={8}><h2>{ name } <span role="img" aria-label="2 finger icon">✌️</span></h2></Col>
          <Col xs={6} sm={4}><Badge variant="secondary"> { role } profile </Badge></Col>
        </Row>
      </h3>
     
      <Col xs={6} md={4}>
        <input type="file" 
                className="image-inpt" 
                onChange={(e) => this.uploadImage(e, "multer")}>
        </input>
        <img src={ this.state.multerImage } 
            alt="upload-yourphoto"
            className="image">
        </img> 
      </Col>

      <div className="buttons">
        <Row className="buttons__block">
          <Col><Button variant="secondary">Change password</Button></Col>
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

      <Form onSubmit={ this.onSubmit }>

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
    </div>);
  }
}