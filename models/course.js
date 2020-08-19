'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Sequelize.Model {}
    Course.init ({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allownull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allownull: false,
        },
        estimatedTime: {
            type: Sequelize.STRING,
            allownull: true,
        },
        materialsNeeded: {
            type: Sequelize.STRING,
            allownull: true,
        }
    }, { sequelize });

    Course.associate = (models) => {
        Course.belongsTo(models.User);
    };

    return Course;
}