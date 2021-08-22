import React, { useState, useEffect } from "react";
// import divider from "divider-html";

function closeOver (stuff, logic) {
  return function handler (event) {
    return logic(event, stuff)
  }
}

function handleMouseUp (moveHandler) {
  return function handler (event) {
    event.preventDefault();

    console.log('here')
    document.removeEventListener("mousemove", moveHandler);
    document.removeEventListener("mouseup", handler);
    // document.removeEventListener("mouseup", this.stop);
  }
}

function handleMouseMove (dragOffset, previousSiblingStart) {
  return function handler (event) {
    event.preventDefault();
    console.log('added')

    // const offset = event.clientX - divider.element.previousSibling + ((10 * 1) / 2 - )
  }
}

function handleMouseDown (divider) {
  return function handler (event) {
    event.preventDefault()
    if (event.button !== 0) {
      return;
    }

    const dragOffset = event.clientX - divider.element.getBoundingClientRect().left
    // const formerElementStart = 
    const previousSiblingStart = event.clientX - divider.element.previousSibling.getBoundingClientRect().left
    const moveHandler = handleMouseMove(dragOffset, previousSiblingStart)
    const test = () => {
      console.log('Testing....')
    }

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", handleMouseUp(moveHandler));
  }
}

export default function Tilt({ children: reactChilden }) {
  const dividerReference = React.useRef();

  // React.useEffect(() => {
  //   const dividerNode = dividerReference.current;

  //   divider([...dividerNode.children]);
  //   return () => {
  //     console.log("Destroyed");
  //   };
  // }, []);

  function oldMouseDownHandler(event) {
    event.preventDefault();
    if (event.button !== 0) {
      return;
    }

    console.log(stuff)

    // this.dragOffset = event.clientX - this.element.getBoundingClientRect().left;
    // this.previousElementStartPosition = nodes[
    //   this.previous
    // ].element.getBoundingClientRect().left;

    // nodes[this.previous].element.addEventListener("selectstart", noOperation);
    // nodes[this.previous].element.addEventListener("dragstart", noOperation);
    // nodes[this.next].element.addEventListener("selectstart", noOperation);
    // nodes[this.next].element.addEventListener("dragstart", noOperation);

    // nodes[this.previous].element.style.userSelect = "none";
    // nodes[this.previous].element.style.webkitUserSelect = "none";
    // nodes[this.previous].element.style.MozUserSelect = "none";
    // nodes[this.previous].element.style.pointerEvents = "none";

    // nodes[this.next].element.style.userSelect = "none";
    // nodes[this.next].element.style.webkitUserSelect = "none";
    // nodes[this.next].element.style.MozUserSelect = "none";
    // nodes[this.next].element.style.pointerEvents = "none";

    // document.addEventListener("mousemove", this.drag);
    // document.addEventListener("mouseup", this.stop);
  }

  useEffect(() => {
    let children = dividerReference.current.children;

    // console.log(children)
    children = [...children]
    children.map((el, position) => {
      const node = {
        position,
        el,
        size: children.map(() => 100 / children.length),
        minSize: children.map(() => 100),
        mazSize: children.map(() => Number.POSITIVE_INFINITY),
      };

      // node.element.style.width = `calc(${node.size}% - ${
      //   (10 * 2) / children.length
      // }px)`;

      if (position === 0) {
        return node;
      }

      const divider = {
        element: document.createElement("div"),
        previous: position - 1,
        next: position,
      };

      divider.element.style.width = `10px`;
      divider.element.style.height = `10px`;
      divider.element.className = "divider";
      console.log(el)

      el.parentNode.insertBefore(divider.element, node.element)
      
      // const work = closeOver(divider, mouseDownHandler)
      const work = handleMouseDown(divider)
  
      
      // divider.start = mouseDownHandler.bind(divider);
      // divider.drag = mouseMoveHandler.bind(divider);
      // divider.stop = mouseUpHandler.bind(divider);
      divider.element.addEventListener("mousedown", work);
      // divider.element.addEventListener("mousedown", work);

      return node;

    })
  }, [])
  

  return <div ref={dividerReference}>{reactChilden}</div>;
}
