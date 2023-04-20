const REG_EX_TIME_FORMAT = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const convertTime = (time) => {
  if (!time.match(REG_EX_TIME_FORMAT))
    throw new Error("Unsupported time format. Expected format HH:MM.");

  const [hh, min] = time.split(":").map((part) => +part);

  return convertTimeToWords(hh, min);
};

const convertTimeToWords = (hh, min) => {
  if (hh === 0 && min === 0) return "midnight";
  if (hh === 12 && min === 0) return "noon";

  return `${convertHour(hh)} ${convertMinutes(min)} in the ${getPeriod(hh)}`;
};

const convertMinutes = (min) => {
  const ones = min % 10;
  if (min === 0) return "o'clock";
  if (min < 10) return `oh ${NUMBERS[min].toLowerCase()}`;
  if (min < 20 || !ones) return `${NUMBERS[min].toLowerCase()}`;
  return `${NUMBERS[min - ones]} ${NUMBERS[ones]}`.toLowerCase();
};

const getPeriod = (hour) =>
  hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";

const NUMBERS = {
  0: "Twelve",
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten",
  11: "Eleven",
  12: "Twelve",
  13: "Thirteen",
  14: "Fourteen",
  15: "Fifteen",
  16: "Sixteen",
  17: "Seventeen",
  18: "Eighteen",
  19: "Nineteen",
  20: "Twenty",
  30: "Thirty",
  40: "Forty",
  50: "Fifty",
};

const convertHour = (hh) => NUMBERS[hh % 12];
