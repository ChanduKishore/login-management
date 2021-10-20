 import firebase from './Firebase'
 import {useState, useEffect} from 'react'

 import { getAuth, 
          onAuthStateChanged, 
          signOut
        } from "firebase/auth";

import Login from './login'
import './App.css'



function App() {
 const [user, setUser]=useState('')
 const [email, setEmail]=useState('')
 const [pass, setPass]=useState('')

console.log(user)
 function authListener(){
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      setUser(user)
      setEmail('')
      setPass('')
    } else {
      // User is signed out
      setUser('')
      
    }
  });
 }

  

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

  useEffect(()=>{
    authListener()
  },[])
  return (<>
    {user 
    ?(
      <>
      <p>login successfull <button onClick={handleLogout}>logout</button></p>
      <p> user Email:{user.email}</p>
      
      </>
    ) 
    :(<Login 
      email={email}
      pass={pass}
      setEmail={setEmail}
      setPass={setPass}
      
    />)}
    </>
  );
}

export default App;
