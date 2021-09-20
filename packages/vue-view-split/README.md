# vue-view-split

Create resizible views (panels) in Vue v2.

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

```vue
<script>
import { ViewSplit } from "vue-view-split";

export default {
  components: {
    ViewSplit,
  },
  data() {
    return {
      options: { dividerSize: 17 },
    };
  },
};
</script>

<template>
  <ViewSplit :options="options">
    <div>s</div>
    <div>p</div>
    <div>l</div>
    <div>i</div>
    <div>t</div>
  </ViewSplit>
</template>

<style>
.split-view {
  display: flex;
}

.divider {
  background-color: rgb(156, 70, 255);
}
</style>
```

## API

```vue
<template>
  <ViewSplit :options="options">
    <div>s</div>
    <div>p</div>
  </ViewSplit>
</template>
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

```vue
<script>
import { ViewSplit } from "vue-view-split";

export default {
  components: {
    ViewSplit,
  },
  data() {
    return {
      options: { dividerSize: 17, divide: "horizontal" },
    };
  },
};
</script>

<template>
  <ViewSplit :options="options">
    <div>s</div>
    <div>p</div>
    <div>l</div>
    <div>i</div>
    <div>t</div>
  </ViewSplit>
</template>

<style>
.split-view {
  display: flex;
  flex-direction: flex-direction;
}

.divider {
  background-color: rgb(156, 70, 255);
}
</style>
```
