import React, { useState } from 'react'
import GenderCheck from './GenderCheck'
import { Link } from 'react-router-dom'
import userSignup from '../../hookes/userSignup';

function Signup() {
  const[inputs,setInputs]=useState({
    fullname:"",
    username:"",
    password:"",
    confirmpassword:"",
    gender:""
  });

  const{loading,signup}=userSignup()

  const handleCheckboc=(gender)=>{
    setInputs({...inputs,gender})
  }


  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(inputs);
    await signup(inputs);
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter
    backdrop-blur-lg bg-opacity-0'>
      <h1 className='text-3xl font-semibold text-center text-gray-300'>Signup
      <span className='text-blue-500 p-2'>ChatApp</span>
      </h1>

      <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Fullname</span>
            </label>
            <input type='text' placeholder='Enter fullname' className='w-full input input-bordered h-10'
             value={inputs.fullname}
             onChange={(e)=>setInputs({...inputs,fullname: e.target.value})}
            />
            </div>
            <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10'
             value={inputs.username}
             onChange={(e)=>setInputs({...inputs,username: e.target.value})}
            />
            </div>
            <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input type='password' placeholder='Enter Password' className='w-full input input-bordered h-10'
             value={inputs.password}
             onChange={(e)=>setInputs({...inputs,password: e.target.value})}
            />
            </div>
            <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input type='password' placeholder='Re-type Password' className='w-full input input-bordered h-10'
             value={inputs.confirmpassword}
             onChange={(e)=>setInputs({...inputs,confirmpassword: e.target.value})}
            />
            </div>
            <GenderCheck onCheckboxChange={handleCheckboc} selectedGender={inputs.gender}/>
            <Link to={'/login'} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
              Alerady have an account?
            </Link >

            <div>
              <button className='btn btn-block  btn-info btn-sm mt-2' 
              disabled={loading}
              >{loading ? (<span className='loading loading-spinner'></span>):"SignUp"}</button>
            </div>
        </form>
      </div>
      </div>
  )
}

export default Signup