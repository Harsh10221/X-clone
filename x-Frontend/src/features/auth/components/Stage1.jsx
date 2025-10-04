import React, { useState } from "react";
import Xsvg from "./Xsvg";
import BirthDay from "./BirthDay";
import { useResponsive } from "../hooks/useResponsive";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { WalletIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

function Stage1({
  handleAccountCreate,
  eligible,
  iserror,
  error,
  handleDataFromChild,
  handleUserExistError,
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isMobile } = useResponsive();

  const checkclick = () => {
    console.log(" i am clicked", handleAccountCreate);
  };

  const handleNavigateMobile = () => navigate("/");

  return (
    <div className="gap-7  md:px-14 md:py-10 relative flex flex-col items-center justify-center">
      <svg
        // onClick={isMobile ? handleAccountCreate : navigate("/")}
        onClick={isMobile ? handleNavigateMobile : handleAccountCreate}
        // onClick={checkclick}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="cursor-pointer  text-white absolute md:top-3 md:left-3 top-3 left-3 size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
      <Xsvg />

      <div className="  text-white font-roboto text-2xl font-semibold">
        Create your account
      </div>

      <div className=" md:flex md:gap-5 md:flex-col w-full">
        <input
          {...register("fullName", { required: true })}
          className=" text-white bg-transparent md:w-full p-2 border-[#4c4c4c] w-80 h-14 rounded-sm border "
          placeholder="Name"
          type="text"
        />
        <div>
          <input
            {...register("email", {
              required: true,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            className=" text-white  bg-transparent md:w-full p-2 border-[#4c4c4c] w-80 h-14 rounded-sm border "
            placeholder="Email"
            type="text"
          />
          <div className="text-red-500 p-2 h-5 ">
            {iserror
              ? (() => {
                  handleUserExistError();

                  return error;
                })()
              : errors.email?.message}
          </div>
        </div>

        <div className="p-1 ">
          <div className="text-white font-bold">Date of birth</div>
          <div className="text-[#8a8a8a]">
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, of somthing else.
          </div>

          <div className="  mt-5">
            <BirthDay onDataSubmit={handleDataFromChild} />
          </div>

          <button
            type="submit"
            className={`md:mt-16 mt-24 rounded-3xl font-semibold  text-black  w-full h-12 ${
              eligible ? "bg-white" : "bg-[#585858]"
            } `}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stage1;
