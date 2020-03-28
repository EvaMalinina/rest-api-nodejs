import React from "react";
import { BrowserRouter } from "react-router-dom";


export default class LoginControl extends React.Component {

  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick(e) {
    this.setState({isLoggedIn: true});
    window.location.href = '/login';
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
    localStorage.clear("token");
    window.location.href = '/';
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <BrowserRouter>
       <div>
          {button}
        </div>
      </BrowserRouter>
     
    );
  }
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}