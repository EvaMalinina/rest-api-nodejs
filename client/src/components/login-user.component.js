import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import PropTypes from "prop-types";
// import history from './history';

class LoginUser extends Component {

  constructor(props) {
    super(props)
    // Setting up functions
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      username: '',
      password: '',
      isLoggedIn: true
    }
  }

  onChangeUserName(e) {
    this.setState({username: e.target.value})
  }

  onChangeUserPassword(e) {
    this.setState({password: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()
    const userObj = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post('http://localhost:4000/api/auth/login', userObj)
      .then(function (res) {
        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('id', res.data.user._id);
        localStorage.setItem('name', res.data.user.username);
        localStorage.setItem('password', res.data.user.password);
        localStorage.setItem('role', res.data.user.role);
        setTimeout(changeLocation(res.data.user.role), 1000);
      })
      .catch(function (error) {
        alert("There is problem with login", error);
      })

    this.setState({username: '', password: '', isLoggedIn: true})

    console.log(`User successfully logged!`);
    console.log(`Email: ${this.state.username}`);
    console.log(`Password: ${this.state.password}`);
    console.log(`logged: ${this.state.isLoggedIn}`);

    // Redirect to Login 
    let changeLocation = (role) => {
      this.props.history.push(role === 'Driver' ? '/driver' : '/shipper');
    }
  }
 
  render() {
    return (
          <div className="form-wrapper">
            <Form onSubmit={ this.onSubmit }>
      
              <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" value={this.state.username} onChange={this.onChangeUserName}/>
              </Form.Group>
      
              <Form.Group controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={this.state.password} onChange={this.onChangeUserPassword}/>
              </Form.Group>
      
              <Button variant="danger" size="lg" block="block" type="submit" onClick={() => { this.props.updateData(this.state.isLoggedIn)}}>
                Login
              </Button>
            </Form>
          </div>
    );
  }
}

LoginUser.propTypes = {
  isLoggedIn: PropTypes.string,
  history: PropTypes.object.isRequired,
  updateData: PropTypes.func
};

export default LoginUser;