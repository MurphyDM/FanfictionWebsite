const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("story", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false

        },
        image: {
            type: Sequelize.STRING,
            allowNull: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        body: {
            type: Sequelize.STRING,
            allowNull: false
        },
        genre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        time: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

}
