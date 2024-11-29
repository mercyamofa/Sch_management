const express = require('express');

// get all routes from studentRoutes
const studentRoutes = require('./routes/studentRoute')

// import database connection
const sequelize = require('./database');

// import all models
const Student = require('./models/students');
const Department = require('./models/department');
const Course = require('./models/courses');
const Enrollment = require('./models/enrollment');

const server = express()

// body parser middleware
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// endpoint to get student routes
server.use('/api/v1', studentRoutes);

// syncing database to node application
sequelize.sync().then((result) => {
    console.log('Database synced successfully');
}).catch((error) => {
    console.log('Error syncing database');
})

// set up association
const models = {
    Student,
    Course,
    Department,
    Enrollment
}

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models)
    }
})

module.exports = models;

server.listen(8000, () => {
    console.log("Server listening on port 8000");
})