import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const Lollipop = (props) => {
  const lollipopRef = useRef(null);

  useEffect(() => {
    if (props.data) {
      const sequence = props.data.fasta;
      const site = props.data.frequency.map((item) => item.site);
      const frequency = props.data.frequency.map((item) => item.frequency);

      const DomainStart = props.data.domain.map((item) => item.start);
      const DomainEnd = props.data.domain.map((item) => item.end);
      const domainLabels = props.data.domain.map((item) => item.name);

      d3.select(lollipopRef.current).selectAll("*").remove();

      const margin = { top: 20, right: 0, bottom: 30, left: 20 },
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

      const svg = d3
        .select(lollipopRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const data = Array.from(sequence).map((d, i) => ({
        position: i + 1,
        value: Math.random() * 100,
        character: d,
      }));

      const sitePositions = site.map((s) => +s.slice(1));

      const x = d3.scaleLinear().domain([0, sequence.length]).range([0, width]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(frequency)])
        .range([height - 40, 0]);

      svg
        .selectAll("circle")
        .data(frequency)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => x(sitePositions[i]))
        .attr("cy", (d) => y(d))
        .attr("r", 6)
        .attr("fill", "steelblue");

      svg
        .selectAll("line")
        .data(frequency)
        .enter()
        .append("line")
        .attr("x1", (d, i) => x(sitePositions[i]))
        .attr("x2", (d, i) => x(sitePositions[i]))
        .attr("y1", height - 40)
        .attr("y2", (d) => y(d))
        .attr("stroke", "grey")
        .attr("stroke-width", 2);

      svg
        .selectAll("text")
        .data(frequency)
        .enter()
        .append("text")
        .attr("x", (d, i) => x(sitePositions[i]))
        .attr("y", (d) => y(d) - 10)
        .attr("text-anchor", "middle")
        .attr("fill", "none")
        .text((d) => d);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .attr("class", "x-axis")
        .call(d3.axisBottom(x));

      svg.append("g").call(d3.axisLeft(y));

      const lineYPosition = height - 20;
      const lineHeight = 1;

      DomainStart.forEach((start, i) => {
        const end = DomainEnd[i];
        const label = domainLabels[i];
        const color = i % 2 === 0 ? "orange" : "blue";

        svg
          .append("rect")
          .attr("x", x(start))
          .attr("y", lineYPosition - 15)
          .attr("width", x(end) - x(start))
          .attr("height", 15)
          .attr("fill", color)
          .attr("opacity", 0.5);

        svg
          .append("text")
          .attr("class", "fixed-text")
          .attr("x", x(start + (end - start) / 2))
          .attr("y", lineYPosition - 5)
          .attr("text-anchor", "middle")
          .attr("font-size", "12px")
          .attr("fill", "black")
          .text(label);
      });

      svg
        .append("line")
        .attr("class", "fixed-line")
        .attr("x1", 0)
        .attr("y1", lineYPosition)
        .attr("x2", width)
        .attr("y2", lineYPosition)
        .attr("stroke", "black")
        .attr("stroke-width", lineHeight);

      svg
        .append("line")
        .attr("class", "fixed-line")
        .attr("x1", 0)
        .attr("y1", lineYPosition - 15)
        .attr("x2", width)
        .attr("y2", lineYPosition - 15)
        .attr("stroke", "black")
        .attr("stroke-width", lineHeight);

      const sequenceText = svg
        .selectAll(".sequence-text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "sequence-text")
        .attr("x", (d) => x(d.position + 2))
        .attr("y", height - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .text((d) => d.character)
        .style("opacity", 0);

      const zoom = d3
        .zoom()
        .scaleExtent([1, 20])
        .translateExtent([
          [0, 0],
          [width, height],
        ])
        .on("zoom", zoomed);

      svg.call(zoom);

      function zoomed(event) {
        const transform = event.transform;
        const rescaleX = transform.rescaleX(x);

        svg
          .selectAll(".sequence-text")
          .attr("x", (d) => rescaleX(d.position))
          .style("opacity", () => (transform.k > 5 ? 1 : 0));

        svg.select(".x-axis").call(d3.axisBottom(rescaleX));

        DomainStart.forEach((start, i) => {
          const end = DomainEnd[i];

          svg
            .selectAll("rect")
            .filter((d, index) => index === i)
            .attr("x", rescaleX(start))
            .attr("width", rescaleX(end) - rescaleX(start));

          svg
            .selectAll(".fixed-text")
            .filter((d, index) => index === i)
            .attr("x", rescaleX(start + (end - start) / 2));
        });

        svg
          .selectAll("circle")
          .attr("cx", (d, i) => rescaleX(sitePositions[i]));

        svg
          .selectAll("line:not(.fixed-line)")
          .attr("x1", (d, i) => rescaleX(sitePositions[i]))
          .attr("x2", (d, i) => rescaleX(sitePositions[i]));

        svg
          .selectAll("text:not(.fixed-text)")
          .attr("x", (d, i) => rescaleX(sitePositions[i]));
      }
    }
  }, [props.data]);

  return <div ref={lollipopRef}></div>;
};

export default Lollipop;
