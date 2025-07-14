import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "./TodoList";
import { useTodoStore } from "../../store/useTodoStore";
import { act } from "react";

beforeEach(() => {
  useTodoStore.setState({
    todos: [],
    editingId: 0,
    editingValue: "",
    inputText: "",
  });
});

describe("TodoList", () => {
  it("shows empty state when there are no todos", async () => {
    await act(async () => {
      render(<TodoList />);
    });
    expect(
      await screen.findByText(/no todos yet – add one!/i),
    ).toBeInTheDocument();
  });

  it("adds a new todo", async () => {
    await act(async () => {
      render(<TodoList />);
    });
    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    await userEvent.type(input, "Coffee specialty coffee");
    await userEvent.click(addButton);

    expect(screen.getByText("Coffee specialty coffee")).toBeInTheDocument();
  });
});
