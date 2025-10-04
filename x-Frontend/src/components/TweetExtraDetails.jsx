import React, { useEffect } from "react";
import TweetCard from "./TweetCard";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function TweetExtraDetails() {
  const navigate = useNavigate();
  const location = useLocation()?.state;
  // console.log("this is locatinon ", location);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/users/get-postcomments/${location?.postInfo?._id}`,
        { withCredentials: true }
      );
      console.log("this is response", response);
      return response?.data?.result;
    } catch (error) {
      console.log("There was a error while featching", error);
    }
  };
  const {
    data: postTweetComment,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["postComment"],
    queryFn: fetchComments,
  });

  return (
    <div className="md:w-2/5 w-full h-full ">
   
      <div className=" h-12 w-full border-b border-[#313131] flex gap-4 items-center ">
        <ArrowLeftIcon
          // onClick={() => navigate(-1)}
          onClick={() => navigate("/home")}
          className="text-white ml-3 w-5 h-5 items-center"
        />
        <div className="text-white  font-semibold text-[17px]">Post</div>
      </div>

      <TweetCard tweetData={location?.postInfo} />
      <div>
        <div className="h-10 w-full bg-black flex items-center pl-4 text-white text-pretty border-b border-[#555555]  " >Comments</div>
        {postTweetComment?.map((post) => (
          <TweetCard tweetData={post} />
        ))}
      </div>
    </div>
  );
}

export default TweetExtraDetails;
