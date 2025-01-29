import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectMenu from "./SelectMenu";
import "@testing-library/jest-dom";
import { TaskStatus } from "../../types/common";

describe("SelectMenu", () => {
  const mockOnChange = jest.fn();

  it("renders without crashing", () => {
    const val = "" as TaskStatus;

    render(<SelectMenu value={val} onChange={mockOnChange} />);
  });

  it("displays the correct initial value", () => {
    render(<SelectMenu value={"" as TaskStatus} onChange={mockOnChange} />);
    expect(screen.getByText("Select Status")).toBeInTheDocument();
  });

  it("calls onChange when a new value is selected", () => {
    render(<SelectMenu value={"" as TaskStatus} onChange={mockOnChange} />);

    fireEvent.mouseDown(screen.getByRole("combobox")); // Open the select menu
    fireEvent.click(screen.getByText(TaskStatus.COMPLETED));
    expect(mockOnChange).toHaveBeenCalledWith(TaskStatus.COMPLETED);
  });

  it("displays helper text when provided", () => {
    const helperText = "This is a helper text";
    render(
      <SelectMenu
        value={"" as TaskStatus}
        onChange={mockOnChange}
        helperText={helperText}
      />
    );
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it("displays error state when error prop is true", () => {
    render(
      <SelectMenu
        value={"" as TaskStatus}
        onChange={mockOnChange}
        error={true}
      />
    );
    expect(screen.getByRole("combobox")).toHaveClass("Mui-error");
  });

});
