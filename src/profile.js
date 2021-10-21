export default function Profile({userData,imgUrl,setUserData, setData}){
    function handleEdit(){
        setData(userData)
        setUserData('')
      }
    return(<>
        <center>
        <img className='img' src={imgUrl} alt='profile picture'/>
        <h2>{`${userData.first} ${userData.last}`}</h2>
        </center>
    
        <div className='update-form'>
        <div>
          Date of birth: {userData.Dob}
        </div>
        <div>
          Address: {`${userData.addresss_Line1} ${userData.addresss_Line2},
                      ${userData.state},${userData.city},${userData.pincode}`}
                    
        </div>
        <div>
          Country: {userData.country}
        </div>
        <input type='submit' value='Edit Profile' onClick={handleEdit}/> 
        </div>
        
        </>)
}