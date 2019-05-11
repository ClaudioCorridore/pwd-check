import { createHash } from "crypto";
import fetch from "node-fetch";

const [,, password] = process.argv;

function encryptPwd(pwd: string): string {
  return createHash("sha1").update(pwd).digest("hex");
}


async function main() {
  const pwd = encryptPwd(password);

  const matches = await fetch(`https://api.pwnedpasswords.com/range/${pwd.substring(0, 5)}`).then(res => res.text());

  let times = 0;

  matches.split("\n").some(match => {
    const [p, n] = match.split(":");

    if (p.toUpperCase() === pwd.substring(5).toUpperCase()) {
      times = parseInt(n, 10);
      return true;
    }

    return false;
  });

  if (times > 0) {
    console.log(`"${password}" has been found ${times} times, bad!`);
  } else {
    console.log("Password not found, cool!");
  }
}

main();
