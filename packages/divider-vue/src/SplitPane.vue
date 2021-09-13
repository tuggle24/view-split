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

    for (let position = 0; position < amountOfSlots; ++position) {
      if (position != 0) {
        dividends.push(
          h(
            "div",
            {
              style: { width: "10px" },
              on: { mousedown: (event) => this.onMouseDown(event, position) },
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
              width: `calc(${this.system.sizes[position]}% - ${10 / 2}px)`,
            },
          },
          [this.$slots.default[position]]
        )
      );
    }

    return h("div", { style: { display: "flex" } }, [dividends]);
  },
};
</script>
