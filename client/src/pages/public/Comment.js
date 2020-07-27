import React from 'react'
import {Toast, Row, Col}from "react-bootstrap";
import './Comment.css'

function Comment(props)  {
    return (
        <Row className = "commentWrapper f-flex justify-content-center">
        <Col xs={4}>
          <Toast className = "">
            <Toast.Header className="comment">
              <img
                src=""
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">user#{props.author}</strong>
              <small>X mins ago</small>
            </Toast.Header>
            <Toast.Body> {props.children}</Toast.Body>
          </Toast>
        </Col>
        </Row>
);
}
export default Comment;