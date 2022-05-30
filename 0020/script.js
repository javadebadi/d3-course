// select element with id of d3-canvas
// the d3 select return a d3 selection not the DOM element
d3.select("#d3-canvas")  
  // d3 selection append method adds
  // news element and return a new d3 selection
  .append("h2") 
  // .text method of d3 selection sets the text
  // of the a d3 selection and returns the d3 selection again
  // or will get the text of a d3 selection and returns
  // the text
  .text("Learning D3")