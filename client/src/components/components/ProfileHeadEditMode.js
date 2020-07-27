import React from "react";
import {
  Row,
  Col,
  Container,
  Image,
  InputGroup,
  Button,
  FormControl,
} from "react-bootstrap";
import Dropzone from "./Dropzone";

import PLACEHOLDER_AVATAR_EDIT_MODE from "../../images/edit_mode_image.png";

const styles = {
  container: {
    marginTop: "56px",
  },
  img: {
    width: "10vw",
    height: "10vw",
    WebkitBoxShadow: "0px -1px 39px -4px rgba(7,1,107,1)",
    MozBoxShadow: "0px -1px 39px -4px rgba(7,1,107,1)",
    BoxShadow: "0px -1px 39px -4px rgba(7,1,107,1)",
  },
  row: {
    height: "40vh",
    minHeight: "250px",
    backgroundColor: "#395e77",
  },
  link: {
    textDecoration: "none",
    fontSize: "20px",
    fontWeigth: "300",
    padding: "1rem",
    color: "white",
  },
  name: {
    color: "white",
    textShadow: "1px 1px 1px black, 0 0 0.5em gray",
  },
};

function ProfileHead(props) {
  console.log(props);
  return (
    <Container fluid fixed="top" style={styles.container}>
      <Row className="align-content-center" style={styles.row}>
        <Col
          className="d-block text-center"
          sm={{
            span: 8,
            offset: 2,
          }}
          md={{
            span: 8,
            offset: 2,
          }}
          lg={{
            span: 6,
            offset: 3,
          }}
        >
          <Dropzone
            url="/auth/uploadAvatar"
            dropZone={() => {
              return (
                <Image
                  src={PLACEHOLDER_AVATAR_EDIT_MODE}
                  className="d-block mx-auto rounded-circle"
                  style={styles.img}
                  roundedCircle
                />
              );
            }}
          />
          <Button
            style={{ background: "none", border: "none", color: "gray" }}
            className="justify-content-end"
            onClick={() => props.changeMode()}
          >
            exit edit mode
          </Button>
          <h3 style={styles.name}>
            <InputGroup
              className="m-auto pt-3"
              style={{ width: "150px" }}
              onSubmit={(e) => props.submitChanges()}
            >
              <FormControl
                //defaultValue={props.username}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={props.username}
                onChange={(e) => {
                  props.setUsername(e.target.value);
                }}
              />
              <InputGroup.Append>
                <Button
                  type="submit"
                  variant="outline-secondary"
                  onClick={() => props.submitChanges()}
                >
                  change
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </h3>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileHead;
