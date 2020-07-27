import React from "react";
import axios from "axios";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

import { setNewestStories } from "../../store/stories/actions";
import { setUser } from "../../store/user/actions";
import { connect } from "react-redux";
import { getJwt } from "../../helpers/getJwt";

import Story from "./Story";

const DARK_THEME = "darkTheme";
const LIGHT_THEME = "lightTheme";
const PAGE_SIZE = "15000";
const initialState = { textSize: 16, pageNumber: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "incrementTextSize":
      return { textSize: state.textSize + 1, pageNumber: state.pageNumber };
    case "decrementTextSize":
      return { textSize: state.textSize - 1, pageNumber: state.pageNumber };
    case "incrementPageNumber":
      return { textSize: state.textSize, pageNumber: state.pageNumber + 1 };
    case "setPageNumber":
      console.log("PAYLOAD", action.payload);
      return { textSize: state.textSize, pageNumber: action.payload };
    default:
      throw new Error();
  }
}

function StoryContainer(props) {
  const [isStarted, setIsStarted] = React.useState(false);
  const [isContinue, setIsContinue] = React.useState(false);
  const [light, setLight] = React.useState(LIGHT_THEME);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [book, setBook] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        "/getStoryByPK",
        {
          params: {
            primary: props.match.params.storyId,
          },
        },
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((response) => {
        console.log([response.data]);
        console.log("ID", response.data.id);
        if (localStorage.getItem(response.data.id)) setIsStarted(true);
        props.setNewestStories(response.data);
      })
      .catch((error) => {
        console.log('result: can"t get story' + error);
      });
  }, []);

  React.useEffect(() => {
    if (isContinue)
      dispatch({
        type: "setPageNumber",
        payload: parseInt(localStorage.getItem(props.newestStories.id)),
      });
    console.log("CONTINUE DISPATCH", state.pageNumber);
  }, [isContinue]);

  useBottomScrollListener(() => {
    console.log("bottom");
    if (props.newestStories)
      localStorage.setItem(props.newestStories.id, state.pageNumber);
    addPage();
  });

  const addPage = () => {
    console.log("NUMBER P:", state.pageNumber);
    if (props.user && state.pageNumber === 2) addStoryToReadingList();
    if (props.newestStories.body) {
      console.log("add page method");
      let startSymbol = state.pageNumber * PAGE_SIZE;
      let lastSymbol = (1 + state.pageNumber) * PAGE_SIZE;
      console.log("first and last", startSymbol, lastSymbol);
      let page = props.newestStories.body;
      page = page.slice(startSymbol, lastSymbol);
      setBook(book.concat([page]));
      dispatch({ type: "incrementPageNumber" });
      console.log("****PAGE*****", book);
    }
  };

  const addStoryToReadingList = () => {
    axios
      .post(
        "/auth/addToReadingList",
        {
          storyId: props.newestStories.id,
        },
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((response) => {
        console.log("stroy was added to the reading list", response);
      })
      .catch((error) => {
        console.log('result: can"t get reading list' + error);
      });
  };

  return (
    <>
      {props.newestStory !== null ? (
        <>
          <Story
            pages={book}
            story={props.newestStories}
            addPage={addPage}
            isStarted={isStarted}
            setIsContinue={setIsContinue}
            state={state}
            dispatch={dispatch}
            light={light}
            setLight={setLight}
          />
        </>
      ) : (
        <h2>Sorry, this story is unavailable right now</h2>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    newestStories: state.stories.newestStories,
    user: state.user.user,
  };
};

const mapDispatchToProps = {
  setNewestStories,
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryContainer);
