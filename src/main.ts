import { createHash } from "crypto";
import prompts from "prompts";
import fetch from "node-fetch";
import { green, red, underline, bold } from "kleur";

function encryptPwd(pwd: string): string[] {
  const epwd = createHash("sha1")
    .update(pwd)
    .digest("hex");

  return [epwd.substring(0, 5), epwd.substring(5)];
}

async function main() {
  const {
    pwd: [head, tail]
  } = await prompts(
    {
      type: "password",
      name: "pwd",
      message: "Which password do you want to check?",
      format: val => encryptPwd(val)
    },
    {
      onCancel: () => {
        console.log("Bye!");
        process.exit();
      }
    }
  );

  const range = await fetch(
    `https://api.pwnedpasswords.com/range/${head}`
  ).then(res => res.text());

  let times = 0;

  range.split("\n").some(line => {
    const [pwd, num] = line.split(":");

    if (pwd.toUpperCase() === tail.toUpperCase()) {
      times = parseInt(num, 10);
    }

    return times > 0;
  });

  if (times > 0) {
    console.log(
      red(`The password has been found ${bold(times)} times, change it!`)
    );
  } else {
    console.log(green().underline("Password not found, cool!"));
  }
}

main();
