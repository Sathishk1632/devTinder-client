import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASEURL } from '../utils/Constants'
import { addUser } from '../utils/userSlice'


const EditProfile = () => {
  const user=useSelector((data)=>data.user)
  const dispatch=useDispatch();
    const [firstName,setFirstName]=useState(user.firstName)
    const [lastName,setLastname]=useState(user.lastName)
    const [age,setAge]=useState(user.age)
    const [about,setAbout]=useState(user.about)
    const [gender,setGender]=useState(user.gender)
    const [skills,setSkills]=useState(user.skills)
    const [photoUrl,setPhotoUrl]=useState(user.photoUrl);
    const [selectedFile, setSelectedFile] = useState(null);
    
    const onFileChange = event => {
      setSelectedFile(event.target.files[0]);
    };

    const handleUpdateProfile=async()=>{
      console.log("Updating profile");
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName',lastName);
      formData.append('age',age);
      formData.append('about',about);
      formData.append('gender',gender);
      formData.append('photoUrl',photoUrl);
      formData.append('skills',skills);
      formData.append('image',selectedFile)
      try {
        const updatedUser=await axios.patch(BASEURL+"/profile/edit",formData,{withCredentials:true});
        toast.success("Profile Saved...")
        if(updatedUser){
          dispatch(addUser(updatedUser.data));
        }
        
      } catch (error) {
        toast.error(error.response.data)
      }
    }
    
   
    
  return (
    <div className='bg-gray-800 p-10 rounded'>
        {user && (
            <div className="flex flex-col">
                      <h1 className='text-center text-3xl'>My Profile</h1>
                    <div className='self-center mt-5'>
                    <div className="avatar w-40">
                        <div className="rounded-full">
                          <img src={user.photoUrl||"https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"}/>
                        </div>
                    </div>
                    </div>
                    <div className='mt-5'>
                      <label>First Name</label><br />
                      <input type="text" value={firstName} placeholder="First Name" className="input input-bordered input-warning w-full max-w-xs" onChange={(e)=>setFirstName(e.target.value)}/>
                    </div>
                    <div className='mt-5'>
                      <label>Last Name</label><br />
                      <input type="text" value={lastName} placeholder="Last Name" className="input input-bordered input-warning w-full max-w-xs " onChange={(e)=>setLastname(e.target.value)}/>
                      </div>
                    <div className='mt-5'>
                      <label>Age</label><br />
                      <input type="number" value={age} placeholder="Age" className="input input-bordered input-warning w-full max-w-xs" onChange={(e)=>setAge(e.target.value)}/>
                      </div>
                    <div className='mt-5'>
                      <label>About</label><br />
                      <input type="text" value={about} placeholder="Bio" className="input input-bordered input-warning w-full max-w-xs" onChange={(e)=>setAbout(e.target.value)}/>
                      </div>
                    <div className='mt-5'>
                      <label>Gender</label><br />
                      <input type="text" value={gender} placeholder="Gender" className="input input-bordered input-warning w-full max-w-xs" onChange={(e)=>setGender(e.target.value)}/>
                      </div>
                    <div className='mt-5'>
                      <label>Skills</label><br />
                      <input type="text" placeholder="Skills" value={skills} className="input input-bordered input-warning w-full max-w-xs " onChange={(e)=>setSkills(e.target.value)}/>
                    </div>
                    {/* <input type="text" placeholder="PhotoUrl" value={photoUrl} className="input input-bordered input-warning w-full max-w-xs mt-5" onChange={(e)=>setPhotoUrl(e.target.value)}/> */}
                    <div className='mt-4'>
                    <label className='text-left mt-4'>Profile pic :</label><br />
                    <input type="file" onChange={onFileChange} placeholder='Profil picture'/>
                    </div>
                    
                
                <div className="card-actions mt-5 self-center">
                    <button className="btn btn-success w-fit" onClick={handleUpdateProfile}>Save Profile</button>
                    <ToastContainer />
                </div>
           
    </div>)
     }
    </div>
  )
}

export default EditProfile;