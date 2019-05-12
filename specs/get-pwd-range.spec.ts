import { getPwdRange } from "../src/get-pwd-range";
import nock from "nock";

test("it should return the pwned passwords range", async (): Promise<void> => {
  nock("https://api.pwnedpasswords.com")
    .get("/range/test")
    .reply(200, "test:12\ntest2:42");

  const range = await getPwdRange("test");

  expect(range).toStrictEqual(["test:12", "test2:42"]);
});
