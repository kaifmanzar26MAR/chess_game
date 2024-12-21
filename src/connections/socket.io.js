import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"], // Ensure this matches your frontend's URL
        methods: ["GET", "POST"]
    }
});

const userSocketMap = {}; // {userId : socketId}

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log(`User ${userId} connected with socket id ${socket.id}`);

    if (userId && userId !== "undefined") userSocketMap[userId] = socket.id;

    socket.on("disconnect", () => {
        console.log(`User ${userId} disconnected with socket id ${socket.id}`);
        delete userSocketMap[userId];
    });

    socket.on("login", (id) => {
        console.log("User connected with socket", id);
    });
});


export { app, io, server };
