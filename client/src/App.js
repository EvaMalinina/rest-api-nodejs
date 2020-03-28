import React from "react";
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
import Profile from "./components/profile.component";
import LoginControl from "./ui/login-control";


function App() {

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

              {/* <Nav>
                <Link to={"/login"} className="nav-link">
                  Sign in
                </Link>
               
              </Nav> */}
            </Nav>
           
          </Container>
        </Navbar>
        <LoginControl/>
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
                <Route path="/profile" component={Profile} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;
