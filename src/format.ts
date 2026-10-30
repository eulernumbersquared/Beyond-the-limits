import Decimal from "break_eternity.js";


export function formatNumber(num: Decimal): string {
  const suffixes = [
    "", "K", "M", "B", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No",
    "Dc", "Ud", "Dd", "Td", "Qad", "Qnd", "Sxd", "Spd", "Ocd", "Nod"
  ];

  if (num.lt(1000)) {
    return num.toFixed(2);
  }

  const exp = num.log10().floor().toNumber();

  const tier = Math.floor(exp / 3);

  if (tier >= suffixes.length) {

    if (exp >= 1_000_000) {
      const doubleExp = Math.floor(Math.log10(exp));
      const doubleMantissa = exp / Math.pow(10, doubleExp);

      return `e${doubleMantissa.toFixed(2).replace(/\.?0+$/, "")}e${doubleExp}`;
    }

    const mantissa = num.div(Decimal.pow(10, exp)).toFixed(2);

    return `${mantissa}e${exp}`;
  }

  const suffix = suffixes[tier];
  const scale = Decimal.pow(10, tier * 3);
  const scaled = num.div(scale);

  return scaled.toFixed(2) + suffix;
}

export function formatdiff(num: Decimal): string {
  const suffixes = [
    "", "K", "M", "B", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No",
    "Dc", "Ud", "Dd", "Td", "Qad", "Qnd", "Sxd", "Spd", "Ocd", "Nod"
  ];

  if (num.lt(1000)) {
    return num.toFixed(6);
  }

  let tier = Math.floor(num.log10().toNumber() / 3);
  if (tier >= suffixes.length) {
    const exp = num.log10().floor().toNumber();
    const mantissa = num.div(Decimal.pow(10, exp)).toFixed(4);
    return `${mantissa}e${exp}`;
  }

  let suffix = suffixes[tier];
  let scale = Decimal.pow(10, tier * 3);
  let scaled = num.div(scale);

  return scaled.toFixed(6) + suffix;
}


export function formatTime(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return minutes > 0 ? `${minutes}m ${seconds}s left` : `${seconds}s left`
}
