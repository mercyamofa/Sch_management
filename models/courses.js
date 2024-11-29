const Sequelize = require('sequelize');

// import the database connection
const db = require('../database');

const Course = db.define('courses', {
    course_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    course_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    course_description: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    credit_hours: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Course;