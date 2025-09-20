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
import { useNavigate } from "react-router-dom";

function MobileNav() {

    const navigate = useNavigate()


  const handleHome = () =>{
    navigate("/home")
  }

  return (
    <div className=" flex items-center justify-between p-5 border-t border-[#3b3b3b]  bottom-0 w-full h-12 bg-black ">
      {/* <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 fill-white"
      >
        <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.639c.51 0 .928-.41.928-.913V7.904c0-.301-.158-.584-.408-.758zM20 20l-4.5.01.011-7.097c0-.502-.418-.913-.928-.913H9.44c-.511 0-.929.41-.929.913L8.5 20H4V8.773l8.011-5.342L20 8.764z" />
      </svg> */}

      {/* <HomeIcon className="h-6 w-6 text-white" /> */}
      <HomeOutline onClick={handleHome} className="h-6 w-6 text-white" />

      <SearchSolid className="h-6 w-6 text-white" />
      {/* <SearchOutline strokeWidth={3} className="h-6 w-6 text-white" /> */}

      <GrokSvg />

      {/* <BellSolid className="h-6 w-6 text-white" /> */}
      <BellOutline className="h-6 w-6 text-white" />

      <EnvelopeOutline className="h-6 w-6 text-white" />
      {/* <EnvelopeSolid className="h-6 w-6 text-white" /> */}

      {/* <UserGroupSolid className="h-6 w-6 text-white" /> */}

      <UserGroupOutline className="h-6 w-6 text-white" />

      {/* <PostCircleSvg/> */}
    </div>
  );
}

export default MobileNav;
