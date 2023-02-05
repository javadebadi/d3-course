const svg = d3.select("body").append("svg").attr("width", "100%").attr("height", "100%");

const margin = {left: 50, right: 50, top: 40, bottom:0};

const groupChart = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);



urls = [
        "https://data.calgary.ca/resource/6zp6-pxei.json?$limit=4000&$where=roll_year=2019 AND assessed_value is not null",
        "https://data.calgary.ca/resource/6zp6-pxei.json?$limit=400&$where=roll_year=2021 AND assessed_value is not null",
        "https://data.calgary.ca/resource/6zp6-pxei.json?$limit=3000&$where=roll_year=2015 AND assessed_value is not null",
        "https://data.calgary.ca/resource/6zp6-pxei.json?$limit=9000&$where=roll_year=2018 AND assessed_value is not null",
        "https://data.calgary.ca/resource/6zp6-pxei.json?$limit=3000&$where=roll_year=2008 AND assessed_value is not null",
        "https://data.calgary.ca/resource/6zp6-pxei.json?$limit=3000&$where=roll_year=2006 AND assessed_value is not null",
        "https://data.calgary.ca/resource/6zp6-pxei.json?$limit=3000&$where=roll_year=2005 AND assessed_value is not null",
        "https://data.calgary.ca/resource/6zp6-pxei.json?$limit=3000&$where=roll_year=2004 AND assessed_value is not null",
]


let dataArrays = []
i = 0;



function ReadData(urls, i){
        if (i===0){
                return d3.json(urls[0]);
        }
        else if (i < urls.length - 1) {
                return ReadData(urls, i-1).then(
                        (d) => {
                                dataArrays = dataArrays.concat(d);
                                return d3.json(urls[i])
                        }
                )
        }
        else {
                return ReadData(urls, urls.length-2).then(
                        (d) => {
                                dataArrays = dataArrays.concat(d);
                                return dataArrays;
                        }
                )
        }
}


ReadData(urls, urls.length-1)
.then(
        (d) => {
                d = dataArrays;
                // layout
                const width = 600;
                const height = 300;

                // process data
                const parseDate = d3.timeParse("%Y");
                const parseAssessedValue = (x) => {
                        if(isNaN(parseInt(x))){
                                return 0;
                        }
                        else {
                                return parseInt(x);
                        }
                }



                const data = d.map((o) => {
                        return {
                                year: parseDate(o.roll_year),
                                value: parseAssessedValue(o.assessed_value)
                        }
                }
                );



                // define scales
                const xScale = d3.scaleTime()
                                //  .domain(d3.extent(data, (x)=> x.year))
                                 .domain([parseDate("2000"), parseDate("2022")])
                                 .range([0, width]);
                const yScale = d3.scaleLog()
                                 .domain(d3.extent(data, (x)=> x.value))
                                 .range([height, 0]);


                // define axis
                const xAxis = d3.axisBottom(xScale).ticks(10);
                const yAxis = d3.axisLeft(yScale);


                // add axis to graphics
                groupChart.append("g")
                          .attr("class", "axis x")
                          .attr("transform", `translate(0, ${height})`)
                          .call(xAxis);
                groupChart.append("g")
                          .attr("class", "axis y")
                          .attr("transform", `translate(0, 0)`)
                          .call(yAxis);


                // add band between two prices
                start_year = "2000"
                end_year = "2022"
                band_low = 100000
                band_high = 1000000
                const lineData = [
                        [parseDate(start_year), band_high],
                        [parseDate(end_year), band_high],
                        [parseDate(end_year), band_low],
                        [parseDate(start_year), band_low],
                ] 
                const lineGenerator = d3.line()
                                        .x((a)=>xScale(a[0]))
                                        .y((a)=>yScale(a[1]))
                groupChart.append("path")
                          .attr("fill", "navy")
                          .attr("stroke", "navy")
                          .attr("stroke-width", "0")
                          .attr("fill-opacity", "0.3")
                          .attr("d", lineGenerator(lineData));


                // add points
                groupChart.selectAll("circle")
                          .data(data).enter()
                          .append("circle")
                          .attr("fill", (o) => {
                                if(o.value < 1000000 ){
                                        return "green";
                                }
                                else{
                                        return "red"
                                }
                          }
                                )
                          .attr("fill-opacity", "0.3")
                          .attr("cx", (o) => xScale(o.year))
                          .attr("cy", (o) => yScale(o.value))
                          .attr("r", 1)
        }

)

