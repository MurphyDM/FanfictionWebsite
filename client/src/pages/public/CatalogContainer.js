import React from "react"
import axios from "axios"

import {setNewestStories} from "../../store/stories/actions"
import {connect} from "react-redux";
import {getJwt} from "../../helpers/getJwt"

import Catalog from "./Catalog"

function MediaListContainer(props) {
    const [genre, setGenre] = React.useState(props.genre||"");
    console.log("genre", genre)
    
    let params = {};
    if (genre != "") {
    console.log("!genre", genre)
        params = {
            fieldName: "genre",
            filedValue: genre
        }
      }

    React.useEffect(() => {
      console.log("params", params)
        axios.get("/getStories", {
          params: params
        }, { headers: {
                Authorization: getJwt()
            }
        }).then(response => {
            props.setNewestStories(response.data);
        }).catch((error) => {
            console.log("result: can\"t get media list" + error);
        });
    }, [genre]);

    return(props.newestStories ? 
      <Catalog 
        stories = { props.newestStories } 
        genre = { genre }
        setGenre = { setGenre } /> : 
        <h2>You don"t have stories</h2>)
}

const mapStateToProps = (state) => {
    return {newestStories: state.stories.newestStories}
}

const mapDispatchToProps = {
    setNewestStories
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaListContainer)