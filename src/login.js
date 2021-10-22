import {useState} from 'react'
import { getAuth, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
  } from "firebase/auth";
 import './login.css'
 import ForgotPassword from './forgotPass';
import InputField from './inputField';


export default function Login({email, pass,setEmail, setPass,setUser}){
    const [forgotPass, setForgotPass]=useState(false)
    const [signUp, setSingUp]=useState(false)
    const [username, setUsername]=useState('')
    const [usernameError,setUsernameError]=useState('')
    const [requestError,setReqErr]=useState('')
    const [emailError,setEmailError]=useState('')
    const [passError,setPassError]=useState('')
    
   function emptyFieldvalidation(){
       if(!email){setEmailError('input Required')}
       if(!pass){setPassError('input Required')}
       if(!username){setUsernameError('input Required')}
       
   }
    function handleLogin(e){
        e.preventDefault()
        const auth = getAuth();
        
        if(signUp){
            
            emptyFieldvalidation()
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
                setUsernameError('')
                setPassError('')
            setEmailError('')
                const errorCode = error.code;
                const errorMessage = error.message;
                
                switch(errorCode){
                    case 'auth/weak-password':
                        setPassError(errorMessage)
                        break
                    case 'auth/email-already-in-use':
                            setEmailError(errorMessage)
                            break
                }
               
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
                    break
                    case   'auth/internal-error':
                        setReqErr(errorMessage)
                        break
    

            }
            
        });}
      }

   

      
    return (
            (forgotPass)
                ?(<ForgotPassword 
                    email={email}
                    setEmail={setEmail}
                    setForgotPass={setForgotPass}
                    setEmailError={setEmailError}
                    emailError={emailError}
               />)
                :(<form onSubmit={handleLogin} className='signUp'>
            <div> <span class='error'>{requestError}</span></div>

            {(signUp)

            ?(  <InputField 
                label='Username'
                type='text' 
                id='name' 
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                error={usernameError}
                />)
            :''}
            
            <InputField 
                label='Email'
                type='text' 
                id='email' 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
                error={emailError}/>
           
           <InputField 
                label='Password'
                type='password' 
                id='password' 
                value={pass} 
                onChange={(e)=>setPass(e.target.value)}
                error={passError}/>

            <InputField type='submit' 
                id='submit' 
                value={signUp ?'sign up':'sign in'}/>
              
            <div>
                <button onClick={(e)=>{setForgotPass(true)}}>Forgot Password?</button>
            </div>
            <div>
                <p> Already have an account? <span class='singUp-toggle' onClick={()=>setSingUp(!signUp)}>{!signUp ?'Sign Up':'Sign In'}</span></p>
            </div>
           
            </form>)
            )
        }