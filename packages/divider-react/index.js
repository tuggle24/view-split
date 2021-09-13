import React, { useState, Children, cloneElement } from "react";
import { handleMouseDown, buildSystem } from "divider-html";

function assign(givenObject) {
  const result = {};
  for (var key in givenObject) {
    result[key] = givenObject[key];
  }
  return result;
}
export function SplitView({ children, options }) {
  const state = useState(buildSystem(options, Children.count(children)));
  const store = state[0];
  const updateStore = state[1];

  function updateSizes(position, sizes) {
    updateStore((prevSizes) => {
      const newStore = assign(prevSizes);
      for (let i = 0; i < newStore.sizes.length; ++i) {
        if (i == position - 1) {
          newStore.sizes[i] = sizes[0];
        }
        if (i == position) {
          newStore.sizes[i] = sizes[1];
        }
      }
      return newStore;
    });
  }

  function handleDown(position) {
    return function (event) {
      handleMouseDown(position, event, store, updateSizes);
    };
  }

  const dividends = [];

  for (let index = 0, len = Children.count(children); index < len; ++index) {
    const child = children[index];

    if (index % 2 !== 0) {
      const t = handleDown(index);
      dividends.push(
        <div onMouseDown={t} style={{ width: "20px" }}>
          c
        </div>
      );
    }

    dividends.push(
      cloneElement(child, {
        style: { width: `calc(${store.sizes[index]}% - ${20 / 2}px)` },
      })
    );
  }

  return <div style={{ display: "flex" }}>{dividends}</div>;
}
