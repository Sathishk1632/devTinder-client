import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useEffect } from 'react'
import axios from 'axios'
import { BASEURL } from '../utils/Constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'


const Body = () =>{
  const dispatch=useDispatch();
  const fetchUser=async()=>{
    console.log("Getting user....");
    const userdata=await axios.get(BASEURL+"/profile/view",{withCredentials:true});
    console.log("UserData : ",userdata.data);
    dispatch(addUser(userdata.data))
  }
  useEffect(()=>{
    fetchUser();
  })
  return (
    <div className='bg-transparent'>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body;