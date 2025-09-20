import React from "react";
import HamburgerMenu from "../../profile/components/HamburgerMenu";
import SearchBar from "../../../components/SearchBar";
import HashtagContainer from "../../../components/HashtagContainer";
import { Outlet } from "react-router-dom";
import TabBar from "../../../components/TabBar";
import PostFeed from "./PostFeed";
import { useResponsive } from "../../auth/hooks/useResponsive";
import MobileNav from "../../profile/components/MobileNav";

function Layout() {
  const { isMobile } = useResponsive();
  return (
    <div className="h-full w-full bg-black  relative ">
      {isMobile ? (
       
       <div className="h-full w-full">
          {/* <TabBar /> */}
        
        <Outlet/>
        
          {/* <PostFeed /> */}

          <div className=" fixed  w-full  bottom-0">
            <MobileNav />
          </div>
        </div>

      ) : (
        <div className="flex  w-full h-full justify-center ">
          <div>
            <HamburgerMenu />
          </div>

          <Outlet />

          <div className="overflow-y-auto scrollbar-hide w-1/4 border-l border-[#414141] gap-2 p-1 flex items-center flex-col ">
            <SearchBar width={"90%"} />
            <HashtagContainer width={"90%"} height={"55%"} />
            <HashtagContainer width={"90%"} height={"55%"} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
