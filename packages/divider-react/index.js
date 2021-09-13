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

  function capturePosition(position) {
    return function (event) {
      handleMouseDown(position, event, store, updateSizes);
    };
  }

  const dividends = [];

  for (
    let position = 0, length = Children.count(children);
    position < length;
    ++position
  ) {
    const child = children[position];

    if (position != 0) {
      const captureEvent = capturePosition(position);
      dividends.push(
        <div
          className="divider"
          onMouseDown={captureEvent}
          style={{ width: `${store.dividerSize}px` }}
        >
          c
        </div>
      );
    }

    dividends.push(
      cloneElement(child, {
        style: {
          width: `calc(${store.sizes[position]}% - ${
            (store.dividerSize * store.numberOfDividers) / store.numberOfPanels
          }px)`,
        },
      })
    );
  }

  return (
    <div className="SplitView" style={{ display: "flex" }}>
      {dividends}
    </div>
  );
}
