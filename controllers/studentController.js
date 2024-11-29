const Students = require('../models/students')

class StudentController {
    // create new student
    static async createStudent(request, response) {
        try {
            const { first_name, last_name, dob, email } = request.body;

            // validate all fields
            if (first_name === '' && last_name === '' && dob === '' && email === '') {
                response.status(400).json({message: "All field are required"})
            }

            const newStudent = await Students.create({
                first_name,
                last_name,
                dob,
                email
            });

            response.status(201).json({
                message: "Student created successfully",
                student: newStudent
            })
        } catch (error) {
            console.log('Error creating student', error);
            response.status(500).json({message: 'Internal server error.'})
        }
    }

    static async getAllStudents(request, response) {
        try {
            const students = await Students.findAll();
            response.status(200).json(students);
        } catch (error) {
            console.log('Error fetching all students', error);
            response.status(500).json({ message: "Internal server error."})
        }
    }

    // get student by id
    static async getStudentById(request, response) {
        const student_id = parseInt(request.params.id);
        
        const student = await Students.findByPk(student_id);
        
        if(!student) {
            response.status(404).json({ message: `Student with id ${student_id} not found.`});
        } else {
            response.json(student);
        }
    }

    // update student
    static async updateStudent(request, response) {
        try {
            const student_id = parseInt(request.params.id);
            const { first_name, last_name, dob, email } = request.body;

            const student = await Students.findByPk(student_id)

            if (!student) {
                response.status(404).json({ message: `Student with id ${id} does not exist`})
            } else{
                // update student details
                student.first_name = first_name,
                student.last_name = last_name,
                student.dob = dob,
                student.email = email

                await student.save();

                response.status(200).json({
                    message: "Student updated successfully",
                    student
                })
            }
        } catch (error) {
            response.json({ message: "Internal server error"})
        }
    }

    static async deleteStudent(req, res) {
        try {
    
            // Get student ID from route params
            const studentId = parseInt(req.params.id);
    
            // Validate that an ID is provided
            if (isNaN(studentId)) {
                return res.status(400).json({ message: "Invalid student ID." });
            }
    
            // Find the student by ID
            const student = await Students.findByPk(studentId);
    
            // Check if student exists
            if (!student) {
                return res.status(404).json({ message: `Student with ID ${studentId} not found.` });
            }
    
            // Delete the student
            await student.destroy();
    
            // Send success response
            res.status(200).json({ message: "Student deleted successfully." });
        } catch (error) {
            console.error("Error deleting student:", error);
            res.status(500).json({ message: "Internal server error." });
        }
    }
    
    
}

module.exports = StudentController