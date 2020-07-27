const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("comment", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false

        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        body: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    }, { indexes: [ 
        {
            type: 'FULLTEXT', name: 'text_idx', fields: ['body']
        }

    ]});

}
