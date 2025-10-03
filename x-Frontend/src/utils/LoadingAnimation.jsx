import { OrbitProgress } from "react-loading-indicators";

import React from "react";

function LoadingAnimation() {
  return (
    <div className="w-full flex items-center justify-center h-full" >
      <OrbitProgress
        dense
        color="#0045d5"
        size="small"
        text=""
        textColor="#ff0303"
      />{" "}
    </div>
  );
}

export default LoadingAnimation;
