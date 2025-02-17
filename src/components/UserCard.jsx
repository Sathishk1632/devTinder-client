import axios from 'axios'
import React from 'react'
import { BASEURL } from '../utils/Constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
  const dispatch=useDispatch();
  const handleRequests=async(_id,status)=>{
    try {
      if(status=="INTERESTED"){
        const res=await axios.post(`${BASEURL}/request/send/${_id}/${status}`,{},{withCredentials:true});
      }
      dispatch(removeFeed(_id));
    } catch (error) {
      
    }
  }
  
    return (
  <div className='flex justify-center items-center my-24'key={user._id}>
  <div className="card bg-base-100 w-96 shadow-xl" >
    {/* <img src={user.photoUrl||"https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"} alt="" /> */}
  <figure>
    <img
      src={user.photoUrl||"https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"}
      alt={user.firstName} 
      height={96}
      />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {user.firstName+" "+user.lastName}
      <div className="badge badge-accent">Pro</div>
    </h2>
    <p>{user.about}</p>
    <div className="card-actions justify-end">
      <div className="btn btn-success" onClick={()=>{handleRequests(user._id,"INTERESTED")}}>Interested</div>
      <div className="btn btn-secondary" onClick={()=>{handleRequests(user._id,"IGNORED")}}>Ignore</div>
    </div>
  </div>
</div> 

{/* {user.map((person)=>(<div className="card bg-base-100 w-96 shadow-xl max-h-70" key={person._id}>
  <figure>
    <img
      src={person.photoUrl}
      alt={person.firstName} 
      height={100}/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {person.firstName+" "+person.lastName}
      <div className="badge badge-accent">Pro</div>
    </h2>
    <p>{person.about}</p>
    <div className="card-actions justify-end">
      <div className="btn btn-success">Interested</div>
      <div className="btn btn-secondary">Ignore</div>
    </div>
  </div>
</div>))} */}
    </div>
  )
}

export default UserCard;