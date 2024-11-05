import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const ConservePlot = ({ data }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [family, setSelectedFamily] = useState("all");

  useEffect(() => {
    if (data.length) {
      renderConserve(data);
    }
  }, [data, family]);

  const renderConserve = (data) => {
    const margin = { top: 60, right: 200, bottom: 40, left: 100 };
    const width = 800 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;
    const innerRadius = 120;
    const outerRadius = 300; // Increased outer radius to give more space
    const familyCircleRadius = innerRadius - 50;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const filteredData = family === "all" ? data : data.filter((d) => d.family === family);
    const families = d3.group(filteredData, (d) => d.family);
    const totalKinases = d3.sum(Array.from(families.values()), (kinase) => kinase.length);
    const angleScale = d3.scaleLinear().domain([0, totalKinases]).range([0, 2 * Math.PI]);
    const radiusScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.score)]).range([innerRadius, outerRadius]);

    // Create a color scale based on unique kinases
    const uniqueKinases = Array.from(new Set(data.map(d => d.kinase)));
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(uniqueKinases);

    let currentAngle = 0;
    const barWidth = (2 * Math.PI) / totalKinases;
    const familyGap = Math.PI / 40;
    const familyLabelRadius = familyCircleRadius - 80;

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

    g.append("circle")
    .attr("r", "white")
    .attr("class", "family-circle");

    families.forEach((kinase, family) => {
      const kinaseGroups = d3.group(kinase, (d) => d.kinase);
      const numKinases = kinaseGroups.size;
      const familyStartAngle = currentAngle;

      const familyLabelAngle = familyStartAngle + (barWidth * numKinases) / 2;
      const familyLabelX = Math.cos(familyLabelAngle - Math.PI / 2) * familyLabelRadius;
      const familyLabelY = Math.sin(familyLabelAngle - Math.PI / 2) * familyLabelRadius;

      g.append("text")
        .attr("class", "family-label")
        .attr("x", familyLabelX)
        .attr("y", familyLabelY)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle") 
        // .attr("transform", `rotate(${(familyLabelAngle * 180) / Math.PI - 90}, ${familyLabelX}, ${familyLabelY})`)
        .text(family)
        .style("font-weight", "bold")
        .style("font-size", "24px")
        .style("fill", "black");
        

      let kinaseAngleOffset = currentAngle;

      kinaseGroups.forEach((sites, kinase) => {
        //console.log("Kinase:", kinase); // Log the kinase name
        //console.log("Sites:", sites); // Log the array of sites for this kinase
        //console.log("Data for this kinase:", sites.map(site => ({ site: site.site, score: site.score }))); // Log site details

        sites.sort((a, b) => b.score - a.score);

        sites.forEach((d) => {
          const { site: Phosphosite, score } = d;
          const startAngle = kinaseAngleOffset;
          const endAngle = startAngle + barWidth;

          const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(radiusScale(score))
            .startAngle(startAngle)
            .endAngle(endAngle);

          g.append("path")
            .attr("d", arc)
            .attr("fill", colorScale(kinase)) // Use kinase to determine color
            .attr("stroke", "#fff")
            .attr("stroke-width", 1)
            .on("mouseover", (function(kinase, score, Phosphosite) {
              return function (event) {
                d3.select(tooltipRef.current)
                  .style("opacity", 1)
                  .style("background-color","AliceBlue")
                  .html(`Kinase: ${kinase}<br>Score: ${score}<br>Site: ${Phosphosite}`) // Correctly references kinase
                  .style("left", `${event.pageX + 10}px`)
                  .style("top", `${event.pageY - 10}px`);
              };
            })(kinase, score, Phosphosite))
            .on("mouseout", function () {
              d3.select(tooltipRef.current).style("opacity", 0);
            })
            .transition()
            .duration(200)
            .attr("transform", "scale(1.05)")
            .transition()
            .duration(200)
            .attr("transform", "scale(1)");

          const labelAngle = (startAngle + endAngle) / 2;
          const labelRadius = (innerRadius + radiusScale(score)) / 2;
          const labelX = Math.cos(labelAngle - Math.PI / 2) * labelRadius;
          const labelY = Math.sin(labelAngle - Math.PI / 2) * labelRadius;

          // g.append("text")
          //   .attr("class", "kinase-label")
          //   .attr("x", labelX)
          //   .attr("y", labelY)
          //   .text(kinase)
          //   .style("fill", "black")
          //   .attr("transform", `rotate(${(labelAngle * 180) / Math.PI - 90}, ${labelX}, ${labelY})`);

          const phosphositeLabelRadius = radiusScale(score) + 10;
          const phosphositeLabelX = Math.cos(labelAngle - Math.PI / 2) * phosphositeLabelRadius;
          const phosphositeLabelY = Math.sin(labelAngle - Math.PI / 2) * phosphositeLabelRadius;

          g.append("text")
            .attr("class", "site-label")
            .attr("x", phosphositeLabelX)
            .attr("y", phosphositeLabelY)
            .text(`${kinase}_${Phosphosite}`)
            .style("fill", "black")
            .style("font-size", "10px")
            .attr("transform", `rotate(${(labelAngle * 180) / Math.PI - 90}, ${phosphositeLabelX}, ${phosphositeLabelY})`);

          kinaseAngleOffset += barWidth;
        });

        currentAngle = kinaseAngleOffset;
      });

      currentAngle += familyGap;
    });
  };

  const handleFamilyChange = (event) => {
    const newFamily = event.target.value || "all";
    setSelectedFamily(newFamily);
    console.log("Selected family:", newFamily);
  };

  return (
    <div className="flex flex-col items-start">
      {/* <h1 className="text-2xl font-bold mb-4">Family Conservation</h1> */}
      <div className="flex flex-row mb-4">
        <label htmlFor="familySelect" className="text-xl font-bold">Family:</label>
        <select
          onChange={handleFamilyChange}
          value={family}
          className="ml-2 block w-full p-2 border border-gray-300 rounded item-center"
        >
          {data.length > 0
            ? [...new Set(data.map(d => d.family))].map(family => (
                <option key={family} value={family}>{family}</option>
              ))
            : <option>Loading...</option>}
        </select>
      </div>
      <svg ref={svgRef} width={800} height={800}></svg>
      <div ref={tooltipRef} className="tooltip absolute bg-lightsteelblue border border-black rounded text-center opacity-0" style={{ padding: "8px", borderRadius: "4px", pointerEvents: "none" }}></div>
    </div>
  );
};

export default ConservePlot;
