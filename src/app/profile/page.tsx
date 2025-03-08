"use client";
import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const onLogout = async () => {
    const response = await axios.get("/api/user/logout");
    toast.success(response.data.message);
    setTimeout(() => {
      router.push("/login");
    }, 800);
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/user/profile");
      console.log(response.data);
      setData({
        name: response.data.user.username,
        email: response.data.user.email,
      });
    } catch (error: any) {
      setData(error.message);
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen bg-black">
      <h1 className="text-2xl text-white text-center">Profile</h1>
      <div className="p-5 flex flex-col justify-center items-center">
        <p className="text-center text-xl text-white">Name: {data.name}</p>
        <p className="text-center text-xl text-white">Email: {data.email}</p>
        <Link
          className="px-5 py-3 bg-violet-400"
          href={`/profile/${data.name}`}
        >
          Explore More
        </Link>
      </div>
      <button
        onClick={getUserDetails}
        className="px-6 py-3 bg-green-500 text-xl font-semibold"
      >
        GET DETAILS!
      </button>

      <button onClick={onLogout} className="px-5 py-2 bg-red-500">
        LOG OUT
      </button>
      <ToastContainer />
    </div>
  );
};

export default page;
