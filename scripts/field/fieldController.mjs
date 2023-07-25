import { Conversion } from "./conversion.mjs";
export {fieldController};

// happens on click
// generates new inputs for other stuff
// direct manipulation

//onmousedown for dragging around
//A mouse event

//reference position of new context is relative to the
//origin of the previous context 
// May not be necessary because offsetx and offsety!
// function relative_position(x, y, reference_position) {
  
// }




// Should push information to both models I think
// the view is maintaining a copy of the model, basically.

//Just... make a whole new one of these on any resize
//Unless I implement an onResize...
//Which queries the chart again....

/**
 * interface which passes data into the model.
 * Takes an object of args.
 * @callback modelInterface
 */

class fieldController {
  /**
   * Create a point.
   * @param {Chart} chart - chart.js chart
   * @param {JQuery} element - element containing the chart
   */
  constructor(chart, element) {
    this.container = element;
    this.valueBounds; this._setValueBounds(chart);
    this.posToValueX; this._setConversionX(chart);
    this.posToValueY;  this._setConversionY(chart);
    /**
     * position of the chart origin relative to the canvas.
     * @type {{x: number, y: number}} location
     */
    this.originLocation= {x: 0, y: 0}; this._setOrigin(chart);
    this.chartHeight= chart.chartArea.height;
    this.chartWidth = chart.chartArea.width;
  }
  /**
   * relative to top right of container
   * @param {Chart} chart 
   * @returns 
   */
  _setOrigin(chart) {
    this.originLocation =  {
      x: chart.chartArea.left,
      y: chart.chartArea.top + chart.chartArea.height,
    }
  }
  _setValueBounds(chart) {
    this.valueBounds = {
      x: {
        min: chart.options.scales.x.min,
        max: chart.options.scales.x.max,
      },
      y: {
        min: chart.options.scales.y.min,
        max: chart.options.scales.y.max,
      }
    }
  }
  _setConversionX(chart) {
    let fromMax = chart.chartArea.width;
    let toMin = chart.options.scales.x.min;
    let toMax = chart.options.scales.x.max;
    this.posToValueX = new Conversion(toMin, toMax, fromMax);
  }
  _setConversionY(chart) {
    let fromMax = chart.chartArea.height;
    let toMin = chart.options.scales.y.min;
    let toMax = chart.options.scales.y.max;
    this.posToValueY = new Conversion(toMin, toMax, fromMax);
  }
  // offsets are relative to the element/container
  // that this class is working off of
  // provides coordinates relative to the origin
  // where positive y is up and 
  // positive x is to the right
  _relativize(offsetX, offsetY) {
    //relative to origin, 
    let newX = offsetX;
    let newY = offsetY;
    newX -= this.originLocation.x;
    newY -= this.originLocation.y;
    //flip y axis
    newY *= -1;
    return {x: newX, y: newY};
  }
  _chartValue(xPos, yPos) {
    return {
             x: this.posToValueX.forward(xPos),
             y: this.posToValueY.forward(yPos)
           }
  }
  // NOT position
  _clampX(valueX) {
    valueX = Math.min(valueX, this.valueBounds.x.max);
    valueX = Math.max(valueX, this.valueBounds.x.min);
    return valueX;
  }
  // NOT position
  _clampY(valueY) {
    valueY = Math.min(valueY, this.valueBounds.y.max);
    valueY = Math.max(valueY, this.valueBounds.y.min);
    return valueY;
  }
  // re calculate all relative values
  resize(chart) {
    this._setValueBounds(chart);
    this._setConversionX(chart);
    this._setConversionY(chart);
  }
  /**
   * new input. Pushes results to output callback.
   * Requires that 'this' not be set to the caller's context
   * @param {JQuery.Event} event
   */
  input(event) {

    const coordinates = this._relativize(event.offsetX, event.offsetY);

    const values = this._chartValue(coordinates.x, coordinates.y);
    const xBounded = this._clampX(values.x);
    const yBounded = this._clampY(values.y);
    return {x: xBounded, y: yBounded};
  }
}
