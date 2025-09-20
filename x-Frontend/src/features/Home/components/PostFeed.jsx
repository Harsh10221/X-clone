import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TweetCard from "../../../components/TweetCard";
import axios, { Axios } from "axios";
import { useParams } from "react-router-dom";

function PostFeed({setIsFollowedByYou,handleGetFollowStatusFromChild}) {
  const [latestTweets, setlatestTweets] = useState(null);
  // Using useMutation (Post / Update Data)3
  const userNameFromUrl = useParams()?.username;
  // console.log("THis is param ", userNameFromUrl);

  const handleUsequeryfetching = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/users/get-latest-tweets",
      {
        withCredentials: true,
      }
    );
    // console.log("from api ", response);
    return response.data;
  };

  const handleUserProfilePosts = async () => {
    // console.log("hello from handleuserprofile", userNameFromUrl);
   try {
     const response = await axios.get(
       `http://localhost:8000/api/v1/users/getuser-posts/${userNameFromUrl}`,
       {
         withCredentials: true,
       }
     );
    //  console.log("from api ", response);
    //  console.log("from api ", response.data.result[0].isFollowedByYou);
     if (response.data.result[0].isFollowedByYou) {
      handleGetFollowStatusFromChild(true)
    }
    //  handleGetFollowStatusFromChild()
     return response.data;
 
   } catch (error) {
    console.log(error)
   }
  };

  // const [isFollowedByYou, setIsFollowedByYou] = useState(null)

  const {
    data: userPosts,
    isPending: postsPending,
    error: postsError,
  } = useQuery({
    queryKey: ["userPosts", userNameFromUrl],
    queryFn: handleUserProfilePosts,
    enabled: !!userNameFromUrl,
  });
  // console.log("this is ", userPosts);
  
  const { data, isPending, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: handleUsequeryfetching,
    
    enabled: !userNameFromUrl,
  });
  // console.log("this is ", data);

  // const { data, isPending, error } = useQuery({
  //   queryKey: ,
  //   queryFn: ,
  // });

  return (
    <div>
      {userNameFromUrl
        ? userPosts?.result?.map((card) =>
            card.parentTweetId ? null : <TweetCard tweetData={card} />
          )
        : data?.latestTweets?.map((card) =>
            card.parentTweetId ? null : <TweetCard tweetData={card} />
          )}
    </div>
  );
}

export default PostFeed;
