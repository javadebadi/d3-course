const dataArray = [
        400,
        40,
        80
]

const labelsData = [
        "USA",
        "Canada",
        "Iran",
]



// ================== LAYOUT ===========================
// create svg canvas
const svg = d3.select("body")
              .append("svg")
              .attr("id", "svg")
              .attr("height", "100%")
              .attr("width", "100%");

const height = 400;
const width = 600;
const barWidth = 60;

// define margin
margin = {left:50, right:50, top:50, bottom:10};

// create chart group
let group = svg.append("g")
                .attr("class", "chart-group")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);



// ============ add labels =============================
// const xScale = d3.scaleOrdinal().domain(labelsData).range([100,200,300]);
const xScale = d3.scalePoint().domain(labelsData).range([100,300]);
const xAxis = d3.axisBottom(xScale)

group.append("g").attr("transform", `translate(0, ${height})`).call(xAxis)


// ============ add bars =================================
group.selectAll("rect")
        .data(dataArray).enter()
        .append("rect")
        .attr("fill", "navy")
        .attr("x", (d,i) => xScale(labelsData[i]) - barWidth/2)
        .attr("y", (d, i) => height -d )
        .attr("width", barWidth)
        .attr("height", (d, i) => d)
        