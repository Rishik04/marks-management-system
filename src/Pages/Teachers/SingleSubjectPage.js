import React, { useEffect, useState } from "react";
import SubjectSubPage from "../../Components/TeacherComponents/SubjectSubPage";
import { Route, Routes, useParams } from "react-router-dom";
import TeacherHeader from "../../Components/TeacherComponents/TeacherHeader";
import QuestionPaper from "../../Components/TeacherComponents/QuestionPaper";
import axios from "axios";
import './SingleSubjectPage.scss';

const SingleSubjectPage = () => {
  const id = useParams().id;
  const [subject, setSubject] = useState({});

  useEffect(() => {
    const getSubject = async () => {
      try {
        const subject = await axios.get(
          `http://localhost:5000/teacher/get-subject/${id}`
        );
        if (subject.data.status === 200) {
          setSubject(subject.data.data);
        } else {
          console.log(subject);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getSubject();
  }, [id]);

  return (
    <div>
      <TeacherHeader />
      <div className="Container">
        <div className="title">
          <h1>Subjects/{subject.name}</h1>
        </div>

        <div className="details">
          <h2>{subject.name} (CS-601)</h2>
          <hr />
          <h5>2022 - 2023</h5>
        </div>

        <div className="subject-subpage">
          <SubjectSubPage sem={subject.semester} year={subject.year} dept={subject.department} subject={subject._id} />
        </div>

        <QuestionPaper />
      </div>
    </div>
  );
};

export default SingleSubjectPage;
