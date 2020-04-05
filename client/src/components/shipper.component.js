import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
// import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
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

    let DefaultImg;
    DefaultImg = "data:image/png;base64,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";
    // Setting up state
    this.state = {
      multerImage: DefaultImg,
      oldPassword: '',
      newPassword: ''
    }
  }

  setDefaultImg( uploadType,  newImg) {
    if ( uploadType === "multer" ) {
      this.setState({
        multerImage: newImg
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
            let newImg = data.data.document.imageData;
            this.setDefaultImg("multer", newImg);
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
        <img src={ this.state.multerImage} 
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