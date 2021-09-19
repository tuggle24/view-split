# react-view-split

Create resizible views (panels) in react.

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

```javascript
import { ViewSplit } from "react-view-split";
import "./main.css";

function App() {
  const options = {
    dividerSize: 17,
  };
  return (
    <ViewSplit options={options}>
      <div>s</div>
      <div>p</div>
      <div>l</div>
      <div>i</div>
      <div>t</div>
    </ViewSplit>
  );
}
```

```css
/* main.css */
.view-split {
  display: flex;
}
```

## API

```javascript
<ViewSplit options={options}>
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

```javascript
import { ViewSplit } from "react-view-split";
import "./main.css";

function App() {
  const options = {
    dividerSize: 17,
    divide: "horizontal",
  };
  return (
    <ViewSplit options={options}>
      <div>s</div>
      <div>p</div>
      <div>l</div>
      <div>i</div>
      <div>t</div>
    </ViewSplit>
  );
}
```

```css
/* main.css */
.view-split {
  display: flex;
  flex-direction: column;
}
```
