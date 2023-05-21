import axios from "axios";
import React, { useEffect, useState } from "react";
import "./StudentSubject.scss";

const StudentSubject = ({sId}) => {
  const [chooseSubject, setChooseSubject] = useState([]);
  useEffect(() => {
    const getSubject = async () => {
      try {
        const getSubject = await axios.get(
          `http://localhost:5000/student/get-all-subject/${sId}`
        );
        if (getSubject) {
          setChooseSubject(getSubject.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getSubject();
  }, [sId]);

  return (
    <div>
      <div className="student-subject-container">
        <div className="title-container">
          <h3>YOUR SUBJECTS</h3>
        </div>

        <div className="subject-card-container">
          {chooseSubject.map((item) => (
            <div className="subject-card">
              <div className="subject-details">
                <div className="subject-title">{item.name}</div>
                <div className="subject-subtitle">
                  <div className="subject-desc">
                    <p>YEAR: {item.year}</p>
                    <p>SEM: {item.semester}</p>
                    <p>DEPT: {item.department}</p>
                  </div>
                  <div className="button-container">
                    <button>Click Here</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentSubject;
