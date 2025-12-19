import React, { useEffect, useId, useState } from "react";
import MobileNav from "../components/MobileNav";
import Filters from "../components/Filters";
import { ArrowLeftIcon, CalendarDaysIcon } from "@heroicons/react/20/solid";
import default_profile from "../../../assets/default_profile.png";
import default_banner from "../../../assets/default_banner.jpg";
import HamburgerMenu from "../components/HamburgerMenu";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import TweetCard from "../../../components/TweetCard";
import PostFeed from "../../Home/components/PostFeed";

function Profile() {
  const [activefilter, setActivefilter] = useState("Posts");
  const [userPosts, setUserPosts] = useState();
  const [isFollow, setIsFollow] = useState(false);
  const [anotherUserProfileData, setanotherUserProfileData] = useState(
    useLocation()?.state?.author
  );
  const [isFollowedByYou, setIsFollowedByYou] = useState(null);

  const userInfo = useSelector((state) => state.user.userInfo);

  const { username } = useParams();

  useEffect(() => {
    // console.log("This is another profile", anotherUserProfileData);
    if (anotherUserProfileData?._id == userInfo?._id) {
      setanotherUserProfileData(null);
    }
  }, []);

  // console.log("This is userinfo", userInfo);
  // console.log("This is userpost",userPosts );

  // const anotherUserProfileData = useLocation()?.state?.author;

  // console.log("This is antoherprofile",anotherUserProfileData)

  const JoinedDate = new Date(
    anotherUserProfileData
      ? anotherUserProfileData.createdAt
      : userInfo.createdAt
  )
    .toDateString()
    .slice(4, 15);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home");
  };

  const handleGetFollowStatusFromChild = (status) => {
    setIsFollowedByYou(status);
  };

  const handleFollowUser = () => {
    axios
      .post(
        `/api/v1/users/follow-user`,
        { followerId: userInfo._id, followingId: anotherUserProfileData._id },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        anotherUserProfileData.followers++;
        setIsFollowedByYou(true);
      })
      .catch((error) => console.error(error));
  };

  const handleUnFollowUser = () => {
    axios
      .post(
        `/api/v1/users/unfollow-user `,
        { followerId: userInfo._id, followingId: anotherUserProfileData._id },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        anotherUserProfileData.followers--;

        setIsFollowedByYou(false);
      })
      // .then((response) => setIsFollow(false))
      // .then((response) => (response.status == 200 ? setIsFollow(true) : null))
      .catch((error) => console.error(error));
  };

  const handleProfileUpdate = () => {
    navigate("/edit-profile");
  };

  const filterOptions = [
    "Posts",
    "Replies",
    "Highlights",
    "Articles",
    "Media",
    "Like",
  ];

  return (
    <div className="relative md:w-2/5  w-full h-full flex  flex-col  ">
      <div className=" flex  items-center justify-start p-5 gap-6 w-full h-14 bg-black">
        <ArrowLeftIcon onClick={handleBack} className="text-white h-5 w-5" />

        <div className="text-white  ">
          <div className="font-bold text-base font-roboto ">
            {anotherUserProfileData
              ? anotherUserProfileData.userName
              : userInfo.userName}
          </div>
          <div className="font-extralight text-[#969595] font-roboto">
            {userPosts} posts
          </div>
        </div>
      </div>

      <div className="flex-1 relative scrollbar-hide overflow-y-auto">
        <div className="  h-32">
          <img
            className="w-full h-full"
            src={
              anotherUserProfileData
                ? anotherUserProfileData.bannerUrl
                : userInfo?.bannerUrl
                ? userInfo.bannerUrl
                : default_banner
            }
            alt=""
            srcSet=""
          />
        </div>

        <img
          className="h-14 w-14 rounded-full absolute top-24 left-3  "
          src={
            anotherUserProfileData
              ? anotherUserProfileData.avatarUrl
              : userInfo.avatarUrl
          }
          alt=""
          srcSet=""
        />

        <div className=" h-44">
          <div className="flex p-2 px-4   justify-between">
            <div className="  "></div>
            <div className="w-28 h-8  "></div>
            {anotherUserProfileData ? (
              isFollowedByYou ? (
                <button
                  onClick={handleUnFollowUser}
                  className="bg-transparent   border  w-28 h-8 rounded-2xl font-bold text-white"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={handleFollowUser}
                  className="bg-white   border  w-28 h-8 rounded-2xl font-bold text-black"
                >
                  Follow
                </button>
              )
            ) : (
              <button
                className={`bg-transparent  border  w-28 h-8 rounded-2xl font-semibold text-white`}
                onClick={handleProfileUpdate}
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="text-[#7e7e7e] flex flex-col gap-2 px-3  ">
            <div>
              <div className="font-semibold text-white text-lg  ">
                {anotherUserProfileData
                  ? anotherUserProfileData.userName
                  : userInfo.fullName}
              </div>
              <div className="">
                @
                {anotherUserProfileData
                  ? anotherUserProfileData.userName
                  : userInfo.userName}
              </div>
            </div>

            <div className="flex gap-1">
              {" "}
              <CalendarDaysIcon className="text-[#7e7e7e] w-6 h-6" />
              <span>{JoinedDate}</span>
            </div>

            <div>
              <span className="mr-2 ">
                {" "}
                <span className="text-white">
                  {anotherUserProfileData
                    ? anotherUserProfileData.followings
                    : userInfo.followings}
                </span>{" "}
                Following{" "}
              </span>
              <span>
                <span className="text-white">
                  {anotherUserProfileData
                    ? anotherUserProfileData.followers
                    : userInfo.followers}
                </span>{" "}
                Followers
              </span>
            </div>
          </div>
        </div>

        <div className="  sticky flex-1 bg-black z-50  top-0 h-12">
          <Filters
            options={filterOptions}
            activefilter={activefilter}
            setActivefilter={setActivefilter}
          />
        </div>

        <div className="flex-1  w-full bg-black  ">
          <PostFeed
            setUserPosts={setUserPosts}
            handleGetFollowStatusFromChild={handleGetFollowStatusFromChild}
            setIsFollowedByYou={setIsFollowedByYou}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
