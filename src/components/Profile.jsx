import React, { useEffect, useState } from 'react'
import EditProfile from './EditProfile'
import axios from 'axios';
import { BASEURL } from '../utils/Constants';

const Profile = () => {
  const [myPosts,setMysPosts]=useState([]);
  
  const getMyposts=async()=>{
    const data=await axios.get(`${BASEURL}/posts/getMyPosts`,{withCredentials:true})
    console.log("posts : ",data.data);
    setMysPosts(data.data)
  }
    
  useEffect(()=>{
getMyposts();
  },[])

  return (
    <div className="flex flex-col justify-center items-center my-20">
      <EditProfile/>
      <h1 className='pt-10 font-semibold text-2xl'>My Posts</h1>
      <div className='flex flex-wrap mt-10'>
        {
          myPosts?
            myPosts.map((post)=>(
              <div key={post._id} className=' w-60 h-80 mx-2 my-2 items-center justify-between bg-gray-700 rounded'>
                <div className='h-60 w-60 border-b border-gray-700'>
                  <img className='h-60 w-60' src={post.data} alt=""/>
                </div>
                <div>
                  <span>{post.description}</span>
                </div>
              </div>
            )):(<p className='my-10'>You haven't posted yet.....</p>)
        }
       
      </div>
      
    </div>
  )
}

export default Profile