import Xsvg from "./Xsvg";
import GoogleIcon from "./GoogleSvg";
import AppleIcon from "./AppleSvg";
import { XMarkIcon } from "@heroicons/react/20/solid";
import InputBox from "./InputBox";
import { useFormContext } from "react-hook-form";
import AnimatedComponent from "../../../utils/ErrorAnimatedComponent";
import { useNavigate } from "react-router-dom";

function LoginStage1({
  errorMsgStage1,
  iserrorStage1,
  setIsErrorStage1,
  handleAccountLogin,
  setErrorMsgStage1,
}) {

  const navigate = useNavigate()
  // const [first, setfirst] = useState(second)

  const {
    register,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext();

  if (iserrorStage1) {
    const timer1 = setTimeout(() => {
      setIsErrorStage1(false);
    }, 3000);
  }

  const backToStarPage = () => {
    navigate("/")
  }


  // console.log("This is error", errors);

  return (
    <div className="flex relative  p-5 flex-col w-full h-full">
      <AnimatedComponent
        show={iserrorStage1}
        duration={500}
        blur={true}
        className="absolute border border-blue-500/100 
                  bg-black-900/90 z-1
                    "
      >
        {errorMsgStage1}
      </AnimatedComponent>

      <div className="cursor-pointer relative flex items-center    ">
        <XMarkIcon 
        // onClick={handleAccountLogin}
        onClick={backToStarPage}

        // onClick={ ()=>{ navigate("/") } }

         className=" h-6  w-6 text-white" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <Xsvg />
        </div>
      </div>

      {/* <div className="flex  w-full h-full  flex-col "> */}

      <div className="px-5 items-center mt-10  gap-10  flex flex-col w-full bg-black flex-1  ">
        <div className=" w-full  ">
          <div className="text-white px-7  text-start font-bold font-roboto text-3xl">
            Sign in to X
          </div>
        </div>
        <div className=" flex flex-col gap-2 ">
          <button className="bg-white flex w-72 gap-2 h-10 font-roboto items-center justify-center rounded-3xl ">
            <GoogleIcon /> Sign up with Google
          </button>

          <button className="bg-white mt-4 flex w-72 gap-2 h-10 font-roboto items-center justify-center rounded-3xl ">
            <AppleIcon /> Sign up with Apple
          </button>

          <div className="md:text-start md:ml-2 md:mt-2 text-center">
            <span className="text-[#a1a1a1] ">―――――――</span>
            <span className="text-white px-3 ">or</span>
            <span className="text-[#a1a1a1]">―――――――</span>
          </div>
          {/* onClick={handleAccountCreate} */}

          <div className="w-72">
            <InputBox
              {...register("emailorUsername", {
                required: "The Email or Username is required",
              })}
              text={"Email or Username"}
            />

            <button className="bg-white text-black font-medium mt-4 flex w-72 gap-2 h-10 font-roboto items-center justify-center rounded-3xl ">
              Next
            </button>
          </div>

          <button className="text-white font-semibold border  mt-2 flex w-72 gap-2 h-10 font-roboto items-center justify-center rounded-3xl ">
            Forgot password?
          </button>
        </div>

        <div className="text-[#b8b8b8] px-7 w-full font-roboto ">
          Don't have an account?{" "}
          <span onClick={ ()=>{ navigate("/") } } className="text-blue-400  ">Sign up</span>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default LoginStage1;
