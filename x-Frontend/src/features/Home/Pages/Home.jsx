import React, { useState } from "react";
import TabBar from "../../../components/TabBar";
import TweetCard from "../../../components/TweetCard";
import MobileNav from "../../profile/components/MobileNav";
import PostFeed from "../components/PostFeed";
import HamburgerMenu from "../../profile/components/HamburgerMenu";
import SearchBar from "../../../components/SearchBar";
import HashtagContainer from "../../../components/HashtagContainer";
import { useResponsive } from "../../auth/hooks/useResponsive";
import MobileHomeCenter from "../components/MobileHomeCenter";
import HomeCenter from "../components/HomeCenter";


function Home() {

const {isMobile} = useResponsive()

  return isMobile ? <MobileHomeCenter/> : <HomeCenter/>
  // return isMobile ? <HomeCenter/> : <MobileHomeCenter/>




    // <div className="h-full w-full bg-black  relative ">
      





    //    {/* Mobile
    //   <TabBar />

    //   <div className="flex  w-full h-full justify-center " >
    //     <div>
    //       <HamburgerMenu/>
    //     </div>

    //     <div className="w-2/5 overflow-y-auto scrollbar-hide " >
    //       <TabBar/>
    //       <div className="h-28 w-full border-b border-[#414141]" ></div>
    //       <PostFeed/>
    //     </div>

    //     <div className="overflow-y-auto scrollbar-hide w-1/4 border-l border-[#414141] gap-2 p-1 flex items-center flex-col " >
    //       <SearchBar width={"90%"} />
    //       <HashtagContainer width={"90%"} height={"55%"} />
    //       <HashtagContainer width={"90%"} height={"55%"} />

    //     </div>

    //   </div>
    //   <PostFeed/>

    //   Mobile
    //    <div className=" sticky w-full  bottom-0">
    //      <MobileNav />
    //    </div> */}

    // </div>
  
}

export default Home;
