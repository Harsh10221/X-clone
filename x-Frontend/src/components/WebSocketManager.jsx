import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useWebSocket from "react-use-websocket";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const SOCKET_URL = "ws://localhost:8000";

export function WebSocketManager() {
  const selector = useSelector((state) => state?.user?.userInfo?._id);
  // console.log("this is selctort",selector)
  const queryClient = useQueryClient();

  const { sendMessage, lastJsonMessage } = useWebSocket(SOCKET_URL, {
    onOpen: () => {
      console.log("Websocket connection establish");

      const userId = selector;

      sendMessage(
        JSON.stringify({
          type: "authenticate",
          payload: { userId: userId },
        })
      );
    },
    shouldReconnect: (CloseEvent) => true,
  });
  
  useEffect(() => {
    if (lastJsonMessage !== null) {
      console.log("Received websocket message", lastJsonMessage);

      if (lastJsonMessage.type === "NEW_POST") {
        toast.success(lastJsonMessage.payload.message);

        queryClient.invalidateQueries({ queryKey: ["tweets"] });
      }
    }
  }, [lastJsonMessage, queryClient]);

  return null;
}
