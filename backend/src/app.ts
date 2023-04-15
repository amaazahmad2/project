import "dotenv/config";
import morgan from "morgan";
import express, { NextFunction, Request, Response } from "express";
import noteRouter from "./routes/noteRoutes";
import authRouter from "./routes/authRoutes";
import cors from "cors";
import {Server} from 'socket.io'
import http  from "http";
import { gameLogic } from "./controllers/gameController";
const app = express();

// Set up global state variables
let waitingQueue: { user: string; socket: any }[] = [];
let ongoingGames: { gameId: string; wordProposer: string; hangman: string }[] = [];



app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);

app.use((req, res, next) => {
    next(Error("Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    let message = "An unknown error occurred";
    if (error instanceof Error) {
        message = error.message;
    }
    res.status(500).json({ error: message });
});


const server = http.createServer(app)
const io = new Server(
    server,{cors:{
        origin:["http://localhost:3001","http://localhost:3000"],
        methods: ["GET", "POST"]
    },
})
io.on("connection",async(socket)=>{
    console.log("user connected with a socket id", socket.id)
    //add custom events here
    socket.on("myEvent",(myData)=>{
        console.log('Received myMessage:', myData);
    })
    // const user = await authenticateUser(socket);

    gameLogic("643a4fa229c30352d2ea1269");


})
export {io}
export default server;
