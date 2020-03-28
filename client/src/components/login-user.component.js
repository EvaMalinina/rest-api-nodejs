import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class LoginUser extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      email: '',
      password: ''
    }
  }

  onChangeUserEmail(e) {
    this.setState({email: e.target.value})
  }

  onChangeUserPassword(e) {
    this.setState({password: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    const userObj = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post('http://localhost:4000/api/users/login', userObj)
      // .then(res => console.log(res))
      .then(function (res) {
        // console.log(res.data);
        localStorage.setItem('token', res.data);
      })
      .catch(function (error) {
        console.log("There is problem with login", error);
      })

    this.setState({email: '', password: ''})
    this.props.handleLoginClick();

    console.log(`User successfully logged!`);
    console.log(`Email: ${this.state.email}`);
    console.log(`Password: ${this.state.password}`);
    console.log(`logged: ${this.state.isLoggedIn}`);

    // Redirect to Login 
    this.props.history.push('/profile');
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    return (
    <div className="form-wrapper">
      <Form onSubmit={ this.onSubmit } isLoggedIn={isLoggedIn}>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeUserEmail}/>
        </Form.Group>

        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={this.state.password} onChange={this.onChangeUserPassword}/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Login
        </Button>
      </Form>
    </div>);
  }
}