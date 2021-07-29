import React, { useState, useEffect } from "react";
import divider from "divider-html";

export default function Tilt({ children }) {
  const dividerReference = React.useRef();

  React.useEffect(() => {
    const dividerNode = dividerReference.current;

    divider([...dividerNode.children]);
    return () => {
      console.log("Destroyed");
    };
  }, []);

  return <div ref={dividerReference}>{children}</div>;
}
