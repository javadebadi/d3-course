const dataset = [10, 20, 30, 5, 60, 1, 90]

d3.select("#d3-canvas").selectAll("h3")
  .data(dataset)
  .enter()
  .append("h2")
  .text((d) => (d + " USD"))
  // add style to each data record based on the value
  // of the data
  .style(
    "color",
    (d) => {
      return (d < 20 ? "red" : "green")
    }
  )

