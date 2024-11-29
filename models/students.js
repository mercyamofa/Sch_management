const Sequelize = require('sequelize');

// import the database connection
const db = require('../database');

const Student = db.define('students', {
    student_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dob: {
        type: Sequelize.DATE,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

module.exports = Student;