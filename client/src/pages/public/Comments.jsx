import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import MediaList from "../../components/components/MediaList";

function Comments(props) {
  console.log(props);
  return (
    <>
      <Form style={{ width: "35vw" }} onSubmit={(e) => props.addComment(e)}>
        <Form.Group controlId="exampleForm.ControlTextarea3">
          <Form.Label> Comment </Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            name="commentBody"
            value={props.commentsBody}
            onChange={(e) => props.setCommentBody(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>

      {props.commentsList ? (
        <MediaList stories={props.commentsList} />
      ) : (
        <h4>This story has no comments. You can write the first!</h4>
      )}
    </>
  );
}

export default Comments;
