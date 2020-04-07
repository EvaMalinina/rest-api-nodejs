import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  Switch,
  Link
} from "react-router-dom";

const loading = {
  margin: '1em',
  fontSize: '24px',
};

export default class renewPassword extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      password: '',
      updated: false,
      isLoading: true,
      error: false,
    };
  }

  async componentDidMount() {
    console.log(this.props.match.params.token);
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.get('http://localhost:3000/api/resetpassword/auth', {
        params: {
          resetPasswordToken: token,
        },
      });
      // console.log(response);
      if (response.data.message === 'password reset link a-ok') {
        this.setState({
          name: response.data.name,
          updated: false,
          isLoading: false,
          error: false,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true,
      });
    }
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = async (e) => {
    e.preventDefault();
    const { name, password } = this.state;
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.put(
        'http://localhost:3000/api/resetpassword/submit',
        {
          name,
          password,
          resetPasswordToken: token,
        },
      );
      console.log(response.data);
      if (response.data.message === 'password updated') {
        this.setState({
          updated: true,
          error: false,
        });
      } else {
        this.setState({
          updated: false,
          error: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  render() {
    const {
      password, error, isLoading, updated 
    } = this.state;

    if (error) {
      return (
        <div>
          <div style={loading}>
            <h4>Problem resetting password. Please send another reset link.</h4>
            <Container>
              <Row>
                <Switch>
                  <>
                    <Col>
                      <Link to="/">
                        <Button variant="light" size="lg" block="block" type="submit">
                          Home page
                        </Button>
                      </Link>
                    </Col>
                    <Col>
                      <Link to="/reset">
                        <Button variant="dark" size="lg" block="block" type="submit">
                          Forgot password 
                        </Button>
                      </Link>
                    </Col>
                  </>
                </Switch>
              </Row>
            </Container>
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <div style={loading}>Loading Your Data...</div>
        </div>
      );
    }
    return (
      <div>
        <Form onSubmit={this.updatePassword}>
          <Form.Group controlId="reset-email">
            <Form.Label>Yoyr new password</Form.Label>
            <Form.Control type="password" 
                          controlid="password"
                          value={ password } 
                          onChange={this.handleChange('password')}
                          />
          </Form.Group>
          <Button variant="danger" size="lg" block="block" type="submit">
            Submit
          </Button>
        </Form>

        {updated && (
          <div>
            <p>
              Your password has been successfully reset, please try logging in
              again.
            </p>
            <Switch>
              <>
                <Link to="/login">
                  <Button variant="danger" size="lg" block="block" type="submit">
                    Sign in
                  </Button>
                </Link>
              </>
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

renewPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
  }),
};
