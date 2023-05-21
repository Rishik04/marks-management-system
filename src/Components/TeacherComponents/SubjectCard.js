import React from "react";
import "./SubjectCard.scss";
import { Psychology } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
const SubjectCard = ({ bg, subject }) => {
    const path = useLocation().pathname.split("/")[2];
  return (
    <div className="subjectCard">
      <NavLink to={ path === "subjects" ? `${subject}` : `subjects/${subject._id}`} style={{textDecoration: "none"}}>
        <div className="card" style={{ background: bg }}>
          <span>
            <Psychology />
          </span>
          <h5>{subject.name}</h5>
          <div className="year">
            <span>
              {subject.year}<sup>rd</sup> Year{" "}
            </span>
            <span>
              {subject.semester}<sup>th</sup> Semester{" "}
            </span>
            <span>
              {subject.department}
            </span>
          </div>
          <hr />

          <div className="enrolled">
            <p>Total Students</p>
            <span>400</span>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default SubjectCard;
