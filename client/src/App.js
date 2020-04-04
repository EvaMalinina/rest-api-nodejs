import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateUser from "./components/create-user.component";
import EditUser from "./components/edit-user.component";
import LoginUser from "./components/login-user.component";
import driverProfile from "./components/driver.component";
import shipperProfile from "./components/shipper.component";
import resetPassword from "./components/reset-user.component";


class App extends Component {

  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
   
    if (!localStorage.getItem("token")) {
      window.location.href = '/login';
    } 
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    localStorage.clear("token", "role");
    window.location.href = '/';
    this.setState({isLoggedIn: false});
  }
  render () {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar bg="dark" variant="dark">
              <Container>

                <Navbar.Brand>
                  <Link to={"/"} className="nav-link">
                    GO service for goods transportation
                  </Link>
                </Navbar.Brand>

                <Nav className="justify-content-end">
                  <Nav>
                    <Link to={"/"} className="nav-link">
                      Create Account
                    </Link>
                  </Nav>
                  {isLoggedIn
                    ? (
                      <Nav>
                        <Link to={"/login"} className="nav-link"  onClick={this.handleLogoutClick}>
                          Sign out
                        </Link>
                      </Nav>
                    ) : (
                      <Nav>
                        <Link to={"/login"} className="nav-link" onClick={this.handleLoginClick}>
                          Sign in
                        </Link>
                      </Nav>
                  )}
                </Nav>
              
              </Container>
            </Navbar>
          </header>

          <Container>
            <Row>
              <Col md={12}>
                <div className="wrapper">
                  <Switch>
                    <Route exact path='/' component={CreateUser} />
                    <Route path="/users" component={CreateUser} />
                    <Route path="/users/:id" component={EditUser} />
                    <Route path="/login" component={LoginUser} />
                    <Route path="/driver" component={driverProfile} />
                    <Route path="/shipper" component={shipperProfile} />
                    <Route path="/reset" component={resetPassword} />
                  </Switch>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Router>);
  }
}

export default App;
