interface Args {
  value: string;
  type: string;
}

export const timeStringToMiliseconds = ({ value, type }: Args): number => {
  const firstSplit: Array<string> = value.split("'");
  const secondSplit: Array<string> = firstSplit[1].split('.');

  if (type === 'total') {
    const hours: number =
      parseInt(firstSplit[0].split(':')[0]) * 60 * 60 * 1000;
    const minutes: number = parseInt(firstSplit[0].split(':')[1]) * 60 * 1000;
    const seconds: number = parseInt(secondSplit[0]) * 1000;
    const miliseconds: number = parseInt(secondSplit[1]);

    return hours + minutes + seconds + miliseconds;
  } else {
    const minutes: number = parseInt(firstSplit[0]) * 60 * 1000;
    const seconds: number = parseInt(secondSplit[0]) * 1000;
    const miliseconds: number = parseInt(secondSplit[1]);

    return minutes + seconds + miliseconds;
  }
};
