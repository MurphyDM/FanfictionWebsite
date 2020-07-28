const date = require('../config/date')
const db = require('./dbConnector');
const { response } = require('express');
const Story = db.Story;
const User = db.User;

function addToReadingList(responce, userId, storyId) {
    User.findByPk(userId)
    .then((user) => {
      if (!user) {
        console.log("user not found!");
        response.json({});
      }
       Story.findByPk(storyId).then((story) => {
        if (!story) {
          console.log("story not found!");
          response.json({});
        }

        story.addUser(user)
        .then((result) => {
            responce.send(result)
        }).catch((err) => responce.send(err));
        console.log(`>> added user id=${user.id} to Story id=${story.id}`);
      });
    })
    .catch((err) => {
      responce.send(err);
    });
}

 function deleteFromReadingList(responce, userId, storyId) {
    console.log("DELETE_COMMENT FUNCTION");
    Story.findByPk(storyId)
    .then((story) => {
      if (!story) {
        console.log("story was not found!");
        response.json({});
      }
       User.findByPk(userId).then((user) => {
        if (!user) {
          console.log("user was not found!");
          response.json({});
        }
        story.destroy(user)
        .then((result) => {
            responce.send('success')
        }).catch((err) => responce.send(err));
        console.log(`>> added user id=${user.id} to Story id=${story.id}`);
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
 }

 function getReadingList(responce, userId, order = [['date', 'DESC']] ) {
    console.log("GET_READING_LIST")

    User.findByPk(userId, {
        include: [
          {
            model: Story
          },
        ]
      }).then(readingList => {
        console.log("Result: reading list was found");
        responce.json(readingList);
    }).catch(err => {
        responce.json(err);
    });

 }

 module.exports = {
     addToReadingList,
     getReadingList, 
     deleteFromReadingList
 }