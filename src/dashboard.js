import { getAuth, signOut, updateProfile} from "firebase/auth";
import { doc,getFirestore, setDoc,getDoc} from "firebase/firestore";
import {useState,useEffect} from 'react'
import UpdateForm from "./userUpdateForm";
import Profile from "./profile";
import './App.css'


function Nav({user,handleLogout}){
  const [windowWidth, setWidth]=useState(window.innerWidth)
  window.addEventListener('resize',()=>{setWidth(window.innerWidth)})
  console.log(window.innerWidth)
  return(<nav >
    <h2>dashboard</h2>
    <div className='flex'>
       {(windowWidth < 400)? <span>{user.displayName.slice(0,10)}{(user.displayName.length >10)?'...':''} |</span>
       :<span>{user.displayName}|</span>}
    <button onClick={handleLogout}>logout</button>
    
    </div>
</nav>)
}
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
    
    
    console.log('image',imgUrl)
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

      const setDataFields=[setFirst,setLast,setDob,setAddress1,setAddress2,setCountry,setState,setCity,setPincode]
      const inputFields=['first','last','Dob','address_Line1','address_Line2','country','state','city','pincode']
      
      function AutoFillData(){
      setDataFields.forEach((field,index)=>field(copyData[inputFields[index]]))
      }
      


  


async function getData(){
  const docRef = doc(db, "users", user.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  const data=docSnap.data()
  setUserData(data)
  setData(data)
  console.log("Document data:", data);
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
  setUserData('')
  setData('')
}
}

useEffect(()=>{
getData()
},[user])


    return(<>
    
        <Nav user={user} handleLogout={handleLogout}/>
    {(userData) 
    ?(<Profile userData={userData}
    setUserData={setUserData}
    AutoFillData={AutoFillData}
    imgUrl={imgUrl}
    setImgUrl={setImgUrl}
    user={user}/>
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
     copyData={copyData}
     user={user}
     setUserData={setUserData}
     setData={setData}
     />)}

      </>)
}