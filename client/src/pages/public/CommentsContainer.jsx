import React from 'react'
import axios from 'axios'

import {changeUserReadingList} from "../../store/user/actions"
import {connect} from "react-redux";
import {getJwt} from "../../helpers/getJwt"

import Comments from './Comments'

function CommentsContainer(props) {
    const [commentsList, setCommentsList] = React.useState([]);
    const [commentBody, setCommentBody] = React.useState('');

    console.log('params', props.match.params)

    React.useEffect(() => {
    axios.get("/getComments",{
        params: {
            fieldName: 'storyId',
            fieldValue: props.match.params.storyId
        }
    }).then(response => {
              setCommentsList(response.data);
              console.log(response);
          }).catch((error) => {
              console.log("result: can\"t get comments list" + error);
          });
    }, []);

    const addComment= () => {
        //check if user!
        axios.post("/auth/addComment",{
            commentBody: commentBody,
            storyId: props.match.params.storyId
        }, { 
            headers: {
                  Authorization: getJwt()
                  }
              }).then(response => {
                  setCommentsList(response.data);
                  console.log(response);
              }).catch((error) => {
                  console.log("result: can\"t get comments list" + error);
              });
    }

    return(
            <Comments 
                commentsList = { commentsList } 
                setCommentsList = {setCommentsList}
                commentBody = { commentBody }
                setCommentBody = { setCommentBody }
                addComment = { addComment }
            />
    )

}

const mapStateToProps = (state) => {
    return {userReadingList: state.user.userReadingList}
}

const mapDispatchToProps = {
    changeUserReadingList
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer)
