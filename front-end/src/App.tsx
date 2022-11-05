import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const Log = {
  i: (...data: any) => console.info("[INFO]", ...data),
  d: (...data: any) => console.debug("[DEBUG]", ...data),
  e: (...data: any) => console.error("[ERROR]", ...data),
};

function App() {
  const [socket, setSocket] = useState<Socket>();
  const [url, setUrl] = useState(document.location.toString());

  useEffect(() => {
    console.log("called useEffect");
    socket?.on("data", (data) => Log.i(data, data));
    socket?.on("connect", () => {
      Log.i("User", "Connected", "!");
    });
    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  const onSubmit = () => setSocket(io(url));

  return (
    <div className="App">
      <div className="container">
        <input
          value={url}
          type="text"
          className="url-input"
          onChange={({ target: { value } }) => setUrl(value)}
        />
        <button type="submit" className="submit-button" onClick={onSubmit}>
          CONNECT
        </button>
      </div>
    </div>
  );
}

export default App;
