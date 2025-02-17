import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASEURL } from '../utils/Constants';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const [emailId,setEmailId]=useState("sathishk1632@gmail.com");
    const [password,setPassword]=useState("Mahiway@07");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [isLoginForm,setIsLoginForm]=useState(true);
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
            navigate("/feed")
        } catch (error) {
            console.log(error);
            
            if(error.status==400){
                setError(error?.response?.data || "Something went wrong...")
            }
           
        }
    }

    const handleSignup=async()=>{
        try {
            const res=await axios.post(`${BASEURL}/auth/signup`,{
                firstName,
                lastName,
                emailId,
                password
            },{withCredentials:true})
            toast.success("Sign up Successfull.")
            dispatch(addUser(res.data))
            navigate("/profile")
        } catch (error) {
            
        }
    }

  return (
    <div className="flex justify-center items-center h-full my-40">
        <div className="card w-96 bg-gray-800 shadow-xl border-1 border-blue-200">
            <div className="card-body items-center text-center">
                <h1 className="card-title">{isLoginForm?"Login":"Sign Up"}</h1>
                <div>
                {!isLoginForm && <>< input type="text" value={firstName} placeholder="First Name" className="input input-bordered input-warning w-full max-w-xs mt-5" onChange={(e)=>setFirstName(e.target.value)}/>
               
                <input type="text" value={lastName} placeholder="Last Name" className="input input-bordered input-warning w-full max-w-xs mt-5" onChange={(e)=>setLastName(e.target.value)}/></>}

                <input type="text" value={emailId} placeholder="Email id" className="input input-bordered input-warning w-full max-w-xs mt-5" onChange={(e)=>setEmailId(e.target.value)}/>
               
                <input type="password" value={password} placeholder="Password" className="input input-bordered input-warning w-full max-w-xs mt-5" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <p>{error}</p>
                <div className="card-actions mt-5">
                    <button className="btn btn-success w-30" onClick={isLoginForm?handleLoginClick:handleSignup}>{isLoginForm?"Login":"Sign Up"}</button>
                    <ToastContainer/>
                </div>
                <p className="cursor-pointer hover:selection:" onClick={()=>{isLoginForm?setIsLoginForm(false):setIsLoginForm(true)}}>{isLoginForm?"New user ? Signup":"Already have an Account ? Login"}</p>
                
                {/* {isLoginForm && <p>New User ? <b onClick={setIsLoginForm(true)}>Sign Up</b></p>}
                {!isLoginForm && <p>Already Have an Account ? <b onClick={setIsLoginForm(false)}>Login</b></p>} */}
            </div>
        </div>
    </div>
  )
}

export default Login