import { render, screen } from "@testing-library/react";
import ReusableLabel from "../reusable-label";
import "@testing-library/jest-dom";

describe("ReusableLabel Component", () => {
  test("renders the component with title and subtitle", () => {
    const titleText = "Main Title";
    const subTitleText = "Subtitle Text";

    render(<ReusableLabel title={titleText} subTitle={subTitleText} />);

    // Check if the title is displayed correctly
    const titleElement = screen.getByText(titleText);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("text-sm font-normal text-clr_gray_600 tracking-wide");

    // Check if the subtitle is displayed correctly
    const subTitleElement = screen.getByText(subTitleText);
    expect(subTitleElement).toBeInTheDocument();
    expect(subTitleElement).toHaveClass("text-clr_gray_300 text-xs");
  });

  test("applies custom class names to title, subtitle, and label", () => {
    const titleText = "Custom Title";
    const subTitleText = "Custom Subtitle";
    const customTitleClass = "custom-title-class";
    const customSubTitleClass = "custom-subtitle-class";
    const customLabelClass = "custom-label-class";

    render(
      <ReusableLabel
        title={titleText}
        subTitle={subTitleText}
        titleClass={customTitleClass}
        subTitleClass={customSubTitleClass}
        labelClass={customLabelClass}
      />
    );

    // Check if the label container has the custom class
    const labelContainer = screen.getByText(titleText).closest("div");
    expect(labelContainer).toHaveClass("flex flex-col");
    expect(labelContainer).toHaveClass(customLabelClass);

    // Check if the title has the custom class
    const titleElement = screen.getByText(titleText);
    expect(titleElement).toHaveClass(customTitleClass);

    // Check if the subtitle has the custom class
    const subTitleElement = screen.getByText(subTitleText);
    expect(subTitleElement).toHaveClass(customSubTitleClass);
  });

  test("renders without subtitle if none is provided", () => {
    const titleText = "Title Only";

    render(<ReusableLabel title={titleText} />);

    // Verify title is displayed
    const titleElement = screen.getByText(titleText);
    expect(titleElement).toBeInTheDocument();

    // Subtitle should not be in the document
    const subTitleElement = screen.queryByText(/Subtitle/);
    expect(subTitleElement).toBeNull();
  });
});