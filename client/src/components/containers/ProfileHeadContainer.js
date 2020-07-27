import React, {Suspense, useEffect} from "react";
import axios from "axios";
import { getJwt } from "../../helpers/getJwt";

import { setUser } from "../../store/user/actions";
import { connect } from "react-redux";

import ProfileHeadEditMode from "../components/ProfileHeadEditMode";
import ProfileHead from "../components/ProfileHead";

const REGULAR_MODE = "REGULAR_MODE";
const EDITOR_MODE = "EDITOR_MODE";

function ProfileHeadContainer(props) {
  const [username, setUsername] = React.useState((props.user&&props.user.name)||"");
  const [errMsg, setErrMsg] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState("");
  const [mode, setMode] = React.useState(REGULAR_MODE);

  const submitChanges = () => {
    if (!username) return;
    axios
      .post(
        "/auth/changeUsername",
        {
          newName: username,
        },
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        console.log("username was changed successfully");
        props.setUser({user: {name: username, "avatar": props.user.avatar, "id":props.user.id, "status": props.user.status}});
        document.location.reload();
        setSuccessMsg("Your profile was changes successfuly");
      })
      .catch(() =>
        setErrMsg("Can't change your profile right now. We're so sorry!")
      );
  };

  const changeMode = () => {
    if (mode === REGULAR_MODE) setMode(EDITOR_MODE);
    else setMode(REGULAR_MODE);
  };

  return (
    <>
      {mode === EDITOR_MODE && (
      <ProfileHeadEditMode
          username={username}
          setUsername={setUsername}
          submitChanges={submitChanges}
          changeMode={changeMode}
          avatar={props.user&&props.user.avatar||""}
          mode={mode}
          success={successMsg}
          error={errMsg}
        />
      )}
      {mode === REGULAR_MODE && (
       <ProfileHead
             username={username}
             setUsername={setUsername}
             submitChanges={submitChanges}
             changeMode={changeMode}
             mode={mode}
             avatar={window.sessionStorage.getItem("avatar")}
             success={successMsg}
             error={errMsg}
           />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user.user.user };
};

const mapDispatchToProps = {
  setUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeadContainer);
