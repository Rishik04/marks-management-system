import React, { useEffect, useState } from "react";
import "./TeacherHeader.scss";
import { NavLink } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import axios from "axios";
const TeacherHeader = () => {
  const [teacher, setTeacher] = useState();

  useEffect(() => {
    const getDetails = async ()=>{
      try{
        const teacherSub = await axios.get(`http://localhost:5000/teacher/getdetails/637b184995cbb5d02f75c923`);
        if(teacherSub){
          console.log(teacherSub)
          setTeacher(teacherSub.data.data)
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
  }, [])


  return (
    <div className="container">
      <div className="logo">
        <h6>Continous Assesstment Process</h6>
      </div>
      <ul className="MainNavBar">
        <NavLink to={"/teacher"} style={{ textDecoration: "none" }}>
          <li>Dashboard</li>
        </NavLink>
        <NavLink to={"/teacher/subjects"} style={{ textDecoration: "none" }}>
          <li>Subjects</li>
        </NavLink>
        <NavLink to={"/teacher/students"} style={{ textDecoration: "none" }}>
          <li>Students</li>
        </NavLink>
        <NavLink to={"/teacher/questions"} style={{ textDecoration: "none" }}>
          <li>Question</li>
        </NavLink>
      </ul>
      <div className="userNavBar">
        <div className="userProfile">
          <div className="userLogo">
            <img
              src="https://api.dicebear.com/6.x/avataaars/svg?seed=Dusty"
              alt="avatar"
            />
          </div>
          <span>{teacher ? teacher.name : "Loading"}</span>
          <div className="logoutButton">
            <Logout/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHeader;
