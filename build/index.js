"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socket = require("socket.io");
var app = express();
var httpServer = new http.Server(app);
var io = new socket.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
var user = undefined;
io.on("connection", function (sck) {
    user = sck;
});
app.use(express.static("front-end/build"));
app.get("/hook", function (req, res) {
    res.status(200).json({ ok: true });
    user === null || user === void 0 ? void 0 : user.emit("data", req.body);
});
httpServer.listen(4000, function () { return console.log("listening on *:4000"); });
//# sourceMappingURL=index.js.map