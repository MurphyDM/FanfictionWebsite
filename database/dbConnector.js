const Sequelize = require("sequelize");
const sequelize = new Sequelize("djznfz4re5pzeldt", "xb43i7eimza1dltq", "l2fsj9hm91w8o55m", {
  dialect: "mysql",
  host: "enqhzd10cxh7hv2e.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: "3306",
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