<script>
import { handleMouseDown, buildSystem } from "divider-html";

export default {
  props: ["options"],
  data() {
    return {
      system: buildSystem(this.$slots.default.length, this.options || {}),
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

    for (let position = 0; position < this.$slots.default.length; ++position) {
      if (position != 0) {
        dividends.push(
          h("div", {
            style: {
              [this.system.elementDimension]: `${this.system.dividerSize}px`,
            },
            on: { mousedown: (event) => this.onMouseDown(event, position) },
          })
        );
      }

      dividends.push(
        h(
          "div",
          {
            style: {
              [this.system
                .elementDimension]: `calc(${this.system.sizes[position]}% - ${this.system.panelSpaceForDivider}px)`,
            },
          },
          [this.$slots.default[position]]
        )
      );
    }

    return h(
      "div",
      { style: { display: "flex", flexDirection: this.system.flexDirection } },
      [dividends]
    );
  },
};
</script>
