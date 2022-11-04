import React, { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const Log = {
  i: (...data: any) => console.log("[INFO]", ...data),
  d: (...data: any) => console.log("[DEBUG]", ...data),
  e: (...data: any) => console.log("[ERROR]", ...data),
};

function App() {
  const socket = useRef<Socket>();

  useEffect(() => {
    socket.current = io("http://localhost:4000");
    socket.current?.on("data", (data) => Log.i(data, data));
    socket.current?.on("connect", () => {
      Log.i("User", "Connected", "!");
    });
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return <div className="App"></div>;
}

export default App;
