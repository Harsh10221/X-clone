import React from "react";

// The component now takes a `show` prop to control its state
const AnimatedComponent = ({
  children,
  show, // <-- New prop to control visibility
  blur = false,
  duration = 500,
  easing = "ease-out",
  className = "",
}) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
        opacity: show ? 1 : 0,
        filter: blur ? (show ? "blur(0px)" : "blur(5px)") : "none",
        transition: `all ${duration}ms ${easing}`,
        // This prevents the element from capturing mouse events when invisible
        pointerEvents: show ? "auto" : "none",

        borderRadius: "0.75rem", // rounded-xl
        backdropFilter: "blur(4px)", // backdrop-blur-sm
        fontWeight: 400, // font-normal
        fontFamily: "Roboto, sans-serif", // font-roboto
        padding: "1.25rem", // p-5
        // fontSize: "0.875rem", 
        color: "#ffffff",
        
      }}
    >
      <div className="w-7 h-10 flex-shrink-0 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="text-[#b53434]  w-full h-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      </div>
      {children}
    </div>
  );
};

export default AnimatedComponent;

{/* <AnimatedComponent
        show={iserror}
        duration={800}
        blur={true}
        className="absolute top-0 border border-blue-600/100 
                  bg-black/80 
                 
                  
                  
                  "
      >
        {errors?.avatar?.message}
      </AnimatedComponent> */}