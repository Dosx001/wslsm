import { Component, createSignal, onCleanup } from "solid-js";

const App: Component = () => {
  const [cpufequ, setCpufequ] = createSignal("");
  const [totalMem, setTotalMem] = createSignal("");
  const socket = new WebSocket("ws://127.0.0.1:9001");
  socket.addEventListener("open", () => {
    socket.send("cpu_usage");
    socket.send("total_mem");
  });
  socket.addEventListener("message", (ev) => {
    const resp = JSON.parse(ev.data);
    switch (resp.type) {
      case "cpu_usage":
        setCpufequ(resp.data);
        break;
      case "total_mem":
        setTotalMem(resp.data);
        break;
    }
  });
  socket.addEventListener("close", () => {
    console.debug("WebSocket connection closed.");
  });
  const id = setInterval(() => socket.send("cpu_usage"), 250);
  onCleanup(() => clearInterval(id));
  return (
    <div>
      <p>Avg CPU usage: {cpufequ()}%</p>
      <p>Total memory: {totalMem()}GB</p>
    </div>
  );
};

export default App;
