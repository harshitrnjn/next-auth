"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";

function page() {
  const route = useRouter();

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [button, setButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/user/signup", user);

      console.log(response.data);

      toast.success("User registered successfully!");

      console.log("User registered successfully!")

      // setTimeout(() => {
      //   route.push("/verifyemail");
      // }, 1000);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButton(true);
    }
  }, [user]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[25vw] h-[50vh] border-2 border-black rounded flex flex-col justify-center items-center gap-y-8">
        <h1 className="text-3xl font-bold">Sign Up</h1>

        <div className="w-full h-[5vh] flex justify-center items-center gap-x-2 flex-col">
          <label htmlFor="username">Username: </label>
          <input
            className="px-5 py-2 w-[75%]"
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
          />
        </div>

        <div className="w-full h-[5vh] flex justify-center items-center gap-x-2 flex-col">
          <label htmlFor="username">Email: </label>
          <input
            className="px-5 py-2 w-[75%]"
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
        </div>

        <div className="w-full h-[5vh] flex justify-center items-center gap-x-2 flex-col">
          <label htmlFor="password">Password: </label>
          <input
            className="px-5 py-2 w-[75%]"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </div>

        {button ? (
          <button
            className="bg-blue-400 px-6 py-3 text-white text-lg font-semibold w-[25%] h-[6vh] flex justify-center items-center"
            onClick={onSignup}
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
            className="w-[25%] h-[6vh] bg-gray-500-400 px-6 py-3 text-white text-lg font-semibold hover:cursor-not-allowed border-2 rounded"
            disabled
          >
            SUBMIT
          </button>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
}

export default page;
