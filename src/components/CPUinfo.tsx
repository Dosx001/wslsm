import { createSignal, onCleanup } from "solid-js";

const CPUinfo = () => {
  const [cpufequ, setCpufequ] = createSignal("");
  const socket = new WebSocket("ws://127.0.0.1:9001");
  socket.addEventListener("open", () => {
    socket.send("cpu_usage");
  });
  socket.addEventListener("message", (ev) => {
    const resp = JSON.parse(ev.data);
    switch (resp.type) {
      case "cpu_usage":
        setCpufequ(resp.data);
        break;
    }
  });
  const id = setInterval(() => {
    socket.send("cpu_usage");
  }, 250);
  onCleanup(() => clearInterval(id));
  return (
    <>
      <p>Avg CPU usage: {cpufequ()}%</p>
    </>
  );
};

export default CPUinfo;
