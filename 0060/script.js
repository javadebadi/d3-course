const dataset = [10, 20, 30, 50, 60, 40, 90]

const w = 600 // svg width
const h = 300 // svg height
const bw = 60 // bar width
const dx = 75 // horizontal distance of bars centers
const scale = 3 // scale of bar chart data
const x = 5 // distance of labels from top of bar

// create svg element with determined width and hight
const svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h)

// add bars
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", (d,  i) => i * dx)
   .attr("y", (d, i) => (h - d * scale))
   .attr("fill", "navy")
   .attr("width", bw)
   .attr("height", d => d * scale)


// add labels
svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .attr("x", (d, i) => i * dx + (dx - bw/2)/2)
   .attr("y", (d, i) => (h - d * scale) - x)
   .attr("fill", "black")
   .attr("stroke", "black")
   .style("font-size", "25")
   .style("font-family", "Calibri")
   .text(d => d)