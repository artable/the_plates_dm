// WHO am I kidding the model _is_ the view

//generates an input field display at the arg element
//and returns an function interface for movement
export {chartCursor};


// UPDATE API????
// https://www.chartjs.org/docs/latest/developers/api.html
// adds a cursor to the chart and returns a handle to move
// it around.
function chartCursor(chart, label, startPosition) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(startPosition);
  });
  return (position) => {
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(position);
    });
    chart.options.animation = false;
    chart.update();
    chart.options.animation = true;
  }
}