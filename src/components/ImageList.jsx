import React, { useEffect, useMemo, useState } from 'react'
import "./Imagelist.css";
import asyncPostCall from "../service.js";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';

function ImageList({setToken}) {
    const navigate = useNavigate();
    const [getImageData,setGetImageData]=useState([]);
    const [serach,setSerach]=useState("");
    console.log(getImageData);
    let token="Bearer "+localStorage.getItem("token");
    const getImageRes= async()=>{
        const data= await asyncPostCall("/img/get-all-upload",{
            method: "POST",
                  headers: {
                    'Content-Type': 'application/json',
                    authorization:token
                    },
                     body: JSON.stringify({
                        search:serach
                     })
                   
        });

        if (data?.length >= 0) {
            setGetImageData(data);
            toast.success("Data feching suceefully")
          } else {
            toast.error("server error please try again")
            return;
          }
    }

    useEffect(()=>{
        getImageRes();
    },[serach])

    // useMemo(()=>{
    //     getImageRes();
    // },[serach])

    const handleLogout = () => {
        localStorage.removeItem("token");
       
        setToken("");
        navigate("/");
    
      }

  return (
    <div className='ImageContainer'>
    <button  className='upload-button-01'  onClick={()=>{
navigate("/upload-img-a");
    }}>Click Upload New Image</button>
    <div  className='ImageContainer-01'>
   Search :<input  type='text' placeholder='seraching here' className='serach-box' onChange={(e)=>{
    setSerach(e.target.value)
   }}/>
   <div className='list-container'>
   {
    getImageData?.map((item,index)=>{
return(
    <div className='card-container'  key={index}>
        <img src={item?.image} alt='imgs' className='img-co'/>
         <h4> Name: {item?.name}</h4>
       </div>
)
    })
    
   }
      
   </div>
    </div>
    <button className='logout-btn' onClick={handleLogout}>LogOut</button>
    </div>
  )
}

export default ImageList;