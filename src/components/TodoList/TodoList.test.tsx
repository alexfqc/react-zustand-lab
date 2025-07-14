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
      await screen.findByText("No todos yet \u2013 add one!"),
    ).toBeInTheDocument();
  });

  it("adds a new todo", async () => {
    await act(async () => {
      render(<TodoList />);
    });
    const input = screen.getByTestId("add-todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    await userEvent.type(input, "Coffee specialty coffee");
    await userEvent.click(addButton);

    expect(screen.getByText("Coffee specialty coffee")).toBeInTheDocument();
  });

  it("edits a todo", async () => {
    await act(async () => {
      render(<TodoList />);
    });

    const input = screen.getByTestId("add-todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    await userEvent.type(input, "Coffee specialty coffee");
    await userEvent.click(addButton);

    const editButton = screen.getByRole("button", {
      name: "Edit todo: Coffee specialty coffee",
    });

    await userEvent.click(editButton);

    const editInput = screen.getByRole("textbox", {
      name: "Edit input todo: Coffee specialty coffee",
    });
    await userEvent.clear(editInput);
    await userEvent.type(editInput, "Coffee latte");

    const saveButton = screen.getByRole("button", {
      name: "Confirm edit todo: Coffee specialty coffee",
    });
    await userEvent.click(saveButton);

    const todoItem = screen.getByText("Coffee latte");

    expect(todoItem).toBeInTheDocument();
  });

  it("deletes a todo", async () => {
    await act(async () => {
      render(<TodoList />);
    });
    const input = screen.getByTestId("add-todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    await userEvent.type(input, "Coffee specialty coffee");
    await userEvent.click(addButton);

    const deleteButton = screen.getByRole("button", {
      name: "Delete todo: Coffee specialty coffee",
    });
    await userEvent.click(deleteButton);

    expect(
      screen.queryByText("Coffee specialty coffee"),
    ).not.toBeInTheDocument();
  });
});
