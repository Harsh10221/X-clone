import React from "react";

const InputBox = React.forwardRef (({ type,name,width,text,...props },ref) => {
  return (
    <div className="flex items-center justify-center">
      <div className={`group relative border-2 rounded-md border-[#737373]  h-18 flex flex-col focus-within:border-blue-500 transition-colors ${ width || "w-80" }    `}>
        <div className=" text-sm text-[#737373] mt-2 ml-3 group-focus-within:text-blue-500 transition-colors ">
          {text}
        </div>



        <input
          
          ref={ref} {...props}
          className="bg-transparent p-2 ml-1 w-full h-full text-white outline-none "
          type={type || "text"}
          name={name}
        ></input>
      </div>
    </div>
  );
})

export default InputBox;


