import { Component, createSignal, onCleanup } from "solid-js";

const App: Component = () => {
  const [cpufequ, setCpufequ] = createSignal("");
  const socket = new WebSocket("ws://127.0.0.1:9001");
  socket.addEventListener("open", () => {
    socket.send("cpu_usage");
  });
  socket.addEventListener("message", (ev) => {
    setCpufequ(ev.data);
  });
  socket.addEventListener("close", () => {
    console.debug("WebSocket connection closed.");
  });
  const id = setInterval(() => socket.send("cpu_usage"), 250);
  onCleanup(() => clearInterval(id));
  return (
    <div>
      <p>Avg CPU usage: {cpufequ()}%</p>
    </div>
  );
};

export default App;
