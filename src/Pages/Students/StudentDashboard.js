import React, { useEffect, useState } from "react";
import StudentHeader from "../../Components/StudentComponents/StudentHeader";
import "./StudentDashboard.scss";
import StudentSubject from "../../Components/StudentComponents/StudentSubject";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : "";
    const [student, setStudent] = useState({});
    const nav = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("user")){
      nav("/");
    }
    const getDetails = async ()=>{
      try{
        const students = await axios.get(`http://localhost:5000/student/${id}`);
        if(students){
            console.log(students)
          setStudent(students.data.data)
        }
        else{
          console.log("err");
        }
      }
      catch(err){
        console.log(err)
      }
    };
    getDetails();
  }, [nav])

  return (
    <div className="student-dashboard">
      <StudentHeader />
      <div className="wrapper Container">
        <div className="student-profile-card">
          <div className="title-container">
            <h3>YOUR PROFILE</h3>
          </div>
          <div className="student-detail-container">
            <div className="left">
              <p>
                <span>Hi {student.name}</span>, Update your profile from here. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Eligendi vero
                culpa laborum incidunt eveniet harum tenetur ipsam voluptas
                nobis.
              </p>
              <div className="button-container">
                <button>Click Here</button>
              </div>
            </div>
            <div className="right">
              <img src="assets/images/student.jpg" alt="" />
            </div>
          </div>
        </div>

        {student._id ? <StudentSubject sId = {student._id} /> : "Loading"}
        

      </div>
    </div>
  );
};

export default StudentDashboard;
