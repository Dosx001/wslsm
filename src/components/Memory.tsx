import * as d3 from "d3";
import { createEffect } from "solid-js";

const Memory = () => {
  let div!: HTMLDivElement;
  createEffect(() => {
    let width = 100;
    let height = 200;
    let svg = d3
      .select(div)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    let yScale = d3.scaleLinear().domain([0, 100]).range([190, 5]);
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
      .attr("height", height)
      .attr("fill", "steelblue");
    setInterval(() => {
      let newHeight = Math.floor(Math.random() * 100);
      svg
        .select("rect")
        .transition()
        .attr("y", yScale(newHeight))
        .attr("height", yScale(0) - yScale(newHeight));
    }, 250);
  });
  return <div class="ml-10 mt-4" ref={div} />;
};

export default Memory;
