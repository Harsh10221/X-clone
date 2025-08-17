import { OrbitProgress } from "react-loading-indicators";

import React from "react";

function LoadingAnimation() {
  return (
    <div>
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
