import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

/* =========================================================
   CUSTOM IMPORTS
========================================================= */

import { connectDB } from "./connection.js";
import { secureRoute } from "./middleware/auth.js";

import auctionRouter from "./routes/auction.js";
import userAuthRouter from "./routes/userAuth.js";
import userRouter from "./routes/user.js";
import contactRouter from "./routes/contact.js";
import adminRouter from "./routes/admin.js";

import { auctionSocket } from "./socket/auctionSocket.js";
import { setIO } from "./socket/socket.js";

/* =========================================================
   CONFIG
========================================================= */

dotenv.config();

const port = process.env.PORT || 4000;

/* =========================================================
   DATABASE CONNECTION
========================================================= */

connectDB();

/* =========================================================
   EXPRESS APP
========================================================= */

const app = express();

/* =========================================================
   MIDDLEWARES
========================================================= */

app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:5173",

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],

    credentials: true,
  })
);

/* =========================================================
   ROUTES
========================================================= */

// Home Route
app.get("/", async (req, res) => {
  res.json({
    msg: "Welcome to Online Antique Auction System",
  });
});

// Authentication Routes
app.use("/auth", userAuthRouter);

// User Routes
app.use("/user", secureRoute, userRouter);

// Auction Routes
app.use("/auction", secureRoute, auctionRouter);

// Contact Routes
app.use("/contact", contactRouter);

// Admin Routes
app.use("/admin", secureRoute, adminRouter);

/* =========================================================
   HTTP SERVER
========================================================= */

const server = http.createServer(app);

/* =========================================================
   SOCKET.IO SERVER
========================================================= */

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN || "http://localhost:5173",

    methods: ["GET", "POST"],

    credentials: true,
  },
});

/* =========================================================
   MAKE SOCKET GLOBALLY ACCESSIBLE
========================================================= */

setIO(io);

/* =========================================================
   SOCKET EVENTS
========================================================= */

auctionSocket(io);

/* =========================================================
   START SERVER
========================================================= */

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});