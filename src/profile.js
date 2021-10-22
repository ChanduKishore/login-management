

import {useEffect} from 'react'
import { getStorage, ref,getDownloadURL } from "firebase/storage";

export default function Profile({user,userData,imgUrl,setUserData, AutoFillData,setImgUrl}){
   
  function handleEdit(){
        setUserData('')
        AutoFillData()
      }
      console.log('imgurl',imgUrl,user.uid)

      useEffect(()=>{
 
        const storage = getStorage();
        getDownloadURL(ref(storage, `users/${user.uid}`))
        .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
      
        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
      
        // Or inserted into an <img> element
        setImgUrl(url)
       
      })
      .catch((error) => {
        // Handle any errors
        setImgUrl('')
        console.log(error.message)
      });
    },[user])
    return(<>
        <center>
        <img className='img' src={imgUrl} alt='profile picture'/>
        <h2>{`${userData.first} ${userData.last}`}</h2>
        </center>
    
        <div className='update-form'>
        <div>
          Date of birth: {userData.Dob}
        </div>
        <div>
          Address: {`${userData.address_Line1} ${userData.address_Line2},
                      ${userData.state},${userData.city},${userData.pincode}`}
                    
        </div>
        <div>
          Country: {userData.country}
        </div>
        <input type='submit' value='Edit Profile' onClick={handleEdit}/> 
        </div>
        
        </>)
}