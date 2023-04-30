import * as d3 from "d3";
import { createEffect } from "solid-js";

const Graph = () => {
  let div!: HTMLDivElement;
  createEffect(() => {
    const width = 500;
    const height = 300;
    const svg = d3
      .select(div)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    const data = [10, 20, 30, 40, 50];
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...data)])
      .range([height, 0]);
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
    function addDataPoint() {
      const newDataPoint = Math.floor(Math.random() * 50) + 1;
      data.push(newDataPoint);
      if (data.length === 100) data.shift();
      xScale.domain([0, data.length - 1]);
      yScale.domain([0, Math.max(...data)]);
      svg.select("path").datum(data).attr("d", line);
    }
    setInterval(addDataPoint, 100);
  });
  return <div ref={div} />;
};

export default Graph;
