function getPwdOccurrences(pwdTail: string, pwdRange: string[]): number {
  let occurrences = 0;

  pwdRange.some((line): boolean => {
    const [pwd, num] = line.split(":");

    if (pwd.toUpperCase() === pwdTail.toUpperCase()) {
      occurrences = parseInt(num, 10);
    }

    return occurrences > 0;
  });

  return occurrences;
}

export { getPwdOccurrences };
