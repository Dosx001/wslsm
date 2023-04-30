import * as d3 from "d3";
import { createEffect, createSignal } from "solid-js";

const CPUinfo = () => {
  const [cpufequ, setCpufequ] = createSignal("");
  let div!: HTMLDivElement;
  const data: number[] = [];
  createEffect(() => {
    const width = 500;
    const height = 300;
    const svg = d3
      .select(div)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);
    const line = d3
      .line()
      .x((_, i) => xScale(i))
      .y((d) => yScale(d));
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
    const addDataPoint = () => {
      xScale.domain([0, data.length - 1]);
      yScale.domain([0, 100]);
      svg.select("path").datum(data).attr("d", line);
    };
    const socket = new WebSocket("ws://127.0.0.1:9001");
    socket.addEventListener("open", () => {
      socket.send("cpu_usage");
    });
    socket.addEventListener("message", (ev) => {
      const resp = JSON.parse(ev.data);
      switch (resp.type) {
        case "cpu_usage":
          setCpufequ(resp.data);
          if (data.length === 100) data.shift();
          data.push(resp.data);
          addDataPoint();
          break;
      }
    });
    setInterval(() => {
      socket.send("cpu_usage");
    }, 250);
  });
  return (
    <div ref={div}>
      <p>Avg CPU usage: {cpufequ()}%</p>
    </div>
  );
};

export default CPUinfo;
