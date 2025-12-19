import {
  ArrowUpTrayIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function AdititonalTweetCardFeatures({ tweetData }) {
    // console.log("this is data", tweetData);

  const [isLiked, setisLiked] = useState(false);
  const [likeCurrentCount, setlikeCurrentCount] = useState(tweetData?.likeCount)
  const commentUnderPostUrl = `/post/comment/${tweetData?._id}`;
  // let likeCurrentCount = tweetData?.likeCount

  // console.log("This is isthis comment",isThisIsComment)

  useEffect(() => {
    // console.log(" hello outside if ",tweetData.isLikedByYou)
    if (tweetData?.isLikedByYou) {
      // console.log(" hello from useeffect ",tweetData.isLikedByYou)

      setisLiked(true);
    } else {
      setisLiked(false);
    }
  }, [tweetData?.isLikedByYou]);

  const handleLikePost = (e) => {
    e.stopPropagation();
    axios
      .post(
        `/api/v1/users/like-user`,
        { authorId: tweetData.author._id, postId: tweetData._id },
        { withCredentials: true }
      )
      .then((response) =>{
        setlikeCurrentCount(prev => prev+1)
        setisLiked(true)})
      //   .then((response) => console.log("this is resposnse", response))
      .catch((error) => console.error(error));
  };

  const handleComment = () => {};

  const handleUnLikePost = () => {
    axios
      .delete(`/api/v1/users/unlike-user`, {
        data: { postId: tweetData._id },
        // { authorId: tweetData.author._id, postId: _id },
        withCredentials: true,
      })
      .then((response) => {
        setlikeCurrentCount(prev => prev-1)
        setisLiked(false)})

      .catch((error) => console.error(error));
  };

  return (
    <div className="flex text-[#777777] items-center justify-between mt-4  ">
      <Link
        className=""
        to={commentUnderPostUrl}
        state={{ author: tweetData?.author, postInfo: tweetData }}
      >
        <div onClick={handleComment}>
          <ChatBubbleOvalLeftIcon className=" w-5 h-5 " />{" "}
        </div>
      </Link>

      <div>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-5 h-5 "
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <g>
            <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
          </g>
        </svg>
      </div>

      <div className="flex gap-1 items-center justify-center ">
      <div className="pb-1  " > {likeCurrentCount } </div>  
        {isLiked ? (
          <HeartIcon
            onClick={handleUnLikePost}
            className="fill-red-600 text-red-600 cursor-pointer w-5 h-5"
          />
        ) : (
          <HeartIcon
            onClick={handleLikePost}
            className="cursor-pointer w-5 h-5"
          />
        )}
      </div>

      <div className="">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-6 h-6 "
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <g>
            <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" />
          </g>
        </svg>
      </div>

      <div>
        <BookmarkIcon className=" w-5 h-5" />{" "}
      </div>
      <div>
        <ArrowUpTrayIcon onClick={()=> navigator.clipboard.writeText(`http://localhost:5173/user/tweet/${tweetData?._id}`) } className="cursor-pointer w-5 h-5" />{" "}
      </div>
    </div>
  );
}

export default AdititonalTweetCardFeatures;
