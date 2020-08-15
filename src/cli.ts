import prompts from "prompts";
import { green, red, bold } from "kleur";
import { pwdCheck } from "./pwd-check";

async function main(): Promise<void> {
  const { pwd } = await prompts(
    {
      type: "password",
      name: "pwd",
      message: "Which password do you want to check?",
    },
    {
      onCancel: (): void => {
        console.log("Bye!");
        process.exit();
      },
    }
  );

  const [hasPwdBeenPwned, pwnedOccurrences] = await pwdCheck(pwd);

  if (hasPwdBeenPwned) {
    process.stderr.write(
      red(`The password has been pwned ${bold(pwnedOccurrences + " times")}!\n`)
    );
  } else {
    process.stdout.write(
      green().underline(`Password has ${bold("NOT")} been pwned, cool!\n`)
    );
  }

  process.exit(pwnedOccurrences);
}

main();
