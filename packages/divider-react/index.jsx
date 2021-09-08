import React, { useState, Children, cloneElement } from "react";
import { buildSystem, handleMouseDown } from "divider-html";

export default function Tilt({ children }) {
  const [sizes, updateSizes] = useState([50, 50]);

  function renderSize(sizes) {
    updateSizes((prevSizes) => sizes);
  }

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
