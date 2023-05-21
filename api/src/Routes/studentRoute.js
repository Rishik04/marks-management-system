import express from "express";
import { auth } from "../auth/auth.mjs";
import * as studentController from "../Controllers/studentController.mjs"

const studentRouter = express.Router();


//post request
studentRouter.post('/register', studentController.register);
studentRouter.post('/login', studentController.login);

//get request
studentRouter.get('/', studentController.getDetails);
studentRouter.post('/logout', auth, studentController.logout);





//get student by dept & year
studentRouter.get('/get-student', studentController.getStudentById)

//get subject by id
studentRouter.get('/get-subject/:id', studentController.getSubject)

//get all subject using id
studentRouter.get('/get-all-subject/:id',studentController.getAllSubject)

//get student by id
studentRouter.get('/:id', studentController.getDetailsById);

//get marks by student id
studentRouter.get('/get-marks/:id', studentController.getMarks);


export default studentRouter;