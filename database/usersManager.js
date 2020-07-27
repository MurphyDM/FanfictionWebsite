const date = require('../config/date')
const db = require('./dbConnector');
const User = db.User;

function updateUser(responce, id, fieldName, newValue) {
    console.log("update user: ", id, fieldName, newValue)
    User.update({ [fieldName]: newValue }, {
        where: {
          id: parseInt(id)
        }
      }).then((result) => {
        responce.send(result);
      }).catch(err => responce.status(500).send(err));
}

function getUsers(responce) {
  User.findAll()
  .then(users => {
      console.log("Result: users were found");
      responce.json(users);
  }).catch(err => {
    responce.json('');
  });
}

function deleteUser(responce, userId) {
  User.destroy({
    where: {
      id: parseInt(userId)
    }
  }).then((result) => {
    responce.send('success');
  }).catch(err => responce.status(500).send(err))
}

module.exports = {
    updateUser,
    getUsers,
    deleteUser
}