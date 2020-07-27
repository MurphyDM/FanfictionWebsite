import React from "react";
import axios from "axios";

import { changeUserReadingList } from "../../store/user/actions";
import { connect } from "react-redux";
import { getJwt } from "../../helpers/getJwt";

import ReadingList from "./ReadingList";

function ReadingListContainer(props) {
  React.useEffect(() => {
    axios
      .get("/auth/getReadingList", {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((response) => {
        props.changeUserReadingList(response.data.stories);
        console.log(props.userReadingList);
      })
      .catch((error) => {
        console.log('result: can"t get reading list' + error);
      });
  }, []);

  return (
    props.userReadingList != null && (
      <ReadingList readingList={props.userReadingList} />
    )
  );
}

const mapStateToProps = (state) => {
  return { userReadingList: state.user.userReadingList };
};

const mapDispatchToProps = {
  changeUserReadingList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadingListContainer);
