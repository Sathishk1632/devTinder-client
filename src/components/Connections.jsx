import axios from 'axios';
import React, { useEffect } from 'react';
import { BASEURL } from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { useNavigate } from 'react-router-dom';


const Connections = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.connections);
  const navigate=useNavigate();
  

  const fetchConnections = async () => {
    try {
      let connections = await axios.get(BASEURL + "/user/connections", { withCredentials: true });
      console.log(connections);
      dispatch(addConnections(connections.data));
    } catch (error) {
      console.error("Error fetching connections: ", error);
    }
  };

  function seeSomeOnesProfile(someuser){
    console.log("Clicked--->",someuser);
    navigate("/someonesprofile",{state:{someuser}})
    
  }

  const DisplayUser = () => {
    // Check if userData is an array and has elements
    if (!userData || userData.length === 0) {
      return <p className='text-red-600 text-center text-2xl my-20'>No connections available.</p>;
    }

    return (
      <div className='bg-base-100 flex flex-col justify-center items-center py-4'>
        {userData.map((user) => (
          <div className='flex justify-start bg-base-300 w-1/3 items-center shadow-white my-4 rounded cursor-pointer' key={user._id} onClick={()=>seeSomeOnesProfile(user)}>
            <div className="pl-4">
              <img src={user.photoUrl||"https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"} alt="" className='w-16 h-16 rounded-full' />
            </div>
            <div className="pl-10">
              <h1>{user.firstName+" "+user.lastName}</h1>
              <h2>{user.age}</h2>
              <h2>{user.about}</h2>
            </div>
          </div>
          
        ))}
      </div>
    );
  };

  useEffect(() => {
    fetchConnections();
  }, [dispatch]);

  return (
    <div className='my-5'>
      <h1 className='text-center text-3xl text-white justify-center'>Connections</h1>
      <DisplayUser />
    </div>
  );
};

export default Connections;
