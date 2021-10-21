import { getAuth, signOut, updateProfile} from "firebase/auth";
import { doc,getFirestore, setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage";
import {useState,useEffect} from 'react'
import UpdateForm from "./userUpdateForm";
import Profile from "./profile";
import './App.css'

export default function Dashboard({user,setUser}){
    const[copyData,setData]=useState('')
    const [userData,setUserData]=useState('')
    const [imgUrl, setImgUrl]=useState('')
    const [first, setFirst]=useState('')
    const [last, setLast]=useState('')
    const [dob, setDob]=useState('')
    const [address1, setAddress1]=useState('')
    const [address2, setAddress2]=useState('')
    const [country, setCountry]=useState('')
    const [state, setState]=useState('')
    const [city , setCity]=useState('')
    const [pincode , setPincode]=useState('')
    const [image,setImage]=useState(null)
    
    
    const db = getFirestore();
    
    

    function handleLogout(){
        const auth = getAuth();
    signOut(auth).then(() => {
      setUser('')
      
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log(error.message)
    });
}

function onImageChange(e) {
  const reader = new FileReader()

  let file=e.target.files[0]
  if(file){
    reader.onload=()=>{
      if (reader.readyState===2){
        console.log(file);
        setImage(file);
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }else{
    setImage(null)
  }
}
async function updateProfile(e){
  const storage = getStorage();
const storageRef = ref(storage, 'users')
const imageRef =ref(storageRef,user.uid)
uploadBytes(imageRef, image).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});

}

async function uploadData(){
  const data={
    first: first,
    last: last,
    Dob:dob,
    addresss_Line1:address1,
    addresss_Line2:address2,
    country:country,
    state:state,
    city:city,
    pincode:pincode,
}
  const docRef = await setDoc(doc(db, "users",user.uid), data );
console.log("Document written with ID: ", user.uid);
setUserData(data)
}

function handleUpdate(e){
  e.preventDefault()

  uploadData().catch(e=>{console.log(e.message)})

  updateProfile(e)
  
  
}


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

async function getData(){
  const docRef = doc(db, "users", user.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  const data=docSnap.data()
  setUserData(data)
  console.log("Document data:", data);
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
  setUserData('')
}
}

useEffect(()=>{
getData()
},[user])


    return(<>
    <nav >
        <h2>dashboard</h2>
        <div className='flex'>
            <span>{user.displayName} |</span>
        <button onClick={handleLogout}>logout</button>
        
        </div>
    </nav>
    
    {(userData) 
    ?(<Profile userData={userData}
    setUserData={setUserData}
    setData={setData}
    imgUrl={imgUrl}/>
    )
    :(<UpdateForm 
     first={first}
     last={last}
     dob={dob}
     address1={address1}
     address2={address2}
     country={country}
     state={state}
     city={city}
     pincode={pincode}
     setFirst={setFirst}
     setLast={setLast}
     setAddress1={setAddress1}
     setAddress2={setAddress2}
     setDob={setDob}
     setCountry={setCountry}
     setState={setState}
     setCity={setCity}
     setPincode={setPincode}
     imgUrl={imgUrl}
     handleUpdate={handleUpdate}
     onImageChange={onImageChange}
     copyData={copyData}
     setUserData={setUserData}
     />)}

      </>)
}