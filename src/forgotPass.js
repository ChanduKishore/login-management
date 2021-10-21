import { getAuth, 
    
    sendPasswordResetEmail,
    
  } from "firebase/auth";

export default function ForgotPassword({email,setEmail,setForgotPass}){
    
  
    function sendResetPasswordLink(e){
       e.preventDefault()
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
            console.log(errorMessage)
          });

      }
    return(<>
    <form onSubmit={sendResetPasswordLink}>
      <h2>Reset Password </h2>
        <label htmlFor='email'>Email</label>
        <input id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type='submit' value='send reset password link'/>
    </form>
    </>)
}
