import React from "react";
import axios from "axios";

import HorizontalScrollCards from "../components/HorizontalScrollCards";
import CardItem from "../components/CardItem";

function HorizontalScrollCardsContainer(props) {
  const [stories, setStories] = React.useState([]);

  let params = {};
  if (props.genre)
    params = {
      fieldName: "genre",
      fieldValue: props.genre,
    };
    if(props.genre&&props.limit) params['limit'] = props.limit;

  React.useEffect(() => {
    console.log(params);
    axios
      .get("/getStories", {
        params: params,
      })
      .then((response) => {
        console.log("responce:", response.data);
        setStories(response.data);
      })
      .catch((error) => {
        console.log('cant"t get stories by genre ' + error);
      });
  }, []);

  return stories && stories.length !== 0 ? (
    <>
      <h1> {props.genre} stories</h1>
      <HorizontalScrollCards
        style={{ marginBottom: "3vh" }}
        cards={stories}
        content={CardItem}
        subpath={props.genre}
      />
    </>
  ) : (
    <></>
  );
}

export default HorizontalScrollCardsContainer;
