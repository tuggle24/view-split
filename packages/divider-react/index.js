import React, { useState, Children, cloneElement } from "react";
import { handleMouseDown, buildSystem } from "divider-html";

export function SplitView({ children, options }) {
  const state = useState(function () {
    return buildSystem(Children.count(children), options || {});
  });
  const system = state[0];
  const updateSystem = state[1];

  function updateSizes(position, sizes) {
    updateSystem((oldSystem) => {
      const newSystem = {};
      for (var key in oldSystem) {
        newSystem[key] = oldSystem[key];
      }
      for (let i = 0; i < newSystem.sizes.length; ++i) {
        if (i == position - 1) {
          newSystem.sizes[i] = sizes[0];
        }
        if (i == position) {
          newSystem.sizes[i] = sizes[1];
        }
      }
      return newSystem;
    });
  }

  function capturePosition(position) {
    return function (event) {
      handleMouseDown(position, event, system, updateSizes);
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
          style={{ [system.elementDimension]: `${system.dividerSize}px` }}
        />
      );
    }

    dividends.push(
      cloneElement(children[position], {
        style: {
          [system.elementDimension]: `calc(${system.sizes[position]}% - ${system.panelSpaceForDivider}px)`,
        },
      })
    );
  }

  return (
    <div
      className="SplitView"
      style={{ display: "flex", flexDirection: system.flexDirection }}
    >
      {dividends}
    </div>
  );
}
