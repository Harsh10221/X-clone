import React, { useState } from "react";
import GoogleIcon from "../components/GoogleSvg";
import AppleIcon from "../components/AppleSvg";
import SignupPage from "./SignupPage";
import { useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import { useResponsive } from "../hooks/useResponsive";

function StartPage() {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();

  const [singup, setSingup] = useState(false);
  const [loginvisible, setLoginVisible] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleAccountCreate = () => {
    if (isMobile) {
      navigate("/signup");
    } else {
      setSingup((prev) => !prev);
    }

    
  };

  const handleAccountLogin = () => {
    if (isMobile) {
      // console.log("i am here in account login");
      navigate("/login");
    } else {
      // console.log("i am here in account login elseeeee");
      setLoginVisible((prev) => !prev);
    }
  };

  return (
    <div
      className={`relative w-full h-full ${
        singup || loginvisible ? "bg-[#242D34]  " : "bg-black"
      }  `}
    >
      {singup && (
        <div
          className={`absolute   md:items-center md:justify-center w-full h-full ${
            singup ? "md:flex  hidden" : "hidden"
          }`}
        >
          <SignupPage  handleAccountCreate={handleAccountCreate} />
        </div>
      )}

      {loginvisible && (
        <div
          className={`absolute   md:items-center md:justify-center w-full h-full
          
          ${loginvisible ? "md:flex  hidden" : "hidden"}
          `}
        >
          <LoginPage handleAccountLogin={handleAccountLogin} />
        </div>
      )}

      <div>
        <div className=" md:flex-row  flex flex-col  ">
          <div className="  md:w-80 md:m-32 md:ml-44    p-10 h-20">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className=" text-white w-10 h-8 md:h-96 md:w-72 "
            >
              <g>
                <path
                  className="fill-current"
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </g>
            </svg>
          </div>

          <div className="  md:p-20   md:ml-16 ">
            <div
              className={`  p-10 ${
                singup || loginvisible ? "bg-[#242D34] " : "bg-black"
              } w-full  flex-1  `}
            >
              <div className="text-white font-bold font-roboto text-5xl md:text-6xl ">
                <span> Happening </span> <br className="md:hidden block" />
                <span> now </span>
              </div>
              <br />

              <div className="text-white font-bold font-roboto text-2xl">
                Join today.
              </div>

              <br />
              <button className="bg-white flex w-72 gap-2 h-10 font-roboto items-center justify-center rounded-3xl ">
                <GoogleIcon /> Sign up with Google
              </button>

              <button className="bg-white mt-4 flex w-72 gap-2 h-10 font-roboto items-center justify-center rounded-3xl ">
                <AppleIcon /> Sign up with Apple
              </button>

              <div className="md:text-start md:ml-2 md:mt-2 text-center">
                <span className="text-[#343434] ">―――――――</span>
                <span className="text-white px-3 ">OR</span>
                <span className="text-[#343434]">―――――――</span>
              </div>

              <div>
                <button
                  onClick={handleAccountCreate}
                  className="bg-blue-500 text-white font-medium mt-4 flex w-72 gap-2 h-10 font-roboto items-center justify-center rounded-3xl "
                >
                  Create account
                </button>
              </div>

              <div className="text-[#acacac] text-xs pt-4  ">
                By singing up, you agree to the
                <span className="text-blue-500"> Terms of Service</span>
                <span> and </span> <br className="md:block hidden" />
                <span className="text-blue-500">Privacy Policy</span>,
                <span> including</span>
                <span className="text-blue-500"> Cookie Use</span>.
              </div>

              <div className="mt-10">
                <div className="text-white text-lg font-roboto font-medium ">
                  Already have an account?
                </div>

                <button
                  onClick={handleAccountLogin}
                  // onClick={ ()=>{

                  //   navigate("/login");
                  // } }
                  className="text-blue-500 border  mt-2 flex w-72 gap-2 h-10 font-roboto items-center justify-center rounded-3xl "
                >
                  Sign in
                </button>
              </div>
            </div>

            <div
              className={` text-white  md:flex-row py-5 flex flex-col gap-2 items-center justify-center md:hidden bg-black  text-xs`}
            >
              <div className="flex px-8 gap-2">
                <span> About </span> | <span> Download the x app </span>|
                <span> Grok </span>|<span> Help Center </span>|
              </div>

              <div className="flex  px-8 gap-2">
                <span> Terms of Service </span>|<span> Privacy Policy </span>|
                <span> Cookie Policy </span>|
              </div>

              <div className="flex px-8 gap-2">
                <span> Accessibility </span>|<span> Ads info </span>|
                <span> Blog </span>|<span> Careers </span>|
              </div>

              <div className="flex px-4 gap-2">
                <span> Brand Resources </span>|<span> Advertising </span>|
                <span> Marketing </span>|<span> X for Business </span>|
              </div>

              <div className="flex px-8 gap-2">
                <span> Developers </span>|<span> Directory </span>|
                <span> Settings </span>|<span> © 2025 X Corp. </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            singup || loginvisible ? "bg-[#242D34]  " : "bg-black  "
          } text-[#828282]    px-7  gap-2 items-center justify-center md:flex hidden   text-xs`}
        >
          <div className="flex  gap-2">
            <span> About </span> | <span> Download the x app </span>|
            <span> Grok </span>|<span> Help Center </span>|
          </div>

          <div className="flex gap-2">
            <span> Terms of Service </span>|<span> Privacy Policy </span>|
            <span> Cookie Policy </span>|
          </div>

          <div className="flex  gap-2">
            <span> Accessibility </span>|<span> Ads info </span>|
            <span> Blog </span>|<span> Careers </span>|
          </div>

          <div className="flex gap-2">
            <span> Brand Resources </span>|<span> Advertising </span>|
            <span> Marketing </span>|<span> X for Business </span>|
          </div>

          <div className="flex  gap-2">
            <span> Developers </span>|<span> Directory </span>|
            <span> Settings </span>|<span> © 2025 X Corp. </span>
          </div>
        </div>
      </div>
      {/* // )} */}
    </div>
  );
}

export default StartPage;
