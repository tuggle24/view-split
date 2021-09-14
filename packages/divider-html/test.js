import { buildSystem } from "./index";

test("expect system to be defined", () => {
  const result = {
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
  };

  const sut = buildSystem(2, {});

  expect(sut).toMatchObject(result);
});

test("expect divide to be horizontal and cursor to be row-resize", () => {
  const sut = buildSystem(2, { divide: "horizontal" });

  expect(sut).toMatchObject({ divide: "horizontal", cursor: "row-resize" });
});
