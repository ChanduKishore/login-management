import { getAuth, 
    
    sendPasswordResetEmail,
    
  } from "firebase/auth";

export default function ForgotPassword({email,setEmail,forgotPass,setForgotPass}){
    
  console.log(forgotPass)
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
        <label htmlFor='email'>Email</label>
        <input id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type='submit' value='reset password'/>
    </form>
    </>)
}
