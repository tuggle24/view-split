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
    if (!("touches" in event)) event.preventDefault();

    system.afterDrag(system.sizes.map((size) => size));
    document.removeEventListener("mousemove", moveHandler);
    document.removeEventListener("mouseup", handler);

    document.removeEventListener("touchmove", moveHandler);
    document.removeEventListener("touchend", handler);
    document.removeEventListener("touchcancel", handler);

    previousElement.removeEventListener("selectstart", noOperation);
    previousElement.removeEventListener("dragstart", noOperation);
    nextElement.removeEventListener("selectstart", noOperation);
    nextElement.removeEventListener("dragstart", noOperation);

    previousElement.style.userSelect = "auto";

    nextElement.style.userSelect = "auto";

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
    if (!("touches" in mouseMoveEvent)) mouseMoveEvent.preventDefault();
    mouseMoveEvent =
      "touches" in mouseMoveEvent ? mouseMoveEvent.touches[0] : mouseMoveEvent;
    const panelSpaceForDivider = system.panelSpaceForDivider;
    let offset =
      mouseMoveEvent[system.eventDimension] -
      mouseDownEvent.target.previousElementSibling.getBoundingClientRect()[
        system.start
      ] +
      (panelSpaceForDivider - dragOffset);

    const size =
      panelSpaceForDivider * 2 +
      mouseDownEvent.target.previousElementSibling.getBoundingClientRect()[
        system.elementDimension
      ] +
      mouseDownEvent.target.nextElementSibling.getBoundingClientRect()[
        system.elementDimension
      ];

    if (offset <= system.minSizes[position - 1] + panelSpaceForDivider) {
      offset = system.minSizes[position - 1] + panelSpaceForDivider;
    }

    if (offset >= size - system.minSizes[position] - panelSpaceForDivider) {
      offset = size - system.minSizes[position] - panelSpaceForDivider;
    }

    if (offset >= system.maxSizes[position - 1] + panelSpaceForDivider) {
      offset = system.maxSizes[position - 1] + panelSpaceForDivider;
    }

    if (offset <= size - system.maxSizes[position] - panelSpaceForDivider) {
      offset = size - system.maxSizes[position] - panelSpaceForDivider;
    }

    const totalPer = system.sizes[position - 1] + system.sizes[position];
    const previousSiblingSize = (offset / size) * totalPer;
    const nextSiblingSize = totalPer - (offset / size) * totalPer;

    updateSizes(position, [previousSiblingSize, nextSiblingSize]);
    system.onDrag(system.sizes.map((size) => size));
  };
}

export function handleMouseDown(position, event, system, updateSizes) {
  if ("button" in event && event.button != 0) return;
  if (!("touches" in event)) event.preventDefault();
  event = "touches" in event ? event.touches[0] : event;

  system.beforeDrag(system.sizes.map((size) => size));

  const previousElement = event.target.previousElementSibling;
  const nextElement = event.target.nextElementSibling;

  previousElement.addEventListener("selectstart", noOperation);
  previousElement.addEventListener("dragstart", noOperation);
  nextElement.addEventListener("selectstart", noOperation);
  nextElement.addEventListener("dragstart", noOperation);

  previousElement.style.userSelect = "none";

  nextElement.style.userSelect = "none";

  event.target.style.cursor = system.cursor;
  event.target.parentElement.style.cursor = system.cursor;
  document.body.style.cursor = system.cursor;
  const dragOffset =
    event[system.eventDimension] -
    event.target.getBoundingClientRect()[system.start];
  const moveHandler = handleMouseMove(
    position,
    event,
    dragOffset,
    system,
    updateSizes
  );

  document.addEventListener("mousemove", moveHandler);
  document.addEventListener("touchmove", moveHandler);

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
  document.addEventListener(
    "touchend",
    handleMouseUp(
      moveHandler,
      system,
      event.target.parentElement,
      previousElement,
      event.target,
      nextElement
    )
  );
  document.addEventListener(
    "touchcancel",
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

  const sizes = Array.isArray(options.sizes)
    ? options.sizes
    : createArray(
        amountOfDivisions,
        typeof options.sizes == "number"
          ? options.sizes
          : 100 / amountOfDivisions
      );

  const minSizes = Array.isArray(options.minSizes)
    ? options.minSizes
    : createArray(
        amountOfDivisions,
        typeof options.minSizes == "number" ? options.minSizes : 0
      );

  const maxSizes = Array.isArray(options.maxSizes)
    ? options.maxSizes
    : createArray(
        amountOfDivisions,
        typeof options.maxSizes == "number"
          ? options.maxSizes
          : Number.POSITIVE_INFINITY
      );

  const system = {
    sizes,
    minSizes,
    maxSizes,
    onDrag: options.onDrag || noOperation,
    beforeDrag: options.beforeDrag || noOperation,
    afterDrag: options.afterDrag || noOperation,
    cursor: isHorizontal ? "row-resize" : "col-resize",
    dividerSize: options.dividerSize || 10,
    eventDimension: isHorizontal ? "clientY" : "clientX",
    elementDimension: isHorizontal ? "height" : "width",
    start: isHorizontal ? "top" : "left",
    panelSpaceForDivider:
      ((options.dividerSize || 10) * (amountOfDivisions - 1)) /
      amountOfDivisions,
  };

  return system;
}
