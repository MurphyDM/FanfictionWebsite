import React from 'react'
import {Toast, Row, Col, Button} from "react-bootstrap";
import './Comment.css'

function CommentForm(props) {
   

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!props.comment) {
      alert("Please enter your comment before submitting");
      return;
    }
    props.onCommentSubmit(props.comment);    
    props.setComment("");
  }

 return (
     <Row className = "commentWrapper d-flex justify-content-center">
        <Col xs={4}>
       <form className="form" onSubmit={(e) => handleSubmit(e)}>
       <Toast className = "">
       <Toast.Header className="comment">
            <input className="form-control" 
            type="text" 
            value={props.comment} 
            onChange={e => props.setComment(e.target.value)} 
            placeholder="Say somthing here..."/><br/>
        </Toast.Header>
        <Toast.Body className = "d-flex justify-content-center">
         <Button className="btn btn-default" type="submit" value="Post">Send</Button>
        </Toast.Body>
        </Toast>
       </form>
    </Col>
   </Row>
 );
}

export default CommentForm;

