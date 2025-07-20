import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
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
      screen.getByText("No todos yet \u2013 add one!"),
    ).toBeInTheDocument();
  });

  it("adds a new todo", async () => {
    await act(async () => {
      render(<TodoList />);
    });
    const input = screen.getByTestId("add-todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    await userEvent.type(input, "Buy specialty coffee");
    await userEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("Buy specialty coffee")).toBeInTheDocument();
    });
  });

  it("adds a new todo pressing enter", async () => {
    await act(async () => {
      render(<TodoList />);
    });
    const input = screen.getByTestId("add-todo-input");

    await userEvent.type(input, "Buy specialty coffee");
    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(screen.getByText("Buy specialty coffee")).toBeInTheDocument();
    });
  });

  it("edits a todo pressing enter", async () => {
    await act(async () => {
      render(<TodoList />);
    });

    const input = screen.getByTestId("add-todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    await userEvent.type(input, "Buy specialty coffee");
    await userEvent.click(addButton);

    const editButton = screen.getByRole("button", {
      name: "Edit todo: Buy specialty coffee",
    });

    await userEvent.click(editButton);

    const editInput = screen.getByRole("textbox", {
      name: "Edit input todo: Buy specialty coffee",
    });
    await userEvent.clear(editInput);
    await userEvent.type(editInput, "Coffee latte");

    await userEvent.keyboard("{Enter}");

    const todoItem = screen.getByText("Coffee latte");

    expect(todoItem).toBeInTheDocument();
  });

  it("edits a todo", async () => {
    await act(async () => {
      render(<TodoList />);
    });

    const input = screen.getByTestId("add-todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    await userEvent.type(input, "Buy specialty coffee");
    await userEvent.click(addButton);

    const editButton = screen.getByRole("button", {
      name: "Edit todo: Buy specialty coffee",
    });

    await userEvent.click(editButton);

    const editInput = screen.getByRole("textbox", {
      name: "Edit input todo: Buy specialty coffee",
    });
    await userEvent.clear(editInput);
    await userEvent.type(editInput, "Coffee latte");

    const saveButton = screen.getByRole("button", {
      name: "Confirm edit todo: Buy specialty coffee",
    });
    await userEvent.click(saveButton);

    const todoItem = screen.getByText("Coffee latte");

    expect(todoItem).toBeInTheDocument();
  });

  it("cancels edit todo", async () => {
    await act(async () => {
      render(<TodoList />);
    });

    const input = screen.getByTestId("add-todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    await userEvent.type(input, "Buy specialty coffee");
    await userEvent.click(addButton);

    const editButton = screen.getByRole("button", {
      name: "Edit todo: Buy specialty coffee",
    });

    await userEvent.click(editButton);

    const editInput = screen.getByRole("textbox", {
      name: "Edit input todo: Buy specialty coffee",
    });
    await userEvent.clear(editInput);
    await userEvent.type(editInput, "Coffee latte");

    const cancelButton = screen.getByRole("button", {
      name: "Cancel edit todo: Buy specialty coffee",
    });
    await userEvent.click(cancelButton);

    const todoItem = screen.getByText("Buy specialty coffee");

    expect(todoItem).toBeInTheDocument();
  });

  it("cancels edit todo pressing scape", async () => {
    await act(async () => {
      render(<TodoList />);
    });

    const input = screen.getByTestId("add-todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    await userEvent.type(input, "Buy specialty coffee");
    await userEvent.click(addButton);

    const editButton = screen.getByRole("button", {
      name: "Edit todo: Buy specialty coffee",
    });

    await userEvent.click(editButton);

    const editInput = screen.getByRole("textbox", {
      name: "Edit input todo: Buy specialty coffee",
    });
    await userEvent.clear(editInput);
    await userEvent.type(editInput, "Coffee latte");

    await userEvent.keyboard("{Escape}");

    const todoItem = screen.getByText("Buy specialty coffee");

    expect(todoItem).toBeInTheDocument();
  });

  it("deletes a todo", async () => {
    await act(async () => {
      render(<TodoList />);
    });
    const input = screen.getByTestId("add-todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    await userEvent.type(input, "Buy specialty coffee");
    await userEvent.click(addButton);

    const deleteButton = screen.getByRole("button", {
      name: "Delete todo: Buy specialty coffee",
    });
    await userEvent.click(deleteButton);

    expect(screen.queryByText("Buy specialty coffee")).not.toBeInTheDocument();
  });

  it("marks a todo as completed", async () => {
    await act(async () => {
      render(<TodoList />);
    });

    const input = screen.getByTestId("add-todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    await userEvent.type(input, "Buy specialty coffee");
    await userEvent.click(addButton);

    const markButton = screen.getByRole("button", {
      name: "Mark todo Buy specialty coffee as complete",
    });

    await userEvent.click(markButton);

    const completedMarkButton = screen.getByRole("button", {
      name: "Mark todo Buy specialty coffee as incomplete",
    });

    expect(completedMarkButton).toBeInTheDocument();
  });
});
