import {
  ArrowRightStartOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  BanknotesIcon,
  BellAlertIcon,
  BoldIcon,
  BoltIcon,
  BookmarkIcon,
  BriefcaseIcon,
  Cog8ToothIcon,
  HomeIcon,
  NewspaperIcon,
  PlusIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import default_profile from "../../../assets/default_profile.png";
import Xsvg from "../../auth/components/Xsvg";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../auth/hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../../Slices/userSlice";

function HamburgerMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isMobile } = useResponsive();
  const userInfo = useSelector((state) => state.user.userInfo);
  // console.log("this is userinfor ",userInfo)

  // console.log("THis is mobile value " ,!(isMobile))

  const handlePofile = () => {
    // navigate("/profile");
    isMobile ? (
    navigate(`/profile/${userInfo?._id}`) 
  ) :
  (navigate(`/home/profile/${userInfo?._id}`) 
)
    // navigate("/home/profile");
  };

  const handleLogOutRedirect = () => {
    console.log("i am aclled ");
    dispatch(logout());
    navigate("/login");
  };

  const handleLogOutout = async () => {
    console.log("i am clicked ", localStorage);
    //   document.cookie =
    //     "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      // await localStorage.removeItem("persist:root");
      // () => dispatch(logout())
      handleLogOutRedirect();
      // () => navigate("/login")
      // console.log("This is from logout",response);
    } catch (error) {
      throw error;
    }
  };

  const handleRedirectToNotification = () => {
    navigate("/home/notifications")
  }

  const handleRedirectToHome = () => {
    navigate("/home")
  }

  const menuItems = [
    {
      Icon: Xsvg,
      isValid: isMobile,
      ownWidth: "10",
    },
    {
      name: "Home",
      Icon: HomeIcon,
      isValid: isMobile,
      customFunction: handleRedirectToHome,

    },
    {
      name: "Profile",
      Icon: UserIcon,
      customFunction: handlePofile,
    },
    {
      name: "Notification",
      Icon: BellAlertIcon,
      customFunction: handleRedirectToNotification,

    },
    {
      name: "Premium",
      Icon: Xsvg,
    },
    {
      name: "Communities",
      Icon: UserGroupIcon,
    },
    {
      name: "List",
      Icon: NewspaperIcon,
    },
    {
      name: "Bookmark",
      Icon: BookmarkIcon,
    },
    {
      name: "Verified Orgs",
      Icon: BoltIcon,
    },
    {
      name: "Monetization",
      Icon: BanknotesIcon,
    },
    {
      name: "Ads",
      Icon: ArrowTopRightOnSquareIcon,
    },
    
    {
      name: "Settings and privacy",
      Icon: Cog8ToothIcon,
    },

    {
      name: "Log out",
      Icon: ArrowRightStartOnRectangleIcon,
      customFunction: handleLogOutout,
    },
  ];

  return (
    // shadow-[0_0_20px_rgba(59,130,246,0.8)]
    // shadow-[0_4px_50px_rgba(255,255,255,0.5)]
    // <div className="flex bg-amber-700 w-10 h-10 " >

    <div
      className={`h-full border-r border-[#3d3d3d] flex flex-col  shadow-[0px_0px_10px_rgba(255,255,255,0.6)] md:shadow-none   box-border `}
    >
      <div className="  h-full flex flex-col overflow-y-auto  w-full bg-black   ">
        {isMobile ? (
          <div className=" h-32 p-3 space-y-2 ">
            <div className="flex justify-between ">
              <img
                className="h-10 rounded-full"
                src={userInfo?.avatarUrl}
                alt=""
                srcset=""
              />
              <div className="h-8 w-8  flex items-center justify-center rounded-full border border-[#6b6b6b] text-center ">
                <PlusIcon className="text-white text-center h-4 w-4" />
              </div>
            </div>

            <div className="text-white   ">
              <span className="font-bold  ">{userInfo?.fullName}</span>
              <br />
              <span className="text-[#737373]  ">@{userInfo?.userName}</span>
            </div>

            <div className="space-x-2  text-white">
              <span className="font-bold">
                {userInfo?.followings}
                <span className="text-[#737373]  font-normal ">Following </span>
              </span>
              <span className="font-bold">
                {userInfo?.followers}
                <span className="text-[#737373] font-normal "> Followers</span>
              </span>
            </div>
          </div>
        ) : null}

        <div className="  flex flex-col   gap-5 mt-9 flex-1 items-center ">
          {menuItems.map((item) => {
            const { Icon, name, customFunction, isValid } = item;
            return (
              <div
                key={name}
                onClick={customFunction}
                className={` ${
                  isValid ? "hidden" : "block"
                }  flex cursor-pointer text-white w-full h-8 p-4  items-center gap-6 `}
              >
                <Icon width="w-6" className={` w-6 h-6`} />
                <span className="font-bold text-xl ">{name}</span>
              </div>
            );
          })}

          <button
            onClick={() => navigate("/post")}
            className="bg-white w-11/12 font-bold  h-12 rounded-full "
          >
            Post
          </button>
        </div>
      </div>
    </div>

    //   <div className="flex-1 bg-green-500">hello</div>
    // </div>
  );
}

export default HamburgerMenu;
