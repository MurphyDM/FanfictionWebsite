import React from "react";

import SlideshowContainer from "../../components/containers/SlideshowContainer";
import HorizontalScrollCardsContainer from "../../components/containers/HorizontalScrollCardsContainer";

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
        return <HorizontalScrollCardsContainer genre={item} key={i} />;
      })}
    </div>
  );
}

export default Home;
