import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASEURL } from '../utils/Constants';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';


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
            dispatch(removeUser());
            return navigate("/login")
            
        } catch (error) {
            
        }
        
        
    }
    
  return (
    <div>
        <div className="navbar bg-blue-100">
        <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl text-black">.Connect</a>
        </div>
        {user && ( <div className="flex gap-2">
            <p className="px-4 text-black">Welcome {user.firstName}</p>
        <div className="dropdown dropdown-end items-center">
           
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            
                <div className="w-10 rounded-full">
                <img src={user.photoUrl}/>
                </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                </a>
                </li>
                <li><a>Settings</a></li>
                <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
            </div>
        </div>)}
        </div>
</div>
  )
}

export default NavBar