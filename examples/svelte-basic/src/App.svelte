<script>
  import { Split } from "divider-svelte";
  const afterDrag = (sizes) => {
    console.log("In app:", sizes);
  };
  const options = { afterDrag };
</script>

<main>
  <h1>Split Example</h1>
  <Split {options}>
    <div class="panel">a</div>
    <div class="panel">b</div>
    <div class="panel">r</div>
    <div class="panel">p</div>
  </Split>
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

  .SplitView {
    height: 70vh;
    background-color: rgb(182, 255, 212);
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
