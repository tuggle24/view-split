import React, { useState, Children, cloneElement } from "react";
import { buildSystem, handleMouseDown } from "divider-html";

// function handleMouseUp(moveHandler) {
//   return function handler(event) {
//     event.preventDefault();

//     document.removeEventListener("mousemove", moveHandler);
//     document.removeEventListener("mouseup", handler);
//   };
// }

// function handleMouseMove(
//   dragOffset,
//   mouseDownEvent,
//   currentSizes,
//   paintScreen
// ) {
//   return function handler(mouseMoveEvent) {
//     mouseMoveEvent.preventDefault();

//     const offset =
//       mouseMoveEvent.clientX -
//       mouseDownEvent.target.previousSibling.getBoundingClientRect().left +
//       ((10 * 1) / 2 - dragOffset);

//     const size =
//       ((10 * 1) / 2) * 1 +
//       mouseDownEvent.target.previousSibling.getBoundingClientRect().width +
//       mouseDownEvent.target.nextSibling.getBoundingClientRect().width;

//     const totalPer = currentSizes[0] + currentSizes[1];
//     const previousSiblingSize = (offset / size) * totalPer;
//     const nextSiblingSize = totalPer - (offset / size) * totalPer;

//     paintScreen([previousSiblingSize, nextSiblingSize]);
//   };
// }

export default function Tilt({ children }) {
  const [sizes, updateSizes] = useState([50, 50]);

  function renderSize(sizes) {
    updateSizes((prevSizes) => sizes);
  }

  // function handleDown(event) {
  //   event.preventDefault();
  //   const dragOffset =
  //     event.clientX - event.target.getBoundingClientRect().left;

  //   const moveHandler = handleMouseMove(dragOffset, event, sizes, renderSize);

  //   document.addEventListener("mousemove", moveHandler);
  //   document.addEventListener("mouseup", handleMouseUp(moveHandler));
  // }

  function handleDown(event) {
    handleMouseDown(event, sizes, renderSize);
  }

  const dividends = [];

  for (let index = 0, len = Children.count(children); index < len; ++index) {
    const child = children[index];

    if (index % 2 !== 0)
      dividends.push(
        <div onMouseDown={handleDown} style={{ width: "20px" }}>
          c
        </div>
      );

    dividends.push(
      cloneElement(child, {
        style: { width: `calc(${sizes[index]}% - ${20 / 2}px)` },
      })
    );
  }

  return <div style={{ display: "flex" }}>{dividends}</div>;
}
