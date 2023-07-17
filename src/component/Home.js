import React, { useState, useRef, useEffect } from 'react';
import userAvatar from "./avatar.png";
import {useSelector, useDispatch} from "react-redux";
import { update, showAlert, hideAlert } from "../reduxState/features/user/user";

const Home = () => {
  const dispatch = useDispatch();
  const loadedImg = useSelector(state=>state.user.loadedImg);
  const user = useSelector(state=>state.user.user);

  const [img, setImg] = useState(null);
  const imageFile = useRef(null);
  const imageContent = useRef(null);
  const submitButton = useRef(null);

useEffect(()=>{
const loadImage = async () => {

  try{
  const response = await fetch("http://localhost:8000/auth/user/getprofilepicture",{
    method:"GET",
    headers:{
      "jwt-token": localStorage.getItem("jwt-token")
    },
  });

  const contentType = response.headers.get('content-type');
  if (contentType.includes("image")) {
      const blob = await response.blob();
      const imgUrl = URL.createObjectURL(blob);
      return dispatch(update(imgUrl));
  } else if (contentType.includes("application/json")){
    const data = await response.json();
    return dispatch(update(data.picture));
  }
} catch(err){
  console.log("getprofilepicture", err)
}
};
  loadImage()
},[]);

const handleSubmit = async (e) => {
    e.preventDefault();
  try{
    if(img){
   const formData = new FormData();
      formData.append("picture", img)

    const url = "http://localhost:8000/auth/user/uploadpicture";
    const res = await fetch(url, {
      method:"POST",
      headers:{
        "jwt-token": localStorage.getItem("jwt-token"),
      },
      body:formData,
    });
    const data = await res.json();
    dispatch(showAlert(`${data.message},success`));
    setTimeout(()=>{
      dispatch(hideAlert());
    },2000);
    submitButton.current.style.display = "none";
    }
} catch(err){
  console.log("error from try catch Home.js", err)
}
}

const selectImage = () => {
  imageFile.current.click();
}

const showImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    imageContent.current.src = event.target.result;

  }
  reader.readAsDataURL(file);
  setImg(file)
  submitButton.current.style.display = "block";

}

  return (
    <>
    { user ?
      <div className='container d-flex justify-content-center align-item-center mt-5'>
        <div className="card" style={{width: "18rem"}}>

  <div className="position-relative">
  <img ref={imageContent} className="card-img-top avatarImage" onClick={selectImage} src={loadedImg?loadedImg:userAvatar} />
  <div  className="fw-bold fst-italic fs-5" onClick={selectImage}>Update Picture</div>
     <form onSubmit={(event)=>handleSubmit(event)} encType="multipart/form-data">
    <input onChange={(event)=>showImage(event)} className="d-none" ref={imageFile} type="file" id="imageFile" accept="image/*" name="picture"/>
     <input type="submit" ref={submitButton} className="btn btn-primary btn-sm w-100 submitButton" value='Submit' />
     </form>

    </div>

    <ul className="list-group list-group-flush">
      <li className="list-group-item">{user.user.name}</li>
      <li className="list-group-item">{user.user.email}</li>
    </ul>
      </div>
        </div>
      : <div>User Note find</div>
    }
    </>
  )
}

export default Home
