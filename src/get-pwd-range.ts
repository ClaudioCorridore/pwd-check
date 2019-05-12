import fetch from "node-fetch";

async function getPwdRange(password: string): Promise<string[]> {
  const range = await fetch(
    `https://api.pwnedpasswords.com/range/${password}`
  ).then((res): Promise<string> => res.text());

  return range.split("\n");
}

export { getPwdRange };
