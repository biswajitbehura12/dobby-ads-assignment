import React, { useState } from 'react'
import "./uploadimage.css";
import asyncPostCall from "../service.js";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';

function UploadImage() {
  const navigate = useNavigate();
    const [image,setImage]=useState({
        img:"",
        name:""
    })
    function convertToBase64(e){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload =()=>{
         setImage({
          ...image,img:reader.result
        })
      }
      reader.onerror =error =>{
        console.log("errr",error);
      }
    }
    let token="Bearer "+localStorage.getItem("token");
const UploadPost= async (e)=>{
  e.preventDefault();
    const req={
      image:image?.img,
      name:image?.name
    }
    if(!image?.img &&
      !image?.name){
        toast.warn("Please choose your image or fill the name");
        return;
      }
    const data= await asyncPostCall("/img/upload",{
      method: "POST",
            headers: {
              'Content-Type': 'application/json',
              authorization:token
              },
               body: JSON.stringify(req)
             
  });
  if(JSON.stringify(data) != {}){
    toast.success("Image upload sucesfully")
    setImage({
      img:"",name:""
    })
    navigate("/upload-img");

  }else{
    toast.error("Upload failed");
    return;
  }
}

  return (
    <div  className='create-container'>
        <div  className='upload-container'>
          <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Choose image: <input type='file' name='my-file'  onChange={(e)=>{
           convertToBase64(e)
          }} /></div>
         <div>Name: <input  type='text'  value={image?.name}  placeholder='enter the name of image' onChange={(e)=>{
setImage({
              ...image,name:e.target.value
            })
         }}/></div>
         <button className='save-btn'  onClick={(e)=>UploadPost(e)}>Upload</button>
         <button onClick={()=>{
            navigate("/upload-img");
         }}>Cancel</button>
        </div>
    </div>
  )
}

export default UploadImage;