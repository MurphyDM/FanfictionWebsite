import React from "react";

import SlideshowContainer from "../../components/containers/SlideshowContainer";
import HorizontalScrollCardsContainer from "../../components/containers/HorizontalScrollCardsContainer";

const LIMIT_PREVIEW_CARDS = 6;
const storyMainGenres = ["fantasy", "romance", "adventures", "original"];
const styles = {
  chapter: {
    marginBottom: "3vh",
  },
};

function Home(props) {
  return (
    <div style={styles.chapter}>
      <SlideshowContainer />
      {storyMainGenres.map((item, i) => {
        return <HorizontalScrollCardsContainer genre={item} limit = {LIMIT_PREVIEW_CARDS} key={item.id} />;
      })}
    </div>
  );
}

export default Home;
