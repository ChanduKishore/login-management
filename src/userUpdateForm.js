import InputField from "./inputField"
import {useState,useRef} from 'react'
import { doc,getFirestore,setDoc} from "firebase/firestore";
import { getStorage, ref,uploadBytes } from "firebase/storage";
export default function UpdateForm({first,last,dob,country,state,
                                    city,pincode,address1,address2,
                                    setAddress1,setAddress2,setCity,setCountry,
                                    setDob,setFirst,setLast,setPincode,setState,
                                    user,imgUrl,copyData,setUserData,setData}){

     const [image,setImage]=useState(null)
      const [firstError,setFirstError]=useState('')
      const [lastError,setLastError]=useState('')
      const [dobError,setDobtError]=useState('')
      const [line1Error,setLine1Error]=useState('')
      const [line2Error,setLine2Error]=useState('')
      const [countryError,setCountryError]=useState('')
      const [stateError,setStateError]=useState('')
      const [cityError,setCityError]=useState('')
      const [pincodeError,setPincodeError]=useState('')
      
      
    const db = getFirestore(); 
      function validateEmptyFields(){
        if(!first){setFirstError('input required')}
        if(!last){setLastError('input required')}
        if(!dob){setDobtError('input required')}
        if(!address1){setLine1Error('input required')}
        if(!address2){setLine2Error('input required')}
        if(!country){setCountryError('input required')}
        if(!state){setStateError('input required')}
        if(!city){setCityError('input required')}
        if(!pincode){setPincodeError('input required')}
      }
      
      const data={
        first: first,
        last: last,
        Dob:dob,
        address_Line1:address1,
        address_Line2:address2,
        country:country,
        state:state,
        city:city,
        pincode:pincode,
    }
      function onImageChange(e) {
        const reader = new FileReader()
      
        let file=e.target.files[0]
        if(file){
          reader.onload=()=>{
            if (reader.readyState===2){
              console.log(file);
              setImage(file);
            }
          }
        reader.readAsDataURL(e.target.files[0])
        }else{
          setImage(null)
        }
      }
    
      async function updateProfile(e){
        const storage = getStorage();
      const storageRef = ref(storage, 'users')
      const imageRef =ref(storageRef,user.uid)
      uploadBytes(imageRef, image).then((snapshot) => {
        console.log('image file uploaded');
        setUserData(data)
      });
      
      }
      async function uploadData(){
        
        const docRef = await setDoc(doc(db, "users",user.uid), data );
      console.log("Document written with ID: ", user.uid);
      setData(data)
      }
      
    function handleUpdate(e){
        
        e.preventDefault()
        
        if(!emptyFields.filter(field=>!field).length){
          if(image){
            updateProfile(e)
            uploadData().catch(e=>{console.log(e.message)})
          }
          else{
            uploadData()
            .then(()=>setUserData(data))
            .catch(e=>{console.log(e.message)})}
          console.log('form is  complete')
        }
        else{
          validateEmptyFields()
          console.log('form is notcomplete')
        console.log(emptyFields)}
        
        
        
      }
      
     const emptyFields=[first,last,dob,address1,address2,country,state,city,pincode]
     

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
    <section>
       <div className='flex space-between'> 
       <InputField
       className='mr-10'
       label='Firest name' 
       type='text' 
       id='firstname' 
       value={first} 
       onChange={(e)=>setFirst(e.target.value)}
       error={firstError}/>
  
       <InputField 
       className='ml-10'
        label='Last name' 
        type='text'  
        id='lastname' 
        value={last} 
        onChange={(e)=>setLast(e.target.value)}
        error={lastError}
        />
       </div>
       
         <InputField 
         id='dob'
         label='Date Of Birth' 
         type='date' 
         value={dob} 
         onChange={(e)=>setDob(e.target.value)}
         error={dobError}/>
      
       <h2>Address</h2>
       <div>
      
      
         <InputField  
         label='line 1'  
        type='text' 
        id='line1' 
        value={address1} 
        onChange={(e)=>setAddress1(e.target.value)}
        error={line1Error}/>
      

       
         <InputField  
         label='line 2'   
          type='text' 
          id='line2' 
          value={address2} 
          onChange={(e)=>setAddress2(e.target.value)}
          error={line2Error}/>
       
       
         <InputField  
         label='country'  
         type='text' 
         id='country' 
         value={country} 
         onChange={(e)=>setCountry(e.target.value)}
         error={countryError}/>
      
       
         <InputField  
         label='state' 
       type='text' 
       id='state' 
       value={state} 
       onChange={(e)=>setState(e.target.value)}
       error={stateError}/>
       
      <div className='flex space-between'>
      <InputField 
      className='mr-10' 
      label='city' 
       type='text' 
       id='city' 
       value={city} 
       onChange={(e)=>setCity(e.target.value)}
       error={cityError}
       />

       <InputField  
       label='pincode'
       className='ml-10'  
      type='text' 
      id='pincode' 
      value={pincode} 
      onChange={(e)=>setPincode(e.target.value)}
      error={pincodeError}/></div>
      
       </div>
       
        <InputField
         type='submit' 
         value='save profile' 
         
         />
        
        {(copyData)
        ?<input
        type='button' 
        value='cancle' 
        onClick={()=>setUserData(copyData)}/>
      :''}
       </section>
     </form></>)
}