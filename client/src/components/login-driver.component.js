import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class LoginDriver extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeDriverEmail = this.onChangeDriverEmail.bind(this);
    this.onChangeDriverPassword = this.onChangeDriverPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      email: '',
      password: '',
    }
  }

  onChangeDriverEmail(e) {
    this.setState({email: e.target.value})
  }

  onChangeDriverPassword(e) {
    this.setState({password: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    const driverObj = {
      email: this.state.email,
      password: this.state.password
    };

    axios.post('http://localhost:4000/api/drivers/login', driverObj)
      // .then(res => console.log(res))
      .then(function (res) {
        // console.log(res.data);
        localStorage.setItem('token', res.data);
      })
      .catch(function (error) {
        console.log("There is problem with login", error);
      })

    this.setState({email: '', password: ''})

    console.log(`User successfully logged!`);
    console.log(`Email: ${this.state.email}`);
    console.log(`Password: ${this.state.password}`);

    // Redirect to Login 
    this.props.history.push('/profile');
  }

  render() {
    return (
    <div className="form-wrapper">
      <Form onSubmit={ this.onSubmit }>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeDriverEmail}/>
        </Form.Group>

        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={this.state.password} onChange={this.onChangeDriverPassword}/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Login
        </Button>
      </Form>
    </div>);
  }
}