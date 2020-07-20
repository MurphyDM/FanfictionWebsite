const date = require('../date')
const db = require('../../database/dbConnector');
const Story = db.Story;
const STORIES_ON_PAGE = 15;

function calculateStoriesOffset(pageNumber) {
    return STORIES_ON_PAGE * pageNumber;

}
function uploadStory(image, title, body, genre, userId) {
    Story.create({
        image: 'id' + image,
        title: title,
        body: body,
        time: date.getDateString(),
        genre: genre,
        userId: userId
    }).then(res => {
        return res;
    }).catch(err => {
        return err;
    });
}

function getStories(res, page, quantity) {
    const offset = calculateStoriesOffset(page),
        limit = parseInt(quantity);
    Story.findAll({
        offset: offset,
        limit: limit || STORIES_ON_PAGE
    }).then(stories => {
        console.log("Stories were found:", stories);
        res.json(stories);
    }).catch(err => {
        res.json(null);
    });
}

function getStoriesWhere(res, page, key, quantity) {
    const offset = calculateStoriesOffset(page),
        limit = parseInt(quantity);
    Story.findAll({
        limit: limit||STORIES_ON_PAGE,
        offset: offset||0,
        where: {
            genre: key
        }, // conditions
    }).then(stories => {
        console.log("Stories were found:", stories);
        res.json(stories);
    }).catch(err => {
        res.json(null);
    });
}


function getSortedStories(res, page, order) {
    let offset = calculateStoriesOffset(page);
    Story.findAll({offset: offset, limit: STORIES_ON_PAGE}).then(stories => {
        console.log("Stories were found:", stories);
        res.json(stories);
    }).catch(err => {
        res.json(null);
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
    getStoriesWhere
}
