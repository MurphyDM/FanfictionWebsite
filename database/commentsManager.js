const date = require('../config/date')
const db = require('./dbConnector');
const Comment = db.Comment;

function addComment(responce, userId, storyId, body) {
    console.log("ADD_COMMENT FUNCTION");
    Comment.create({userId: userId, storyId: storyId, date: new Date(), body: body})
    .then(comment => {
        console.log("Result: the comment was added successfully!", comment);
        responce.send(comment);
    }).catch(err => {
        console.log("Result: comment adding ERROR");
        responce.send(err);
    });
}

 function deleteComment(responce, userId, commentId) {
    console.log("DELETE_COMMENT FUNCTION");
    Comment.destroy({
        where: {
            id: commentId,
            userId: userId
        }
    }).then((comment) => {
        console.log(comment);
        responce.send('success');
    }).catch(err => {responce.send(err) });
 }

 function getCommentsWhere(responce, fieldName = "", fieldValue = "", order = [['date', 'DESC']] ) {
    console.log("GET_COMMENTS_WHERE:", fieldValue)
    Comment.findAll({
        where: {
            [fieldName]: parseInt(fieldValue)
        },
        order: order
    }).then(comments => {
        console.log("Result: comments were found");
        responce.json(comments);
    }).catch(err => {
        responce.json(null);
    });
}

 module.exports = {
     addComment,
     deleteComment,
     getCommentsWhere
 }