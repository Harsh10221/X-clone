import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import default_profile from "../../../assets/default_profile.png";
import InputBox from "../../auth/components/InputBox";
import { useForm } from "react-hook-form";

function EditProfile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full h-full bg-black overflow-y-auto ">
        <div className="relative">
          <img
            className="absolute w-14 h-14 top-32 left-3 rounded-full "
            src={default_profile}
            alt=""
            srcset=""
          />

          <div className="text-white flex w-full p-3 items-center   ">
            <div className="w-full flex gap-3 items-center  ">
              <ArrowLeftIcon className="text-white w-5 h-5" />
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

          <div className="bg-gray-800  w-full h-28 "></div>

          <div className="flex flex-col pt-12 gap-5 p-5 ">
            <InputBox
              {...register("name", { required: true })}
              width={"w-96"}
              text={"Name"}
            />
            <InputBox
              {...register("bio", { required: true })}
              width={"w-96"}
              text={"Bio"}
            />
            <InputBox
              {...register("location", { required: true })}
              width={"w-96"}
              text={"Location"}
            />
            <InputBox
              {...register("website", { required: true })}
              width={"w-96"}
              text={"Website"}
            />

            <div className="text-white flex justify-between ">
              <div className="flex flex-col">
                <span>Birth date</span>
                <span>January 21,1999</span>
              </div>
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
        </div>
      </div>
    </form>
  );
}

export default EditProfile;
