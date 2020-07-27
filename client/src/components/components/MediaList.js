import React, { useState } from "react";
import { Media } from "react-bootstrap";

const PLACEHOLDER_AVATAR =
  "https://media.istockphoto.com/vectors/default-avatar-profile-icon-gray-placeholder-photo-vector-id844060994?k=6&m=844060994&s=170667a&w=0&h=gqrpuJ3y31Kj1v3CA95g5Mo0ObxwAVf_Efu9nwc9cHs=";
const BOOK_COVER_PLACEHOLDER =
  "https://images.squarespace-cdn.com/content/v1/5a5547e1a803bb7df0649e50/1569021071787-GQ6QWL4IMADHSY7W7VH2/ke17ZwdGBToddI8pDm48kKDp-7ip__g8QobJS6Y5m3dZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVFhb23Mwiwo3IFHbJH9edcC4_w0H8oueJbNNKCuHf_kD6QvevUbj177dmcMs1F0H-0/placeholder.png?format=1000w";
const MAX_DESCRIPTION_SIZE = 700;

const styles = {
  media: {
    marginBottom: "1rem",
    border: "3px solid #f0f0f0",
  },
  div: {
    margin: "1rem",
  },
  title: {
    fontFamily: "Gentium Book Basic, serif",
    fontWeight: "700",
    textAlign: "left",
  },
  genre: {
    overflowWrap: "anywhere",
    fontSize: "15px",
    fontWeight: "700",
    color: "#cccccc",
  },
  description: {
    overflowWrap: "anywhere",
    fontSize: "17px",
    fontFamily: "Gentium Book Basic, serif",
    fontWeight: "400",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
};
function MediaList(props) {
  console.log(props.stories);
  return (
    <>
      <ul className="list-unstyled">
        {props.stories.map((story, i) => {
          let descriptionText = story.description || story.body || "";
          if (descriptionText.length > MAX_DESCRIPTION_SIZE) {
            descriptionText =
              descriptionText.slice(0, MAX_DESCRIPTION_SIZE) + " ...";
          }
          return (
            <a href={`/story/${story.id}`} style={styles.link} key={i}>
              <Media as="li" key={i} style={styles.media}>
                <div className="d-flex" style={styles.div}>
                  <img
                    className="mr-3"
                    width={150}
                    height={200}
                    src={story.image || BOOK_COVER_PLACEHOLDER}
                    alt="Story cover"
                  />
                  <Media.Body>
                    <h4 style={styles.title}> {story.title} </h4>
                    <p style={styles.genre}>{story.genre || ""}</p>
                    <p style={styles.description}>{descriptionText}</p>
                  </Media.Body>
                </div>
              </Media>
            </a>
          );
        })}
      </ul>
    </>
  );
}

export default MediaList;
