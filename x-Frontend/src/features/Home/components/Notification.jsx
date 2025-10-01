import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import TweetCard from "../../../components/TweetCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Notification() {
  const [posts, setPosts] = useState([]);
  // const [dataFromRedux, setDataFromRedux] = useState(second)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dataFromRedux = useSelector(
    (state) => state?.notification?.tweetDataFromRedux
  );


  const handleBackToHome = () => {
    navigate("/home");
  };

  return (
    <div className="w-full  h-full">
      <div className="flex h-14 items-center gap-3 pl-4 border-b border-[#373737]  ">
        <ArrowLeftIcon
          onClick={handleBackToHome}
          className="text-white w-6 h-6"
        />
        <div className="text-white">Notifications</div>
      </div>
      {dataFromRedux?.map((post) => (
        // console.log("this is from map",post?.post)
        <TweetCard tweetData={post?.post} />
      ))}
    </div>
  );

}

export default Notification;
