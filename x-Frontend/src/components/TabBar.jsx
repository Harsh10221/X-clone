import React, { useState } from "react";
import default_profile from "../assets/default_profile.png";
import Xsvg from "../features/auth/components/Xsvg";
import HamburgerMenu from "../features/profile/components/HamburgerMenu";
import { useResponsive } from "../features/auth/hooks/useResponsive";
import { useSelector } from "react-redux";
// 4.9s commit
// 39ms render

function TabBar({}) {
  const [isHamburgerMenuvisible, setisHamburgerMenuvisible] = useState(false);

  const handleHamburgerMenu = () => setisHamburgerMenuvisible((prev) => !prev);
  const { isMobile } = useResponsive();
  const userAvatar = useSelector((state)=>state.user.userInfo.avatarUrl)

  return (
    <div className="w-full  relative h-28  md:h-10 border-b border-[#414141]  ">
      {isHamburgerMenuvisible && (
        <div className=" fixed  h-full  w-full flex z-50">
          <div className="">
            <HamburgerMenu />
            ok
          </div>

          <div
            onClick={handleHamburgerMenu}
            className="flex-1 h-screen    bg-[#639ddb36]   "
          ></div>
        </div>
      )}

      <div>
        {isMobile ? (
          <div>
            <div className="absolute  left-1/2 -translate-x-1/2 mt-3  ">
              <Xsvg />
            </div>

            <div className="p-3 ">
              <div
                onClick={handleHamburgerMenu}
                className="w-10  h-10   rounded-full overflow-hidden "
              >
                <img
                  className="w-full  h-full  object-contain "
                  src={userAvatar}
                  alt=""
                  srcSet=""
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="text-white  w-full flex justify-between mt-3 px-14 ">
          <span>For you</span>
          <span>Following</span>
        </div>

      </div>
    </div>
  );
}

export default TabBar;
