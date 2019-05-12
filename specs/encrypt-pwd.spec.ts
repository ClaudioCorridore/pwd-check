import { encryptPwd } from "../src/encrypt-pwd";

test("encryptPwd", (): void => {
  expect(encryptPwd("test")).toStrictEqual([
    "a94a8",
    "fe5ccb19ba61c4c0873d391e987982fbbd3"
  ]);
});
