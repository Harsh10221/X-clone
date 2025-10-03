import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import cookie from "cookie";
import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";

// require('dotenv').config();
// In app.js or index.js


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

let decodedToken = null;

const verifyClient = (info, done) => {
	const cookieString = info.req.headers.cookie || "";

	// if (!cookieString) {
	// 	throw new ApiError(400,"cookie must be provided ")
	// }

	const parsedCookie = cookie.parse(cookieString);

	try {
		decodedToken = jwt.verify(
			parsedCookie.accessToken,
			process.env.ACCESS_TOKEN_SECRET
		);
	} catch (error) {
		// throw error;
	}
	// console.log(done);
	done(true);
};

const wss = new WebSocketServer({ server, verifyClient });

export const clients = new Map();

wss.on("connection", (ws) => {
	// console.log("user connected");

	ws.on("message", (message) => {
		// console.log("this is messgae", JSON.parse(message));
		try {
			const data = JSON.parse(message);
			if (data?.type == "authenticate") {
				clients.set(decodedToken?._id, ws);
			}
		} catch (error) {
			console.error("there was a in authentaction of websocket error", error);
		}
	});

	ws.on("close", () => {
		// console.log("connection closed");
		clients.delete(decodedToken?._id);
	});
});

import userRouter from "./routes/user.routes.js";
import ApiError from "./utils/ApiError.js";

app.use("/api/v1/users", userRouter);

server.listen(8000, () => {
	console.log("Server running on http://localhost:8000");
});

export { app };
