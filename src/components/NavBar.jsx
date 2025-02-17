import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASEURL } from '../utils/Constants';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
import { removeAllFeed, removeFeed } from '../utils/feedSlice';

import Login from './Login';
import { removeConnections } from '../utils/connectionSlice';
import { removeAllRequests, removeRequests } from '../utils/requestsSlice';


const NavBar = () => {
    const user=useSelector((store)=>store.user);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    // const handleLogout =async() => {
    //     try {
    //         const res=await axios.get(BASEURL+"/auth/logout",{},{withCredentials:true});
    //         console.log("Logged out Succesfully....");
            
    //         navigate("/login")
    //     } catch (error) {
    //         console.log("ERROR : ",error.message);
    //     }
    // };
    async function handleLogout(){
        try {
            console.log("Logging Out....");
            await axios.get(BASEURL+"/auth/logout",{withCredentials:true});
            dispatch(removeConnections());
            dispatch(removeAllRequests());
            dispatch(removeAllFeed());
            dispatch(removeUser());
            navigate("/")
        } catch (error) {
            
        }
        
        
    }
    
    
  return (
    <div className='w-full fixed top-0 bg-base-100 text-white border-b border-gray-600 bg-gray-800'>
        <div className='flex justify-between items-center pl-5'>
        <div>
        <Link to="/feed" className="btn btn-ghost normal-case text-xl">.Connect</Link>
        </div>
        <div className='self-end'>
        {user && ( <div className="flex items-center pr-2">
        <p className='pr-3'>Welcome {user && user?.firstName}</p> 
        <div className="dropdown dropdown-end items-center">
           
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            
                <div className="w-10 rounded-full">
                <img src={user.photoUrl||"https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"}/>
                </div>
            </label>
            <ul tabIndex={0} className=" text-white mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                <Link to="/profile" className="justify-between">
                    Profile
                </Link>
                </li>
                <li><Link to="/connections">Connections</Link></li>
                <li><Link to="/requests">Requests</Link></li>
                <li><Link to="/newPost">Add Post</Link></li>
                <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
            </div>
        </div>)}
        </div>
        </div>
        
        {/* <div className="flex w-full bg-blue-100">
        <div className="flex">
            <Link to="/feed" className="btn btn-ghost normal-case text-xl text-black">.Connect</Link>
        </div>
        {user && ( <div className="flex">
        <p className=" text-black">Welcome {user && user?.firstName}</p> 
        <div className="dropdown dropdown-end items-center">
           
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            
                <div className="w-10 rounded-full">
                <img src={user.photoUrl||"https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"}/>
                </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                <Link to="/profile" className="justify-between">
                    Profile
                </Link>
                </li>
                <li><Link to="/connections">Connections</Link></li>
                <li><Link to="/requests">Requests</Link></li>
                <li><Link to="/newPost">Add Post</Link></li>
                <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
            </div>
        </div>)}
        </div> */}
</div>

  )
}

export default NavBar