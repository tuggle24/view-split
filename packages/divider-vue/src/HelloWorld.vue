<script>
function handleMouseUp(moveHandler) {
  return function handler(event) {
    event.preventDefault();

    document.removeEventListener("mousemove", moveHandler);
    document.removeEventListener("mouseup", handler);
  };
}

function handleMouseMove(
  dragOffset,
  mouseDownEvent,
  currentSizes,
  paintScreen
) {
  return function handler(mouseMoveEvent) {
    mouseMoveEvent.preventDefault();

    const offset =
      mouseMoveEvent.clientX -
      mouseDownEvent.target.previousSibling.getBoundingClientRect().left +
      ((10 * 1) / 2 - dragOffset);

    const size =
      ((10 * 1) / 2) * 1 +
      mouseDownEvent.target.previousSibling.getBoundingClientRect().width +
      mouseDownEvent.target.nextSibling.getBoundingClientRect().width;

    const totalPer = currentSizes[0] + currentSizes[1];
    const previousSiblingSize = (offset / size) * totalPer;
    const nextSiblingSize = totalPer - (offset / size) * totalPer;

    paintScreen([previousSiblingSize, nextSiblingSize]);
  };
}

function handleDown(event, sizes, paintScreen) {
  event.preventDefault();
  const dragOffset = event.clientX - event.target.getBoundingClientRect().left;

  const moveHandler = handleMouseMove(dragOffset, event, sizes, paintScreen);

  document.addEventListener("mousemove", moveHandler);
  document.addEventListener("mouseup", handleMouseUp(moveHandler));
}

export default {
  data() {
    return {
      count: 0,
      sizes: [],
    };
  },
  created() {
    this.sizes = [50, 50];
  },
  computed: {
    times() {
      return this.count > 1 ? "times" : "time";
    },
    text() {
      return `I have been clicked ${this.count} ${this.times}`;
    },
  },
  methods: {
    increment() {
      this.count += 1;
    },
    onMouseDown(e) {
      handleDown(e, this.sizes, this.paintScreen);
    },
    paintScreen(updatedSizes) {
      this.sizes = updatedSizes;
    },
  },
  render: function (h) {
    const dividends = [];
    const amountOfSlots = this.$slots.default.length;

    for (let index = 0; index < amountOfSlots; ++index) {
      if (index % 2 !== 0) {
        dividends.push(
          h(
            "div",
            { style: { width: "10px" }, on: { mousedown: this.onMouseDown } },
            "b"
          )
        );
      }

      dividends.push(
        h(
          "div",
          { style: { width: `calc(${this.sizes[index]}% - ${10 / 2}px)` } },
          [this.$slots.default[index]]
        )
      );
    }

    return h("div", { style: { display: "flex" } }, [dividends]);
  },
};
</script>
