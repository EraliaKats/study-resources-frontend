import { tagArrayToObject } from "./tagArrayToObject";

const expectedFirstTest = [
  { tagName: "wordle", id: 0 },
  { tagName: "clone", id: 1 },
  { tagName: "object", id: 2 },
];
test("Array of names is made into object", () => {
  expect(tagArrayToObject(["wordle", "clone", "object"])).toStrictEqual(
    expectedFirstTest
  );
});
