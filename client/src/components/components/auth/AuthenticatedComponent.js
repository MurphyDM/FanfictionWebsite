import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { getJwt } from "../../../helpers/getJwt";

import { setUser } from "../../../store/user/actions";
import { connect } from "react-redux";

function AuthComponent(props) {

  React.useEffect(()=> {
      const jwt = getJwt();
      console.log(jwt)
      if (!jwt) {
        props.setUser({
          user: null,
        });
        return;
      }
      axios.get("/auth/getUser", { headers: { Authorization: getJwt() } })
        .then((res) => {
          console.log("status", res.data);
          props.setUser( {
            user: res.data,
          });
        })
        .catch((err) =>
          props.setUser({
            user: null,
          })
        );
  }, []);

  console.log(props.user)
      if (props.user === undefined) {
      return <div>Loading...</div>;
    }

    if (props.user === null) {
      props.history.push("/signin");
    }

    return props.children;
}

const mapStateToProps = (state) => {
  return { user: state.user.user.user };
};

const mapDispatchToProps = {
  setUser
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthComponent));
