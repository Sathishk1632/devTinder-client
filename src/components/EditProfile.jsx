import React, { useState } from 'react'
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
    <div>
        {user && (
    
      <div className="flex my-20">
        <div className="card w-96 bg-base-100 shadow-xl border-2 border-blue-200">
            <div className="card-body items-center text-center">
                <h1 className="card-title">My Profile</h1>
                <div>

                    <input type="text" value={firstName} placeholder="First Name" className="input input-bordered input-warning w-full max-w-xs mt-5" onChange={(e)=>setFirstName(e.target.value)}/>
                    
                    <input type="text" value={lastName} placeholder="Last Name" className="input input-bordered input-warning w-full max-w-xs mt-5" onChange={(e)=>setLastname(e.target.value)}/>
                    
                    <input type="number" value={age} placeholder="Age" className="input input-bordered input-warning w-full max-w-xs mt-5" onChange={(e)=>setAge(e.target.value)}/>

                    <input type="text" value={about} placeholder="Bio" className="input input-bordered input-warning w-full max-w-xs mt-5" onChange={(e)=>setAbout(e.target.value)}/>

                    <input type="text" value={gender} placeholder="Gender" className="input input-bordered input-warning w-full max-w-xs mt-5" onChange={(e)=>setGender(e.target.value)}/>

                    <input type="text" placeholder="Skills" value={skills} className="input input-bordered input-warning w-full max-w-xs mt-5" onChange={(e)=>setSkills(e.target.value)}/>

                    {/* <input type="text" placeholder="PhotoUrl" value={photoUrl} className="input input-bordered input-warning w-full max-w-xs mt-5" onChange={(e)=>setPhotoUrl(e.target.value)}/> */}
                    <div className='mt-4'>
                    <label className='text-left mt-4'>Profile pic :</label>
                    <input type="file" onChange={onFileChange} placeholder='Profil picture'/>
                    </div>
                    
                </div>
                <div className="card-actions mt-5">
                    <button className="btn btn-success w-fit" onClick={handleUpdateProfile}>Save Profile</button>
                    <ToastContainer />
                </div>
            </div>
        </div>
        <div>
      <UserCard user={user}/>
        </div>
    </div>)
          }
    </div>
  )
}

export default EditProfile