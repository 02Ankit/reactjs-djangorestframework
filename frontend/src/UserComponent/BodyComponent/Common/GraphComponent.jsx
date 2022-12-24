
import { Chart, registerables } from "chart.js";

export const GraphComponent = ({ id, data, bgColor, brColor }) =>{

    
var ctx = document.getElementById(id).getContext('2d');

Chart.register(...registerables);

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: "My Chart",
        datasets: [{
            label: 'My First DataSet ',
            data: data,
            backgroundColor: bgColor,
            borderColor: brColor,
            tension: 0.5,
        }]
    },
    options: {
        scales: {
            x: {
                display:false,
                title:{display:false}
                
            },
            y: {
                display:false,
                title:{display:false}
                
            },
        },
        plugins:{
            legend:{display:false}
        }
    },
    responsive:true,
    maintainAspectRatio:false
});
return myChart;
}


export function lineGraphComponent({ id, type, dataSets, xAxisLabels }) {
    var ctx = document.getElementById(id).getContext("2d");
  
    Chart.register(...registerables);
    var myChart = new Chart(ctx, {
      type: type ? type : "line",
      data: {
        labels: xAxisLabels,
        datasets: dataSets,
      },
      options: {
        scales: {
          x: {
            display: type === "pie" ? false : true,
            grid: {
              color: "transparent",
            },
          },
  
          y: {
            display: type === "pie" ? false : true,
            grid: {
              // color: "transparent",
            },
          },
        },
        plugins: {
          legend: { position: "bottom" },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
    return myChart;
  }