const FIFA_TO_FLAG: Record<string, string> = {
  ARG: "ar",
  AUS: "au",
  AUT: "at",
  BEL: "be",
  BIH: "ba",
  BRA: "br",
  CAN: "ca",
  CPV: "cv",
  COL: "co",
  CIV: "ci",
  CRO: "hr",
  COD: "cd",
  ECU: "ec",
  EGY: "eg",
  ENG: "gb-eng",
  FRA: "fr",
  GHA: "gh",
  GER: "de",
  JPN: "jp",
  MAR: "ma",
  MEX: "mx",
  NED: "nl",
  NOR: "no",
  PAR: "py",
  POR: "pt",
  RSA: "za",
  SEN: "sn",
  ESP: "es",
  SUI: "ch",
  SWE: "se",
  USA: "us",
  DZA: "dz",
}

export const flagUrl = (code?: string | null) => {
  if (!code) return ""
  const iso = FIFA_TO_FLAG[code]
  return iso ? `https://flagcdn.com/w80/${iso}.png` : ""
}

export const isUnitedStates = (code?: string | null, name?: string) =>
  code === "USA" || name === "United States"
