import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class resetPassword extends Component {

  constructor(props) {
    super(props)
    // Setting up functions
    // this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
      showNullError: false,
    }
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    if (email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true,
      });
    } else {
      try {
        const id = localStorage.getItem('id');
        const response = await axios.post(
          'http://localhost:4000/api/resetpassword/' + id,
          {
            email,
          },
        );
        console.log(response.data);
        if (response.data === 'recovery email sent') {
          this.setState({
            showError: false,
            messageFromServer: 'recovery email sent',
            showNullError: false,
          });
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'email not in db') {
          this.setState({
            showError: true,
            messageFromServer: '',
            showNullError: false,
          });
        }
      }
    }
  };
 
  render() {
    const {
      email, messageFromServer, showNullError, showError 
     } = this.state;

    return (
    <div className="form-wrapper">
      <h3>Please enter the email what you have used for registration.</h3>
      <Form onSubmit={this.sendEmail}>
        <Form.Group controlId="reset-email">
          <Form.Label>Your email</Form.Label>
          <Form.Control type="email" 
                        controlid="email"
                        value={ email } 
                        onChange={this.handleChange('email')}
                        />
        </Form.Group>

        {showNullError && (
          <div>
            <p>The email address cannot be null.</p>
          </div>
        )}
        {showError && (
          <div>
            <p>
              That email address isn&apos;t recognized. Please try again or
              register for a new account.
            </p>
          </div>
        )}
        {messageFromServer === 'recovery email sent' && (
          <div>
            <h3>Password Reset Email Successfully Sent!</h3>
          </div>
        )}

        <Button variant="danger" size="lg" block="block" type="submit">
          Reset password
        </Button>
        {/* <Switch>
          <>
            <Link to="/login">
              <Button variant="danger" size="lg" block="block" type="submit"  onClick={ this.toLogin }>
                Reset password
              </Button>
            </Link>
          </>
        </Switch> */}
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