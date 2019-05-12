import { getPwdOccurrences } from "../src/get-pwd-occurrences";

test("it should return the number of occurrences", (): void => {
  expect(getPwdOccurrences("test", ["test:1"])).toStrictEqual(1);
  expect(getPwdOccurrences("test", [])).toStrictEqual(0);
  expect(getPwdOccurrences("test", ["nottest:123"])).toStrictEqual(0);
});
