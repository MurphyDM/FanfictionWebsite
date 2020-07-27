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
            type: Sequelize.TEXT,
            allowNull: false
        },
        body: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        genre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        time: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {indexes: [ 
        {
            type: 'FULLTEXT', name: 'text_idx', fields: ['body', 'title', 'description', 'genre']
        }

    ]});

}
