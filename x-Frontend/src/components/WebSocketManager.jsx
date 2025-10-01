import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useWebSocket from "react-use-websocket";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { stringify } from "uuid";
import { postNotification } from "../features/Slices/notificationSlice";

// export function WebSocketManager() {
//   const selector = useSelector((state) => state?.user?.userInfo?._id);
//   // console.log("this is selctort",selector)
//   const queryClient = useQueryClient();

//   const { sendMessage, lastJsonMessage } = useWebSocket(SOCKET_URL, {
//     onOpen: () => {
//       console.log("Websocket connection establish");

//       const userId = selector;

//       sendMessage(
//         JSON.stringify({
//           type: "authenticate",
//           payload: { userId: userId },
//         })
//       );
//     },
//     shouldReconnect: (CloseEvent) => true,
//   });

//   useEffect(() => {
//     if (lastJsonMessage !== null) {
//       console.log("Received websocket message", lastJsonMessage);

//       if (lastJsonMessage.type === "NEW_POST") {
//         toast.success(lastJsonMessage.payload.message);

//         queryClient.invalidateQueries({ queryKey: ["tweets"] });
//       }
//     }
//   }, [lastJsonMessage, queryClient]);

//   return null;
// }
const SOCKET_URL = "ws://localhost:8000";

export const WebSocketManager = () => {
  // const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  // const SOCKET_URL = isLoggedIn ? "ws://localhost:8000" : null;
  const dispatch = useDispatch();

  const { sendMessage, lastJsonMessage } = useWebSocket(SOCKET_URL, {
    onOpen: () => {
      console.log("Websocket connection eatablished");
      sendMessage(JSON.stringify({ type: "authenticate" }));
    },

    shouldReconnect: (CloseEvent) => true,
  });

  useEffect(() => {
    // console.log("This was message", lastJsonMessage);
    dispatch(postNotification(lastJsonMessage?.payload));
  }, [lastJsonMessage]);

  return null;
};
