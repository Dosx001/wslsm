import * as d3 from "d3";
import { createEffect, createSignal } from "solid-js";

const CPUinfo = () => {
  const [cpufequ, setCpufequ] = createSignal("");
  let div!: HTMLDivElement;
  const data: number[] = [];
  const socket = new WebSocket("ws://127.0.0.1:9001");
  socket.addEventListener("open", () => {
    setInterval(() => {
      socket.send("cpu_usage");
    }, 250);
  });
  createEffect(() => {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const svg = d3
      .select(div)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    const xScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([margin.left, width - margin.right]);
    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top]);
    const line = d3
      .line()
      .x((_, i) => xScale(i))
      .y((d) => yScale(d));
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(
        d3
          .axisLeft(yScale)
          .ticks(10)
          .tickFormat((d) => `${d}%`)
      )
      .selectAll("line")
      .attr("stroke", "lightgray")
      .attr("stroke-opacity", 0.7);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(10))
      .selectAll("line")
      .attr("stroke", "lightgray")
      .attr("stroke-opacity", 0.7);
    svg
      .selectAll(".hline")
      .data(d3.range(0, 101, 10))
      .enter()
      .append("line")
      .attr("class", "hline")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .attr("stroke", "lightgray")
      .attr("stroke-opacity", 0.7);
    svg
      .selectAll(".vline")
      .data(d3.range(0, 101, 10))
      .enter()
      .append("line")
      .attr("class", "vline")
      .attr("x1", (d) => xScale(d))
      .attr("x2", (d) => xScale(d))
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "lightgray")
      .attr("stroke-opacity", 0.7);
    const addDataPoint = () => {
      xScale.domain([0, data.length - 1]);
      yScale.domain([0, 100]);
      svg.select("path").datum(data).attr("d", line).attr("stroke", "blue");
    };
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
  });
  return (
    <div class="ml-10 w-fit rounded bg-gray-600 shadow shadow-black" ref={div}>
      <p class="ml-40">Avg CPU usage: {cpufequ()}%</p>
    </div>
  );
};

export default CPUinfo;
