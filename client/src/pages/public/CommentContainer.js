import React, {Suspense} from 'react'
import axios from 'axios'

import {getJwt} from '../../helpers/getJwt'

import CommentList from './CommentList'
import CommentForm from './CommentForm'
const LazyCommentList = React.lazy(() => import("./CommentList"));


function CommentContainer(props) {
    const [commentsList, setCommentsList] = React.useState([]);
    const [comment, setComment] = React.useState('');

    React.useEffect(() => {
        axios
          .get("/getComments", {
            params: {
              fieldName: "storyId",
              fieldValue: props.match.params.storyId,
            },
          })
          .then((response) => {
            setCommentsList(response.data);
            console.log(response);
          })
          .catch((error) => {
            console.log('result: can"t get comments list' + error);
          });
      }, [comment]);

    
    const handleCommentSubmit = (newComment) => {
      addComment(newComment);
    }

    const addComment = (newComment) => {
        //if(window.sessionStorage.id)
        axios
          .post(
            "/auth/addComment",
            {
              commentBody: newComment,
              storyId: props.match.params.storyId,
            },
            {
              headers: {
                Authorization: getJwt(),
              },
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            if(error.response.status===550) 
              alert("Hello, dear Guest! Sorry to say, only authorized users can leave comments. Sign in and share you thoughts with us:)")
            console.log('result: can"t get comments list' + error);
          });
      };
    
    return (
        <div className="container">
          <div className="commentBox panel panel-default">
            <div className="panel-body">
              <h1>Comment Box</h1>
              <CommentForm onCommentSubmit={handleCommentSubmit} comment={comment} setComment={setComment} />
              <Suspense fallback={<div>Loading...</div>}>
                <LazyCommentList comments={commentsList} /> 
              </Suspense>
            </div>
          </div>
        </div>
      );
    }

    export default CommentContainer;