import {
  BellIcon,
  EnvelopeIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import { HomeIcon as HomeOutline } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon as SearchSolid } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon as SearchOutline } from "@heroicons/react/24/outline";
import { EnvelopeIcon as EnvelopeSolid } from "@heroicons/react/24/solid";
import { EnvelopeIcon as EnvelopeOutline } from "@heroicons/react/24/outline";
import { BellIcon as BellSolid } from "@heroicons/react/24/solid";
import { BellIcon as BellOutline } from "@heroicons/react/24/outline";
import { UserGroupIcon as UserGroupSolid } from "@heroicons/react/24/solid";
import { UserGroupIcon as UserGroupOutline } from "@heroicons/react/24/outline";

import GrokSvg from "./GrokSvg";
import PostCircleSvg from "./PostCircleSvg";
import { data, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { resetNotificationCountToZero } from "../../Slices/notificationSlice";

function MobileNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const unReadNotificationsCount = useSelector(
    (state) => state?.notification?.unReadNotificationCount
  );

  const handleRedirectToNotification = () => {
    navigate("/notifications");
    dispatch(resetNotificationCountToZero());
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleSearch = () => {
    navigate("/search");
  };

  return (
    <div className=" flex items-center justify-between p-5 border-t border-[#3b3b3b]  bottom-0 w-full h-12 bg-black ">
      {/* <HomeIcon className="h-6 w-6 text-white" /> */}
      <HomeOutline onClick={handleHome} className="h-6 w-6 text-white" />

      <SearchSolid onClick={handleSearch} className="h-6 w-6 text-white" />

      {/* <SearchOutline strokeWidth={3} className="h-6 w-6 text-white" /> */}

      <GrokSvg />

      {/* <BellSolid className="h-6 w-6 text-white" /> */}
      <div className="relative">
        {unReadNotificationsCount > 0 ? (
          <div className="absolute h-2 w-2 rounded-full right-1 z-10 bg-red-500 "></div>
        ) : null}

        <BellOutline
          onClick={handleRedirectToNotification}
          className="h-6 w-6 text-white"
        />
      </div>

      <EnvelopeOutline className="h-6 w-6 text-white" />
      {/* <EnvelopeSolid className="h-6 w-6 text-white" /> */}

      {/* <UserGroupSolid className="h-6 w-6 text-white" /> */}

      <UserGroupOutline className="h-6 w-6 text-white" />

      {/* <PostCircleSvg/> */}
    </div>
  );
}

export default MobileNav;
