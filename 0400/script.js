const parseDate = d3.timeParse("%m/%d/%Y");
const parsePrice = (price) => parseFloat(price.replace(/,/g, ''));

const svg = d3.select("body").append("svg").attr("width", "100%").attr("height", "100%");


const margin = {left: 50, right: 50, top: 0, bottom:0};

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
                                
                                groupChart.append("path")
                                          .attr("class", "price-line")
                                          .attr("fill", "none")
                                          .attr("stroke", "blue")
                                          .attr("d", lineGenerator(dataArray))
                        }
        
                )

}


callFunction()
d3.select(window).on("resize", callFunction);