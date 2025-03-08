"use client"
import axios, { Axios } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const page = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [buttonState, setButtonState] = useState(false);
  const [verified, setVerified] = useState(false)

  const verifyUser = async () => {
    try {
        const response = await axios.post("/api/user/verifyemail", {token});
        console.log(response.data)
        // console.log(buttonState)

        if(response.data.success){
          setVerified(true)
        }

        toast.success(response.data.message)

        setTimeout(() => {
          router.push("/login")
        }, 800);
        
    } catch (error : any) {
     console.log(error)   
    }
  };

  useEffect( ()=>{
    const userToken = window.location.search.split("=")[1]
    setButtonState(true);

    // console.log(token)
    setToken(userToken || "")
    // console.log(token)
  }, [] )

  return (
    <div className="w-full h-screen bg-black">
      <h1 className="text-center text-2xl text-white font-bold">
        Verify Email
      </h1>
      {/* <h1 className="text-white text-xl" >{token}</h1> */}
      <div className="w-full h-full flex justify-center items-center">
        {buttonState ? (
          <button
          onClick={verifyUser}
          className="px-6 py-3 bg-blue-400 text-white ">VERIFY!</button>
        ) : (
          <button className=" hover:cursor-not-allowed px-6 py-3 bg-gray-400 text-white ">
            VERIFY!
          </button>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default page;
