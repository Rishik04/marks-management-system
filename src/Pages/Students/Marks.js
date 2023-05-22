import React, { useEffect, useState } from "react";
import StudentHeader from "../../Components/StudentComponents/StudentHeader";
import "./Marks.scss";
import axios from "axios";
import {
  AssessmentOutlined,
  SummarizeOutlined,
  SupervisedUserCircle,
} from "@mui/icons-material";
import StudentReport from "../../Components/StudentComponents/StudentReport";

const Marks = () => {
  const [marksCard, setMarksCard] = useState([]);
  const totalmarks =
    marksCard.length !== 0
      ? marksCard.reduce((acc, curr) => acc + curr.marks, 0)
      : 0;
  const allSubject =
    marksCard.length !== 0
      ? marksCard.map((card) => {
          return {
            name: card.subject.name,
            marks: card.marks,
          };
        })
      : [];
  console.log(totalmarks);

  const id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : "";
  useEffect(() => {
    const getMarks = async () => {
      try {
        const getMarks = await axios.get(
          `http://localhost:5000/student/get-marks/${id}`
        );
        if (getMarks.data.status === 200 && getMarks.data.data.length !== 0) {
          setMarksCard(getMarks.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMarks();
  }, []);

  return (
    <div>
      <StudentHeader />
      <div className="wrapper">
        <div className="student-marks">
          <div className="title-container">
            <h3>YOUR Perfomance</h3>
          </div>

          {marksCard.length !== 0 && marksCard
            ? marksCard.map((item) => (
                <>
                  <div className="student-perfomance">
                    <div className="marksOne">
                      <label>{item.subject.name}:</label>
                      <progress
                        id="marks"
                        value={item.marks}
                        max="25"
                      ></progress>
                    </div>
                    <div className="marks-desc">
                      <p>
                        <AssessmentOutlined
                          style={{ verticalAlign: "text-bottom" }}
                        />{" "}
                        Total Marks Obtained: <span>{item.marks}</span>
                      </p>
                      <p>
                        <SupervisedUserCircle
                          style={{ verticalAlign: "text-bottom" }}
                        />{" "}
                        Teacher Assigned: <span>{item.teacher.name}</span>
                      </p>
                      <p>
                        <SummarizeOutlined
                          style={{ verticalAlign: "text-bottom" }}
                        />{" "}
                        Total Marks: <span>25</span>
                      </p>
                    </div>
                  </div>
                </>
              ))
            : 
            <div className="student-perfomance">
                    <div className="marksOne">
                    <label>Subject Name</label>
                      <progress
                        id="marks"
                        value="0"
                        max="25"
                      ></progress>
                    </div>
                    <div className="marks-desc">
                      <p>
                        <AssessmentOutlined
                          style={{ verticalAlign: "text-bottom" }}
                        />{" "}
                        Total Marks Obtained: <span>NA</span>
                      </p>
                      <p>
                        <SupervisedUserCircle
                          style={{ verticalAlign: "text-bottom" }}
                        />{" "}
                        Teacher Assigned: <span>NA</span>
                      </p>
                      <p>
                        <SummarizeOutlined
                          style={{ verticalAlign: "text-bottom" }}
                        />{" "}
                        Total Marks: <span>25</span>
                      </p>
                    </div>
                  </div>
            }

          <StudentReport totalmark={totalmarks} subject={allSubject} />
        </div>
      </div>
    </div>
  );
};

export default Marks;
