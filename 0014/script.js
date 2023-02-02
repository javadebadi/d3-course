const dataArray = [
        {x:10, y:2},
        {x:20, y:10},
        {x:30, y:50},
        {x:40, y:20},
        {x:50, y:10},
]

const InterpolationTypes = [
        d3.curveCardinal,
        d3.curveStep,
        d3.curveNatural,
        d3.curveBasis,
        d3.curveBundle,
        d3.curveLinear,
]

const svg = d3.select("body").append("svg")
.attr("id", "svg")
.attr("height", "100%")
.attr("width", "100%");

for(let p=0; p<6; p++){

        let group = svg.append("g")
                        .attr("class", "group"+p)
                        .attr("transform", `translate(0,${p*300})`)
        
        let line = d3.line()
                     .x( (d,i) => d.x * 10)
                     .y( (d,i) => d.y * 5)
                     .curve(InterpolationTypes[p])
        
        
        group.append("path")
                .attr("fill", "none")
                .attr("stroke", "blue")
                .attr("d", line(dataArray))
        
        group.selectAll("circle.grp"+p)
                .data(dataArray)
                .enter()
                .append("circle")
                .attr("class", "grp"+p)
                .attr("cx", (d,i) => d.x * 10)
                .attr("cy", (d,i) =>  d.y * 5)
                .attr("r", 3)

}