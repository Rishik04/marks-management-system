import React, { useState } from "react";
import "./SubjectSubPage.scss";
import axios from "axios";

const SubjectSubPage = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);
  const clickHandler = () => {
    setShow(!show);
    console.log("clicked");
    const fetchDetails = async () => {
      try {
        const userList = await axios.get(
          "http://localhost:5000/student/get-student",
          { params: { dept: "CSE", year: 2 } }
        );
        console.log(userList.data.data);
        setUser(userList.data.data);
        console.log(user);
      } catch (err) {}
    };
    fetchDetails();
  };
  return (
    <div className="subPage">
      <div className="cards">
        <div className="cardOne">
          <div className="card-title">
            <h3>UPLOAD MARKS</h3>
          </div>
          <div className="marks-button">
            <button onClick={clickHandler}>CLICK HERE</button>
          </div>
        </div>
        <div className="cardOne">
          <div className="card-title">
            <h3>UPLOAD QUESTIONS</h3>
          </div>
          <div className="marks-button">
            <form action="">
              <div className="uploadQuestion">
                <input type="file" name="file_upload" />
                <button>UPLOAD</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {show && user.length !== 0 ? (
        <div className="studentsDetails">
          <div className="table-container">
            <table>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Roll</th>
                <th>Year</th>
                <th>Roll</th>
                <th>Marks</th>
              </tr>
              {user.map((item) => (
                <tr key={item._id}>
                  <td>1</td>
                  <td>{item.name}</td>
                  <td>{item.roll}</td>
                  <td>{item.year}</td>
                  <td>{item.department}</td>
                  <td>
                    <form action="">
                      <div className="marks-container">
                        <input type="number" name="marks"/>
                        <button>Submit</button>
                      </div>
                    </form>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          {/* {user.map((item) => (
            <div key={item._id} className="user-details">
              <span>1</span>
              <span>{item.name}</span>
              <span>{item.roll}</span>
              <span>{item.year}</span>
              <span>{item.department}</span>
              <form action="">
                <input type="text" name="marks" />
              </form>
            </div>
          ))} */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SubjectSubPage;
