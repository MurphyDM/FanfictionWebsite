import React from "react";

import Header from '../../components/containers/HeaderContainer'
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
    <>
    <Header />
    <div style={styles.chapter}>
      <SlideshowContainer />
      {storyMainGenres.map((item, i) => {
        return <HorizontalScrollCardsContainer genre={item} limit = {LIMIT_PREVIEW_CARDS} key={item.id} />;
      })}
    </div>
    </>
  );
}

export default Home;
