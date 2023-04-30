import { Component, createSignal, onCleanup } from "solid-js";
import CPUinfo from "./components/CPUinfo";

const App: Component = () => {
  const [totalMem, setTotalMem] = createSignal("");
  const [usedMem, setUsedMem] = createSignal("");
  const socket = new WebSocket("ws://127.0.0.1:9001");
  socket.addEventListener("open", () => {
    socket.send("total_mem");
    socket.send("used_mem");
  });
  socket.addEventListener("message", (ev) => {
    const resp = JSON.parse(ev.data);
    switch (resp.type) {
      case "total_mem":
        setTotalMem(resp.data);
        break;
      case "used_mem":
        setUsedMem(resp.data);
        break;
    }
  });
  socket.addEventListener("close", () => {
    console.debug("WebSocket connection closed.");
  });
  const id = setInterval(() => {
    socket.send("used_mem");
  }, 250);
  onCleanup(() => clearInterval(id));
  return (
    <div>
      <p>Total memory: {totalMem()}GB</p>
      <p>Used memory: {usedMem()}GB</p>
      <CPUinfo />
    </div>
  );
};

export default App;
