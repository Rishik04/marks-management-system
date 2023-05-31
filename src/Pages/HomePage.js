import React, { useState } from "react";
import MainHeader from "../Components/MainHeader";
import "./HomePage.scss";
import StudentLoginForm from "../Components/StudentComponents/StudentLoginForm";
import TeacherLoginForm from "../Components/TeacherComponents/TeacherLoginForm";
import { ArrowBack } from "@mui/icons-material";

export const HomePage = () => {
  const [type, setType] = useState("home");

  const handleClick = (data) =>{
    const id = data.target.id;

    if(id === "teacher"){
      setType(id);
    }
    else{
      setType(id);
    }
  }


  return (
    <div className="home-page">
      <MainHeader />

      <div className="Container">
        <div className="wrapper">
        {type!=="home" ? <ArrowBack id="home" onClick={handleClick} style={{border: "2px solid black", padding: 8, borderRadius: 50, background: "#fff", cursor: "pointer"}}/> : "" }
          {type === "student" ? <StudentLoginForm /> : type === "teacher" ? <TeacherLoginForm /> :
          <div className="home-left">
            <div className="home-title">
              <h2>CONTINOUS ASSESSTMENT PROCESS</h2>
              <p>
                {" "}
                software program designed to manage and track student grades and
                academic performance. The system typically includes a dashboard
                for teachers and students to access grade records in real-time.
                Teacher can view individual student performance, class averages,
                and historical trends over time.
                <br />
              </p>
            </div>
            <div className="button-container">
              <button id="teacher" onClick={handleClick}>Teacher</button>
              <button id="student" onClick={handleClick}>Student</button>
            </div>
            
          </div>}

          <div className="home-right">
            <img src="https://i.gifer.com/Owm.gif" alt="" />
          </div>
        </div>
        <div className="home-footer">
          <div className="footer-title">
            <h3>UNDER THE SUPERVISION OF</h3>
            <h4>Dr. ABHISHEK BANDYOPADHYAY</h4>
          </div>
            <img
              src="https://api.dicebear.com/6.x/adventurer/svg?seed=Gizmo"
              alt="avatar"
            />
        </div>
      </div>
    </div>
  );
};
