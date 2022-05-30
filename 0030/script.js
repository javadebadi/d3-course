const dataset = ["Newton", "Einstein", "Fermi"];

// select element with id of d3-canvas
// the d3 select return a d3 selection not the DOM element
d3.select("#d3-canvas")
  //select all element of tag h2
  // returns the collection of D3 selections
  .selectAll("h2")
  // binds data in dataset to D3 selections
  // and creates non-existing d3 selection
  .data(dataset)
  .enter()
  // d3 selection append method adds
  // news element and return a new d3 selection
  .append("h2") 
  // add text to elements
  // each text is the data in dataset
  .text(d => d)