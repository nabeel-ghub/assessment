import { Field, FieldLabel } from "@/components/ui/field";
import TodoCard from "./TodoCard";
import { Todo } from "../types";
import { TodoPagination } from "./TodoPagination";

interface TodoListSectionProps {
  displayList: Todo[];
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  itemsPerPage: number;
  paginationCurrent: number;
  setPaginationCurrent: React.Dispatch<React.SetStateAction<number>>;
  paginationStart: number;
  paginationEnd: number;
}

const TodoListSection = ({
  displayList,
  todoList,
  setTodoList,
  itemsPerPage,
  paginationCurrent,
  setPaginationCurrent,
  paginationStart,
  paginationEnd,
}: TodoListSectionProps) => (
  <section className="h-auto w-[100%] md:h-[100%] flex flex-col md:ml-5 bg-zinc-900 md:mask-b-from-black md:mask-b-from-60%">
    <Field className="mt-5 w-[90%]">
      <FieldLabel className="text-md text-white self-start pl-3">
        TODO LIST
      </FieldLabel>
    </Field>
    <TodoPagination
      todoList={todoList}
      itemsPerPage={itemsPerPage}
      paginationCurrent={paginationCurrent}
      setPaginationCurrent={setPaginationCurrent}
      paginationStart={paginationStart}
      paginationEnd={paginationEnd}
    ></TodoPagination>
    <div className="mt-5 h-auto w-[90%] self-center md:overflow-y-scroll">
      {displayList.map((item, index) => (
        <TodoCard key={index} item={item} setTodoList={setTodoList} />
      ))}
    </div>
  </section>
);

export default TodoListSection;
