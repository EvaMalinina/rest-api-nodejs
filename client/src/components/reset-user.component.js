import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
// import PropTypes from "prop-types";
// import history from './history';
import {
  Switch,
  Link
} from "react-router-dom";

class resetPassword extends Component {

  constructor(props) {
    super(props)
    // Setting up functions
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      email: ''
    }
  }

  onChangeUserEmail(e) {
    this.setState({email: e.target.value})
  }

  onSubmit(e, props) {
    e.preventDefault()

    const userObj = {
      email: this.state.email
    };

    axios.put('http://localhost:4000/api/resetpassword', userObj)
      .then(function (res) {
        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('id', res.data.user._id);
      })
      .catch(function (error) {
        alert("There is no user with such email", error);
      })

    this.setState({ email: '' })

    console.log(`User successfully reset password!`);
  }
 
  render() {

    return (
    <div className="form-wrapper">
      <h3>Please enter the email what you have used for registration.</h3>
      <Form onSubmit={ this.onSubmit }>
        <Form.Group controlId="Email">
          <Form.Label>Your email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeUserEmail}/>
        </Form.Group>

        <Switch>
          <Link to="/login">
            <Button variant="danger" size="lg" block="block" type="submit"  onClick={ this.toLogin }>
              Reset password
            </Button>
          </Link>
        </Switch>
      </Form>
      <p>After pushing the button above go to your email box and check the letter with instructions to reset the password.</p>
    </div>);
  }
}

// resetPassword.propTypes = {
//   history: PropTypes.object.isRequired,
//   isLoggedIn: PropTypes.string
// };

export default resetPassword;