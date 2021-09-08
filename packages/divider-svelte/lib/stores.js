import { writable } from "svelte/store";
export const sizes = writable([]);

export function dividing(node, divider) {
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

  function handleDown(event, sizes, paintScreen) {
    event.preventDefault();
    const dragOffset =
      event.clientX - event.target.getBoundingClientRect().left;
    const moveHandler = handleMouseMove(dragOffset, event, sizes, paintScreen);

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", handleMouseUp(moveHandler));
  }

  let adjacentSizes;
  sizes.subscribe((s) => {
    // console.log("in Subscribe: ", s);
    const dividerPosition = s.findIndex((el) => el === divider);
    adjacentSizes = [s[dividerPosition - 1].size, s[dividerPosition + 1].size];
  });
  const paintScreen = (updatedSizes) => {
    sizes.update((s) => {
      const dividerPosition = s.findIndex((el) => el === divider);
      s = s.map((division, position) => {
        if (position === dividerPosition - 1) {
          division.size = updatedSizes[0];
        }
        if (position === dividerPosition + 1) {
          division.size = updatedSizes[1];
        }
        return division;
      });
      return s;
    });
  };

  function mouseDownHandler(e) {
    handleDown(e, adjacentSizes, paintScreen);
  }
  node.addEventListener("mousedown", mouseDownHandler);

  return {
    destroy() {
      node.removeEventListener("mousedown", mouseDownHandler);
    },
  };
}
