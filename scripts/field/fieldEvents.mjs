export {attachEvents};

function attachEvents(element, controller, callbacks) {
  const input = (event) => {
    return controller.input(event);
  }
  const move = (event) => {
    const inVal = input(event);
    makeCallbacks(callbacks, inVal);
  }
  const up = () => {
    element.off("mousemove", move);
    element.off("mouseup", up);
  }
  const down = (event) => {
    element.on("mousemove", move);
    element.on("mouseup", up);
    const inputValue = input(event);
    makeCallbacks(callbacks, inputValue);
  }
  element.on("mousedown", down);
}

function makeCallbacks(callbacks, result) {
  callbacks.forEach(fun => {
    fun(result);
  });
}