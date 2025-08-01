import { render, screen } from "@testing-library/react";
import CounterBadge from "../counter-badge";
import "@testing-library/jest-dom";

describe("CounterBadge Component", () => {
  test("renders the component and displays the correct value", () => {
    const testValue = 5;
    
    render(<CounterBadge value={testValue} />);

    // Check if the CounterBadge component is in the document
    expect(screen.getByText(testValue.toString())).toBeInTheDocument();

    // Verify that the component displays the correct value
    expect(screen.getByText(testValue.toString())).toHaveTextContent("5");
  });

  test("applies the correct styles to the CounterBadge", () => {
    const testValue = 10;

    render(<CounterBadge value={testValue} />);

    // Check if the component has the expected classes for styling
    const badgeElement = screen.getByText(testValue.toString()).closest("div");

    expect(badgeElement).toHaveClass("bg-[#F2F4F7]");
    expect(badgeElement).toHaveClass("w-7");
    expect(badgeElement).toHaveClass("h-5");
    expect(badgeElement).toHaveClass("grid");
    expect(badgeElement).toHaveClass("place-content-center");
    expect(badgeElement).toHaveClass("rounded-full");

    // Check if the span has the expected classes for styling text
    expect(screen.getByText(testValue.toString())).toHaveClass("text-xs");
    expect(screen.getByText(testValue.toString())).toHaveClass("text-clr_gray_400");
    expect(screen.getByText(testValue.toString())).toHaveClass("font-medium");
  });
});