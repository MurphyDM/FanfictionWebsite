import React, { useState } from "react"
import {Form, Button} from "react-bootstrap"
import axios from "axios"
import {getJwt} from "../../helpers/getJwt"
import Alert from "../../helpers/Alert";
import Dropzone from '../../pages/protected/Dropzone'
import { uploadImage } from "../../helpers/uploadImage"

const MIN_STORY_SIZE = 500;
const MIN_STORY_DESCRIPTION_SIZE = 25;


function StoryForm(props) {
    const [fileInputState, setFileInputState] = useState("");
    const [selectedFile, setSelectedFile] = useState("");

    const [successMsg, setSuccessMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [storyTitle, setStoryTitle] = useState("");
    const [storyDescription, setStoryDescription] = useState("");
    const [storyBody, setStoryBody] = useState("");
    const [storyGenre, setStoryGenre] = useState("0");
    const [tags, setTags] = useState([]);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const checkFields = () => {
        if(storyGenre === "0") return false;
        if(storyBody.length < MIN_STORY_SIZE) return false;
        if(storyDescription.length < MIN_STORY_DESCRIPTION_SIZE) return false;
        if(storyTitle.length === 0) return false;
        return true;
    }

    const clearFields = () => {
        setStoryDescription("");
        setStoryGenre("0");
        setStoryBody("");
        setStoryTitle("");
        setFileInputState("");
    }

    const submit = (e) => {
        e.preventDefault();
        if(!checkFields()) {
            setErrMsg("Please, fill out all the field in the form corretly (min story size: 500 symbols, min description size: 25 symbols");
            return;
        }

        console.log(selectedFile)
        axios.post("/auth/uploadStory", {
            title: storyTitle,
            description: storyDescription,
            body: storyBody,
            genre: storyGenre,
        }, { headers: { 
                Authorization: getJwt() 
            }
        }).then(res => {
            console.log(res.data)
            clearFields();
            window.scroll(0,100); 
            setSuccessMsg("Story was uploaded successfully");
            uploadImage("/auth/uploadCover", selectedFile, res.data);
        }).catch((err) =>  {
            window.scroll(0, 100); 
            setErrMsg("Something went wrong!");
        })
    }
    

        return (
            <div style={{ margin: "5vh 0 5vh 0" }}>
            <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" />
            <div className="d-flex justify-content-center">
                <Form style={{width: "35vw"}} onSubmit={
                    e => submit(e)
                }>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.File 
                        id="custom-file"
                        name="file"
                        value={ fileInputState }
                        label="Custom file input"
                        onChange={(e)=>handleFileInputChange(e)}
                        custom
                    />
                    </Form.Group> 
                    
                    <Form.Group controlId="exampleForm.ControlTextarea2">
                        <Form.Label>Story title</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="2"
                            name = "title"
                            value = { storyTitle }
                            onChange = {e => setStoryTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea3">
                        <Form.Label> Description </Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="6"
                            name = "description"
                            value = { storyDescription }
                            onChange = {e => setStoryDescription(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea4">
                        <Form.Label>Story genre</Form.Label>
                        <Form.Control
                            as="select"
                            className="mr-sm-2"
                            value = { storyGenre }
                            onChange = {e => setStoryGenre(e.target.value)}
                            custom
                        >
                            <option value="0">Genre...</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="romance">Romance</option>
                            <option value="adventures">Adventure</option>
                            <option value="original">Original</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea5">
                        <Form.Label>Write your story here</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="15"
                            name = "body"
                            value = { storyBody }
                            onChange = {e => setStoryBody(e.target.value)}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

            </div>
            </div>
        )
    }

export default StoryForm;
