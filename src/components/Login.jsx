import React, { useRef, useState } from 'react'
import { checkvaliddata } from "../constants/Validate"

const Login = () => {

  const [Issigninform, setIssigninform] = useState(true)
  const [errormessage, seterrormessage] = useState(null)



  const email = useRef(null);
  const password = useRef(null)
  const fullname = useRef(null)



  const handlebuttonclick = () => {
    //  validate the form data
    
    const message = checkvaliddata(email.current.value, password.current.value)
    seterrormessage(message)





  }

  const togglesigninform = () => {
    setIssigninform(!Issigninform)

  }
  return (
    <div className=' w-screen h-screen  items-center justify-center flex   '>
      <img className=' absolute w-[100vw] h-[100vh] object-fit  ' src="https://images.purexbox.com/6c4ae5b99340c/1280x720.jpg"
        alt=" no image" />

      <form onSubmit={(e) => e.preventDefault()} className=" w-1/4 linear-gradient absolute p-12 bg-slate-500  my-36 mx-auto right-0 left-0 z-20 text-white bg-opacity-60 rounded-md">

        <h1 className=" font-bold text-white text-3xl py-5 mx-2">{Issigninform ? "Sign In" : "Sign Up"}</h1>

        {!Issigninform && (
          <input
ref={fullname}
            type="text"
            placeholder="Full Name"
            className=" p-3 m-2 w-full font-semibold bg-slate-800 rounded-md hover:bg-gray-700 " />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className=" p-3 m-2 w-full bg-slate-800 rounded-md  hover:bg-gray-700  " />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className=" p-3 m-2 w-full bg-slate-800 rounded-md  hover:bg-gray-700  " />

        <p className=" text-yellow-500 ml-3 mt-2 font-bold">{errormessage}</p>

        <button
          className=" py-4 mx-2 my-10 bg-teal-800 text-white font-semibold text-xl hover:bg-sky-300 w-full rounded-md " onClick={handlebuttonclick}>
          {Issigninform ? "Sign In" : "Sign Up"}</button>

        <p
          className=" mx-2 text-fuchsia-200 cursor-pointer hover:underline hover:shadow-none hover:text-red-500 hover:box-shadow font-semibold  " onClick={togglesigninform}>
          {Issigninform ? " New to Cineout? Sign Up Now" : "Already registered? Sign In Now"}
        </p>
      </form>

    </div>
  )
}

export default Login