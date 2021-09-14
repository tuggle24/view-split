import { buildSystem } from "./index";

const fixtures = [
  {
    title: "multiple pane support",
    amountOfPanels: 10,
    expected: { sizes: Array.from({ length: 10 }).fill(10) },
  },
  {
    title: "support min size given as number",
    options: { minSizes: 170 },
    expected: { minSizes: [170, 170] },
  },
  {
    title: "support min size given as array",
    options: { minSizes: [70, 70] },
    expected: { minSizes: [70, 70] },
  },
  {
    title: "default options",
    amountOfPanels: 2,
    options: {},
    expected: {
      sizes: [50, 50],
      minSizes: [100, 100],
      maxSizes: [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
      divide: "vertical",
      cursor: "col-resize",
      dividerSize: 10,
      numberOfPanels: 2,
      numberOfDividers: 1,
      panelSpaceForDivider: 5,
      onDrag: expect.any(Function),
      beforeDrag: expect.any(Function),
      afterDrag: expect.any(Function),
    },
  },
  {
    title: "horizontal support",
    options: { divide: "horizontal" },
    expected: {
      divide: "horizontal",
      cursor: "row-resize",
      eventDimension: "clientY",
      elementDimension: "height",
      elementStart: "top",
      flexDirection: "column",
    },
  },
  {
    title: "support max size given by number",
    options: { maxSizes: 400 },
    expected: { maxSizes: [400, 400] },
  },
  {
    title: "support max sizes given by array",
    options: { maxSizes: [300, 300] },
    expected: { maxSizes: [300, 300] },
  },
  {
    title: "support divider size",
    options: { dividerSize: 34 },
    expected: { dividerSize: 34 },
  },
  {
    title: "support for panel's space for divder",
    options: { dividerSize: 20 },
    amountOfPanels: 4,
    expected: { panelSpaceForDivider: 15 },
  },
  {
    title: "support custom sizes",
    options: { sizes: [75, 25] },
    expected: { sizes: [75, 25] },
  },
];

test.each(fixtures)(
  "$title",
  ({ options = {}, expected, amountOfPanels = 2 }) => {
    const sut = buildSystem(amountOfPanels, options);

    expect(sut).toMatchObject(expected);
  }
);
