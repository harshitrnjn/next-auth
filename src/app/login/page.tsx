"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Page = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [stateButton, setStateButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {

      const response = await axios.post("/api/user/login", user);

      if (response.data.success) {
        toast.success("Logged In successfully");
        setTimeout(() => {
          router.push("/first");
        }, 800);
      } else {
        toast.warning(response.data.message || "Login failed");
      }
    } catch (error : any ) {
      // console.error("Login error:", error);
      toast.warning(error.response?.data?.message || "Something went wrong!!");
      setUser({ email: "", password: "" });
      // setTimeout(() => {
      //   router.push("/signup");
      // }, 1000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setStateButton(user.email.length > 0 && user.password.length > 0);
  }, [user]);

  return (
    <div className='bg-black flex justify-center items-center w-full h-screen'>
      <div className='w-1/2 h-1/2 bg-slate-600 flex flex-col justify-center items-center'>
        <h1>LOGIN</h1>
        <div className='w-full bg-transparent flex flex-col justify-center items-center gap-y-5'>
          <label htmlFor="email">Email:</label>
          <input type="text"
            className='w-[85%] px-4 py-2 text-lg'
            placeholder='Enter your email'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label htmlFor="password">Password:</label>
          <input type="text"
            className='w-[85%] px-4 py-2 text-lg'
            placeholder='Enter your Password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          {stateButton ? (
            <button
              className='bg-blue-400 px-6 py-3 text-white text-lg font-semibold w-[25%] h-[6vh] flex justify-center items-center'
              onClick={onLogin}
            >
              {loading ? (
                <ThreeDots
                  visible={true}
                  height="15"
                  width="15"
                  color="white"
                  radius="2"
                  ariaLabel="three-dots-loading"
                />
              ) : (
                <h1>SUBMIT</h1>
              )}
            </button>
          ) : (
            <button
              className='w-[25%] h-[6vh] bg-gray-500-400 px-6 py-3 text-white text-lg font-semibold hover:cursor-not-allowed border-2 rounded'
              disabled
            >
              SUBMIT
            </button>
          )}
        </div>
        <h1>New User? <Link href={"/signup"}>Register Here</Link> </h1>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Page;