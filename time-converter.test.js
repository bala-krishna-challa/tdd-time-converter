import { convertTime } from "./time-converter.js";

describe("time", () => {
  it("converts midnight", () => {
    expect(convertTime("00:00")).toBe("midnight");
  });

  it("converts full hour", () => {
    expect(convertTime("01:00")).toBe("One o'clock in the morning");
    expect(convertTime("03:00")).toBe("Three o'clock in the morning");
    expect(convertTime("11:00")).toBe("Eleven o'clock in the morning");
  });

  it("converts noon", () => {
    expect(convertTime("12:00")).toBe("noon");
  });

  it("converts after noon", () => {
    expect(convertTime("13:00")).toBe("One o'clock in the afternoon");
    expect(convertTime("14:00")).toBe("Two o'clock in the afternoon");
    expect(convertTime("17:00")).toBe("Five o'clock in the afternoon");
  });

  describe("converts the minutes", () => {
    it("ones", () => {
      expect(convertTime("01:01")).toBe("One oh one in the morning");
      expect(convertTime("01:02")).toBe("One oh two in the morning");
      expect(convertTime("01:09")).toBe("One oh nine in the morning");
    });

    it("teens", () => {
      expect(convertTime("01:11")).toBe("One eleven in the morning");
      expect(convertTime("01:12")).toBe("One twelve in the morning");
      expect(convertTime("01:19")).toBe("One nineteen in the morning");
    });

    it("tens", () => {
      expect(convertTime("01:10")).toBe("One ten in the morning");
      expect(convertTime("01:20")).toBe("One twenty in the morning");
      expect(convertTime("01:50")).toBe("One fifty in the morning");
    });

    it("numbers between tens", () => {
      expect(convertTime("01:21")).toBe("One twenty one in the morning");
      expect(convertTime("01:46")).toBe("One forty six in the morning");
      expect(convertTime("01:59")).toBe("One fifty nine in the morning");
    });
  });

  it("converts times around midnight", () => {
    expect(convertTime("00:01")).toBe("Twelve oh one in the morning");
    expect(convertTime("23:59")).toBe("Eleven fifty nine in the evening");
  });

  it("converts times around noon", () => {
    expect(convertTime("11:59")).toBe("Eleven fifty nine in the morning");
    expect(convertTime("12:01")).toBe("Twelve oh one in the afternoon");
  });

  it("converts times around late afternoon/early evening", () => {
    expect(convertTime("17:59")).toBe("Five fifty nine in the afternoon");
    expect(convertTime("18:01")).toBe("Six oh one in the evening");
  });

  it("rejects times with invalid time format with hours", () => {
    expect(() => convertTime("24:00")).toThrow(
      new Error("Unsupported time format. Expected format HH:MM.")
    );
    expect(() => convertTime("-04:00")).toThrow(
      new Error("Unsupported time format. Expected format HH:MM.")
    );
    expect(() => convertTime("0B:00")).toThrow(
      new Error("Unsupported time format. Expected format HH:MM.")
    );
  });

  it("rejects times with invalid time format with minutes", () => {
    expect(() => convertTime("01:60")).toThrow(
      new Error("Unsupported time format. Expected format HH:MM.")
    );
    expect(() => convertTime("02:-00")).toThrow(
      new Error("Unsupported time format. Expected format HH:MM.")
    );
    expect(() => convertTime("02:1o")).toThrow(
      new Error("Unsupported time format. Expected format HH:MM.")
    );
  });
});
