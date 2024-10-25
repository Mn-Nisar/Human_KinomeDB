import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const HeatMapPlot = (props) => {
  const svgRef = useRef();
  useEffect(() => {
    // Set dimensions and margins
    const margin = { top: 30, right: 30, bottom: 30, left: 30 },
      width = 800 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

    // Select the svg element using D3

    d3.select(svgRef.current).selectAll("*").remove();

    // Select the svg element using D3
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Extract the unique site1 and site2 for the axes
    const site1Values = [...new Set(props.data.map((d) => d.site1))];
    const site2Values = [...new Set(props.data.map((d) => d.site2))];

    // Create scales for the axes
    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(site1Values)
      .padding(0.05);

    const yScale = d3
      .scaleBand()
      .range([height, 0])
      .domain(site2Values)
      .padding(0.05);

    // Create a color scale based on n_11
    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateBlues)
      .domain([0, d3.max(props.data, (d) => d.n_11)]);

    // Add the X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    // Add the Y axis
    svg.append("g").call(d3.axisLeft(yScale));

    // Create the tooltip div
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#f4f4f4")
      .style("padding", "8px")
      .style("border-radius", "5px")
      .style("box-shadow", "0px 0px 6px rgba(0,0,0,0.1)")
      .style("opacity", 0)
      .style("pointer-events", "none");

    // Add the squares for the heatmap
    svg
      .selectAll(".heatmap-rect")
      .data(props.data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.site1))
      .attr("y", (d) => yScale(d.site2))
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .style("fill", (d) => colorScale(d.n_11))
      .attr("class", "heatmap-rect")
      // Add mouseover event to show tooltip
      .on("mouseover", function (event, d) {
        tooltip.style("opacity", 1); // Make tooltip visible
        d3.select(this).style("stroke", "black"); // Highlight the hovered square
      })
      .on("mousemove", function (event, d) {
        // Update the tooltip content
        tooltip
          .html(
            `site1: ${d.site1}<br>site2: ${d.site2}<br>Total frequency: ${d.n_11}`
          )
          .style("left", `${event.pageX + 10}px`) // Position tooltip
          .style("top", `${event.pageY - 25}px`);
      })
      .on("mouseleave", function () {
        tooltip.style("opacity", 0); // Hide the tooltip
        d3.select(this).style("stroke", "none"); // Remove highlight
      });
  }, [props.data]);

  return <svg ref={svgRef}></svg>;
};

export default HeatMapPlot;
