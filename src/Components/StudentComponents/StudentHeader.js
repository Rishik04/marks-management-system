import React, { useEffect, useState } from "react";
import "../TeacherComponents/TeacherHeader.scss";
import "./StudentHeader.scss";
import { Logout } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentHeader = () => {
  const nav = useNavigate();
  const id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : "";
    const [student, setStudent] = useState({});
    useEffect(() => {
      const getDetails = async ()=>{
        try{
          const students = await axios.get(`http://localhost:5000/student/${id}`);
          if(students){
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
    }, []);

    const logout = ()=>{
      localStorage.removeItem("user");
      nav("/");
    }


  return (
    <div className="student-header">
      <div className="logo">
        <h6>Continous Assesstment Process</h6>
      </div>
      <div className="header-container">
        <ul className="MainNavBar">
          <NavLink to={"/student"} style={{ textDecoration: "none", color: "#fff" }}>
            <li>Dashboard</li>
          </NavLink>
          <NavLink to={"/student/subjects"} style={{ textDecoration: "none", color: "#fff" }}>
            <li>Subjects</li>
          </NavLink>
          <NavLink to={"/student/marks"} style={{ textDecoration: "none", color: "#fff" }}>
            <li>Marks</li>
          </NavLink>
          <NavLink to={"/student/questions"} style={{ textDecoration: "none", color: "#fff" }}>
            <li>Assignments</li>
          </NavLink>
        </ul>
        <div className="userNavBar">
          <div className="userProfile">
            <div className="userLogo">
              <img
                src="https://api.dicebear.com/6.x/adventurer/svg?seed=Boo"
                alt="avatar"
              />
            </div>
            <span>{student ? student.name : "Loading"}</span>
            <div className="logoutButton" onClick={logout} style={{cursor: "pointer"}}>
              <Logout />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;
