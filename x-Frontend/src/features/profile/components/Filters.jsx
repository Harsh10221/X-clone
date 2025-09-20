import React from "react";

function Filters({ options, activefilter, setActivefilter }) {
  return (
    <div className="flex  border-b border-[#3b3b3b]  items-center gap-x-6 scrollbar-hide font-roboto font-medium text-sm  w-full text-[#7e7e7e] overflow-x-auto h-full">
      {/* <div className=' ' >Post</div> */}
      {options?.map((option) => (
        <div
          key={option}
          onClick={() => setActivefilter(option)}
          className={`flex relative  flex-col z-20 cursor-pointer w-full h-full p-3 ${option === activefilter && "font-bold text-white "} `}
        >
          {option}
          {option === activefilter ? (
            <div className="bg-blue-500  absolute bottom-0 left-0 rounded-lg h-1  w-full  ">
            
            </div>
          ) : null}
        </div>
      ))}

      {/* <div>Replies</div>
      <div>Highlights</div>
      <div>Articles</div>
      <div>Media</div>
      <div>Likes</div>
      */}
    </div>
  );
}

export default Filters;
