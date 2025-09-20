import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ArrowRightCircleIcon,
  CalendarDaysIcon,
  GifIcon,
  GlobeAmericasIcon,
  GlobeAsiaAustraliaIcon,
  ListBulletIcon,
  MapPinIcon,
  PhotoIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import default_profile from "../assets/default_profile.png";
import GrokSvg from "../features/profile/components/GrokSvg";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
// import GrokSvg from "../features/profile/components/GrokSvg";

import React, { useEffect, useRef, useState } from "react";
import {
  UNSAFE_ErrorResponseImpl,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
// import { preview } from "vite";

function PostTweetCard() {
  // const
  const [isImgVisible, setisImgVisible] = useState([]);
  const imgRef = useRef(null);
  const imgContRef = useRef(null);
  const userId = useSelector((state) => state.user.userInfo._id);
  const [isThisIsComment, setIsThisIsComment] = useState(false);

  const { postId } = useParams();
  const authorInfo = useLocation()?.state;

  useEffect(() => {
    if (postId) {
      setIsThisIsComment(true);
    } else {
      setIsThisIsComment(false);
    }

    // return () => {
    //   second
    // }
  }, [postId]);

  // console.log("this is post", useLocation()?.state);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const {
    ref: formFileRef,
    onChange: onFormChange,
    ...rest
  } = register("file");

  const navigate = useNavigate();

  // const checkinging = watch("userInput")
  // console.log(watch("userInput"))

  const onSubmit = async (data) => {
    console.log("this is data.image", data);

    let mediaType;
    const dataToUpload = new FormData();

    if (
      data.file[0]?.type == "image/png" ||
      data.file[0]?.type == "image/jpeg"
    ) {
      console.log("This is image", data.file[0].type);
      mediaType = "image";

      dataToUpload.append("type", mediaType);
      
      for (const file of data.file) {
        dataToUpload.append("image", file);
      }
    }

    if (data.file[0]?.type == "video/mp4") {
      // console.log("This is video")
      mediaType = "video";
      dataToUpload.append("type", mediaType);
      dataToUpload.append("video", data.file[0]);
    }

    console.log("This is the mdeiatype", mediaType);

    dataToUpload.append("userInput", data.userInput);
    dataToUpload.append("author", userId);
    if (isThisIsComment) {
      dataToUpload.append("parentTweetId", postId);
    }

    if (data.file.length > 4) {
      setisImgVisible([]);
      return console.log("plz select only 4 images ");
    }
    // try {
    axios
      .post(
        "http://localhost:8000/api/v1/users/create-post",
        //  {
        dataToUpload
        // author:userId
        // }
      )
      .then(navigate("/home"))
      .catch((error) => console.log(error));

    // () => navigate("/Home");
    // } catch (error) {
    //   throw error;
    // }

    // console.log("this i respones", response.data);
  };

  // };

  // const imageFiles = watch("image");
  // console.log("this is imageFiles",watch("image"))

  // useEffect(()=>{
  //   if (imageFiles && imageFiles.length > 0) {
  //     console.log("File selected",imageFiles)
  //   }
  // },[imageFiles])

  const handleSelectImage = () => {
    imgRef.current.click();

    // console.log("this is ref", imgRef);
  };

  const handleFileChange = (e) => {
    // console.log("this is event", e.target.files);

    onFormChange(e);
    // const file =

    // console.log("this is file", Array.from(e.target.files));

    setisImgVisible(Array.from(e.target.files));
    // setisImgVisible(URL.createObjectURL(file));
    // the url is to preview the image that was selected
  };

  const handleRemoveImages = (e) => {
    // imgContRef.style.transform = "translateX(-100px)";
    // console.log("This is event",e.target.closest(".parent-box"))
    // console.log("This is ref ",isImgVisible)
    setisImgVisible([]);
  };
  // console.log("This is isimgvisible", isImgVisible);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full h-full p-4 ">
        <div className="flex justify-between   items-center ">
          <ArrowLeftIcon
            onClick={() => navigate("/home")}
            className="text-white w-5 h-5 items-center"
          />
          <div className="font-semibold flex gap-6 ">
            {isThisIsComment ? (
              <button className="w-20 h-8 space-x-2  rounded-full text-white bg-[#24a1f4] ">
                Reply
              </button>
            ) : (
              <div>
                <div className="text-blue-400 mt-1 ">Drafts</div>
                <button
                  type="submit"
                  className="w-16 h-8 space-x-2  rounded-full text-white bg-[#1D9BF0] "
                >
                  Post
                </button>
              </div>
            )}
          </div>
        </div>

        {isThisIsComment ? (
          <div className="text-[#9b9a9a] text-base ">
            Replying to{" "}
            <span className="text-blue-400">
              @{authorInfo?.author?.userName}{" "}
            </span>
          </div>
        ) : null}

        <div className="flex mt-5 flex-col h-auto">
          <div className="h-full gap-3 w-full flex ">
            <img
              className=" w-10 h-10 rounded-full "
              src={default_profile}
              alt=""
            />
            <div className="w-full  h-full ">
              <textarea
                {...register("userInput")}
                className="bg-transparent resize-none mt-1 w-full h-28 placeholder:text-white placeholder:text-xl outline-none text-white "
                placeholder={
                  isThisIsComment ? "Post your reply " : ` What's happening?`
                }
                id=""
              ></textarea>

              {/* ${
                    isImgVisible ? "block" : "hidden"
                  } */}

              {isImgVisible.length > 0 && (
                <div className=" w-full   h-48 relative flex   p-5   rounded-xl overflow-hidden  ">
                  <div
                    ref={imgContRef}
                    className="w-full scrollbar-hide   h-full gap-2  flex overflow-x-auto    "
                  >
                    {isImgVisible?.map((img) => (
                      <div
                        key={uuidv4()}
                        className={`parent-box rounded-xl   flex-shrink-0 ${
                          isImgVisible.length == 1
                            ? "w-full h-full"
                            : "w-auto h-auto"
                        }  `}
                      >
                        <img
                          className={`w-full h-full   object-contain rounded-xl `}
                          src={URL.createObjectURL(img)}
                          alt=""
                          srcSet=""
                        />
                      </div>
                      // <div>hello</div>
                      // <div className="bg-gray-500 w-full p-5 h-full" >1</div>
                    ))}
                  </div>

                  <XCircleIcon
                    onClick={handleRemoveImages}
                    className="text-white w-6 h-6 absolute right-0 top-0 "
                  />

                  {/* <ArrowLeftCircleIcon onClick={handleSwipeLeft} className="text-white w-7 h-7 absolute  top-1/2 " />
          <ArrowRightCircleIcon className="text-white w-7 h-7 absolute right-0 top-1/2 " /> */}
                </div>
              )}

              {/* <img
                className={`w-full rounded-xl ${
                  isImgVisible ? "block" : "hidden"
                }`}
                src={isImgVisible}
                alt=""
                srcSet=""
              /> */}

              <input
                {...rest}
                ref={(element) => {
                  imgRef.current = element;
                  formFileRef(element);
                }}
                onChange={handleFileChange}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                multiple
              />
            </div>
          </div>

          <div className="text-[#1D9BF0] text-sm font-semibold gap-1 flex  ">
            <GlobeAsiaAustraliaIcon className=" w-5 h-6" />
            <span className="mt-0.5">Everyone can reply </span>
          </div>
        </div>

        <div className="w-full mt-2 border-[#3b3b3b] cursor-pointer flex gap-5 h-10 border-t py-4 text-[#1D9BF0] ">
          <PhotoIcon
            tabIndex={0}
            onClick={handleSelectImage}
            className=" w-5 h-5  "
          />
          <GifIcon className=" w-5 h-5  " />
          <GrokSvg width="w-5" />
          <ListBulletIcon className=" w-5 h-5  " />
          <CalendarDaysIcon className=" w-5 h-5  " />
          <MapPinIcon className=" w-5 h-5  " />
        </div>
      </div>
    </form>
  );
}

export default PostTweetCard;
