import React from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from 'axios'
import {getJwt} from '../helpers/getJwt'
import {uploadFile} from '../helpers/uploadFile'

class StoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            title: '',
            body: '',
            genre: '',
            status: ''
        };
    }

    changeTextField(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    changeFileField(e) {
        const file = e.target.files[0];
        console.log(e.target.name, file)
        this.setState({[e.target.name]: file});
    }

    submit(e) {
        e.preventDefault();
        axios.post('/auth/uploadStory', {
            image: this.state.file.name,
            title: this.state.title,
            body: this.state.body,
            genre: this.state.genre,
            userId: 3
        }, { headers: { 
                Authorization: getJwt() 
            }
        }).then(res => {
            console.log(res.data)
            uploadFile(this.state.file);
            this.setState({status: res.data})
        }).catch(err =>  this.setState({status: "Error"}))
    }

    render() {
        const {file, title, body, genre, status} = this.state;
        return (
            <div className="d-flex justify-content-center"
                style={
                    { marginTop: "15vh" }
            }>
                <Form onSubmit={
                    e => this.submit(e)
                }>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <input type='file' name='file' onChange={(e)=>this.changeFileField(e)}/>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea2">
                        <Form.Label>Story title</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="3"
                            name = "title"
                            value = { title }
                            onChange = {e => this.changeTextField(e)}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea3">
                        <Form.Label>Story genre</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="3"
                            name = "genre"
                            value = { genre }
                            onChange = {e => this.changeTextField(e)}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea4">
                        <Form.Label>Write your story here</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="3"
                            name = 'body'
                            value = { body }
                            onChange = {e => this.changeTextField(e)}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                
                {<p>{status}</p>}

            </div>
        )
    }
}

export default StoryForm;
