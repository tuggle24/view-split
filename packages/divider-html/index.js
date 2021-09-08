export function noOperation() {
  // NOOP function
}

export function handleMouseUp(moveHandler, previousElement, nextElement) {
  return function handler(event) {
    event.preventDefault();

    document.removeEventListener("mousemove", moveHandler);
    document.removeEventListener("mouseup", handler);

    // console.log(event.target);

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

    // document.removeEventListener("mousemove", this.drag);
    // document.removeEventListener("mouseup", this.stop);
  };
}

export function handleMouseMove(
  dragOffset,
  mouseDownEvent,
  currentSizes,
  paintScreen
) {
  return function handler(mouseMoveEvent) {
    mouseMoveEvent.preventDefault();

    const offset =
      mouseMoveEvent.clientX -
      mouseDownEvent.target.previousElementSibling.getBoundingClientRect()
        .left +
      ((10 * 1) / 2 - dragOffset);

    const size =
      ((10 * 1) / 2) * 1 +
      mouseDownEvent.target.previousElementSibling.getBoundingClientRect()
        .width +
      mouseDownEvent.target.nextElementSibling.getBoundingClientRect().width;

    const totalPer = currentSizes[0] + currentSizes[1];
    const previousSiblingSize = (offset / size) * totalPer;
    const nextSiblingSize = totalPer - (offset / size) * totalPer;

    paintScreen([previousSiblingSize, nextSiblingSize]);
  };
}

export function handleMouseDown(event, sizes, paintScreen) {
  event.preventDefault();
  if (event.button !== 0) {
    return;
  }

  const previousElement = event.target.previousElementSibling;
  const nextElement = event.target.nextElementSibling;

  const dragOffset = event.clientX - event.target.getBoundingClientRect().left;
  const moveHandler = handleMouseMove(dragOffset, event, sizes, paintScreen);

  previousElement.addEventListener("selectstart", noOperation);
  previousElement.addEventListener("dragstart", noOperation);
  nextElement.addEventListener("selectstart", noOperation);
  nextElement.addEventListener("dragstart", noOperation);
  console.log(previousElement);

  previousElement.style.userSelect = "none";
  previousElement.style.webkitUserSelect = "none";
  previousElement.style.MozUserSelect = "none";
  previousElement.style.pointerEvents = "none";

  nextElement.style.userSelect = "none";
  nextElement.style.webkitUserSelect = "none";
  nextElement.style.MozUserSelect = "none";
  nextElement.style.pointerEvents = "none";

  document.addEventListener("mousemove", moveHandler);
  document.addEventListener(
    "mouseup",
    handleMouseUp(moveHandler, previousElement, nextElement)
  );
}

export function buildSystem(options, amountOfDivisions) {
  const config = {
    sizes: Array.from({ length: amountOfDivisions }).fill(
      100 / amountOfDivisions
    ),
    minSizes: Array.from({ length: amountOfDivisions }).fill(100),
    maxSizes: Array.from({ length: amountOfDivisions }).fill(
      Number.POSITIVE_INFINITY
    ),
    isDividerVisible: false,
    expandMin: false,
    expandMax: false,
    step: 10,
    snap: 50,
    divide: "vertical",
    cursor: "col-resize",
    onDrag: noOperation,
    onDragStart: noOperation,
    onDragEnd: noOperation,
    onResize: noOperation,
    dividerSize: 10,
    createDivider: noOperation,
    statics: [],
    numOfPanels: amountOfDivisions,
    numOfDividers: amountOfDivisions - 1,
    refs: [],
  };

  for (const key of Object.keys(options)) {
    if (options[key].constructor.name === config[key].constructor.name) {
      config[key] = options[key];
    } else {
      throw new Error(
        `config, ${options[key]}, should be of type: ${config[key].constructor.name}`
      );
    }
  }

  return config;
}
