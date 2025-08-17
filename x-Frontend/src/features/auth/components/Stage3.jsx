import React, { useEffect, useState } from "react";
import Xsvg from "./Xsvg";
import InputBox from "./InputBox";
import Eye from "./Eye";
import EyeSlash from "./eyeSlash";
import { useFormContext } from "react-hook-form";
import AnimatedComponent from "../../../utils/ErrorAnimatedComponent";
// import { EyeIcon } from '@heroicons/react/20/solid'

function Stage3() {
  const [passVisible, setPassVisible] = useState(false);
  const [iserror, setiserror] = useState(false);
  // const [duration, setduration] = useState(800)

  const {
    register,
    watch,
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  let error = errors.password?.message;

  useEffect(() => {
    const timer = setTimeout(() => {
      setiserror(false);
      setTimeout(() => {
        clearErrors("password");
      }, 2000);
    }, 3000);

    if (error) {
      setiserror(true);
      timer;
      // console.log("THis is timer", timer);
    } else {
      // setduration(0)
      console.log("THis is else");
      setiserror(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const handleEyeClick = () => {
    setPassVisible((prev) => !prev);
  };

  return (
    <div className="relative md:p-10 ">
      <AnimatedComponent
        show={iserror}
        // show={true}
        // duration={duration}
        duration={800}
        blur={true}
        className="absolute top-0 border border-blue-600/100 
                  bg-black/80 
                  "
      >
        {errors.password?.message}
      </AnimatedComponent>

      <div className="  justify-center flex ">
        <Xsvg />
      </div>
      <div className=" p-4  flex flex-col  ">
        <div className="text-white text-2xl font-bold ">
          You'll need a password{" "}
        </div>
        <div className="text-[#747474] mt-1 ">
          Make sure it's 8 characters or more.{" "}
        </div>

        <div className="relative  mt-8">
          <InputBox
            text={"Password"}
            width="w-full"
            type={passVisible ? "password" : "text"}
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          <div  onClick={handleEyeClick} className="cursor-pointer  bottom-2 right-2 absolute">
            {passVisible ? <Eye width={20} /> : <EyeSlash width={20} />}
          </div>
        </div>

        <div className="text-white mt-40 text-sm ">
          By signing up, you agree to the
          <span className="text-blue-400"> Terms of Service </span>
          and <span className="text-blue-400"> Privacy Policy </span> ,
          including <span className="text-blue-400"> Cookie Use </span>. X may
          use your contact information, including your email address and phone
          number for purposes outlined in our Privacy Policy, like keeping your
          account secure and personalizing our services, including ads.
          <span className="text-blue-400"> Learn more </span> , Others will be
          able to find you by email or phone number, when provided, unless you
          choose otherwise
          <span className="text-blue-400"> here </span>.
        </div>

        {/* ${
            eligible ? "bg-white" : "bg-[#585858]"
          }  */}

        <button
          type="submit"
          // onClick={handleNextStage}
          // onClick</div>={handlebtnClick}
          className={` mt-5 rounded-3xl font-semibold bg-white  text-black  w-full h-12 
            
          `}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Stage3;
