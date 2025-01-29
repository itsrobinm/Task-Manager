import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import TaskForm from "./TaskForm";
import "@testing-library/jest-dom";
import { TaskStatus } from "@/types/common";

describe("TaskForm", () => {
  const mockOnCompleted = jest.fn();

  it("renders without crashing", () => {
    render(<TaskForm onCompleted={mockOnCompleted} />);
  });

  it("displays the correct initial values", () => {
    render(<TaskForm onCompleted={mockOnCompleted} />);
    expect(screen.getByPlaceholderText("Task Name")).toBeInTheDocument();
    expect(screen.getByText("Select Status")).toBeInTheDocument();
  });

  it("displays the correct error message when the submit button is pressed with no data entered", async () => {
    render(<TaskForm onCompleted={mockOnCompleted} />);

    await act(async () => {
      fireEvent.click(screen.getByText("Save"));
    });

    // Ensure the error messages are displayed
    expect(screen.getByText("Task name is required")).toBeInTheDocument();
    expect(screen.getByText("Task status is required")).toBeInTheDocument();
  });

  it("displays the correct error message for task name that is too short", async () => {
    render(<TaskForm onCompleted={mockOnCompleted} />);

    fireEvent.input(screen.getByPlaceholderText("Task Name"), {
      target: { value: "aa" },
    });
    fireEvent.mouseDown(screen.getByRole("combobox")); // Open the select menu
    fireEvent.click(screen.getByText(TaskStatus.COMPLETED));

    await act(async () => {
      fireEvent.click(screen.getByText("Save"));
    });

    expect(
      screen.getByText("Task name must be at least 3 characters long")
    ).toBeInTheDocument();
  });

  it("displays the correct error message for task name that is too long", async () => {
    render(<TaskForm onCompleted={mockOnCompleted} />);

    fireEvent.input(screen.getByPlaceholderText("Task Name"), {
      target: { value: "aaaaaaaaaaa" },
    });
    fireEvent.mouseDown(screen.getByRole("combobox")); // Open the select menu
    fireEvent.click(screen.getByText(TaskStatus.COMPLETED));

    await act(async () => {
      fireEvent.click(screen.getByText("Save"));
    });

    expect(
      screen.getByText("Task name must be at most 10 characters long")
    ).toBeInTheDocument();
  });

  it("calls onCompleted with the correct data when the form is submitted with good data", async () => {
    render(<TaskForm onCompleted={mockOnCompleted} />);

    fireEvent.input(screen.getByPlaceholderText("Task Name"), {
      target: { value: "Test Task" },
    });
    fireEvent.mouseDown(screen.getByRole("combobox")); // Open the select menu
    fireEvent.click(screen.getByText(TaskStatus.COMPLETED));

    await act(async () => {
      fireEvent.click(screen.getByText("Save"));
    });

    expect(mockOnCompleted).toHaveBeenCalledWith({
      name: "Test Task",
      status: TaskStatus.COMPLETED,
    });
  });
});
