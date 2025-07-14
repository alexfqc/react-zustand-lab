export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoState = {
  todos: Todo[];
  editingId: number;
  editingValue: string;
  inputText: string;
  hydrated: boolean;
  addTodo: () => void;
  setTodos: (todos: Todo[]) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  setEditingId: (id: number) => void;
  setEditingValue: (value: string) => void;
  startEditing: (id: number, value: string) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  setInputText: (text: string) => void;
  reorderTodos: (fromIndex: number, toIndex: number) => void;
  setHydrated: (value: boolean) => void;
};
