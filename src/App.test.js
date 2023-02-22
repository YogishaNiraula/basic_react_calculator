import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { calculateResult } from "./App";

describe("Basic Calculator Test", () => {
  render(<App />);
  test("result is '0' when AC is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: "AC" }));
    const result = document.getElementById("currentVal");
    expect(result).toHaveTextContent("0");
  });

  test("turns given number to opposite format +/-", () => {
    expect(
      calculateResult({
        previousValue: null,
        operator: "+/-",
        currentValue: "5",
      }),
    ).toBe("-5");
    expect(
      calculateResult({
        previousValue: null,
        operator: "+/-",
        currentValue: "-2",
      }),
    ).toBe("2");
    expect(
      calculateResult({
        previousValue: null,
        operator: "+/-",
        currentValue: "0.66",
      }),
    ).toBe("-0.66");
  });

  describe("% test", () => {
    test("returns % of integer on click", () => {
      expect(
        calculateResult({
          previousValue: null,
          operator: "%",
          currentValue: "8",
        }),
      ).toBe("0.08");
    });
    test("returns % of negative integer on click", () => {
      expect(
        calculateResult({
          previousValue: null,
          operator: "%",
          currentValue: "-8",
        }),
      ).toBe("-0.08");
    });
    test("returns % of negative decimal on click", () => {
      expect(
        calculateResult({
          previousValue: null,
          operator: "%",
          currentValue: "-22.5",
        }),
      ).toBe("-0.225");
    });
  });

  describe("Calculation with operators", () => {
    describe("Sum", () => {
      test("Sum of two integers", () => {
        expect(
          calculateResult({
            previousValue: "4",
            operator: "+",
            currentValue: "9",
          }),
        ).toBe("13");
      });
      test("Sum of a integer and decimal", () => {
        expect(
          calculateResult({
            previousValue: "4",
            operator: "+",
            currentValue: "0.9",
          }),
        ).toBe("4.9");
      });
      test("Sum of two decimal", () => {
        expect(
          calculateResult({
            previousValue: "4.44",
            operator: "+",
            currentValue: "2.61",
          }),
        ).toBe("7.050");
      });
      test("Sum of a integer and negative decimal", () => {
        expect(
          calculateResult({
            previousValue: "4",
            operator: "+",
            currentValue: "-0.09",
          }),
        ).toBe("3.91");
      });
    });
    describe("Difference", () => {
      test("Difference of two integers", () => {
        expect(
          calculateResult({
            previousValue: "14",
            operator: "-",
            currentValue: "9",
          }),
        ).toBe("5");
      });
      test("Difference of a integer and decimal", () => {
        expect(
          calculateResult({
            previousValue: "10",
            operator: "-",
            currentValue: "0.9",
          }),
        ).toBe("9.1");
      });
      test("Difference of two decimal", () => {
        expect(
          calculateResult({
            previousValue: "4.44",
            operator: "-",
            currentValue: "2.61",
          }),
        ).toBe("1.830");
      });
      test("Difference of a integer and negative decimal", () => {
        expect(
          calculateResult({
            previousValue: "4",
            operator: "-",
            currentValue: "-0.09",
          }),
        ).toBe("4.09");
      });
    });
    describe("Product", () => {
      test("Product of two integers", () => {
        expect(
          calculateResult({
            previousValue: "14",
            operator: "X",
            currentValue: "19",
          }),
        ).toBe("266");
      });
      test("Product of a integer and decimal", () => {
        expect(
          calculateResult({
            previousValue: "7",
            operator: "X",
            currentValue: "0.33",
          }),
        ).toBe("2.31");
      });
      test("Product of two decimal", () => {
        expect(
          calculateResult({
            previousValue: "2.04",
            operator: "X",
            currentValue: "1.61",
          }),
        ).toBe("3.824");
      });
      test("Product of a integer and negative decimal", () => {
        expect(
          calculateResult({
            previousValue: "4",
            operator: "X",
            currentValue: "-0.09",
          }),
        ).toBe("-0.36");
      });
    });
    describe("Division", () => {
      test("Division of two integers", () => {
        expect(
          calculateResult({
            previousValue: "144",
            operator: "÷",
            currentValue: "12",
          }),
        ).toBe("12");
      });
      test("Division of a integer and decimal", () => {
        expect(
          calculateResult({
            previousValue: "12",
            operator: "÷",
            currentValue: "0.2",
          }),
        ).toBe("60");
      });
      test("Division of two decimal", () => {
        expect(
          calculateResult({
            previousValue: "77.33",
            operator: "÷",
            currentValue: "1.61",
          }),
        ).toBe("48.03");
      });
      test("Division of a integer and negative decimal", () => {
        expect(
          calculateResult({
            previousValue: "4",
            operator: "÷",
            currentValue: "-0.09",
          }),
        ).toBe("-44.444");
      });
    });
  });
});
