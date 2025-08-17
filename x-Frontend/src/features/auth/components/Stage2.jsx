import React, { useEffect, useState } from "react";
import Xsvg from "./Xsvg";
import axios from "axios";
import InputBox from "./InputBox";
import { useForm, useFormContext } from "react-hook-form";
import AnimatedComponent from "../../../utils/ErrorAnimatedComponent";

function Stage2({
  getOtp,
  errorMsgStage2,
  setIserrorStage2,
  initialData,
  iserrorStage2,
  verifyOtp,
  email,
}) {
  const [eligible, setEligible] = useState(false);
  // const [iserror, setIserror] = useState(false);

  const {
    register,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIserrorStage2(false);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [iserrorStage2]);

  // console.log("This is the value of otp",getValues("otp"))

  const otptemp = watch("otp");

  useEffect(() => {
    if (otptemp?.length == 6) {
      console.log("This is the value of otp", typeof watch("otp"));
      setEligible(true);
      return;
    }
    setEligible(false);
  }, [otptemp]);

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <div className="relative md:p-10 flex flex-col w-full h-full">
      <AnimatedComponent
        show={iserrorStage2}
        duration={800}
        blur={true}
        className="absolute top-0 border border-blue-600/100 
                  bg-black/80 "
      >
        {errorMsgStage2}
      </AnimatedComponent>

      <div className="flex  items-center md:relative absolute ">
        <svg
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
<div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " >

        <Xsvg />
</div>
      </div>

      <div className="flex-1  justify-between  flex  flex-col">
        <div className="p-5  ">
          <div className="text-white font-roboto my-7 flex flex-col  ">
            <span className="text-2xl mb-2 font-bold">We sent you a code</span>
            <span className="text-[#808080]">Enter it below to verify</span>
            <span className="text-[#808080]">{email}</span>
          </div>

          <div className="w-full  " >

          <InputBox
            width="w-full"
            maxLength={6}
            {...register("otp", { required: true })}
            text={"Verification code"}
            />
            </div>

          <span
            tabIndex={0}
            onClick={getOtp}
            className="text-[#cccccc] ml-2 text-sm focus:text-blue-500 "
          >
            Didn't receive email?
          </span>
        </div>

        <button
          // onClick={verifyOtp}
          type="submit"
          className={` mt-24 rounded-3xl font-semibold  text-black  w-full h-12 
                 ${eligible ? "bg-white" : "bg-[#585858]"} 
                 `}
        >
          Next
        </button>
      </div>
    </div>
    // </form>
  );
}

export default Stage2;
