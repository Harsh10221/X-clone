import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  PencilIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import default_profile from "../../../assets/default_profile.png";
import InputBox from "../../auth/components/InputBox";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../Slices/userSlice";
import LoadingAnimation from "../../../utils/LoadingAnimation";
import AnimatedComponent from "../../../utils/ErrorAnimatedComponent";

function EditProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isChangingPasswrod, setIsChangingPasswrod] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setisError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatarRef = useRef(null);
  const bannerRef = useRef(null);
  const dataToUpload = new FormData();
  const userData = useSelector((state) => state.user.userInfo);
  const date = new Date(userData?.dob);

  const formatedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData?.fullName,
      username: userData?.userName,
      email: userData?.email,
      bio: userData?.bio,
      location: userData?.location,
      website: userData?.website,
    },
  });

  const { ref: avatarRegisterRef, ...avatarRest } = register("avatar");
  const { ref: bannerRegisterRef, ...bannerRest } = register("banner");

  const onSubmit = async (data) => {
    setIsLoading(true);

    for (const element in data) {
      if (data[element] instanceof FileList) {
        dataToUpload.append(element, data[element][0]);
      } else {
        dataToUpload.append(element, data[element]);
        // console.log("this is from normal data",element,data[element])
      }
    }

    console.log("THis is datatoupload", dataToUpload.entries());

    try {
      const response = await axios.post(
        "/api/v1/users/update-profile",
        dataToUpload,
        { withCredentials: true }
      );
      if (response.statusText == "OK") {
        dispatch(loginSuccess(response.data.updatedData));
        navigate("/home");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("There is a error while updating profile", error);
      setErrorMsg(error.response.data.error);
      setisError(true);
      setIsLoading(false);
    }
    console.log("This is error", isError);

    // console.log("this is response ", response);
  };

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setisError(false);
      }, 3000);
    }

    // return () => {
    //   second
    // }
  }, [isError]);

  const handleRedirectToProfile = () => {
    navigate("/home");
  };

  const handleClickOnAvatar = () => {
    avatarRef.current.click();
  };

  const handleClickOnBanner = () => {
    bannerRef.current.click();
  };

  const handleChangePassword = () => {
    setIsChangingPasswrod((prev) => !prev);
  };

  return (
    <form className="w-screen h-screen  " onSubmit={handleSubmit(onSubmit)}>
      {isError ? (
        <AnimatedComponent
          show={isError}
          duration={500}
          className="absolute  border border-blue-500/100 
                  bg-black top-1 z-10"
        >
          {errorMsg}
        </AnimatedComponent>
      ) : null}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        // spread all register props (important!)
        {...avatarRest}
        ref={(e) => {
          avatarRegisterRef(e);
          avatarRef.current = e;
        }}
      />

      <input
        {...bannerRest}
        ref={(e) => {
          bannerRef.current = e;
          bannerRegisterRef(e);
        }}
        className="hidden"
        type="file"
        accept="image/*"
      />

      <div
        className={
          isLoading ? "  bg-[#44444471] z-10 absolute h-full w-full " : "hidden"
        }
      >
        <LoadingAnimation />
      </div>

      <div className="w-full h-full relative  bg-black overflow-y-auto ">
        <div className="">
          <div
            onClick={handleClickOnAvatar}
            className="  absolute w-14 h-14 top-36 left-3   "
          >
            <PencilSquareIcon className="top-4 left-4 absolute text-white w-6 h-6" />
            <img
              className=" object-cover w-14 h-14  rounded-full "
              src={userData.avatarUrl ? userData.avatarUrl : default_profile}
              alt=""
              srcSet=""
            />
          </div>

          <div className="text-white flex w-full p-3 items-center   ">
            <div className="w-full flex gap-3 items-center  ">
              <ArrowLeftIcon
                onClick={handleRedirectToProfile}
                className="text-white w-5 h-5"
              />
              <div>Edit profile</div>
            </div>

            <button
              tabIndex={1}
              type="submit"
              className="w-20 h-8 rounded-2xl bg-white text-black font-semibold  "
            >
              Save
            </button>
          </div>

          <div className="bg-gray-800  w-full h-28 ">
            <PencilSquareIcon
              onClick={handleClickOnBanner}
              className="top-24 left-40 absolute text-white w-6 h-6"
            />
          </div>
          {/* {isChangingPasswrod ? ( */}
          {isChangingPasswrod ? (
            <div className="flex flex-col pt-12 gap-5 p-5 ">
             
              <div onClick={handleChangePassword}>
                <XMarkIcon className="text-white w-5 h-5" />
              </div>

              <InputBox
              key={"current_password"}
                {...register("current_password", { required: true })}
                width={"w-96"}
                text={"Current password"}
              />

              <InputBox
              key={"new_password"}
                {...register("new_password", { required: true })}
                width={"w-96"}
                text={"New password"}
              />

              <InputBox
              key={"confirm_new_password"}
                {...register("confirm_new_password", { required: true })}
                width={"w-96"}
                text={"Confirm new password"}
              />
            </div>

          ) : (
            <div className="flex flex-col pt-12 gap-5 p-5 ">
              <InputBox
              key={"name"}
                {...register("name", { required: true })}
                width={"w-96"}
                text={"Name"}
              />
              <InputBox
              key={"username"}
                {...register("username", { required: true })}
                width={"w-96"}
                text={"Username"}
              />
              <InputBox
              key={"email"}
                {...register("email", { required: true })}
                width={"w-96"}
                text={"Email"}
              />
              <InputBox key={"bio"} {...register("bio")} width={"w-96"} text={"Bio"} />
              <InputBox
              key={"location"}
                {...register("location")}
                width={"w-96"}
                text={"Location"}
              />
              <InputBox
              key={"website"}
                {...register("website")}
                width={"w-96"}
                text={"Website"}
              />

              <div className="text-white flex justify-between ">
                <div className="flex flex-col">
                  <span>Birth date</span>
                  <span>{formatedDate}</span>
                </div>
              </div>

              <div
                onClick={handleChangePassword}
                className="text-white flex justify-between "
              >
                <div className="">Change password</div>
                <ChevronRightIcon className=" w-5 h-5" />
              </div>

              <div className="text-white flex justify-between ">
                <div className="">Create expanded bio</div>
                <ChevronRightIcon className=" w-5 h-5" />
              </div>

              <div className="text-white flex justify-between ">
                <div className="">Switch to professional</div>
                <ChevronRightIcon className=" w-5 h-5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default EditProfile;
