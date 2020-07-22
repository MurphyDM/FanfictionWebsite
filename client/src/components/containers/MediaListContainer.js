import React from "react"
import axios from "axios"

import { setNewestStories } from "../../store/stories/actions"
import { connect } from "react-redux";
import { getJwt } from "../../helpers/getJwt"

import MediaList from "../components/MediaList"

function MediaListContainer(props) {
      React.useEffect(() => {
            axios.get(props.url, { headers: { 
              Authorization: getJwt() 
          }
      }).then(response => {
              props.setNewestStories(response.data);
            })
            .catch((error) => {
              console.log("result: can\"t get media list" + error);
            });
      }, []);

        return (
            props.newestStories ?
                <MediaList stories = { props.newestStories } /> :
                <h2>You don"t have stories</h2>
        )
}

const mapStateToProps = (state) => {
    return {
        newestStories: state.stories.newestStories
    }
  }
  
  const mapDispatchToProps = {
    setNewestStories
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(MediaListContainer)
