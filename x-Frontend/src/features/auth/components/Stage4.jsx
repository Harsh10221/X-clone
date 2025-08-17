import React, { useEffect } from "react";
import Xsvg from "./Xsvg";
import default_profile from "../../../assets/default_profile.png";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import AnimatedComponent from "../../../utils/ErrorAnimatedComponent";
import { useState } from "react";

function Stage4() {
  const inputRef = useRef(null);

  const [iserror, setIserror] = useState(false);
  const [iseligible, setisEligible] = useState(false);
  const {
    register,
    watch,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const avatarErrorMessage = errors.avatar?.message;

  useEffect(() => {
    let timer1
    let timer2

    if (avatarErrorMessage) {
      setIserror(true);

      timer1 = setTimeout(() => {
        setIserror(false);
        timer2 = setTimeout(() => {
          clearErrors("avatar");
        }, 2000);
      }, 3000);

    }
    return () =>{ 
      clearTimeout(timer1);
      clearTimeout(timer2);

    }

  }, [avatarErrorMessage]);

  const handleAvatarSeup = () => {
    console.log("This is rref", inputRef.current.click());
 };

  return (
    <div className="flex flex-col md:p-10 relative  w-full h-full">
      <AnimatedComponent
        show={iserror}
        duration={800}
        blur={true}
        className="absolute top-0 border border-blue-600/100 
                  bg-black/80 "
      >
        {errors?.avatar?.message}
      </AnimatedComponent>

      <div className="flex justify-center">
        <Xsvg />
      </div>

      <div className=" p-4 flex-1  flex flex-col justify-between  ">
        <div>
          <div className="text-white text-2xl mt-1 font-bold ">
            Pick a profile a picture
          </div>
          <div className="text-[#747474] mt-1 ">
            Have a favorite selfie? Upload it now.
          </div>
        </div>

        <div className="flex justify-center">
          <div className="  relative  h-40 w-40 rounded-full border-2 border-white overflow-hidden">
            <img src={default_profile} alt="default_img" />

            <div
              onClick={handleAvatarSeup}
              className="absolute  flex justify-center items-center bg-[#04040466] w-10 h-10 rounded-full top-14 right-[58px]"
            >
              <PhotoIcon className=" w-5 h-4 text-white" />
              <input
                {...register("avatar", { required: "Avatar is required" })}
                ref={(e) => {
                  register("avatar").ref(e);
                  inputRef.current = e;
                }}
                className="hidden"
                type="file"
                accept="image/*"
              />

              {/* <span>{errors?.avatar?.message}</span> */}
              {/* ref={inputRef} */}
            </div>
          </div>
        </div>

        <button
          type="submit"
          // onClick</div>={handlebtnClick}
          className={`  rounded-3xl font-semibold border   w-full h-12 ${
            iseligible ? "bg-white text-black" : "text-white"
          }
            
          `}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Stage4;
