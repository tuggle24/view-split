<script>
  import ViewSplit from "svelte-view-split";
  const afterDrag = (sizes) => {
    console.log("In app:", sizes);
  };
  const options = { afterDrag };
</script>

<main>
  <h1>Split Example</h1>
  <ViewSplit {options}>
    <div class="panel">a</div>
    <div class="panel">b</div>
    <div class="panel">r</div>
    <div class="panel">p</div>
  </ViewSplit>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    height: 70vh;
  }

  .panel {
    background-color: rgb(182, 255, 212);
    height: 70px;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  :global(div.split-view) {
    display: flex;
    height: 70vh;
    background-color: rgb(182, 255, 212);
  }

  :global(div.divider) {
    background-color: rgb(156, 70, 255);
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
