import React from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from 'axios'

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    change(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    submit(e) {
        e.preventDefault();
        axios.post('/signin', {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            console.log(res.data)
            localStorage.setItem('jwt', res.data.token);
            this.props.history.push('/profile')
        }).catch(() => this.setState({error: true}));
    }

    render() {
        const { error, password, email} = this.state;
        return (
            <div className="d-flex justify-content-center"
                style={
                    {marginTop: "15vh"}
            }>
                <Form onSubmit={e => this.submit(e)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type = "email" 
                            placeholder = "Enter email" 
                            name = "email"
                            value = { email }
                            onChange = {
                                e => this.change(e)
                            }/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type = "password" 
                            placeholder="Password" 
                            name = "password"
                            value = { password }
                            onChange = {
                                e => this.change(e)
                            }/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                {error && <p>Invalid credentials</p>}
            </div>
        )
    }
}

export default SignIn;
