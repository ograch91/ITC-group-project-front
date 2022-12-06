import { useRef } from "react";
import { Button } from "@mui/material";
import styles from "./SettingsForm.module.css"

export const SettingsForm = () => {

  // const passwordChk = useRef(null);
  const hiddenFileInput = useRef(null);


  // const checkPassword = (e) =>{
  //   passwordChk.current() = e ;
  //   // 
  //   if(e === passwordstate){
  //     return setPasswordState(e)
  //   }

  //   return "retype passwords dont match"
  // }


  const handleUploadBtn = (e) => {
    e.preventDefault(); 
    // setUserInformation((userInformation) => {
    //   return { ...userInformation, images: null };
    // });
    hiddenFileInput.current.click();
  };


  const handleUpload = (e) => {
    const fileUploaded = e.target.files[0];
    console.log("upload", fileUploaded);
    // setUserInformation((userInformation) => {
    //   return { ...userInformation, images: fileUploaded };
    // });
  };



    const handleSubmit =(e)=>{
      e.preventDefault();
      // setIsError((isError)=>{return{...isError,
      //   state:true,
      //   text:"Settings Saved",
      // }});
    }

    //use put to edit user
  return (
    <form className={styles.SettingsForm}>
    <label>User Information</label>
    <div className={styles.row}>
      <span>Change user name</span>
      <input></input>
      {/* <input value={userInformation.firstName} onChange={(e)=>setUserInformation((userInformation)=> {return {...userInformation, firstName:e.target.value}})}></input> */}
    </div>
    <div className={styles.row}>
      <span>Change email</span>
      <input type='email'></input>
      {/* <input type="email" value={userInformation.email} onChange={(e)=>setUserInformation((userInformation)=> {return {...userInformation, email:e.target.value}})}></input> */}
    </div>
    <div className={styles.row}>
      <span>Change password</span>
      <input
      //  ref={passwordChk}
      // onChange={checkPassword}
      ></input>
      {/* <input value={userInformation.password} onChange={(e)=>setUserInformation((userInformation)=> {return {...userInformation, password:e.target.value}})}></input> */}
    </div>
    <div className={styles.row}>
      <span>Confirm password</span>
      <input></input>
      {/* <input type="string" value={userInformation.phoneNumber} onChange={(e)=>setUserInformation((userInformation)=> {return {...userInformation, phoneNumber:e.target.value}})}></input> */}
    </div>
    {/* <textarea value={userInformation.bio} onChange={(e)=>setUserInformation((userInformation)=> {return {...userInformation, bio:e.target.value}})}></textarea> */}
    {/* for testing purposes admin toggle */}
    <input    type="file"
              ref={hiddenFileInput}
              onChange={handleUpload}
              style={{ display: "none" }}/>
    <Button  onClick={handleUploadBtn}>UploadPicture</Button>
    <Button  onClick={handleSubmit}>Submit</Button>
    </form>
  )
}
