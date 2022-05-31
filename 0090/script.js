const dataset = [
   [10, 21],
   [22, 36],
   [31, 50],
   [45, 80],
   [60, 70],
   [70, 100],
   [90, 130],
]

const w = 600 // svg width
const h = 200 // svg height
const r = 10 // radius of circle
const xscale = 6 // scale for x axis data
const yscale = 1 // scale for y axis data

// create svg element with determined width and hight
const svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h)

// add circles
svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr("cx", (d,  i) => d[0] * xscale)
   .attr("cy", (d, i) => (h - d[1] * yscale))
   .attr("r", r)
   .attr("class", "circle")
   .attr("fill", "navy")
   .append("title")
   .text(d=> `(${d[0]}, ${d[1]})`)

// add labels
svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .attr("x", d => d[0] * xscale )
   .attr("y", d => h - d[1] * yscale - 15)
   .attr("fill", "black")
   .attr("stroke", "black")
   .text(d =>`${d[0]}, ${d[1]}`)