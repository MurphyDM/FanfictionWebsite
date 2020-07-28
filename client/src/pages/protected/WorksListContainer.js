import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { setNewestStories } from "../../store/stories/actions";

import { getJwt } from "../../helpers/getJwt";
import WorksList from "./WorksList";

function WorksListContainer(props) {
  React.useEffect(() => {
    axios
      .get("/auth/getUserStories", {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((response) => {
        props.setNewestStories(response.data);
      })
      .catch((error) => {
        console.log('result: can"t get media list' + error);
      });
  }, []);

  return props.newestStories.length > 0 ? (
    <WorksList stories={props.newestStories} />
  ) : (
    <h4>Empty. You can write you first story right now! Click 'Write story' tab.</h4>
  );
}

const mapStateToProps = (state) => {
  return {
    newestStories: state.stories.newestStories,
  };
};

const mapDispatchToProps = {
  setNewestStories,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorksListContainer);
