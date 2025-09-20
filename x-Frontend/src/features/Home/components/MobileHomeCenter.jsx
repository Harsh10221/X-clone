import React from "react";
import TabBar from "../../../components/TabBar";
import PostFeed from "./PostFeed";

function MobileHomeCenter() {
  return (
    <div className="w-full h-full">
      <TabBar />

      <PostFeed />
    </div>
  );
}

export default MobileHomeCenter;
