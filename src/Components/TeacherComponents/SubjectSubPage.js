import React, { useState } from "react";
import "./SubjectSubPage.scss";
import axios from "axios";
import {useForm} from 'react-hook-form'

const teacherId = "6469f54f0dbe71380ebc022f";
const SubjectSubPage = ({sem, year, dept,subject}) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);

  const {register, handleSubmit} = useForm();

  const onSubmitForm = async data =>{
    for(const key in data){
      const id = key.split("-")[1];
      const formData = {"student": id, teacher: teacherId, marks: data[`marks-${id}`], subject};

      const addMarks = await axios.post('http://localhost:5000/teacher/addmarks', formData);
      console.log(addMarks); 
      // console.log(formData)

    } 
    // const formData = {...data}
  }


  const clickHandler = () => {
    setShow(!show);
    console.log("clicked");
    const fetchDetails = async () => {
      try {
        const userList = await axios.get(
          "http://localhost:5000/student/get-student",
          { params: { dept: dept, year: year, sem: sem, sub: subject } }
        );
        if(userList.status === 200){
          console.log(userList.data.data);
          setUser(userList.data.data);
          console.log(user);
        }
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
                {/* <input type="file" name="file_upload" /> */}
                <button>UPLOAD</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {show && user.length !== 0 ? (
        <div className="studentsDetails" key={user._id}>
          <div className="table-container">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <table>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Roll</th>
                <th>Year</th>
                <th>Dept</th>
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
                      <div className="marks-container">
                        {item.marks.filter(x=>x.subject === subject).length !==0 ?  
                          item.marks.filter(x=>x.subject === subject)[0].marks :
                        <input type="number" {...register(`marks-${item._id}`, {required: true, min: 0, max: 25})} id={item._id} key={item._id} /> }
                      </div>
                  </td>
                </tr>
              ))}
            </table>
              <button type="submit">Submit</button>
              </form>
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
