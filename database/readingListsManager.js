const date = require('../config/date')
const db = require('./dbConnector');
const Story = db.Story;
const User = db.User;

function addToReadingList(responce, userId, storyId) {
    Story.findByPk(storyId)
    .then((story) => {
      if (!story) {
        console.log("story not found!");
        return null;
      }
       User.findByPk(userId).then((user) => {
        if (!user) {
          console.log("user not found!");
          return null;
        }

        story.addUser(user)
        .then((result) => {
            responce.send('success')
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
        return null;
      }
       User.findByPk(userId).then((user) => {
        if (!user) {
          console.log("user was not found!");
          return null;
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