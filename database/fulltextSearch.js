const db = require('./dbConnector');
const Story = db.Story;
const User = db.User;
const Comment = db.Comment;
const sequelize =db.sequelize;

function searchStory(res, searchItem) {
        Story.findAll({
            attributes: ['id', 'genre', 'title', 'description', 'image'],
            where: sequelize.literal('MATCH (body, title, description, genre) AGAINST (:searchString)'),
            replacements: {
              searchString: searchItem
            }
          }).then(result => {
              res.json(result);
          })
          .catch(error => res.send(error));
}

function searchComment(res, searchItem) {
    Comment.findAll({
        where: sequelize.literal('MATCH (body) AGAINST (:searchString)'),
        replacements: {
          searchString: searchItem
        }
    }).then(result => {
        res.json(result);
    })
      .catch(error => res.send(error));
}

module.exports = {
    searchStory,
    searchComment
}