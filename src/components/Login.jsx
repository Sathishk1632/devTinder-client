import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASEURL } from '../utils/Constants';

const Login = () => {
    const [emailId,setEmailId]=useState("sathishk1632@gmail.com");
    const [password,setPassword]=useState("Mahiway@07");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [error,setError]=useState("");

    const handleLoginClick= async ()=>{
        try {
            const res=await axios.post(BASEURL+"/auth/login",{
                emailId,
                password
            },
        {
            withCredentials:true
        });
            dispatch(addUser(res.data));
            navigate("/")
        } catch (error) {
            console.log(error);
            
            if(error.status==400){
                setError(error?.response?.data || "Something went wrong...")
            }
           
        }
    }

  return (
    <div className="flex justify-center mt-10">
        <div className="card w-96 bg-base-100 shadow-xl border-2 border-blue-200">
            <div className="card-body items-center text-center">
                <h1 className="card-title">Login</h1>
                <div>
                <input type="text" value={emailId} placeholder="Email id" className="input input-bordered input-warning w-full max-w-xs mt-5" onChange={(e)=>setEmailId(e.target.value)}/>
               
                <input type="password" value={password} placeholder="Password" className="input input-bordered input-warning w-full max-w-xs mt-5" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <p>{error}</p>
                <div className="card-actions mt-5">
                    <button className="btn btn-success w-20" onClick={handleLoginClick}>Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login