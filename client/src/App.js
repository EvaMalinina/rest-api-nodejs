import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateDriver from "./components/create-driver.component";
import EditDriver from "./components/edit-driver.component";
import LoginDriver from "./components/login-driver.component";
import Profile from "./components/profile.component";

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
                <Link to={"/drivers/:id"} className="nav-link">
                  Create Account
                </Link>
              </Nav>

              {/* <Nav>
                <Link to={"/edit-student/:id"} className="nav-link">
                  Edit Student
                </Link>
              </Nav> */}

              <Nav>
                <Link to={"/drivers"} className="nav-link">
                  Accounts List
                </Link>
              </Nav>
            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={CreateDriver} />
                <Route path="/drivers" component={CreateDriver} />
                <Route path="/drivers/:id" component={EditDriver} />
                <Route path="/login" component={LoginDriver} />
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
