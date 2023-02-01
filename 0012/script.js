const dataArray = [
        {x:10, y:2},
        {x:20, y:10},
        {x:30, y:50},
        {x:40, y:20},
        {x:50, y:10},
]

const svg = d3.select("body").append("svg")
.attr("height", "100%")
.attr("width", "100%");


let line = d3.line()
             .x( (d,i) => d.x * 10)
             .y( (d,i) => d.y * 5)
             .curve(d3.curveCardinal)


svg.append("path")
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("d", line(dataArray))