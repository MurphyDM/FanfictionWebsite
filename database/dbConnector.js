const Sequelize = require("sequelize");
const sequelize = new Sequelize("web", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: false
  }
});

const User = require('./models/userModel')(sequelize);
const Story = require('./models/storyModel')(sequelize);
User.hasMany(Story);

sequelize.sync()
.catch(err=> console.log(err));

module.exports = {
    User,
    Story 
}