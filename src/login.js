import {useState} from 'react'
import { getAuth, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
  } from "firebase/auth";
 import './App.css'
export default function Login({email, pass,setEmail, setPass,setUser}){

    const [signUp, setSingUp]=useState(true)
    const [username, setUsername]=useState('')
    const [requestError,setReqErr]=useState('')
    const [emailError,setEmailError]=useState('')
    const [passError,setPassError]=useState('')

    function handleLogin(e){
        e.preventDefault()
        const auth = getAuth();

        if(signUp){
            setPassError('')
            setEmailError('')
            createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        updateProfile(auth.currentUser, {
                            displayName: username
                                                     
                        })
                         setUser({...user,displayName:username})
                        console.log('signUp success')
                        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                switch(errorCode){
                    case 'auth/invalid-email':
                        setEmailError(errorMessage)
                        break
                    case 'auth/weak-password':
                        setPassError(errorMessage)
                        break
                    case 'auth/email-already-in-use':
                            setEmailError(errorMessage)
                            break
                }
                console.log(errorCode)
                
                console.log(errorMessage)
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
            setPassError('')
            setEmailError('')
            const errorCode = error.code;
            const errorMessage = error.message;
            switch(errorCode){
                case 'auth/invalid-email':
                    setEmailError(errorMessage)
                    break
                case 'auth/user-not-found':
                    setEmailError(errorMessage)
                    break
                case 'auth/wrong-password':
                        setPassError(errorMessage)
                        break
                case   'auth/too-many-requests':
                    setReqErr(errorMessage)

            }
            console.log(errorCode,errorMessage)
        });}
      }

    return (

        <form onSubmit={handleLogin}>
            <div> <span class='error'>{requestError}</span></div>

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
            <div> <span class='error'>{emailError}</span></div>

            <div>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' value={pass} onChange={(e)=>setPass(e.target.value)}/>
            </div>
            <div> <span class='error'>{passError}</span></div>
            
            <div>
                <input type='submit' id='submit' value={signUp ?'sign up':'sign in'}/>
            </div>
            <div>
                <p> Already have an account? <span class='singUp-toggle' onClick={()=>setSingUp(!signUp)}>{!signUp ?'Sign Up':'Sign In'}</span></p>
            </div>
            </form>)
        }