const express = require('express')

const router = express.Router();

// import controllers
const StudentController = require('../controllers/studentController')

const { validateStudent } = require('../middlewares/validateStudent')


// create a new student
// Apply validation middleware to POST and PUT routes
router.post('/create-student/',validateStudent, StudentController.createStudent);
router.get('/students', StudentController.getAllStudents);
router.get('/student/:id', StudentController.getStudentById)

router.put('/update-student/:id', validateStudent, StudentController.updateStudent)
router.delete('/students/:id', StudentController.deleteStudent);

module.exports = router;
