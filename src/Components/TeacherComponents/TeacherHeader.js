import React, { useEffect, useState } from "react";
import "./TeacherHeader.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import axios from "axios";
const TeacherHeader = () => {
  const [teacher, setTeacher] = useState({});
  const nav = useNavigate();
  const id = localStorage.getItem("teacher") ? JSON.parse(localStorage.getItem("teacher")).data.id : "";
  useEffect(() => {
    const getDetails = async ()=>{
      try{
        const teacherSub = await axios.get(`http://localhost:5000/teacher/getdetails/${id}`);
        if(teacherSub){
          setTeacher(teacherSub.data.teacher)
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

  const logout = ()=>{
    localStorage.removeItem("teacher");
    nav("/");
  }


  return (
    <div className="container">
      <div className="logo">
        <h6>Continous Assesstment Process</h6>
      </div>
      <ul className="MainNavBar">
        <NavLink to={"/teacher"} style={{ textDecoration: "none", color:'#fff' }}>
          <li>Dashboard</li>
        </NavLink>
        <NavLink to={"/teacher/students"} style={{ textDecoration: "none", color:'#fff' }}>
          <li>Students</li>
        </NavLink>
        <NavLink to={"/teacher/questions"} style={{ textDecoration: "none", color:'#fff' }}>
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
          <div className="logoutButton" onClick={logout} style={{cursor: "pointer"}}>
            <Logout/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHeader;
