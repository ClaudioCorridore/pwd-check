import { pwdCheck } from "../src/pwd-check";
import nock from "nock";

test("it should return the result of pwdCheck", async () => {
  nock("https://api.pwnedpasswords.com")
    .get("/range/a94a8")
    .reply(200, "test:12\ntest2:42\nfe5ccb19ba61c4c0873d391e987982fbbd3:1");

  const result = await pwdCheck("test");

  expect(result).toStrictEqual([true, 1]);
});
