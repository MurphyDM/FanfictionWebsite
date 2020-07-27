import React from "react";
import { Row, Col, Container, Image, Button } from "react-bootstrap";

const PLACEHOLDER_AVATAR =
  "https://media.istockphoto.com/vectors/default-avatar-profile-icon-gray-placeholder-photo-vector-id844060994?k=6&m=844060994&s=170667a&w=0&h=gqrpuJ3y31Kj1v3CA95g5Mo0ObxwAVf_Efu9nwc9cHs=";

  const styles = {
  container: {
    marginTop: "56px",
  },
  img: {
    width: "10vw",
    height: "10vw",
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
  const [textColor, setTextColor] = React.useState("white");
  const [backgroundColor, setBackgroundColor] = React.useState("#395e77");
  const [avatar, setAvatar] = React.useState(PLACEHOLDER_AVATAR);

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
          <Image
            src={props.avatar || PLACEHOLDER_AVATAR}
            roundedCircle
            className="d-block mx-auto"
            style={styles.img}
          />
          <Button
            style={{ background: "none", border: "none", color: "gray" }}
            className="justify-content-end"
            onClick={() => props.changeMode()}
          >
            edit profile
          </Button>

          <h3 style={styles.name}>{props.username}</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileHead;
