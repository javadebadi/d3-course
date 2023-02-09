// the script is based on 0410 Script
const parseDate = d3.timeParse("%m/%d/%Y");
const parsePrice = (price) => parseFloat(price.replace(/,/g, ''));

const svg = d3.select("body").append("svg").attr("width", "100%").attr("height", "500px");


const margin = {left: 50, right: 50, top: 0, bottom:0};

// define tooltip
const tooltip = d3.select("body")
                  .append("div")
                  .attr("class", "tooltip")
                  .style("opacity", "0")
                  .style("position", "absolute")
                  .style("padding", "10px")
                  .style("background-color", "#DDD")
                  .style("border-radius", "4px")
                  .style("font-family", "Arial")
                  .style("color", "#444")
                  .style("font-size", "0.8rem");

const groupChart = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);



function callFunction(){

        const data = d3.csv(
                "./btc.csv",
                row => row,
                data => {
                        return {
                                Date:parseDate(data.Date),
                                Close: parsePrice(data.Close)
                        };
                }
                ).then(
                        (dataArray) => {
        
                                // width and heigh
                                const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                                const height =  (window.innerHeight > 200) ? 200 : window.innerHeight;
                                // const height = 200;
        
                                // process data
                                const xData = dataArray.map(x => x.Date);
                                const yData = dataArray.map(x => x.Close);
        
                                // scales of axis
                                const yScale = d3.scaleLinear().domain(
                                        [d3.min(yData),d3.max(yData)]
                                ).range([height, 0]);
                                const xScale = d3.scaleTime().domain(
                                        d3.extent(xData, x => x)
                                ).range([0,width]);
        
                                
                                // remove previous element
                                groupChart.selectAll("g").remove()
                                groupChart.selectAll("path").remove()
                                groupChart.selectAll("circle.data-point").remove()


                                // add x axis
                                const xAxis = d3.axisBottom(xScale);

        
                                groupChart.append("g")
                                          .attr("class", "axis x")
                                          .attr("transform", `translate(0, ${height})`)
                                          .call(xAxis)
                                          
                                // add y axis
                                const yAxis = d3.axisLeft(yScale);
        
                                groupChart.append("g")
                                          .attr("class", "axis y")
                                          .attr("transform", `translate(0, 0)`)
                                          .call(yAxis)
                                          
                                          
        
        
                                // add line plot
                                const lineGenerator = d3.line()
                                                        .x((d,i)=> xScale(d.Date))
                                                        .y((d,i) => yScale(d.Close))
                                                        .curve(d3.curveCardinal);
                                
                                groupChart.append("path")
                                          .attr("class", "price-line")
                                          .attr("fill", "none")
                                          .attr("stroke", "blue")
                                          .attr("d", lineGenerator(dataArray))
                                          .on("mousemove", (event, d) => {
                                                        const target = d3.select(event.currentTarget);
                                                        target.style("stroke", "red");
                                                        
                                                }
                                                )
                                          .on("mouseout", (event, d) => {
                                                        const target = d3.select(event.currentTarget);
                                                        target.style("stroke", "blue");
                                                }
                                                )

                                                

                                // create tooltip
                                groupChart.selectAll("circle.data-point")
                                          .data(dataArray)
                                          .enter()
                                          .append("circle")
                                          .attr("class", "data-point")
                                          .attr("cx", (d) => xScale(d.Date))
                                          .attr("cy", (d) => yScale(d.Close))
                                          .attr("r", "1")
                                          .attr("fill", "black")
                                          .on("mousemove",
                                                (event, d) => {
                                                        tooltip.style("opacity", "1")
                                                               .style("left", event.pageX+"px")
                                                               .style("top", event.pageY+"px")
                                                               .html("Close = $" + d.Close);
                                                        console.log(tooltip)
                                                }
                                                )
                                        .on("mouseout",
                                                (event, d) => {
                                                        setTimeout(
                                                                () => tooltip.style("opacity", "0"),
                                                                3000,
                                                        )

                                                }
                                          )
                                        .on("mousedown",
                                                (event, d) => {
                                                        tooltip.style("opacity", "0");
                                                }
                                          )

                        }
        
                )

}


callFunction()
d3.select(window).on("resize", callFunction);