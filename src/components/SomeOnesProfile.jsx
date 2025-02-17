import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { BASEURL } from '../utils/Constants';

const SomeOnesProfile = () => {
    const [posts,setPosts]=useState([]);
   const location=useLocation();
   const { someuser } = location.state || {};
   console.log("Propvalue...: ",someuser);
   
   const getPosts=async()=>{
    try {
        const posts=await axios.get(`${BASEURL}/posts/getPosts/${someuser._id}`,{withCredentials:true});
        console.log("Posts : ",posts.data);
        setPosts(posts.data)
    } catch (error) {
        
    }
   }
    useEffect(()=>{
        getPosts();
    },[])
    
  return (
    <div className='mt-20 flex flex-col'>

        <div className='flex justify-center items-center border-b border-base-100  shadow-2xl bg-base-100'>
            <div className='mt-5'>
                    <div className="avatar w-40">
                        <div className="rounded-full">
                          <img src={someuser.photoUrl||"https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"}/>
                        </div>
                    </div>
            </div>
            <div className='pl-20'>
                <h1>{someuser.firstName+" "+someuser.lastName}</h1>
                <h2>{someuser.age}</h2>
                <h3>{someuser.about}</h3>
                <h4>{someuser.skills}</h4>
            </div>
        </div>
        <h1 className='text-4xl text-center font-semibold'>Posts</h1>
        <hr className="border-gray-800 w-3/4 self-center border-2 shadow-xl"/>
        <div className='flex flex-wrap justify-center items-center'>
        {posts && posts.map((post)=>(
            <div key={post._id} className=' w-60 h-80 mx-2 my-2 items-center justify-between bg-gray-700 rounded'>
            <div className='h-60 w-60 border-b border-gray-700'>
              <img className='h-60 w-60' src={post.data} alt=""/>
            </div>
            <div>
              <span>{post.description}</span>
            </div>
          </div>
        ))}
        </div>
        
    </div>
  )
}

export default SomeOnesProfile;