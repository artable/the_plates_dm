import {make as makeField} from './field/field.mjs'
import {Plates} from './plates.mjs'

const surfaceConfig = {
  type: 'scatter',
  data: {
    labels: [
      "Data Source 1", 
      "Data Source 2", 
      "Data Source 3"
    ],
    datasets: [
    {
      label: "Historical Descriptions",
      data: [
        {x: 6, y: 8},
        {x: 6, y: 7},
        {x: 6, y: 6},
        ],
      borderWidth: 1,
    },
    ],
  },
  options: {
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: {
        stepSize:1,
        }
      },
      x: {
        min: 0,
        max: 8,
        ticks: {
        stepSize:1,
        }
      }
    },
    responsive: true,
    aspectRatio: 4/5,
    maintainAspectRatio: true,
    legend: {
    display: false,
    },
  }
}

function main() { 
  //wanna make a new chart that doesn't look like this one?
  //gonna need to implement that feature. field.mjs has a note on
  //how that could be sensibly done. 
  const surfaceAreaE = $('#surface');
  const display = $('#numChars');

  const thePlates = new Plates();
  const surfaceAreaChart = new Chart(surfaceAreaE, surfaceConfig);
  const updateSA = (response) => {
    let {x: width, y: length} = response;
    width= Plates.inTomm(width);
    length= Plates.inTomm(length);
    const calc = thePlates.update({width: width, length: length});
    return calc;
  }
  const displayCalculation = (value) => {
    display.text(value);
  }
  const callback = (res) => {
    const val = updateSA(res);
    displayCalculation(val);
  }

  makeField(surfaceAreaE, 
    surfaceAreaChart, "USER", {x: 0, y: 0},
    callback);
}

main();