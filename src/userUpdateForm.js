export default function UpdateForm({first,last,dob,country,state,city,pincode,address1,address2,
setAddress1,setAddress2,setCity,setCountry,setDob,setFirst,setLast,setPincode,setState,
user,imgUrl,handleUpdate,onImageChange,copyData,setUserData}){
    return(<>
    <form className='update-form' onSubmit={handleUpdate} >
     <center >
      {(imgUrl)
      ?<img className='img' src={imgUrl} alt='profile picture'/>
      :<div className='img'>
        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'/>
        </div>}
      
      <label>update profile picture</label>
      <input  type='file' name='profile' id='profile' accept=".jpg, .jpeg, .png"  onChange={onImageChange}/>
    </center>
       <div>
       <div className='flex space-between'>
       <div className='mr-10'>
         <label htmlFor='firstname'>First name</label>   
       <input type='text' id='firstname' value={first} onChange={(e)=>setFirst(e.target.value)}/></div>

       <div className='ml-10'>
         <label htmlFor='lastname'>Last name</label>   
       <input type='text' id='lastname' value={last} onChange={(e)=>setLast(e.target.value)}/></div>
       </div>
       </div>
       <div></div>

       <div>
         <label>Date Of Birth</label>
       <input type='date' value={dob} onChange={(e)=>setDob(e.target.value)}/>
       </div>
       <h2>Address</h2>
       <div>
      
       <div>
         <label htmlFor='line1'>line 1</label>   
       <input type='text' id='line1' value={address1} onChange={(e)=>setAddress1(e.target.value)}/>
       </div> 

       <div>
         <label htmlFor='line2'>line 2</label>   
       <input type='text' id='line2' value={address2} onChange={(e)=>setAddress2(e.target.value)}/>
       </div>
       <div>
         <label htmlFor='country'>Country</label>   
       <input type='text' id='country' value={country} onChange={(e)=>setCountry(e.target.value)}/>
       </div>
       <div>
         <label htmlFor='state'>State</label>   
       <input type='text' id='state' value={state} onChange={(e)=>setState(e.target.value)}/>
       </div>
      <div className='flex space-between'>
       <div className='mr-10'>
         <label htmlFor='city'>city</label>   
       <input type='text' id='city' value={city} onChange={(e)=>setCity(e.target.value)}/></div>

       <div className='ml-10'>
         <label htmlFor='pincode'>pincode</label>   
       <input type='text' id='pincode' value={pincode} onChange={(e)=>setPincode(e.target.value)}/></div>
       </div>
       </div>
       <div></div>
      
        <input type='submit' value='save profile' />
        {(copyData)
        ?<input type='button' value='cancle' onClick={()=>setUserData(copyData)}/>
      :''}
       


     </form></>)
}