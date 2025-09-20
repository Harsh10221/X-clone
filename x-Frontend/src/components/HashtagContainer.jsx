import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import React from "react";

function HashtagContainer({ width, height }) {
  return (
    <div
      style={{ width: width || "75%", height: height || "50%" }}
      className="w-full h-full border rounded-3xl border-[#3c3c3c] "
    >
    <div className="text-white font-bold px-4 py-3 text-xl" > What's happening </div>

    <div className="px-4 py-2 " >
    
    <div className="text-white   flex justify-between" >
        <span className="text-[#777777]" >Business & finance Trending</span>
        <EllipsisHorizontalIcon className="text-[#777777] w-5 h-5"/> 
    </div>

    <div className="flex flex-col" >
        <span className="text-white font-semibold " >Avalanche</span>
        <span className="text-[#777777]" >42.2k posts</span>
    </div>


    </div>

    <div className="px-4 py-2 " >
    
    <div className="text-white   flex justify-between" >
        <span className="text-[#777777]" >Business & finance Trending</span>
        <EllipsisHorizontalIcon className="text-[#777777] w-5 h-5"/> 
    </div>

    <div className="flex flex-col" >
        <span className="text-white font-semibold " >Avalanche</span>
        <span className="text-[#777777]" >42.2k posts</span>
    </div>


    </div>

    <div className="px-4 py-2 " >
    
    <div className="text-white   flex justify-between" >
        <span className="text-[#777777]" >Business & finance Trending</span>
        <EllipsisHorizontalIcon className="text-[#777777] w-5 h-5"/> 
    </div>

    <div className="flex flex-col" >
        <span className="text-white font-semibold " >Avalanche</span>
        <span className="text-[#777777]" >42.2k posts</span>
    </div>


    </div>

    <div className="px-4 py-2 " >
    
    <div className="text-white   flex justify-between" >
        <span className="text-[#777777]" >Business & finance Trending</span>
        <EllipsisHorizontalIcon className="text-[#777777] w-5 h-5"/> 
    </div>

    <div className="flex flex-col" >
        <span className="text-white font-semibold " >Avalanche</span>
        <span className="text-[#777777]" >42.2k posts</span>
    </div>


    </div>


    </div>
  );
}

export default HashtagContainer;
