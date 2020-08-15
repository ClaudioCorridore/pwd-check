import { createHash } from "crypto";

function encryptPwd(pwd: string): string[] {
  const epwd = createHash("sha1").update(pwd).digest("hex");

  return [epwd.substring(0, 5), epwd.substring(5)];
}

export { encryptPwd };
