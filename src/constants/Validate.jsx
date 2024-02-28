export const checkvaliddata =(email,password)=>{
const Isemailvalid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
const Ispasswordvalid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

if(!Isemailvalid)return "Email Id is not Valid"
if(!Ispasswordvalid)return "Password is not Valid"

return null;
}