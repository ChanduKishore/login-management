import { getAuth, 
    
    sendPasswordResetEmail,
    
  } from "firebase/auth";

  import InputField from "./inputField";
export default function ForgotPassword({emailError,email,setEmail,setForgotPass,setEmailError}){
    
     
    function sendResetPasswordLink(e){
       e.preventDefault()
       console.log('click')
       if(!email){
         setEmailError('input required')
       }else{
         setEmailError('')
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
          .then(() => {
            // Password reset email sent!
            console.log('email sent')
            setForgotPass(false)

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            switch(errorCode){
              case 'auth/invalid-email':
                  setEmailError(errorMessage)
                  break
              case 'auth/user-not-found':
                  setEmailError(errorMessage)
                  break
              
          }
            console.log(errorMessage)
          });
       }

      }
    return(<>
    <form onSubmit={sendResetPasswordLink}>
      <h2>Reset Password </h2>
        
        <InputField 
        label='Email'
        id='email' 
        value={email} 
        onChange={(e)=>setEmail(e.target.value)}
        error={emailError}/>
        <InputField 
        type='submit' 
        value='send reset password link'/>
    </form>
    </>)
}
