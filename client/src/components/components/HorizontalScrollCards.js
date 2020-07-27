import React from "react";
import { Link } from "react-router-dom";
import "../Style.css";

const styles = {
  div: {
    overflowX: "scroll",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    scroll: "hidden",
  },
  card: {
    display: "inline-block",
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontWeight: "500",
    fontSize: "25px",
  },
  lastCard: {
    width: "200px",
  },
};

function HorizontalScrollCards(props) {
  let Content = props.content;
  return (
    <div style={styles.div} className="scrolling-wrapper">
      {props.cards.map((card, i) => {
        return (
          <div style={styles.card} className="card" key={card.id}>
            <Content
              image={
                card.image ||
                "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png"
              }
              caption={card.title}
              description={card.description}
              genre={card.genre}
              time={card.time}
              user={card.userId}
              id={card.id}
            />
          </div>
        );
      })}
      <div
        style={{ display: "inline-block", border: "none" }}
        className="card"
        key={0}
      >
        <div className=" d-flex justify-content-center" style={styles.lastCard}>
          <Link to={`/catalog/${props.subpath}`} style={styles.link}>
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HorizontalScrollCards;
