import React, { useEffect, useState } from "react";
import Xsvg from "./Xsvg";
import InputBox from "./InputBox";
import { useFormContext } from "react-hook-form";
import AnimatedComponent from "../../../utils/ErrorAnimatedComponent";

function Stage5({ setstage5Error, stage5Error }) {
  const [iserror, setIserror] = useState(false);

  useEffect(() => {
    if (stage5Error) {
      setIserror(true);

      setTimeout(() => {
        setIserror(false);

        setTimeout(() => {
          setstage5Error("");
        }, 2000);
      }, 3000);
    }

    return () => {};
  }, [stage5Error]);

  const {
    register,
    watch,
    formState: { errors },
    clearErrors,
    getValues,
  } = useFormContext();

  return (
    <div className="flex  relative md:px-20 md:py-5  gap-2 md:gap-5 items-center md:items-stretch  h-full w-full flex-col  ">
      <AnimatedComponent
        show={iserror}
        duration={800}
        blur={true}
        className="absolute top-0 border border-blue-600/100 
                  bg-black/80 
                 
                  
                  
                  "
      >
        {stage5Error}
      </AnimatedComponent>
     
      <div className=" flex justify-center">
        <Xsvg />
      </div>

      <div className="   flex-1 flex justify-between flex-col">
        <div className=" gap-4 flex flex-col ">
        
          <div className="text-white text-2xl md:px-0 px-5 mt-1  font-bold ">
            What should we call <br /> you ?
          </div>

          <div className="text-[#bdbdbd] md:px-0 px-5 mt-1 ">
            Your @username is unique. You cannot change it later
          </div>

          <InputBox
            width="w-full"
            {...register("userName", { required: "Username is required" })}
            text={"Username"}
          />
        </div>

        <button
          type="submit"
          className={` rounded-3xl font-semibold border text-white  w-full h-12 
            
          `}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Stage5;
