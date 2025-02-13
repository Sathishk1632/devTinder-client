import React, { useEffect } from 'react'
import { BASEURL } from '../utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import axios from 'axios'
import UserCard from './UserCard'


const Feed = () => {
  const dispatch=useDispatch();
  const feed=useSelector((store)=>store.feed)

  const getFeed=async()=>{
    const res=await axios.get(BASEURL+"/user/feed",{withCredentials:true});
    dispatch(addFeed(res.data)); 
  }
  useEffect(()=>{
    getFeed();
  },[])


return (
    feed && feed.length>0?(
    <div className=" h-auto flex justify-center items-center my-10">
    <UserCard user={feed[0]}/>
    </div>
    ): (
      <p className='text-green-700 text-center my-20'>You have all Caught up in your Connections...</p>
    )
  )
}

export default Feed