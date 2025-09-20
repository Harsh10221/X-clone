import React, { useEffect, useState } from "react";
import default_profile from "../assets/default_profile.png";
import GrokSvg from "../features/profile/components/GrokSvg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
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

dayjs.extend(relativeTime);


function TweetCard({ tweetData }) {
  // console.log("this is from teweetdata",tweetData)
  const [isfullPostVisible, setIsFullPostVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { selectedImage, openPreview, closePreview } = useImagePreview();
 
  const authorProfileUrl = `/profile/${tweetData.author._id}`;

 
  const postRef = useRef(null);

  const handlePostHeight = () => setIsFullPostVisible((prev) => !prev);
  const handleImageLoad = () => setIsImageLoaded(true);

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

  let formatedDateinAgos = dayjs(tweetData.createdAt)
    .fromNow()
    .replace(" days ago", "d")
    .replace("a day ago", "1d");

  let formatedDate = dayjs(tweetData.createdAt).format("MMM D");

  return (
    <div className="w-full  border-b border-[#878787] bg-black p-2 h-auto   flex   ">
      {selectedImage ? (
        <div className="h-screen w-screen cursor-pointer  flex items-center justify-center  top-0 left-0 fixed  z-50  bg-black">
       
          <XMarkIcon
            onClick={closePreview}
            className="absolute cursor-pointer z-50 top-4 left-4 text-white w-6 h-6"
          />

          <div className=" w-auto  absolute z-40   ">
            <img
              className="w-full h-full"
              onLoad={handleImageLoad}
              src={isImageLoaded ? selectedImage : default_profile}
              alt=""
            />
          </div>
        </div>
      ) : null}

      {/* <div className='bg-red-950 w-14 max-h-[83vh] ' > */}

      <Link to={authorProfileUrl} state={{ author: tweetData.author,postInfo : tweetData,fullData :tweetData }}>
      {/* <Link to={authorProfileUrl} state={{ author: tweetData.author,postInfo : tweetData }}> */}
        <div
          // onClick={handleRedirectToUserProfile}

          className=" overflow-hidden mr-2 rounded-full w-10 h-10 flex-shrink-0 "
        >
          <img
            className="w-full object-cover h-full  "
            src={tweetData?.author?.avatarUrl || default_profile}
            alt=""
            srcset=""
          />
        </div>
      </Link>

      {/* max-h-[83vh] */}
      <div className=" flex-1    overflow-hidden ">

        <div className="text-[#777777] justify-between text-sm flex gap-1 px-1 ">
          <div className="">
            <span className="mr-1 font-bold text-white truncate inline-block align-middle max-w-24 ">
              {tweetData?.author?.fullName}
            </span>
            <span className="mr-1 truncate inline-block align-middle max-w-28">
              {" "}
              @{tweetData.author.userName}{" "}
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
            <span>
              {" "}
              <EllipsisHorizontalIcon className=" w-6 h-6" />{" "}
            </span>
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

        <div
          className={`max-w-lg ${
            tweetData.media.urls.length > 1 ? "gap-0.5  grid grid-cols-2" : null
          } h-auto  mt-4 border border-[#595959] rounded-xl overflow-hidden`}
        >
          {tweetData.media.urls.map((img) => (
            // console.log("This is img",img)
            <div
              key={img}
              onClick={() => openPreview(img)}
              className="relative aspect-square w-full"
            >
              {" "}
              <img
                className="absolute cursor-pointer top-0 left-0 w-full h-full object-cover"
                src={img}
                alt="Tweet media"
              />
            </div>
          ))}
        </div>

        <AdititonalTweetCardFeatures tweetData={tweetData} />
        
      </div>
    </div>
  );
}

export default TweetCard;
