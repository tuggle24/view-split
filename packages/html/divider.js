const NOOP = () => {};

export default function divider(nodes, options = {}) {
  const config = {
    sizes: nodes.map(() => 100 / nodes.length),
    minSizes: nodes.map(() => 100),
    maxSizes: nodes.map(() => Infinity),
    isDividerVisible: false,
    expandMin: false,
    expandMax: false,
    step: 10,
    snap: 50,
    divide: "vertical",
    cursor: "col-resize",
    onDrag: NOOP,
    onDragStart: NOOP,
    onDragEnd: NOOP,
    onResize: NOOP,
    dividerSize: 10,
    createDivider: NOOP,
    statics: [],
  };

  Object.keys(options).forEach((key) => {
    if (options[key].constructor.name === config[key].constructor.name) {
      config[key] = options[key];
    } else {
      throw new Error(
        `config, ${options[key]}, should be of type: ${config[key].constructor.name}`
      );
    }
  });

  config.numOfPanels = nodes.length;
  config.numOfDividers = config.numOfPanels - 1;

  nodes = nodes.map((node, position) => {
    node =
      node.constructor.name === "String" ? document.querySelector(node) : node;

    node = {
      position,
      element: node,
      size: config.sizes[position],
      minSize: config.sizes[position],
      mazSize: config.sizes[position],
    };
    console.log(node);

    node.element.style.width = `calc(${node.size}% - ${
      (config.dividerSize * config.numOfDividers) / config.numOfPanels
    }px)`;

    if (position === 0) {
      config.parent = node.element.parentNode;
      return node;
    }

    const divider = {
      element: document.createElement("div"),
      previous: position - 1,
      next: position,
    };

    divider.element.style.width = `${config.dividerSize}px`;
    divider.element.className = "divider";

    config.parent.insertBefore(divider.element, node.element);

    divider.start = mouseDownHandler.bind(divider);
    divider.drag = mouseMoveHandler.bind(divider);
    divider.stop = mouseUpHandler.bind(divider);
    divider.element.addEventListener("mousedown", divider.start);

    return node;
  });

  function mouseDownHandler(e) {
    e.preventDefault();
    if (e.button !== 0) {
      return;
    }

    this.dragOffset = e.clientX - this.element.getBoundingClientRect().left;
    this.previousElementStartPosition = nodes[
      this.previous
    ].element.getBoundingClientRect().left;

    nodes[this.previous].element.addEventListener("selectstart", NOOP);
    nodes[this.previous].element.addEventListener("dragstart", NOOP);
    nodes[this.next].element.addEventListener("selectstart", NOOP);
    nodes[this.next].element.addEventListener("dragstart", NOOP);

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

  function mouseMoveHandler(e) {
    e.preventDefault();

    const offset =
      e.clientX -
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

  function mouseUpHandler(e) {
    e.preventDefault();

    nodes[this.previous].element.removeEventListener("selectstart", NOOP);
    nodes[this.previous].element.removeEventListener("dragstart", NOOP);
    nodes[this.next].element.removeEventListener("selectstart", NOOP);
    nodes[this.next].element.removeEventListener("dragstart", NOOP);

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

  return {
    expand(id) {},

    collapse(id) {},
    showDivider(id, isDividerVisible) {},

    makeStatic(id, isDividerStatic) {},
    updateSizes(sizes) {},
    getSizes() {},

    destroy() {},
  };
}
