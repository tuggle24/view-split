<script>
  import { writable } from "svelte/store";
  import { handleMouseDown, buildSystem } from "html-view-split";

  export let options = {};

  export const store = writable({});

  function paintScreen(position, newSizes) {
    store.update((a) => {
      for (let i = 0; i < a.sizes.length; i++) {
        if (i == position - 1) {
          a.sizes[i] = newSizes[0];
        }
        if (i == position) {
          a.sizes[i] = newSizes[1];
        }
      }
      return a;
    });
  }

  function capturePosition(position) {
    return function (event) {
      handleMouseDown(position, event, $store, paintScreen);
    };
  }

  let panes = [];

  $: {
    panes.forEach((pane, position) => {
      pane.style[
        $store.elementDimension
      ] = `calc(${$store.sizes[position]}% - ${$store.panelSpaceForDivider}px)`;
    });
  }

  function splitView(node) {
    const amountOfChildren = node.children.length;
    store.set(buildSystem(amountOfChildren, options));

    for (let position = amountOfChildren - 1; position >= 0; --position) {
      const child = node.children[position];
      child.style[
        $store.elementDimension
      ] = `calc(${$store.sizes[position]}% - ${$store.panelSpaceForDivider}px)`;
      panes.unshift(child);

      if (position != 0) {
        const divider = document.createElement("div");
        divider.style[$store.elementDimension] = `${$store.dividerSize}px`;
        divider.className += " divider";
        node.insertBefore(divider, child);
        divider.addEventListener("mousedown", capturePosition(position));
        divider.addEventListener("touchstart", capturePosition(position));
      }
    }
  }
</script>

<div use:splitView class="split-view">
  <slot />
</div>
