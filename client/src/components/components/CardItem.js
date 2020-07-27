import React from "react";
import { Card } from "react-bootstrap";

const MAX_DESCRIPTION_SIZE = 100;
const BOOK_COVER_PLACEHOLDER =
  "https://images.squarespace-cdn.com/content/v1/5a5547e1a803bb7df0649e50/1569021071787-GQ6QWL4IMADHSY7W7VH2/ke17ZwdGBToddI8pDm48kKDp-7ip__g8QobJS6Y5m3dZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVFhb23Mwiwo3IFHbJH9edcC4_w0H8oueJbNNKCuHf_kD6QvevUbj177dmcMs1F0H-0/placeholder.png?format=1000w";

const styles = {
  link: {
    color: "black",
    textDecoration: "none",
  },
  text: {
    fontFamily: "Georgia, serif",
  },
  img: {
    width: "200px",
    height: "250px",
    marginTop: "1rem",
  },
};

class CardItem extends React.Component {
  render() {
    let descriptionText = this.props.description;
    if (descriptionText.length > MAX_DESCRIPTION_SIZE) {
      descriptionText = descriptionText.slice(0, MAX_DESCRIPTION_SIZE) + " ...";
    }
    return (
      <a href={`/story/${this.props.id}`} style={styles.link}>
        <Card
          style={{
            width: "330px",
            height: "450px",
            margin: "1rem",
            backgroundColor: "#f8f9f9",
          }}
        >
          <div className="d-flex justify-content-center">
            <Card.Img
              src={this.props.image || BOOK_COVER_PLACEHOLDER}
              style={styles.img}
            />
          </div>

          <Card.Body
            style={{
              whiteSpace: "pre-wrap",
              overflow: "hidden",
              whiteSpace: "pre-line",
            }}
          >
            <Card.Title className="text-center" style={styles.text}>
              {this.props.caption}
            </Card.Title>
            <div className="text-justify" style={styles.text}>
              <p> {descriptionText} </p>
            </div>
          </Card.Body>
        </Card>
      </a>
    );
  }
}

export default CardItem;
