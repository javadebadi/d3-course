const dataArray = [
        10,20,30,40,10,50,60,10,20,30,50,70,20,10,30,50,80,30,10,2
];

const svg = d3.select("body").append("svg")
.attr("height", "100%")
.attr("width", "100%");



const height = 400
let area = d3.area()
             .x( (d,i) => i * 50)
             .y0( (d,i) => height)
             .y1( (d,i) => height - d*4)
             .curve(d3.curveCardinal)


svg.append("path")
        .attr("fill", "blue")
        .attr("d", area(dataArray))