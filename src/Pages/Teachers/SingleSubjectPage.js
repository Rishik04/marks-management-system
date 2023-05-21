import React from "react";
import SubjectSubPage from "../../Components/TeacherComponents/SubjectSubPage";
import { Route, Routes } from "react-router-dom";
import TeacherHeader from "../../Components/TeacherComponents/TeacherHeader";
import QuestionPaper from "../../Components/TeacherComponents/QuestionPaper";

const SingleSubjectPage = () => {
  return (
    <div>
      <TeacherHeader />
      <div className="Container">
        <div className="title">
          <h1>Subjects/Machine Learning</h1>
        </div>

        <div className="details">
          <h2>Machine Learning (CS-601)</h2>
          <hr />
          <h5>2022 - 2023</h5>
        </div>

        <div className="subject-subpage">
          <Routes>
            <Route path="machine-learning" element={<SubjectSubPage />} />
            <Route path="coa" element={<SubjectSubPage />} />
            <Route path="machine-learning" element={<SubjectSubPage />} />
            <Route path="machine-learning" element={<SubjectSubPage />} />
          </Routes>
        </div>

        <QuestionPaper />
      </div>
    </div>
  );
};

export default SingleSubjectPage;
