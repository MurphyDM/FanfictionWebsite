import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  FormControl,
  Container,
  Form,
  Button,
} from "react-bootstrap";

class Header extends React.Component {
  render() {
    return (
      <div>
        <Navbar fixed="top" collapseOnSelect expand="md" bg="light">
          <Container fluid>
            <Navbar.Brand href="#home" style={{ fontWeight: "500" }}>
               IMAGINATION
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Item><Link to="/">Home</Link></Nav.Item>
                <Nav.Item><Link to="/Catalog">Catalog</Link></Nav.Item>
              </Nav>
              <Nav className="ml-auto">
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                  />
                  <Button style={{border:'none'}} variant="outline-success">Search</Button>
                </Form>
                <Nav.Item style={{padding:'6px 0.5vw'}}><Link to="/SignIn">Sign In</Link></Nav.Item>
                <Nav.Item style={{padding:'6px 0.5vw'}}><Link to="/SignUp">Sign Up</Link></Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;
