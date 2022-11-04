import * as express from "express";
import * as http from "http";
import * as socket from "socket.io";

const app = express();
const httpServer = new http.Server(app);
const io = new socket.Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let user: socket.Socket | undefined = undefined;

io.on("connection", (sck) => {
  user = sck;
});

app.get("/", (req, res) => {
  res.status(200).json({ ok: true });
  user?.emit("data", req.body);
});

httpServer.listen(4000, () => console.log("listening on *:4000"));
