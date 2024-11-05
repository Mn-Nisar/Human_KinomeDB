import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const BarPlot = ({ data }) => {
  const svgRef = useRef();
  const [cancer, setCancer] = useState("");
  const [site, setSite] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const margin = { top: 60, right: 230, bottom: 40, left: 100 };
    const width = 700 - margin.left - margin.right;

    const matchesCancer = cancer ? d => d.cancer === cancer : () => true;
    const matchesSite = site ? d => d.site === site : () => true;

    const newFilteredData = data.filter(d => 
      matchesCancer(d) && 
      matchesSite(d) && 
      (d.log2fc < -0.37 || d.log2fc > 0.37)
    );

    setFilteredData(newFilteredData);

    if (newFilteredData.length === 0) return;

    const positiveData = newFilteredData.filter(d => d.log2fc > 0).sort((a, b) => b.log2fc - a.log2fc);
    const negativeData = newFilteredData.filter(d => d.log2fc < 0).sort((a, b) => b.log2fc - a.log2fc);
    const combinedData = [...positiveData, ...negativeData];

    const height = combinedData.length * 30 + margin.top + margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .style("width", "800px")
      .style("height", "auto");

    svg.selectAll("*").remove();

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const minLog2fc = d3.min(newFilteredData, d => d.log2fc);
    const maxLog2fc = d3.max(newFilteredData, d => d.log2fc);
    const xDomain = [Math.floor(minLog2fc), Math.ceil(maxLog2fc)];

    const x = d3.scaleLinear()
    .domain(xDomain)
    .range([0, width])
    .nice(5);

    const y = d3.scaleBand()
      .range([0, height - margin.top - margin.bottom])
      .padding(0.3);

    y.domain(combinedData.map(d => d.patient));

    const xTickFormat = d => {
      if (d === 0) return '±0.37';
      return d.toFixed(2);
    };

    g.append("g")
      .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(xTickFormat));

    g.append("g")
    .attr("transform", `translate(0,0)`)
      
      .call(d3.axisTop(x).ticks(5).tickFormat(xTickFormat));

    g.append("g")
      .call(d3.axisLeft(y).tickSize(0));

    g.selectAll(".bar")
      .data(combinedData)
      .enter()
      .append("rect")
      .attr("class", d => (d.log2fc >= 0 ? "fill-red-500" : "fill-blue-500"))
      .attr("x", d => x(Math.min(0, d.log2fc)))
      .attr("y", d => y(d.patient))
      .attr("width", d => Math.abs(x(d.log2fc) - x(0)))
      .attr("height", y.bandwidth())
      .on("mouseover", function (event, d) {
        const tooltip = d3.select("#tooltip");
        tooltip.transition().duration(200).style("opacity", .9);
        tooltip.html(`Patient: ${d.patient}<br>Log2FC: ${d.log2fc.toFixed(2)}`)
          .style("left", (event.pageX + 5) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function () {
        d3.select("#tooltip").transition().duration(500).style("opacity", 0);
      });

    g.append("text")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom + 20)
      .attr("text-anchor", "middle")
      .text("Log2FC");

    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -((height - margin.top - margin.bottom) / 2))
      .attr("y", -margin.left + 20)
      .attr("text-anchor", "middle")
      .text("Patient ID");

    const legend = svg.append("g").attr("transform", `translate(${width + 100}, 80)`);
    legend.append("rect").attr("width", 15).attr("height", 15).attr("class", "fill-red-500");
    legend.append("text").attr("x", 20).attr("y", 12).text("Upregulated (> 0.37)");

    legend.append("rect").attr("width", 15).attr("height", 15).attr("class", "fill-blue-500").attr("y", 20);
    legend.append("text").attr("x", 20).attr("y", 32).text("Downregulated (<= -0.37)");

  }, [data, cancer, site]);

  const paginateData = (data, pageNumber) => {
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = paginateData(filteredData, currentPage);

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4 mb-4">
        <label className="block">
          <span className="text-gray-700">Cancer Type: </span>
          <select
            onChange={(e) => {
              setCancer(e.target.value);
              setCurrentPage(1);
            }}
            value={cancer}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select cancer type</option>
            {data.length > 0
              ? [...new Set(data.map(d => d.cancer))].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))
              : <option>Loading...</option>}
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Site: </span>
          <select 
            onChange={(e) => {
              setSite(e.target.value);
              setCurrentPage(1);
            }} 
            value={site} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Site</option>
            {[...new Set(data.map(d => d.site))].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-y-auto max-h-96 border border-gray-200 rounded-lg">
        <svg ref={svgRef}></svg>
      </div>

      <div id="tooltip" className="absolute bg-gray-800 text-white px-2 py-1 rounded opacity-0"></div>

      <h3 className="text-xl font-semibold mt-4">Data Table</h3>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-700">
            <th className="py-2 px-4">Patient ID</th>
            <th className="py-2 px-4">Cancer</th>
            <th className="py-2 px-4">Site</th>
            <th className="py-2 px-4">Log2FC</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((d, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="py-2 px-4">{d.patient}</td>
              <td className="py-2 px-4">{d.cancer}</td>
              <td className="py-2 px-4">{d.site}</td>
              <td className="py-2 px-4">{d.log2fc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="py-1 px-3 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="py-1 px-3 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BarPlot;
