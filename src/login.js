import {useState} from 'react'
import { getAuth, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
  } from "firebase/auth";
 import './App.css'
export default function Login({email, pass,setEmail, setPass}){

    const [signUp, setSingUp]=useState(true)
    const [username, setUsername]=useState('')

    function handleLogin(e){
        e.preventDefault()
        const auth = getAuth();

        if(signUp){
            createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        // ...
                        console.log('signUp success')
                        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log('errorMessage')
            });
            
        }
        else{
            signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log('login success')

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });}
      }

    return (

        <form onSubmit={handleLogin}>
            {(signUp)
            ?(<div>
                <label htmlFor='name'>Username</label>
                <input type='text' id='name' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>)
            :''}
            <div>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' value={pass} onChange={(e)=>setPass(e.target.value)}/>
            </div>
            
            <div>
                <input type='submit' id='submit' value={signUp ?'sign up':'sign in'}/>
            </div>
            <div>
                <p> Already have an account? <span class='singUp-toggle' onClick={()=>setSingUp(!signUp)}>{signUp ?'Sign Up':'Sign In'}</span></p>
            </div>
            </form>)
        }