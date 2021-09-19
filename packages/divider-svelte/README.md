# svelte-view-split

Create resizible views (panels) in svelte.

**Features:**

- Size is less than 3 kb
- Support both horizontal and vertical splits
- Support multiple splits
- Support lifecyle functions
- Support min and max sizes
- Support custom divider size
- Support for legacy browser such as IE 11

## Basic Example

In order for the below example to work correctly, the classname `view-split` needs to have `display: flex`.

```svelte
<script>
  import { ViewSplit } from "svelte-view-split";
  const options = { dividerSize: 17 };
</script>

<ViewSplit {options}>
  <div>s</div>
  <div>p</div>
  <div>l</div>
  <div>i</div>
  <div>t</div>
</ViewSplit>

<style>
  :global(div.view-split) {
    display: flex;
  }
</style>
```

## API

```svelte
<ViewSplit {options}>
  <div>s</div>
  <div>p</div>
</ViewSplit>
```

**options**
Type: `object`

**divide**
Type: `string`
Default: `'vertical'`
Values: `'vertical' | 'horizontal'`

**sizes**
Type: `number | Array<number>`
Default: `new Array(children.length).fill(children.length / 2)`

**minSizes**
Type: `number | Array<number>`
Default: `new Array(children.length).fill(0)`

**maxSizes**
Type: `number | Array<number>`
Default: `new Array(children.length).fill(Number.POSITIVE_INFINITY)`

**onDrag**
Type: `Function(sizes)`

**beforeDrag**
Type: `Function(sizes)`

**afterDrag**
Type: `Function(sizes)`

## More Examples

**horizontal divide**

```svelte
<script>
  import { ViewSplit } from "svelte-view-split";
  const options = { dividerSize: 17 };
</script>

<ViewSplit {options}>
  <div>s</div>
  <div>p</div>
  <div>l</div>
  <div>i</div>
  <div>t</div>
</ViewSplit>

<style>
  :global(div.view-split) {
    display: flex;
  }
</style>
```
