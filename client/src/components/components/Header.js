import React from "react"
import {
    Navbar,
    Nav,
    FormControl,
    Container,
    Form,
    Button
} from "react-bootstrap"

class Header extends React.Component {
    render() {
        return (
            <div>
                <Navbar fixed="top" collapseOnSelect expand="md" bg="light">
                    <Container fluid>
                        <Navbar.Brand href="#home" style={{fontWeight:"500"}}>IMAGINATION</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/Catalog">Catalog</Nav.Link>
                            </Nav>
                            <Nav className="ml-auto">
                                <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                                    <Button variant="outline-success">Search</Button>
                                </Form>
                                <Nav.Link href="/SignIn">Sign In</Nav.Link>
                                <Nav.Link href="/SignUp">Sign Up</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default Header;
