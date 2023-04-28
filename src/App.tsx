import { Component } from "solid-js";
import logo from "./logo.svg";

const App: Component = () => {
  const socket = new WebSocket("ws://127.0.0.1:9001");
  socket.addEventListener("open", () => {
    console.log("WebSocket connection established.");
    socket.send("Hello, server!");
  });
  socket.addEventListener("message", (ev) => {
    console.log(`Message from server: ${ev.data}`);
  });
  socket.addEventListener("close", () => {
    console.log("WebSocket connection closed.");
  });
  return (
    <div class="App">
      <header class="header">
        <img src={logo} class="logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button
          onClick={() => {
            socket.send("New message");
          }}
        >
          send message
        </button>
      </header>
    </div>
  );
};

export default App;
