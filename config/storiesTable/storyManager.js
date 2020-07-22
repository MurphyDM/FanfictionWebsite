const date = require('../date')
const db = require('../../database/dbConnector');
const Story = db.Story;
const STORIES_ON_PAGE = 15;

function calculateStoriesOffset(pageNumber) {
    return STORIES_ON_PAGE * pageNumber;

}
function uploadStory(responce, image, title, description, body, genre, userId) {
    console.log("UPLOADING FUNCTION");
    Story.create({
        title: title,
        description: description,
        body: body,
        time: date.getDateString(),
        genre: genre,
        userId: userId
    }).then(res => {
        console.log("Result: the story was uploaded successfully!");
        responce.json(res.id);
    }).catch(err => {
        console.log("Result: UPLOADING ERROR");
        responce.send(err);
    });
}

function getStories(res) {
    Story.findAll().then(stories => {
        console.log("Result: stories were found");
        res.json(stories);
    }).catch(err => {
        res.json('');
    });
}

function getStoriesWhere(res, fieldName = "genre", fieldValue = "original", order = [['id', 'DESC']] ) {
    Story.findAll({
        where: {
            [fieldName]: fieldValue
        },
        order: order
    }).then(stories => {
        console.log("Result: stories were found");
        res.json(stories);
    }).catch(err => {
        res.json(null);
    });
}


function getSortedStories(res, page, order) {
    let offset = calculateStoriesOffset(page);
    Story.findAll({
        offset: offset, 
        limit: STORIES_ON_PAGE}
        ).then(stories => {
        console.log("Result: stories were found");
        res.json(stories);
    }).catch(err => {
        res.json(null);
    });
}

function updateStory(storyId, fieldName, newValue) {
    console.log("update story: ", storyId, fieldName, newValue)
    Story.update({ [fieldName]: newValue }, {
        where: {
          id: storyId
        }
      }).then((res) => {
        console.log(res);
      });
}

function deleteStory(id) {
    Story.destroy({
        where: {
            id: id
        }
    }).then((res) => {
        return res;
    });
}

module.exports = {
    uploadStory,
    deleteStory,
    getStories, 
    getStoriesWhere, 
    updateStory
}
