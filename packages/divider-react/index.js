import React, { useState, Children, cloneElement } from "react";
import { handleMouseDown, buildSystem } from "divider-html";

export function SplitView({ children, options }) {
  const state = useState(buildSystem(options, Children.count(children)));
  const store = state[0];
  const updateStore = state[1];

  function updateSizes(position, sizes) {
    updateStore((prevSizes) => {
      const newStore = {};
      for (var key in prevSizes) {
        newStore[key] = prevSizes[key];
      }
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
    if (position != 0) {
      dividends.push(
        <div
          className="divider"
          onMouseDown={capturePosition(position)}
          style={{ width: `${store.dividerSize}px` }}
        >
          c
        </div>
      );
    }

    dividends.push(
      cloneElement(children[position], {
        style: {
          width: `calc(${store.sizes[position]}% - ${store.panelSpaceForDivider}px)`,
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
