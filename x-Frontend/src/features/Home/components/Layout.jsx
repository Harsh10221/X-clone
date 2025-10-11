import React, { useEffect, useState } from "react";
import HamburgerMenu from "../../profile/components/HamburgerMenu";
import SearchBar from "../../../components/SearchBar";
import HashtagContainer from "../../../components/HashtagContainer";
import { Outlet } from "react-router-dom";
import TabBar from "../../../components/TabBar";
import PostFeed from "./PostFeed";
import { useResponsive } from "../../auth/hooks/useResponsive";
import MobileNav from "../../profile/components/MobileNav";
import axios from "axios";
import MiniUserProfile from "../../../components/MiniUserProfile";

function Layout() {
  const { isMobile } = useResponsive();
  const [searchTerm, setsearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const deDouncingFn = setTimeout(() => {
      setResults(null);
      setIsError(null);
      if (searchTerm) {
        axios
          .get(`http://localhost:8000/api/v1/users/find-user/${searchTerm}`)
          .then((response) => setResults(response.data))
          .catch((err) => setIsError(err.response.data));
      }
    }, 1000);

    return () => clearTimeout(deDouncingFn);
  }, [searchTerm]);

  const handleTheUserInputFromChild = (input) => {
    setsearchTerm(input);
    console.log("THis is user input ser", input);
  };
  
  return (
    <div className="h-full w-full bg-black  relative ">
      {isMobile ? (
        <div className="h-full w-full">
          {/* <TabBar /> */}

          <Outlet />

          {/* <PostFeed /> */}

          <div className=" fixed w-full  bottom-0">
            <MobileNav />
          </div>
        </div>
      ) : (
        <div className="flex   w-full h-full justify-center ">
          <div className="  ">
            <HamburgerMenu />
          </div>

          <Outlet />

          <div className="relative  overflow-y-auto scrollbar-hide w-1/4 border-l border-[#414141] gap-2 p-1 flex items-center flex-col ">
            <SearchBar
              handleTheUserInputFromChild={handleTheUserInputFromChild}
              width={"90%"}
            />

            <div
              className={
                searchTerm
                  ? " bg-black absolute w-[90%] h-max-1/2 h-auto top-14 border overflow-y-auto scrollbar-hide  border-[#414141] rounded-2xl"
                  : "hidden"
              }
            >
              {results?.success ? (
                results?.results?.map((item) => <MiniUserProfile item={item} />)
              ) : (
                <div className="w-full h-full flex items-start justify-center text-white ">
                  {isError?.message}
                </div>
              )}
            </div>
            <HashtagContainer width={"90%"} height={"55%"} />
            <HashtagContainer width={"90%"} height={"55%"} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
