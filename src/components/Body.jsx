import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASEURL } from '../utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData=useSelector((store)=>store.user)
  const fetchUser=async ()=>{
    try {
      const user= await axios.get(BASEURL+"/profile/view",{withCredentials:true});
      dispatch(addUser(user.data))
    } catch (error) {
      if(error.status==401){
        console.log("Please Login...");
      }
      navigate("/login")
    }
  }
  useEffect(()=>{
    if(!userData){
      fetchUser();
    }
    
  },[])

  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body