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
    if(feed) return;
    const res=await axios.get(BASEURL+"/user/feed",{withCredentials:true});
    dispatch(addFeed(res.data)); 
  }
  useEffect(()=>{
    getFeed();
  },[])

  return (
    feed && (
    // <div className=" h-auto flex justify-center items-center my-10">
    // <UserCard user={feed}/>
    // </div>

      feed.map(user => (
        <div className=" h-auto flex justify-center items-center my-10">
        <UserCard {...user}/>
        </div>
      ))
    )
  )
}

export default Feed