import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const StudentLoginForm = () => {
    const [res,setRes] = useState("");
    const [login, setLogin] = useState("");
    const {handleSubmit, register} = useForm();
    const nav = useNavigate();

    const onSubmit = async (data) =>{
        console.log(data);
        try{
            const userRegister = await axios.post("http://localhost:5000/student/register", data);
            if(userRegister.data.status === 200){
                setRes(userRegister.data.data.msg)
            }
            if(userRegister.data.error){
                setRes(userRegister.data.error.message)
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const onSubmitLogin = async (data) =>{
        try{
            console.log(data);
            const loginUser = await axios.post("http://localhost:5000/student/login", data);
            console.log(loginUser.data);

            if(loginUser.data.status === 200){
                localStorage.setItem("user", JSON.stringify(loginUser.data.data));
                nav("/student");
            }
            if(loginUser.data.error){
                setRes(loginUser.data.error.message)
            }
        }
        catch(err){
            console.log(err)
        }
    }


    const loginPage =  (data) =>{
        console.log(data.target.id);
        setLogin(data.target.id);
    }

  return (
    <div>
      <div className="student-login-form">
        
        <p style={{background: "#fff", padding: 5}}>{res}</p>

        {login === "login" ? <form onSubmit={handleSubmit(onSubmitLogin)}>
        <h2>STUDENT LOGIN</h2>
          <div className="form-container">
            <div className="form-name">
              <label htmlFor="email">Email</label>
              <input type="text" placeholder="Email" {...register("email", {required: true})}/>
            </div>
            <div className="form-name">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Password" {...register("password", {required: true})}/>
            </div>
          </div>
          <div className="button-container" style={{display: "flex" ,justifyContent: "center"}}>
            <button id="register" onClick={loginPage}>Click here to register</button>
            <button type="submit">LOGIN</button>
          </div>
        </form>  :
        
        <form onSubmit={handleSubmit(onSubmit)}>
        <h2>STUDENT REGISTER</h2>
          <div className="form-container">
            <div className="form-name">
              <label htmlFor="name">Name</label>
              <input type="text" placeholder="Name" {...register("name", {required: true})} />
            </div>
            <div className="form-name">
              <label htmlFor="email">Email</label>
              <input type="text" placeholder="Email" {...register("email", {required: true})}/>
            </div>
            <div className="form-name">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Password" {...register("password", {required: true})}/>
            </div>
            <div className="form-name">
              <label htmlFor="roll">Roll</label>
              <input type="number" placeholder="Roll" {...register("roll", {required: true, valueAsNumber: true,})}/>
            </div>
            <div className="form-name">
              <label htmlFor="department">Department</label>
              <input type="text" placeholder="Department" {...register("department", {required: true})}/>
            </div>
            <div className="form-name">
              <label htmlFor="semester">Semester</label>
              <input type="number" placeholder="Semester" {...register("semester", {required: true, valueAsNumber: true,})}/>
            </div>
            <div className="form-name">
              <label htmlFor="number">Number</label>
              <input type="number" placeholder="9876543210" {...register("Number", {required: true, valueAsNumber: true,})}/>
            </div>
            <div className="form-name">
              <label htmlFor="year">Year</label>
              <input type="number" placeholder="Year" {...register("year", {required: true, valueAsNumber: true,})}/>
            </div>
          </div>
          <div className="button-container" style={{display: "flex" ,justifyContent: "center"}}>
            <button id="login" onClick={loginPage}>Click here to login</button>
            <button type="submit">REGISTER</button>
          </div>
        </form>}

      </div>
    </div>
  );
};

export default StudentLoginForm;
