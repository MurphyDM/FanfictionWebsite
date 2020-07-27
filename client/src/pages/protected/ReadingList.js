import React, { useState } from "react";

import MediaList from "../../components/components/MediaList";

function ReadingList(props) {
  //axios запрос на истории
  console.log(props);
  return props.readingList ? (
    <MediaList stories={props.readingList} />
  ) : (
    <h4>Your reading list is empty. Start to read a new book!</h4>
  );
}

export default ReadingList;
