import * as d3 from "d3";
import { createEffect, createSignal } from "solid-js";

const Memory = () => {
  let div!: HTMLDivElement;
  const [totalMem, setTotalMem] = createSignal(16);
  const [usedMem, setUsedMem] = createSignal(0);
  const socket = new WebSocket("ws://127.0.0.1:9001");
  socket.onopen = () => {
    socket.send("total_mem");
    setInterval(() => {
      socket.send("used_mem");
    }, 250);
  };
  createEffect(() => {
    let width = 100;
    let height = 200;
    let svg = d3
      .select(div)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    let yScale = d3.scaleLinear().domain([0, totalMem()]).range([190, 5]);
    let yAxis = d3.axisLeft(yScale);
    svg
      .append("g")
      .attr("transform", "translate(" + 25 + ", 0)")
      .call(yAxis);
    svg
      .append("rect")
      .attr("transform", "translate(" + 26 + ", 0)")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width / 2)
      .attr("height", 0)
      .attr("fill", "steelblue");
    socket.onmessage = (ev) => {
      const resp = JSON.parse(ev.data);
      switch (resp.type) {
        case "total_mem":
          setTotalMem(resp.data);
          svg.remove();
          break;
        case "used_mem":
          setUsedMem(resp.data);
          svg
            .select("rect")
            .transition()
            .attr("y", yScale(resp.data))
            .attr("height", yScale(0) - yScale(resp.data));
          break;
      }
    };
  });
  return (
    <div
      class="ml-10 mt-4 w-fit rounded bg-gray-600 px-4 py-2 shadow shadow-black"
      ref={div}
    >
      <p class="text-2xl">Memory</p>
      <p>{usedMem()} GB</p>
    </div>
  );
};

export default Memory;
