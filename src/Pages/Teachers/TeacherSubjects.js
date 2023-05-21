import React from "react";
import TeacherHeader from "../../Components/TeacherComponents/TeacherHeader";
import SubjectCard from "../../Components/TeacherComponents/SubjectCard";
import './TeacherSubjects.scss'

const TeacherSubjects = () => {
  return (
    <div>
      <TeacherHeader />

      <div className="Container">
        <div className="title">
          <h1>SUBJECTS</h1>
        </div>

        <div className="details">
          <h2>Subjects</h2>
          <hr />
          <h5>2022 - 2023</h5>

          <div className="totalSubjects">
            <SubjectCard bg={"#19A7CE"} subject={"machine-learning"} />
            <SubjectCard bg={"#8294C4"} subject={"dbms"} />
            <SubjectCard bg={"#654E92"} subject={"coa"} />
            <SubjectCard bg={"#025464"} subject={"advanced-algorithm"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSubjects;
