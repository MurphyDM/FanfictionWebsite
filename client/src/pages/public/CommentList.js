import React from 'react'
import Comment from './Comment'

function CommentList(props) {
      let commentNodes = props.comments.map(function(comment, index) {
        return (<Comment key={index} author={comment.userId}>{comment.body}</Comment>);
      });
      return (<div className="commentList">{commentNodes}</div>);
  }

export default CommentList;