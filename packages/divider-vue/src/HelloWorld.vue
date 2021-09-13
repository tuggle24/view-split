<script>
import { handleMouseDown, buildSystem } from "divider-html";

export default {
  data() {
    return {
      system: buildSystem({}, this.$slots.default.length),
    };
  },
  methods: {
    onMouseDown(event, position) {
      handleMouseDown(position, event, this.system, this.paintScreen);
    },
    paintScreen(position, updatedSizes) {
      for (let i = 0; i < this.system.sizes.length; i++) {
        if (i == position - 1) {
          this.$set(this.system.sizes, i, updatedSizes[0]);
        }
        if (i == position) {
          this.$set(this.system.sizes, i, updatedSizes[1]);
        }
      }
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
            {
              style: { width: "10px" },
              on: { mousedown: (e) => this.onMouseDown(e, index) },
            },
            "b"
          )
        );
      }

      dividends.push(
        h(
          "div",
          {
            style: {
              width: `calc(${this.system.sizes[index]}% - ${10 / 2}px)`,
            },
          },
          [this.$slots.default[index]]
        )
      );
    }

    return h("div", { style: { display: "flex" } }, [dividends]);
  },
};
</script>
