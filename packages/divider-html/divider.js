import { buildSystem, noOperation } from "./core";

/**
 * A divider function
 * @param {Array} nodes list of strings
 * @param {Object} options settings to change functionality
 * @returns {undefined}
 */
export default function Divider(nodes, options = {}) {
  // const config = {
  //   sizes: nodes.map(() => 100 / nodes.length),
  //   minSizes: nodes.map(() => 100),
  //   maxSizes: nodes.map(() => Number.POSITIVE_INFINITY),
  //   isDividerVisible: false,
  //   expandMin: false,
  //   expandMax: false,
  //   step: 10,
  //   snap: 50,
  //   divide: "vertical",
  //   cursor: "col-resize",
  //   onDrag: noOperation,
  //   onDragStart: noOperation,
  //   onDragEnd: noOperation,
  //   onResize: noOperation,
  //   dividerSize: 10,
  //   createDivider: noOperation,
  //   statics: [],
  // };

  // for (const key of Object.keys(options)) {
  //   if (options[key].constructor.name === config[key].constructor.name) {
  //     config[key] = options[key];
  //   } else {
  //     throw new Error(
  //       `config, ${options[key]}, should be of type: ${config[key].constructor.name}`
  //     );
  //   }
  // }

  // config.numOfPanels = nodes.length;
  // config.numOfDividers = config.numOfPanels - 1;

  const config = buildSystem(options, nodes.length);

  /**
   * A divider function
   * @param {Object} event html event
   * @this {Object} divider
   * @returns {undefined}
   */
  function mouseDownHandler(event) {
    event.preventDefault();
    if (event.button !== 0) {
      return;
    }

    this.dragOffset = event.clientX - this.element.getBoundingClientRect().left;
    this.previousElementStartPosition = nodes[
      this.previous
    ].element.getBoundingClientRect().left;

    nodes[this.previous].element.addEventListener("selectstart", noOperation);
    nodes[this.previous].element.addEventListener("dragstart", noOperation);
    nodes[this.next].element.addEventListener("selectstart", noOperation);
    nodes[this.next].element.addEventListener("dragstart", noOperation);

    nodes[this.previous].element.style.userSelect = "none";
    nodes[this.previous].element.style.webkitUserSelect = "none";
    nodes[this.previous].element.style.MozUserSelect = "none";
    nodes[this.previous].element.style.pointerEvents = "none";

    nodes[this.next].element.style.userSelect = "none";
    nodes[this.next].element.style.webkitUserSelect = "none";
    nodes[this.next].element.style.MozUserSelect = "none";
    nodes[this.next].element.style.pointerEvents = "none";

    document.addEventListener("mousemove", this.drag);
    document.addEventListener("mouseup", this.stop);
  }

  /**
   * A divider function
   * @param {Object} event html event
   * @this {Object} divider
   * @returns {undefined}
   */
  function mouseMoveHandler(event) {
    event.preventDefault();

    const offset =
      event.clientX -
      this.previousElementStartPosition +
      ((config.dividerSize * config.numOfDividers) / config.numOfPanels -
        this.dragOffset);

    const size =
      ((config.dividerSize * config.numOfDividers) / config.numOfPanels) *
        config.numOfDividers +
      nodes[this.previous].element.getBoundingClientRect().width +
      nodes[this.next].element.getBoundingClientRect().width;

    const totalPer = nodes[this.previous].size + nodes[this.next].size;

    nodes[this.previous].size = (offset / size) * totalPer;
    nodes[this.next].size = totalPer - (offset / size) * totalPer;

    const takeOut =
      (config.dividerSize * config.numOfDividers) / config.numOfPanels;

    nodes[this.previous].element.style.width = `calc(${
      nodes[this.previous].size
    }%  - ${takeOut}px)`;
    nodes[this.next].element.style.width = `calc(${
      nodes[this.next].size
    }%  - ${takeOut}px)`;
  }

  /**
   * A divider function
   * @param {Object} event html event
   * @this {Object} divider
   * @returns {undefined}
   */
  function mouseUpHandler(event) {
    event.preventDefault();

    nodes[this.previous].element.removeEventListener(
      "selectstart",
      noOperation
    );
    nodes[this.previous].element.removeEventListener("dragstart", noOperation);
    nodes[this.next].element.removeEventListener("selectstart", noOperation);
    nodes[this.next].element.removeEventListener("dragstart", noOperation);

    nodes[this.previous].element.style.userSelect = "";
    nodes[this.previous].element.style.webkitUserSelect = "";
    nodes[this.previous].element.style.MozUserSelect = "";
    nodes[this.previous].element.style.pointerEvents = "";

    nodes[this.next].element.style.userSelect = "";
    nodes[this.next].element.style.webkitUserSelect = "";
    nodes[this.next].element.style.MozUserSelect = "";
    nodes[this.next].element.style.pointerEvents = "";

    document.removeEventListener("mousemove", this.drag);
    document.removeEventListener("mouseup", this.stop);
  }

  function paintScreen(sizes) {}

  nodes = nodes.map((id, position) => {
    const element =
      id.constructor.name === "String" ? document.querySelector(id) : id;

    const node = {
      position,
      element,
      size: config.sizes[position],
      minSize: config.sizes[position],
      mazSize: config.sizes[position],
    };

    node.element.style.width = `calc(${node.size}% - ${
      (config.dividerSize * config.numOfDividers) / config.numOfPanels
    }px)`;

    if (position === 0) {
      config.parent = node.element.parentNode;
      config.refs.push(node.element);
      return node;
    }

    const divider = {
      element: document.createElement("div"),
      previous: position - 1,
      next: position,
    };
    config.refs.push(divider.element, node.element);

    divider.element.style.width = `${config.dividerSize}px`;
    divider.element.className = "divider";

    config.parent.insertBefore(divider.element, node.element);

    divider.start = mouseDownHandler.bind(divider);
    divider.drag = mouseMoveHandler.bind(divider);
    divider.stop = mouseUpHandler.bind(divider);
    divider.element.addEventListener("mousedown", divider.start);

    return node;
  });
  console.log(config);
}