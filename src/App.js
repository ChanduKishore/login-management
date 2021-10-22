 import firebase from './Firebase'
 import {useState, useEffect} from 'react'
 import Dashboard from './dashboard'
 import { getAuth, onAuthStateChanged, } from "firebase/auth";
import Login from './login'




function App() {
 const [user, setUser]=useState('')
 const [email, setEmail]=useState('')
 const [pass, setPass]=useState('')

console.log(user,user.displayName)

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


  useEffect(()=>{
    authListener()
  },[])


  return (<>
    {user 
    ?(
      <Dashboard user={user} setUser={setUser}/>
    ) 
    :(<Login 
      email={email}
      pass={pass}
      setEmail={setEmail}
      setPass={setPass}
      setUser={setUser}
      
    />)}
    </>
  );
}

export default App;
