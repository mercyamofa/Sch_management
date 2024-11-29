const Sequelize = require('sequelize');

// import the database connection
const db = require('../database');

const Department = db.define('departments', {
    department_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    department_name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = Department;