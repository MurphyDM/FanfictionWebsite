import React from "react"
import MediaList from "../../components/components/MediaList"

/*const params=  {
    offset: props.offset,
    limit: props.limit || STORIES_ON_PAGE,
    where: props.key,
    order: [
    ["id", "DESC"],
    ["name", "ASC"]
  ]
  };*/

function WorksList(props) {
        return (
        <>
            <MediaList stories= {props.stories}/>
        </>
        )
}

export default WorksList;