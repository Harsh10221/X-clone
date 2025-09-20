import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

function SearchBar({width}) {
  return (
    // <div className="flex p-1 items-center justify-center ">
      <div style={{ width: width || '75%' }} className={`h-11 w-full  flex items-center flex-shrink-0  border border-[#3b3b3b] rounded-3xl `}>
        <div  className="w-10  flex justify-center ">
          <MagnifyingGlassIcon className="text-gray-500 w-4 h-4" />
        </div>

        <input
          className="text-white placeholder:text-white h-full w-full bg-transparent mb-1  rounded-3xl outline-none  "
          type="text"
          placeholder="Search"
        />
      </div>
    // </div>
  );
}

export default SearchBar;
