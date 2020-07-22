import React from "react"
import {Form, Button, Row, Col} from "react-bootstrap"
import axios from "axios"
import Alert from "../../../helpers/Alert"
import "./auth.css"

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            error: ""
        };
    }

    change(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleValidation() {
        const { error, password, email, username} = this.state;
        let formIsValid = true;

        if(!username) formIsValid = false;
 
        if(!password)
           formIsValid = false;

        if(!email)
           formIsValid = false;

        if(typeof email !== "undefined"){
           let lastAtPos = email.lastIndexOf("@");
           let lastDotPos = email.lastIndexOf(".");

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf("@@") == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2))
              formIsValid = false;
       }  

       this.setState({error: true});
       return formIsValid;
   }

    submit(e) {
        e.preventDefault();
        if(this.handleValidation === false) return;

        console.log(this.state)
        axios.post("/signup", {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            console.log(res.data)
            this.props.history.push("/signin")
        }).catch(() => this.setState({error: true}));
    }

    render() {
        const { error, username, password, email} = this.state;
        return (
            <Row className="align-content-center" 
            style={
                { marginTop: "15vh" }
            }>

        <Col className="d-block text-center justify-content-center"
            lg={{ span: 4, offset: 4 }} 
            md={{ span: 6, offset: 3 }} 
            sm={{ span: 10, offset: 1 }} >

                <h1>Create an account</h1>
                <Form className = "form-wrapper" onSubmit={e => this.submit(e)}>
        
                {error ? <Alert msg={"Invalid credentials"} type="danger" /> : null}

                    <Form.Group controlId="formBasicUserName">
                        <Form.Control className = "input" 
                            type = "username" 
                            placeholder = "Enter username" 
                            name = "username"
                            value = { username }
                            onChange = {
                                e => this.change(e)
                            }/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control className = "input" 
                            type = "email" 
                            placeholder = "Enter email" 
                            name = "email"
                            value = { email }
                            onChange = {
                                e => this.change(e)
                            }/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control className = "input" 
                            type = "password" 
                            placeholder="Password" 
                            name = "password"
                            value = { password }
                            onChange = {
                                e => this.change(e)
                            }/>
                    </Form.Group>
                    <Button className = "input-button" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <p>already have an account? <a href="/signin" id="login_id">Sign in</a></p>
            </Col>
            </Row>
        )
    }
}

export default SignUp;
