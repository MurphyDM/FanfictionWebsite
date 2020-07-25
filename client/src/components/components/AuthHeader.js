import React from "react"
import {
    Navbar,
    Nav,
    FormControl,
    Container,
    Form,
    Button,
    Image,
    Dropdown
} from "react-bootstrap"
import './Header.css'
const PLACEHOLDER_AVATAR = "https://media.istockphoto.com/vectors/default-avatar-profile-icon-gray-placeholder-photo-vector-id844060994?k=6&m=844060994&s=170667a&w=0&h=gqrpuJ3y31Kj1v3CA95g5Mo0ObxwAVf_Efu9nwc9cHs=";

const styles = {
    button: {
        border:'none',
        background: 'none',
        height:'40px'
    }
}

class AuthHeader extends React.Component {
    render() {
        return (
            <div>
                <Navbar fixed="top" collapseOnSelect expand="md" bg="light" style={{padding:'0'}}>
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
                                <Dropdown style={{height:'53px', margin:'5px'}}>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic" style={styles.button}>
                                        <Image src={this.props.avatar||PLACEHOLDER_AVATAR}
                                            roundedCircle
                                            className="d-block mx-auto"
                                            width= '36px'
                                            height='36px'
                                            style={
                                               {margin: '0', padding: '0'}
                                            }/>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{minWidth: '3rem'}}>
                                      <Dropdown.Item style={{padding: '5px'}} href="/Profile">Profile</Dropdown.Item>
                                      <Dropdown.Item style={{padding: '5px'}} href="#">Sign out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default AuthHeader;
