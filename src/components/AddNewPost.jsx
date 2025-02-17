import axios from 'axios';
import React, { useState } from 'react';
import { BASEURL } from '../utils/Constants';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddNewPost = () => {
  const navigate=useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleNewPost = async () => {
    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('caption', caption);

    try {
      const res = await axios.post(`${BASEURL}/user/newPost`, formData, { withCredentials: true });
      if(res){
        toast.success("Post Uploaded....")
        setTimeout(()=>{
          navigate('/profile')
        },2000)
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='flex my-40 justify-center items-center'>
      <div className="card glass w-96">
        <div className='flex justify-center items-center mt-4'>
          {selectedImage && (
            <div>
              <img src={URL.createObjectURL(selectedImage)} alt="Preview" style={{ maxWidth: '225px', height: '225px' }} />
            </div>
          )}
        </div>
        <figure className='mt-10'>
          <input type="file" className="file-input w-full max-w-xs" onChange={handleImageUpload} />
        </figure>
        <div className="card-body">
          <input type="text" value={caption} placeholder="Add caption to Post" className="input input-bordered w-full max-w-xs" onChange={(e) => setCaption(e.target.value)} disabled={!selectedImage} />
          <div className="card-actions justify-end">
            <button className="btn btn-primary" disabled={!selectedImage || !caption} onClick={handleNewPost}>Post</button>
            <ToastContainer/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewPost;
