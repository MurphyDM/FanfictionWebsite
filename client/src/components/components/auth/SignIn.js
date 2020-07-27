import React from "react"
import {Form, Button, Row, Col} from "react-bootstrap"
import axios from "axios"
import Alert from "../../../helpers/Alert"
import "./auth.css"

function SignIn(props) {
    const [email, setEmail] = React.useState("");
    const [isEmailValid, setEmailValidity] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isPasswordValid, setPasswordValidity] = React.useState("");
    const [error, setError] = React.useState("");

    const checkEmail = () => {
        if(email !== ""){
            let lastAtPos = email.lastIndexOf("@");
            let lastDotPos = email.lastIndexOf(".");
 
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf("@@") == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 1))
            setEmailValidity(false);
            else setEmailValidity(true);
        }  
    }

    const checkPassword = () => {
        if(password !== "")
        if(password.length < 6)
            setPasswordValidity(false);
        else 
            setPasswordValidity(true);
    }

    const isFormValid = () => {
        console.log(isEmailValid, isPasswordValid)
        if (email.length===""||password.length==="") return false;
        if (!isEmailValid||!isPasswordValid) return false;
        console.log(isEmailValid, isPasswordValid)
        return true;
   }

    const submit = (e) => {
        e.preventDefault();
        if(!isFormValid()) {
            setError(true);
            console.log("incorrect data")
            e.preventDefault();
            return;
        }
        axios.post("/signin", {
            email: email,
            password: password
        }).then(res => {
            console.log(res.data)
            localStorage.setItem("jwt", res.data.token);
            if(res.status === 200 || res.status === 304) props.history.push("/profile")
        }).catch(() => setError(true));
    }
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
                
                <Form className = "form-wrapper"
                    onSubmit = { e => {
                        submit(e);
                    }}>
                {error ? <Alert msg={"Invalid credentials"} type="danger" /> : null}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control className = {`input ${isEmailValid}`}
                            type = "email"
                            placeholder = "Enter email address" 
                            name = "email"
                            value = { email }
                            onChange = { e => {
                                checkEmail();
                                setEmail(e.target.value);
                            }}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control className = {`input ${isPasswordValid}`}
                            type = "password" 
                            placeholder="Enter password" 
                            name = "password"
                            value = { password }
                            onChange = {
                                e => {
                                    setPassword(e.target.value);
                                    checkPassword();
                                }
                            }
                            style={{}}/>
                    </Form.Group>
                    <Button className = "input-button" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
            </Row>
        )
}

export default SignIn;
