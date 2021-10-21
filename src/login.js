import {useState} from 'react'
import { getAuth, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
  } from "firebase/auth";
 import './login.css'
 import ForgotPassword from './forgotPass';

function InputField({type,id,label,value,onChange,error}){
    return(<div>
    <label htmlFor={id}>{label}</label>
    <input 
    type={type} 
    id={id} 
    value={value} 
    onChange={onChange}/>
    <div> <span class='error'>{error}</span></div>
    </div>)
}

export default function Login({email, pass,setEmail, setPass,setUser}){
    const [forgotPass, setForgotPass]=useState(false)
    const [signUp, setSingUp]=useState(false)
    const [username, setUsername]=useState('')
    const [usernameError,setUsernameError]=useState('')
    const [requestError,setReqErr]=useState('')
    const [emailError,setEmailError]=useState('')
    const [passError,setPassError]=useState('')
    
   function emptyFeildvalidation(){
       if(!email){setEmailError('input Required')}
       if(!pass){setPassError('input Required')}
       if(!username){setUsernameError('input Required')}
       
   }
    function handleLogin(e){
        e.preventDefault()
        const auth = getAuth();
        
        if(signUp){
            
            emptyFeildvalidation()
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

            }
            
        });}
      }

   

      
    return (
            (forgotPass)
                ?(<ForgotPassword email={email}
                setEmai={setEmail}
                setForgotPass={setForgotPass}
               />)
                :(<form onSubmit={handleLogin} className='signUp'>
            <div> <span class='error'>{requestError}</span></div>

            {(signUp)
            ?(<>
                
                <InputField 
                label='Username'
                type='text' 
                id='name' 
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                error={usernameError}
                />
            
            
            </>)
            :''}
            
                <InputField 
                label='Email'
                type='text' 
                id='email' 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}/>
           
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
                <button onClick={(e)=>{setForgotPass(true)}}>Forgot Password?</button>
            </div>
            <div>
                <p> Already have an account? <span class='singUp-toggle' onClick={()=>setSingUp(!signUp)}>{!signUp ?'Sign Up':'Sign In'}</span></p>
            </div>
           
            </form>)
            )
        }