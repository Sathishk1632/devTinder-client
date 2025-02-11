import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASEURL } from '../utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../utils/requestsSlice'

const Requests = () => {
  const dispatch=useDispatch();
  const req=useSelector((store)=>store.requests);
  
  const fetchRequests=async()=>{
    try {
      const requests=await axios.get(BASEURL+"/user/getRequests/recieved",{withCredentials:true});
      dispatch(addRequests(requests.data));
    } catch (error) {
      
    }
  }
  async function  reviewRequest(status,_id){
    try {
      console.log("REJECT : ",status,_id);
      
      const res=await axios.post(`${BASEURL}/request/review/${status}/${_id}`,{},{withCredentials:true});
      dispatch(removeRequests(_id));
    } catch (error) {
      
    }
  }

  const DisplayRequests=()=>{
    if(req==null || req.length==0){
      return (<p className='text-center text-red-600 text-2xl my-20'>No Requests have been Recieved...</p>)
    }
    else{
      return(
        <div className='bg-base-100 flex flex-col justify-center items-center py-4'>
        {req.map((r) => (
          <div className='flex justify-start bg-base-300 w-1/2 items-center shadow-white my-4 rounded' key={r._id}>
            <div className="pl-4">
              <img src={r.fromId.photoUrl} alt="" className='w-16 h-16 rounded-full' />
            </div> 
            <div className="pl-10">
              <h1>{r.fromId.firstName+" "+r.fromId.lastName}</h1>
              <h2>{r.fromId.age}</h2>
              <h2>{r.fromId.about}</h2>
            </div>
            <div className='flex items-center ml-auto mr-5'>
              <button className='btn btn-success mr-5' onClick={()=>reviewRequest("ACCEPTED",r._id)}>Accept</button>
              <button className='btn bg-red-600 ' onClick={()=>reviewRequest("REJECTED",r._id)}>Reject</button>
            </div>
          </div>
        ))}
      </div>
      )
    }
  }

  

  useEffect(()=>{
    fetchRequests();
  },[dispatch])

  return (
    <div className='my-5'>
      <h1 className='text-center text-3xl text-white justify-center'>Requests</h1>
    <DisplayRequests/>
    </div>
  )
}

export default Requests