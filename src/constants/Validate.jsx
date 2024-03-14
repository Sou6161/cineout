export const checkvaliddata =(email,password,fullname)=>{
const Isemailvalid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
const Ispasswordvalid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
// const Isfullnamevalid = /^[a-zA-Z ]{2,30}$/.test(fullname)

if(!Isemailvalid)return "Email Id is not Valid"
if(!Ispasswordvalid)return "Password is not Valid"
// if(!Isfullnamevalid) return "Name is not valid"

return null;
}