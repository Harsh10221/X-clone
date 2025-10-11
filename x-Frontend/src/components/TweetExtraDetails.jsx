import React, { useEffect, useState } from "react";
import TweetCard from "./TweetCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function TweetExtraDetails() {
  const navigate = useNavigate();
  const [tweetDataWithId, setTweetDataWithId] = useState(null)
  const userIdFromUrl = useParams();
  const location = useLocation()?.state;
  // console.log("this is locatinon ", tweetDataWithId?.[0]);

  // console.log("this is param ", userIdFromUrl);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/v1/users/find-post-withid/${userIdFromUrl.userId}`,
        { withCredentials: true }
      )
      .then((res) => { 
        setTweetDataWithId(res.data.result)
        // console.log(res)
        })
      .catch((err) => console.error(err));
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/users/get-postcomments/${location ? location?.postInfo?._id : userIdFromUrl.userId }`,
        // `http://localhost:8000/api/v1/users/get-postcomments/${location?.postInfo?._id}`,
        { withCredentials: true }
      );
      // console.log("this is response", response);
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
    <div className="md:w-2/5 overflow-y-auto scrollbar-hide w-full h-full ">
      <div className=" h-12 w-full border-b border-[#313131] flex gap-4 items-center ">
        <ArrowLeftIcon
          // onClick={() => navigate(-1)}
          onClick={() => navigate("/home")}
          className="text-white ml-3 w-5 h-5 items-center"
        />
        <div className="text-white  font-semibold text-[17px]">Post</div>
      </div>

      <TweetCard tweetData={ location ?  location?.postInfo : tweetDataWithId?.[0]} />
      <div>
        <div className="h-10 w-full bg-black flex items-center pl-4 text-white text-pretty border-b border-[#555555]  ">
          Comments
        </div>
        {postTweetComment?.map((post) => (
          <TweetCard tweetData={post} />
        ))}
      </div>
    </div>
  );
}

export default TweetExtraDetails;
