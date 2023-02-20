// transition example

// data
const years = [
        "1999",
        "2000",
        "2010",
        "2020",
]
const dataArray = [
        [
                {
                        "country": "USA",
                        "GDP": 8500000000000,
                        "population": 180000000,
                        "life_expectancy": 39
                },
                {
                        "country": "Canada",
                        "GDP": 8300000000000,
                        "population": 19500000,
                        "life_expectancy": 49
                },
        ],
        [
                {
                        "country": "USA",
                        "GDP": 9000000000000,
                        "population": 200000000,
                        "life_expectancy": 40
                },
                {
                        "country": "Canada",
                        "GDP": 9000000000000,
                        "population": 20000000,
                        "life_expectancy": 50
                },
        ],
        [
                {
                        "country": "USA",
                        "GDP": 1500000000000,
                        "population": 320000000,
                        "life_expectancy": 60
                },
                {
                        "country": "Canada",
                        "GDP": 15000000000000,
                        "population": 32000000,
                        "life_expectancy": 70
                }
        ],
        [
                {
                        "country": "USA",
                        "GDP": 22000000000000,
                        "population": 400000000,
                        "life_expectancy": 80
                },
                {
                        "country": "Canada",
                        "GDP": 22000000000000,
                        "population": 40000000,
                        "life_expectancy": 90
                }
        ]
]



const pData = [{}, {}, {}, {}]
function getDataForYear(index){
        const xData = dataArray[index].map((d,i)=> d.life_expectancy).flat()
        const yData = dataArray[index].map((d,i)=> d.GDP).flat()
        const rData = dataArray[index].map((d,i)=> d.population).flat()
        const countries = dataArray[index].map((d,i)=> d.country).flat()
        return Promise.all(
                [xData, yData, rData, countries]
        ).then(
                (d) => {
                        pData[index].life_expectancies = d[0];
                        pData[index].GDPs = d[1];
                        pData[index].populations = d[2];
                        pData[index].countries = d[3];
                }
        )
        // return [xData, yData, rData, countries]
}

function doProcessData(){
        return [0,1,2,3].map((i)=>getDataForYear(i))
}


// svg
const svg = d3.select("body").append("svg").attr("width", "100%").attr("height", "500px");

const margin = {left: 50, right: 50, top: 0, bottom:0};

const groupChart = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

// width and heigh
const width = 600;
const height = 400;
const MILLION = 1000000;
const TRILLION = 1000000000000;

// define scales
const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
const yScale = d3.scaleLinear().domain([5*TRILLION, 25*TRILLION]).range([height, 0]);
const rScale = d3.scaleLinear().domain([10*MILLION, 500*MILLION]).range([5, 20]);


let ii = 0;
const _draw = (selection, index) => {
        selection
        
        return selection
}

function draw(){
        let index = 0;
        // animation time step
        ANIMATION_TIME = 800

        const selection = groupChart.selectAll("circle")
                .data(pData[index].GDPs)
                .enter()
                .append("circle")
                
        selection
                .transition().delay(0).duration(ANIMATION_TIME)
                .attr("cx", (d, i) => `${xScale(pData[index].life_expectancies[i])}`)
                .attr("cy", (d, i) => `${yScale(pData[index].GDPs[i])}`)
                .attr("r", (d, i) => `${rScale(pData[index].populations[i])}`)
                .attr("fill", (d, i) => {
                        if(pData[index].countries[i] == "USA") {
                                return "blue"
                        }
                        else {
                                return "red"
                        }
                }
                )
                .transition().delay(0).duration(ANIMATION_TIME)
                .attr("cx", (d, i) => `${xScale(pData[index+1].life_expectancies[i])}`)
                .attr("cy", (d, i) => `${yScale(pData[index+1].GDPs[i])}`)
                .attr("r", (d, i) => `${rScale(pData[index+1].populations[i])}`)
                .transition().delay(0).duration(ANIMATION_TIME)
                .attr("cx", (d, i) => `${xScale(pData[index+2].life_expectancies[i])}`)
                .attr("cy", (d, i) => `${yScale(pData[index+2].GDPs[i])}`)
                .attr("r", (d, i) => `${rScale(pData[index+2].populations[i])}`)
                .transition().delay(0).duration(ANIMATION_TIME)
                .attr("cx", (d, i) => `${xScale(pData[index+3].life_expectancies[i])}`)
                .attr("cy", (d, i) => `${yScale(pData[index+3].GDPs[i])}`)
                .attr("r", (d, i) => `${rScale(pData[index+3].populations[i])}`)

}




// run the function
Promise.all(
        doProcessData()
).then(
        (d) => {
                draw()
        }
)

