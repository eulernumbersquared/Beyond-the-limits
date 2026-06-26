import Decimal from "break_eternity.js";

export function formatNumber(num: Decimal): string {
  const suffixes = [
    "", "K", "M", "B", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No",
    "Dc", "Ud", "Dd", "Td", "Qad", "Qnd", "Sxd", "Spd", "Ocd", "Nod"
  ];

  if (num.lt(1000)) {
    return num.toFixed(2);
  }

  let tier = Math.floor(num.log10().toNumber() / 3);
  if (tier >= suffixes.length) {
    return num.toExponential(2);
  }

  let suffix = suffixes[tier];
  let scale = Decimal.pow(10, tier * 3);
  let scaled = num.div(scale);

  return scaled.toFixed(2) + suffix;
}
export function formatdiff(num: Decimal): string {
  const suffixes = [
    "", "K", "M", "B", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No",
    "Dc", "Ud", "Dd", "Td", "Qad", "Qnd", "Sxd", "Spd", "Ocd", "Nod"
  ];

  if (num.lt(1000)) {
    return num.toFixed(4);
  }

  let tier = Math.floor(num.log10().toNumber() / 3);
  if (tier >= suffixes.length) {
    return num.toExponential(4);
  }

  let suffix = suffixes[tier];
  let scale = Decimal.pow(10, tier * 3);
  let scaled = num.div(scale);

  return scaled.toFixed(4) + suffix;
}
