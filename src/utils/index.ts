export const makePrePadding = (val: string | number | undefined) =>
  ("" + (val || "")).padStart(2, "0");
