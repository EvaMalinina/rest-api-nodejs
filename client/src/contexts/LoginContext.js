import React, { Component, createContext } from 'react';

export const LoginContext = createContext();

class LoginContextProvider extends Component {
  state = { 
    isLoggedIn: false
  }

  toggleLogin = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  }
  
  render() { 
    return ( 
      <LoginContext.Provider value={{ ...this.state, toggleLogin: this.toggleLogin }}>
        { this.props.children }
      </LoginContext.Provider>
     );
  }
}
 
export default LoginContextProvider;