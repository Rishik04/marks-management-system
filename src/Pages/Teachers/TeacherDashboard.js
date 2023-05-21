import React, { useEffect, useState } from "react";
import TeacherHeader from "../../Components/TeacherComponents/TeacherHeader";
import SubjectCard from "../../Components/TeacherComponents/SubjectCard";
import "./TeacherDashboard.scss";
import axios from "axios";
const TeacherDashboard = () => {
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
            <SubjectCard bg={"#19A7CE"} subject={"machine-learning"}/>
            <SubjectCard bg={"#8294C4"} subject={"dbms"}/>
            <SubjectCard bg={"#654E92"} subject={"coa"}/>
            <SubjectCard bg={"#025464"} subject={"advanced-algorithm"}/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeacherDashboard;
