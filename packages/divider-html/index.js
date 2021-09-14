function noOperation() {
  // NOOP function
}

function handleMouseUp(
  moveHandler,
  system,
  parent,
  previousElement,
  divider,
  nextElement
) {
  return function handler(event) {
    event.preventDefault();

    system.afterDrag(system.sizes.map((size) => size));

    document.removeEventListener("mousemove", moveHandler);
    document.removeEventListener("mouseup", handler);

    previousElement.removeEventListener("selectstart", noOperation);
    previousElement.removeEventListener("dragstart", noOperation);
    nextElement.removeEventListener("selectstart", noOperation);
    nextElement.removeEventListener("dragstart", noOperation);

    previousElement.style.userSelect = "";
    previousElement.style.webkitUserSelect = "";
    previousElement.style.MozUserSelect = "";
    previousElement.style.pointerEvents = "";

    nextElement.style.userSelect = "";
    nextElement.style.webkitUserSelect = "";
    nextElement.style.MozUserSelect = "";
    nextElement.style.pointerEvents = "";

    divider.style.cursor = "";
    parent.style.cursor = "";
    document.body.style.cursor = "";
  };
}

function handleMouseMove(
  position,
  mouseDownEvent,
  dragOffset,
  system,
  updateSizes
) {
  return function handler(mouseMoveEvent) {
    mouseMoveEvent.preventDefault();

    const offset =
      mouseMoveEvent[system.eventDimension] -
      mouseDownEvent.target.previousElementSibling.getBoundingClientRect()[
        system.elementStart
      ] +
      (system.panelSpaceForDivider - dragOffset);

    const size =
      system.panelSpaceForDivider * 2 +
      mouseDownEvent.target.previousElementSibling.getBoundingClientRect()[
        system.elementDimension
      ] +
      mouseDownEvent.target.nextElementSibling.getBoundingClientRect()[
        system.elementDimension
      ];

    const totalPer = system.sizes[position - 1] + system.sizes[position];
    const previousSiblingSize = (offset / size) * totalPer;
    const nextSiblingSize = totalPer - (offset / size) * totalPer;

    updateSizes(position, [previousSiblingSize, nextSiblingSize]);
    system.onDrag(system.sizes.map((size) => size));
  };
}

export function handleMouseDown(position, event, system, updateSizes) {
  event.preventDefault();
  if (event.button !== 0) {
    return;
  }

  system.beforeDrag(system.sizes.map((size) => size));

  const previousElement = event.target.previousElementSibling;
  const nextElement = event.target.nextElementSibling;

  previousElement.addEventListener("selectstart", noOperation);
  previousElement.addEventListener("dragstart", noOperation);
  nextElement.addEventListener("selectstart", noOperation);
  nextElement.addEventListener("dragstart", noOperation);

  previousElement.style.userSelect = "none";
  previousElement.style.webkitUserSelect = "none";
  previousElement.style.MozUserSelect = "none";
  previousElement.style.pointerEvents = "none";

  nextElement.style.userSelect = "none";
  nextElement.style.webkitUserSelect = "none";
  nextElement.style.MozUserSelect = "none";
  nextElement.style.pointerEvents = "none";

  event.target.style.cursor = system.cursor;
  event.target.parentElement.style.cursor = system.cursor;
  document.body.style.cursor = system.cursor;

  const dragOffset =
    event[system.eventDimension] -
    event.target.getBoundingClientRect()[system.elementStart];
  const moveHandler = handleMouseMove(
    position,
    event,
    dragOffset,
    system,
    updateSizes
  );

  document.addEventListener("mousemove", moveHandler);
  document.addEventListener(
    "mouseup",
    handleMouseUp(
      moveHandler,
      system,
      event.target.parentElement,
      previousElement,
      event.target,
      nextElement
    )
  );
}

function createArray(length, value) {
  const emptyCollection = [];
  while (length) {
    emptyCollection.push(value);
    length--;
  }
  return emptyCollection;
}

export function buildSystem(amountOfDivisions, options) {
  const isHorizontal = options.divide == "horizontal";
  const system = {
    sizes: createArray(amountOfDivisions, 100 / amountOfDivisions),
    minSizes: createArray(amountOfDivisions, 100),
    maxSizes: createArray(amountOfDivisions, Number.POSITIVE_INFINITY),
    onDrag: options.onDrag || noOperation,
    beforeDrag: options.beforeDrag || noOperation,
    afterDrag: options.afterDrag || noOperation,
    divide: options.divide || "vertical",
    cursor: isHorizontal ? "row-resize" : "col-resize",
    dividerSize: options.dividerSize || 10,
    numberOfPanels: amountOfDivisions,
    numberOfDividers: amountOfDivisions - 1,
    panelSpaceForDivider: 0,
    eventDimension: isHorizontal ? "clientY" : "clientX",
    elementDimension: isHorizontal ? "height" : "width",
    elementStart: isHorizontal ? "top" : "left",
    flexDirection: isHorizontal ? "column" : "row",
  };

  system.panelSpaceForDivider =
    (system.dividerSize * system.numberOfDividers) / system.numberOfPanels;

  return system;
}
