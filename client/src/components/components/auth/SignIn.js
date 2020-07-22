import React from "react"
import {Form, Button, Row, Col} from "react-bootstrap"
import axios from "axios"
import Alert from "../../../helpers/Alert"
import "./auth.css"

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    change(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleValidation() {
        const { error, password, email} = this.state;
        let formIsValid = true;

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

        if(this.handleValidation() === false) {
            return;
        }

        axios.post("/signin", {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            console.log(res.data)
            localStorage.setItem("jwt", res.data.token);
            this.props.history.push("/profile")
        }).catch(() => this.setState({error: true}));
    }

    render() {
        const { error, password, email} = this.state;
        return (
            <Row className="align-content-center" 
                style={
                    { marginTop: "15vh" }
                }>

            <Col className="d-block text-center justify-content-center"
                lg={{ span: 4, offset: 4 }} 
                md={{ span: 6, offset: 3 }} 
                sm={{ span: 10, offset: 1 }}  >
                
                <h1>Sign in to your account</h1>
                
                <Form className = "form-wrapper" onSubmit={e => this.submit(e)}>
                {error ? <Alert msg={"Invalid credentials"} type="danger" /> : null}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control className = "input"
                            type = "email"
                            placeholder = "Enter email address" 
                            name = "email"
                            value = { email }
                            onChange = {
                                e => this.change(e)
                            }/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control className = "input"
                            type = "password" 
                            placeholder="Enter password" 
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
            </Col>
            </Row>
        )
    }
}

export default SignIn;
