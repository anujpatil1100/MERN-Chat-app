import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';

const userLogin=()=>{
    const[loading,setLoading]=useState(false);
    const{setAuthUser}=useAuthContext()

    const login=async(username,password)=>{
        //console.log(username,password);
        const suceesornot=handleError(username,password);

        if(!suceesornot)return;

        setLoading(true);
        try{
            const res=await fetch("/api/auth/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,password})
            });

            const data=await res.json();
            if(data.error)
            {
                throw new Error(data.error)
            }
            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
        }catch(error){
            toast.error(error.message);
        }finally{
            setLoading(false)
        }
    }
    return{loading,login};
}

export default userLogin;

function handleError(username,password){
    if(!username || !password ){
        toast.error("Fill all the fields!");
        return false;
    }

    if(password.length<6)
    {
        toast.error("Password length atleast 6");
        return false;
    }
    return true;
}