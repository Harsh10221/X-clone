// import React from 'react'
// import Xsvg from './Xsvg'

// function LoginStage2() {
//   return (
//     <div className='flex flex-col w-full h-full' >
//       <Xsvg/>
//     </div>
//   )
// }

// export default LoginStage2

import React, { useEffect, useState } from "react";
import AnimatedComponent from "../../../utils/ErrorAnimatedComponent";
import Xsvg from "./Xsvg";
import InputBox from "./InputBox";
import { useFormContext } from "react-hook-form";
import Eye from "./Eye";
import EyeSlash from "./eyeSlash";
import { useNavigate } from "react-router-dom";

// import { parseAst } from "vite";

function LoginStage2({
  errorMsgStage2,
  setErrorMsgStage2,
  iserrorStage2,
  setIsErrorStage2,
}) {
  const [eligible, seteligible] = useState(false);
  const [ispassVisible, setIspassVisible] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext();

  const userInput = watch("password");

  useEffect(() => {
    if (userInput?.length == 1) {
      console.log("i am here");
      seteligible(true);
    }
  }, [userInput]);

  useEffect(() => {
    let timer1;
    let timer2;

    if (errorMsgStage2) {
      timer1 = setTimeout(() => {
        setIsErrorStage2(false);

        timer2 = setTimeout(() => {
          setErrorMsgStage2("");
        }, 2000);
      }, 3000);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [errorMsgStage2]);

  const handlePassVisible = () => {
    setIspassVisible((prev) => !prev);
  };

  return (
    <div className="relative p-5 flex flex-col w-full h-full">
      <AnimatedComponent
        show={iserrorStage2}
        duration={800}
        blur={true}
        className="absolute top-6 z-10 border border-blue-600/100 
                  bg-black/70  "
      >
        {errorMsgStage2}
      </AnimatedComponent>
      <div className="flex items-center relative">
      
        <svg
          onClick={() => navigate("/")}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className=" text-white size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <Xsvg />
        </div>

      </div>

      <div className="w-full    h-full flex flex-col">
        <div className="flex-1  items-center  p-4 justify-between  flex  flex-col">
          <div className="p-5 md:gap-2 md:flex md:flex-col  ">
            <div className="text-white pl-3 font-roboto flex flex-col  ">
              <span className="text-2xl mb-2 font-bold">
                Enter your password
              </span>
              {/* <span className="text-[#808080]">Enter it below to verify</span> */}
              {/* <span className="text-[#808080]">{email}</span> */}
            </div>

            <div className="bg-[#4c576b6c] mb-2 rounded-md flex flex-col p-2 px-2 h-16 ">
              <span className="text-[#4d4d4d] font-semibold text-sm ">
                Username
              </span>
              <span className="text-[#4d4d4d]  text-base mt-1">
                {getValues().emailorUsername}
              </span>
            </div>
            <div className="relative">
              <InputBox
                type={ispassVisible ? "password" : "text"}
                {...register("password", { required: true })}
                text={"Password"}
              />
              <div
                onClick={handlePassVisible}
                className="absolute bottom-2 right-2  "
              >
                {ispassVisible ? <Eye width={20} /> : <EyeSlash width={20} />}
              </div>
            </div>

            <span
              tabIndex={0}
              // onClick={getOtp}
              className="text-[#cccccc] ml-2 text-sm focus:text-blue-500 "
            >
              Forgot password?
            </span>
          </div>

          <button
            // onClick={verifyOtp}
            type="submit"
            className={`  rounded-3xl font-semibold w-80  text-black   h-12 
                 ${eligible ? "bg-white" : "bg-[#585858]"} 
                 `}
          >
            Log in
          </button>


          
        </div>

        <div className="text-white md:text-start  md:w-1/2 pl-4 ">
          Don't have an account?
          <span onClick={() => navigate("/")} className="text-blue-400">
            Sign up
          </span>
        </div>
        
      </div>
    </div>
  );
}

export default LoginStage2;
