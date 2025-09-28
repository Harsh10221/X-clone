import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { WebSocketServer } from "ws";

// require('dotenv').config();
// In app.js or index.js
import fs from "fs";
import path from "path";

const app = express();

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

const server = http.createServer(app);

//creating a websockt server and atteched it to the http server
const wss = new WebSocketServer({ server });

//a map to store connections , mapping userid to websoket obj
export const clients = new Map();


wss.on("connection", (ws) => {

	console.log("✅ Client connected");

	ws.on("message", (message) => {

		try {
			const data = JSON.parse(message);

			if (data.type == "authenticate" && data.payload.userId) {
				const userId = data.payload.userId;
				clients.set(userId, ws);
				
				console.log("User authenticated and connected", userId);
			}
		} catch (error) {
			console.error("Error parsing message ", error);
		}
	});

	ws.on("close", () => {
		for (const [userId, clientWs] of clients.entries()) {
			if (clientWs === ws) {
				clients.delete(userId);
				console.log(`❌ User ${userId} disconnected.`);
				break;
			}
		}
	});
	ws.on("error", console.error);
});



//browser bundles the form data this middleware encode and
// made available in our request.body


//routes

import userRouter from "./routes/user.routes.js";
// import { json } from "body-parser";
// import { JSON } from "mysql/lib/protocol/constants/types.js";

app.use("/api/v1/users", userRouter);

server.listen(8000, () => {
	console.log("Server running on http://localhost:8000");
});

export { app };
