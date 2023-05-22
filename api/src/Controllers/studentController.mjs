import bcrypt from "bcrypt";
import dotenv from "dotenv";
import studentModel from "../Models/studentModel.mjs";
import jsonwebtoken from "jsonwebtoken";
import subjectModel from "../Models/subjectsModel.mjs";
import mongoose from "mongoose";
import marksModel from "../Models/marksModel.mjs";

dotenv.config();

export const register = async (req, res) => {
  try {
    let cryptsalt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, cryptsalt);
    if(req.body.semester%2==0) {req.body.year = req.body.semester/2} else{ req.body.year = Math.floor((req.body.semester/2 + 1))}
    req.body.role = "student";
    let userObj = await new studentModel(req.body).save();
    jsonwebtoken.sign(
      userObj.toJSON(),
      process.env.AUTH_SECRET_KEY,
      (err, token) => {
        if (err) return res.send({ error: err, status: 400 });
        else {
          return res.send({
            data: { token: token, msg: "Successfully Registered" },
            status: 200,
          });
        }
      }
    );
  } catch (error) {
    res.send({
      error: { message: error.message, name: error.name },
      status: 400,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let studentList = await studentModel.findOne({ email: email });

    if (!studentList) {
      res.send({ error: { message: "Student not registered" }, status: 400 });
    } else {
      const pwd = await bcrypt.compare(password, studentList.password);
      
      if (pwd) {
        const token = jsonwebtoken.sign(
          studentList.toJSON(),
          process.env.AUTH_SECRET_KEY
        );
        // res.cookie("access_token", token, { httponly: true });

        // return res.send('/',{
        //   Success: { message: "Successfully Logged In", data: studentList },
        //   status: 200,
        // });
        //render method goes here after success login

        res.send({data: {id: studentList._id, name: studentList.name}, status: 200});
      } else {
        return res.send({
          error: { message: "Incorrect Password or Email" },
          status: 400,
        });
      }
    }
  } catch (error) {
    return res.send({
      error: { message: error.message, name: error.name },
      status: 400,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    // using Aggregation
    const studentList = await studentModel.aggregate([
      {
        $lookup: {
          from: "subjects",
          localField: "semester",
          foreignField: "semester",
          as: "subject",
        },
      },
      {
        $lookup:{
          from: "marks",
          localField: '_id',
          foreignField: 'student',
          as: 'marks'
        }
      }
    ]);

    if (studentList) {
      return res.send({
        message: "Successfully fetched",
        data: studentList,
        status: 200,
      });
    }
  } catch (err) {
    res.send({ error: err.name, status: 400 });
  }
};

export const getDetails = async (req, res) => {
  try {


    const data = await studentModel.aggregate([
      {
        $match: {
          _id: req.params.id,
        },
      },
      {
        $lookup: {
          from: "subjects",
          let:{ department: "$department", semester:"$semester" },
          pipeline:[{
            $match:{
            $expr:{
              $and:[{
                $eq:['$department', '$$department']},
                {$eq:['$semester', '$$semester']}
              ]
            }
          }
          }],
          as: "subject",
        },
      },
      {
        $project:{
          name: 1,
          department: 1,
          semester: 1,
          subject: 1,
          role: 1
        }
      },
    ]);
   
    const subject = data[0].subject;
    const marks = await marksModel.find({subject: data[0].subject, student: data[0]._id}).populate("subject", 'name').populate('teacher', 'name');
    
    const mergeById = (arr1, arr2) =>{
      for(let i=0; i<arr1.length; i++)
      {
        for(let j=0; j<arr2.length; j++)
        {
          if(arr1[i]._id.equals(arr2[j].subject._id))
          {
              Object.assign(arr1[i], {marks: arr2[j].marks});
              Object.assign(arr1[i], {teacher: arr2[j].teacher.name});
          }
        }
      }
    }

    const newData = mergeById(subject, marks);



    // return res.send({ message: "Fetched the details", data: data});

    res.render('student', {data: data})

  } catch (err) {
    res.send({ data: { name: err.name, message: err.message }, status: 400 });
  }
};
// logout for student 

export const logout = async(req, res)=>{
  try{
    res.clearCookie("access_token");
    res.redirect('/');
  }
  catch (error) {
    return res.send({
      error: { message: error.message, name: error.name },
      status: 400,
    });
  }
}







//get by the subject name by teacher
export const getStudentById = async(req, res)=>{
  try{
    const {dept, year, sem, sub} = req.query;
    const userList = await studentModel.find({year: year, department: dept, semester: sem}).populate("marks")
    if(userList.length!==0){
      res.send({data: userList, status: 200});
    }
    else{
      res.send({data: [], message: "No students"});
    }
  }
  catch(error){
    res.send(error);
  }
}

//get subject by id
export const getSubject = async (req, res)=>{
  try{
    console.log(req.params);
    const getDetails = await studentModel.findOne({id: req.params.id});

    if(getDetails){
      res.send({data: getDetails.subjects, status: 200})
    }
    else{
      console.log(getDetails);
    }
  }
  catch(err){
    console.log(err);
  }
}

//get all subject using id
export const getAllSubject = async (req, res)=>{
  try{
    const getStudent = await studentModel.findOne({_id: req.params.id});
    if(getStudent){
      console.log(getStudent)
      const {department, year, semester} = getStudent;
      const getSubject = await subjectModel.find({department: department, year: year, semester: semester})
      if(getSubject){
        res.send({data: getSubject, status: 200});
      }
      else{
        console.log("no");
      }
    }

  }
  catch(err){
    console.log(err)
  }
}


//get details by id

export const getDetailsById = async (req, res)=>{
  try{
    const details = await studentModel.findOne({_id: req.params.id});
    console.log(details)
    if(details){
      res.send({data: details, status: 200});
    }
    else{
      res.send({data: {}, status: 400})
    }
  }
  catch(err){
    console.log(err)
  }
}

//getSubject Marks 
export const getMarks = async (req, res)=>{
  try{
    const marks = await marksModel.find({student: req.params.id}).populate({ path: 'teacher' , select: 'name department _id'}).populate({path: 'subject'}).populate({path: 'student', select : 'name email roll dept'})
    if(marks){

      res.send({data: marks, status: 200})
    }
    else{
      res.send({data: [], status: 400, message: "Not Found"});
    }
    console.log(marks);

  }
  catch(err){
    console.log(err);
  }
}
