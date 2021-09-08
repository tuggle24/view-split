<script>
import { handleMouseDown } from "divider-html";

export default {
  data() {
    return {
      sizes: [],
    };
  },
  created() {
    this.sizes = [50, 50];
  },
  methods: {
    onMouseDown(event) {
      handleMouseDown(event, this.sizes, this.paintScreen);
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
