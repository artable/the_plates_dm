import { chartCursor } from "./chartCursor.mjs";
import { fieldController } from "./fieldController.mjs";
import { attachEvents } from "./fieldEvents.mjs";

export { make };
// Chart customization features--max, min etc.
// need to live somewhere. Like possibly the 
// actual chart should be an argument... that is,
// if chart.js provides an API for getting the max
// and min axes values.
// ...and the conversion creation functions are modified
// so that they don't have to be zero indexed.
// or I guess those can just be arbitrary listed requirements.
function make(element, chart, cursorLabel, cursorStart, callback) {
  const cursor = chartCursor(chart, cursorLabel, cursorStart);
  const controller = new fieldController(chart, element);
  attachEvents(element, controller, [cursor, callback]);
}