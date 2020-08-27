import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";
import socketio from "socket.io";
//mongo connection
import "../config/mongo.mjs";
// socket configuration
import WebSockets from "../utils/WebSockets.mjs";
// routes
import indexRouter from "../routes/index.mjs";
import userRouter from "../routes/user.mjs";
import chatRoomRouter from "../routes/chatRoom.mjs";
import deleteRouter from "../routes/delete.mjs";

// middlewares
import { decode } from '../middlewares/jwt.mjs'

const app = express();


/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint does not exist'
  })
});

/** Create HTTP server. */
const server = http.createServer(app);
/** Create socket connection */
global.io = socketio.listen(server);
global.io.on('connection', WebSockets.connection)
/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});