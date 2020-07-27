const date = require('../config/date')
const db = require('./dbConnector');
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

function getStories(res, fieldName = null, fieldValue = null, limit = null, order = [['id', 'DESC']] ) {
    console.log("**METHOD Filter", fieldValue);
    let params = {};
    params['attributes']=['id', 'image', 'title', 'description', 'genre','userId'];
    params['order'] = order;
    if(limit) params['limit']= parseInt(limit);
    if(fieldName&&fieldValue) params['where'] = { [fieldName]: fieldValue };
    console.log("!!!!!!!!!!!!!!!!", params)
    Story.findAll(params).then(stories => {
        console.log("Result: stories were found");
        res.json(stories);
    }).catch(err => {
        res.json(null);
    });
}

function getStoryByPK(res, primaryKey){
    Story.findByPk(parseInt(primaryKey))
    .then(story => {
        console.log("Result: ", primaryKey, " story was found");
        console.log('story', story)
        res.json(story);
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

function updateStory(responce, storyId, fieldName, newValue) {
    console.log("update story: ", storyId, fieldName, newValue)
    Story.update({ [fieldName]: newValue }, {
        where: {
          id: storyId
        }
      }).then((res) => {
        console.log(res);
        responce.json({ msg: 'yaya' });
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

/*await sequelize.query(
    'SELECT * FROM projects WHERE status = ?',
    {
      replacements: ['active'],
      type: QueryTypes.SELECT
    }
  );example*/ 

function uploadFile(res, file, id) {
    console.log("upload works", file)
    Story.update({ body: file }, {
        where: {
          id: id
        }
      }).then((result) => {
        console.log(result);
        res.send('success');
      });
}

module.exports = {
    uploadStory,
    deleteStory,
    getStories, 
    getStoryByPK,
    updateStory, 
    uploadFile
}
