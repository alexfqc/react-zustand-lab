import { Suspense } from "react";
import { ListTodo } from "lucide-react";
import TodoInput from "./TodoInput";
import TodoDnD from "./TodoDnD";
import Loading from "./Loading";

export default function TodoList() {
  return (
    <div className="mx-auto flex w-[480px] max-w-full flex-col justify-center p-2 md:pt-10">
      <div className="max-w-full rounded border p-4 shadow">
        <h1 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <ListTodo size={28} className="text-green-500" />
          Todo List
        </h1>
        <TodoInput />
        <Suspense fallback={<Loading />}>
          <TodoDnD />
        </Suspense>
      </div>
    </div>
  );
}
