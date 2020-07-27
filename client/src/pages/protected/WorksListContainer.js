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

  return props.newestStories ? (
    <WorksList stories={props.newestStories} />
  ) : (
    <h2>You don"t have stories</h2>
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
