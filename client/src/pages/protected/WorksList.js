import React from "react";
import MediaList from "../../components/components/MediaList";

function WorksList(props) {
  return (
    <>
     {props.stories&&<MediaList stories={props.stories} />}
    </>
  );
}

export default WorksList;
