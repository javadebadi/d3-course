const dataset = [10, 20, 30, 50, 60, 40, 90]
// const dataset = [10, 20, 50]
const w = 600
const h = 300

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
   .attr("x", (d,  i) => i * 75)
   .attr("y", (d, i) => (h-d*3))
   .attr("fill", "blue")
   .attr("width", 60)
   .attr("height", d => d*3)
