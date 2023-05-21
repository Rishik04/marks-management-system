import React, { useEffect, useState } from "react";
import TeacherHeader from "../../Components/TeacherComponents/TeacherHeader";
import SubjectCard from "../../Components/TeacherComponents/SubjectCard";
import "./TeacherDashboard.scss";
import axios from "axios";
const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState({});
  const [subject, setSubject] = useState([])
  const color = ["#2F0F5D", "#146C94", "#19A7CE", "#ACB1D6", "#0B2447"]
  useEffect(() => {
    const getDetails = async ()=>{
      try{

        const teacherSub = await axios.get(`http://localhost:5000/teacher/getdetails/646a6452db1cfe081a72519b`);
        if(teacherSub){
          console.log(teacherSub)
          setTeacher(teacherSub.data.teacher);
          setSubject(teacherSub.data.subject);
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
    <div className="dashboard">
      <TeacherHeader />
      <div className="Container">
        <div className="title">
           <h1>DASHBOARD</h1>
        </div>

        <div className="details">
          <h2>Contents</h2>
          <hr />
          <h5>2022 - 2023</h5>


          <div className="totalSubjects">
            {subject.map((sub, i)=>(
              <SubjectCard bg={color[i]} subject={sub}/>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeacherDashboard;
