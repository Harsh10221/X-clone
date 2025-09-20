import React from "react";
import { Link } from "react-router-dom";

function MiniUserProfile({ item }) {
  console.log(item);

  const handleRedirectToUserProfile = () => {};

  const UserProfileUrl = `/profile/${item._id}`;

  return (
    <Link
      to={UserProfileUrl}
      state={{
        author: item,
      }}
    >
      <div
        onClick={handleRedirectToUserProfile}
        className="text-white w-full  flex gap-3 items-center  h-14  "
      >
        <div className="w-10 h-10 ml-4  bg-green-500 rounded-full overflow-hidden ">
          <img
            className="w-full h-full object-cover"
            src={item.avatarUrl}
            alt=""
          />
        </div>

        <div>
          <div className="text-white  text-sm font-semibold ">
            {" "}
            {item.fullName}{" "}
          </div>
          <div className="text-[#919191] leading-tight  ">
            {" "}
            @{item.userName}{" "}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MiniUserProfile;
