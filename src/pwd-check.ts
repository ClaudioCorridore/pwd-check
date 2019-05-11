import { encryptPwd } from "./encrypt-pwd";
import { getPwdRange } from "./get-pwd-range";
import { getPwdOccurrences } from "./get-pwd-occurrences";

async function pwdCheck(pwd: string): Promise<[boolean, number]> {
  const [pwdHead, pwdTail] = encryptPwd(pwd);
  const pwdRange = await getPwdRange(pwdHead);
  const occurrences = getPwdOccurrences(pwdTail, pwdRange);

  return [occurrences > 0, occurrences];
}

export { pwdCheck };
