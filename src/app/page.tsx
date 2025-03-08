import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center gap-x-4">

      <Link 
      className='px-6 py-2 bg-blue-500 text-white text-xl text-center'
      href={"/signup"}> SIGN UP </Link>
      <Link 
      className='px-6 py-2 bg-green-500 text-white text-xl text-center'
      href={"/login"}> LOG IN </Link>

    </div>
  );
};

export default page;
