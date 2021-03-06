import React from "react";
import axios from "axios";

import Slideshow from "../components/Slideshow";
import SlideItem from "../components/SlideItem";

function SlideshowContainer(props) {
  const [slides, setSlides] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("/getStories", {
        params: {
          limit: 3
        },
      })
      .then((response) => {
        setSlides(response.data);
      })
      .catch((error) => {
        console.log("error 3 " + error);
      });
  }, []);

  return slides ? <Slideshow slides={slides} content={SlideItem} /> : <></>;
}

export default SlideshowContainer;
