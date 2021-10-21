export default function InputField({type,id,label,value,onChange,error}){
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