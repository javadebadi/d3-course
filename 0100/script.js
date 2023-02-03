const dataArray = [
        {x:"2001", y:2},
        {x:"2005", y:10},
        {x:"2009", y:50},
        {x:"2013", y:20},
        {x:"2017", y:10},
]

// ================= Process Data ======================
const parseDate = d3.timeParse("%Y");
// const yAxisData = dataArray.map(d => parseDate(d.x))
// console.log(yAxisData);



// ================== LAYOUT ===========================
// create svg canvas
const svg = d3.select("body")
              .append("svg")
              .attr("id", "svg")
              .attr("height", "100%")
              .attr("width", "100%");

const height = 300;
const width = 600;

// define margin
margin = {left:50, right:50, top:50, bottom:10};

// create chart group
let group = svg.append("g")
                .attr("class", "chart-group")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

// ===================== AXIS: Y =======================
// create scale
let yScale = d3.scaleLinear().domain([0, 50]).range([height, 0]);

// create and add axis
let yAxis = d3.axisLeft(yScale).ticks(10).tickPadding(5).tickSize(10);

// add axis to the group
group.append("g").attr("class", "axis x").call(yAxis)



// ===================== AXIS: X =======================
// create scale
let xScale = d3.scaleTime().domain(d3.extent(dataArray, d => parseDate(d.x))).range([0, width]);

// create and add axis
let xAxis = d3.axisBottom(xScale);

// add axis to the group
group.append("g")
     .attr("class", "axis y")
     .attr("transform", `translate(0, ${height})`)
     .call(xAxis)


// ==================== Line ===========================
// create line generator
let line = d3.line()
                .x( (d,i) => xScale(parseDate(d.x)))
                .y( (d,i) => yScale(d.y))
                .curve(d3.curveNatural);

// add line to the group
group.append("path")
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("d", line(dataArray))
