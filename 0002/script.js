const dataArray = [5, 18, 13];

const svg = d3.select("body").append("svg")
.attr("height", "100%")
.attr("width", "100%");

svg.selectAll("rect").data(dataArray)
    .enter().append("rect")
            .attr("height", (d, i) => 10*d)
            .attr("width", "50")
            .attr("x", (d, i) => i * 100 + 20)
            .attr("y", (d, i) => 300 - 10*d )
            .attr("fill",(d, i) => ["pink", "blue", "orange"][i])
            ;

svg.selectAll("circle").data(dataArray)
    .enter().append("circle")
            .attr("r", (d, i) => d * 2)
            .attr("cx", (d, i) => i * 100 + 20)
            .attr("cy", (d, i) => 500 )
            .attr("fill", "#54FF5e")
            ;

svg.selectAll("ellipse").data(dataArray)
.enter().append("ellipse")
        .attr("rx", (d, i) => d * 1)
        .attr("ry", (d, i) => d * 4)
        .attr("cx", (d, i) => i * 100 + 20)
        .attr("cy", (d, i) => 700 )
        .attr("fill", "#99995e")
        ;

svg.selectAll("line").data(dataArray)
.enter().append("line")
        .attr("x1", (d, i) => i * 100 + 20)
        .attr("y1", (d, i) => 1100)
        .attr("x2", (d, i) => i * 100 + 20)
        .attr("y2", (d, i) => 1100 - 10 * d )
        .attr("stroke", "red")
        .attr("stroke-width", "10")
        ;