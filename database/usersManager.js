const date = require('../config/date')
const db = require('./dbConnector');
const User = db.User;

function updateUser(responce, id, fieldName, newValue) {
    console.log("update user: ", id, fieldName, newValue)
    User.update({ [fieldName]: newValue }, {
        where: {
          id: id
        }
      }).then((result) => {
        console.log(result);
        responce.send('success');
      });
}

module.exports = {
    updateUser
}