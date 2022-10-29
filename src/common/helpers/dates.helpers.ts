export const fastLapStringToMiliseconds = (value: string): number => {
  const firstSplit: Array<string> = value.split("'");
  const secondSplit: Array<string> = firstSplit[1].split('.');

  const minutes: number = parseInt(firstSplit[0]) * 60 * 1000;
  const seconds: number = parseInt(secondSplit[0]) * 1000;
  const miliseconds: number = parseInt(secondSplit[1]);

  return minutes + seconds + miliseconds;
};
