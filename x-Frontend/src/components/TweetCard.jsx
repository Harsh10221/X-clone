import React, { useEffect, useState } from "react";
import default_profile from "../assets/default_profile.png";
import GrokSvg from "../features/profile/components/GrokSvg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { useResponsive } from "../features/auth/hooks/useResponsive.js";

import {
  ArrowTopRightOnSquareIcon,
  ArrowUpTrayIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useImagePreview } from "../hooks/previewImage";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import AdititonalTweetCardFeatures from "./AdititonalTweetCardFeatures";
import { useSelector } from "react-redux";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

dayjs.extend(relativeTime);

function TweetCard({ tweetData }) {
  // console.log("this is from teweetdata", tweetData);
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const [isfullPostVisible, setIsFullPostVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isMoreOptionEnabled, setisMoreOptionEnabled] = useState(false);
  const { selectedImage, openPreview, closePreview } = useImagePreview();
  // console.log("THis is the selectedImage", selectedImage);
  const queryClient = useQueryClient();

  const loggedInUser = useSelector((state) => state?.user?.userInfo);
  // console.log("This si loggedin user", loggedInUser);

  const authorProfileUrl = isMobile
    ? `/profile/${tweetData?.author?._id}`
    : `/home/profile/${tweetData?.author?._id} `;

  const authorTweetDetails = isMobile ? `/user/tweet` : `/home/user/tweet`;

  const postRef = useRef(null);

  const handlePostHeight = () => setIsFullPostVisible((prev) => !prev);
  const handleImageLoad = () => setIsImageLoaded(true);

  const handleCenterDivClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handlePostOptions = (e) => {
    // console.log("you clicked on me ", e);
    // e.stopPropagation()
    e.preventDefault();
    setisMoreOptionEnabled((prev) => !prev);
  };

  const handleEditPost = (e) => {
    e.preventDefault();
    navigate("/post", { state: { postData: tweetData } });
  };

  // const handleDeletePost = (e) => {
  // e.preventDefault();

  // const response = await axios.delete(
  //   "http://localhost:8000/api/v1/users/delete-tweet",
  //   { data: { postId: tweetData?._id }, withCredentials: true }
  // )

  const deletemutation = useMutation({
    mutationFn: () =>
      axios.delete("http://localhost:8000/api/v1/users/delete-tweet", {
        data: { postId: tweetData?._id },
        withCredentials: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
    },
  });

  // console.log("THis is state of the ",deletemutation.isPending)

  useEffect(() => {
    if (postRef?.current?.clientHeight > 240) {
      setIsFullPostVisible(true);
      // console.log("i am in if");
    } else {
      setIsFullPostVisible(false);
      // console.log("i am in else");
    }

    // return () => {
    //   second
    // }
  }, []);

  let formatedDateinAgos = dayjs(tweetData?.createdAt)
    .fromNow()
    .replace(" days ago", "d")
    .replace("a day ago", "1d");

  let formatedDate = dayjs(tweetData?.createdAt).format("MMM D");

  return (
    <div className="w-full  border-b border-[#555555] bg-black p-2 h-auto   flex   ">
      {selectedImage ? (
        <div className="h-screen w-screen cursor-pointer  flex items-center justify-center  top-0 left-0 fixed  z-50  bg-black">
          <XMarkIcon
            onClick={closePreview}
            className="absolute cursor-pointer z-50 top-4 left-4 text-white w-6 h-6"
          />
          {/* {selectedImage.includes("video") } */}
          {selectedImage.mediaType == "image" ? (
            <div className=" w-auto  absolute z-40   ">
              <img
                className="w-full h-full"
                onLoad={handleImageLoad}
                src={isImageLoaded ? selectedImage.url : default_profile}
                alt=""
              />
            </div>
          ) : (
            <div className=" w-auto  absolute z-40   ">
              <video
                controls
                className="w-full  h-full"
                onLoad={handleImageLoad}
                src={isImageLoaded ? selectedImage.url : default_profile}
                // src={selectedImage.url}
                alt=""
              />
            </div>
          )}
        </div>
      ) : null}

      {
        // deletemutation.isPending ?
        true ? (
          <div className=" absolute z-10 bg-red-500"> </div>
        ) : null
      }

      {/* <div className='bg-red-950 w-14 max-h-[83vh] ' > */}

      <Link
        to={authorProfileUrl}
        stoppropagation="true"
        state={{
          author: tweetData?.author,
          postInfo: tweetData,
          fullData: tweetData,
        }}
      >
        <div
          // onClick={handleRedirectToUserProfile}

          className=" overflow-hidden mr-2 rounded-full w-10 h-10 flex-shrink-0 "
        >
          <img
            className="w-full object-cover h-full  "
            src={tweetData?.author?.avatarUrl || default_profile}
            alt=""
          />
        </div>
      </Link>

      {/* max-h-[83vh] */}

      <div className=" flex-1   overflow-hidden ">
        <Link
          to={authorTweetDetails}
          state={{
            author: tweetData?.author,
            postInfo: tweetData,
          }}
        >
          <div className="text-[#777777] justify-between text-sm flex gap-1 px-1 ">
            <div className="">
              <span className="mr-1 font-bold text-white truncate inline-block align-middle max-w-24 ">
                {tweetData?.author?.fullName}
              </span>
              <span className="mr-1 truncate inline-block align-middle max-w-28">
                {" "}
                @{tweetData?.author?.userName}{" "}
              </span>
              <span className="inline-block align-middle mr-1 ">·</span>
              <span className="inline-block align-middle mr-1 ">
                {parseInt(formatedDateinAgos) >= 8
                  ? formatedDate
                  : formatedDateinAgos}
              </span>
            </div>

            <div className="flex gap-1">
              <span>
                {" "}
                <GrokSvg color={"#777777"} width="w-5" />{" "}
              </span>
              <div className="relative">
                {" "}
                <EllipsisHorizontalIcon
                  onClick={handlePostOptions}
                  // onClick={() => deletemutation.mutate()}
                  className="cursor-pointer w-6 h-6  "
                />
                {loggedInUser?._id == tweetData?.author?._id ? (
                  isMoreOptionEnabled ? (
                    <div className="border backdrop-blur-2xl flex flex-col h-14  w-24 right-0 z-10 absolute rounded-xl ">
                      <div
                        onClick={handleEditPost}
                        className=" text-white w-full h-full text-center border-b mt-1 "
                      >
                        Edit
                      </div>
                      <div
                        onClick={(e) => {
                          e.preventDefault(), deletemutation.mutate();
                        }}
                        className=" text-white w-full h-full text-center mt-1 "
                      >
                        Delete
                      </div>
                    </div>
                  ) : null
                ) : null}
              </div>
            </div>
          </div>

          <div>
            <div
              ref={postRef}
              className={` overflow-hidden text-white
               ${isfullPostVisible ? "h-60" : "h-auto"}
               `}
              //  ${postRef?.current?.clientHeight > 240 ? "h-60" : "h-auto"  }
              //  `}
              // className={`text-white px-1 ${
              //   isfullPostVisible ? "h-auto" : "h-60"
              // }   overflow-hidden  `}
            >
              {tweetData?.text}
            </div>

            <div
              onClick={handlePostHeight}
              className={`text-blue-400 underline ${
                isfullPostVisible ? "block" : "hidden"
                // isfullPostVisible ? "block" : "hidden"
              } `}
            >
              Show more
            </div>
          </div>
          {tweetData?.media?.urls?.length == 0 ? (
            <div></div>
          ) : (
            <div
              onClick={handleCenterDivClick}
              className={` prevent max-w-lg ${
                tweetData?.media?.urls?.length > 1
                  ? "gap-0.5  grid grid-cols-2"
                  : null
              } 
            h-auto  mt-4 border border-[#595959] rounded-xl overflow-hidden`}
            >
              {tweetData?.media?.mediaType == "image"
                ? tweetData?.media?.urls?.map((img) => (
                    <div
                      key={img}
                      onClick={() =>
                        openPreview({ mediaType: "image", url: img })
                      }
                      className="relative aspect-square w-full"
                    >
                      {" "}
                      <img
                        className="absolute cursor-pointer top-0 left-0 w-full h-full object-cover"
                        src={img}
                        alt="Tweet media"
                      />
                    </div>
                  ))
                : tweetData?.media?.urls?.map((img) => (
                    <div
                      key={img}
                      onClick={() =>
                        openPreview({ mediaType: "video", url: img })
                      }
                      className="relative aspect-square w-full"
                    >
                      {" "}
                      <video
                        className="absolute cursor-pointer top-0 left-0 w-full h-full object-cover"
                        src={img}
                        alt="Tweet media"
                      />
                    </div>
                  ))}
            </div>
          )}
        </Link>
        <AdititonalTweetCardFeatures tweetData={tweetData} />
      </div>
    </div>
  );
}

export default TweetCard;
