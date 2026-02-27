"use client";
import ThemeToggle from "@/components/ui/theme-toggle";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Todo } from "./types";

//local components
import AddToDo from "./components/AddToDo";
import SearchFilterBar from "./components/SearchFilterBar";
import TodoListSection from "./components/TodoListSection";

export default function Dashboard() {
  const router = useRouter();

  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoListTitles, setTodoListTitles] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const itemsPerPage = 5;
  const [paginationCurrent, setPaginationCurrent] = useState<number>(1);
  const [paginationStart, setPaginationStart] = useState<number>(0);
  const [paginationEnd, setPaginationEnd] = useState<number>(0);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const storedTodoList = localStorage.getItem("todoList");
    if(storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    } else {
      let defaultTodo: Todo = {
      id: 0,
      title: "Simple Todo",
      description: "This is a simple Todo",
      due: new Date(),
      status: "todo",
    };

    setTodoList([defaultTodo]);
    }
  }, []);

  useEffect(() => {
    let stringArray: string[] = [];
    todoList.map((t) => {
      stringArray = [...stringArray, t.title];
    });
    setTodoListTitles(stringArray);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

    const startIndex = ((paginationCurrent - 1) * itemsPerPage);
    const endIndex = (startIndex + itemsPerPage);

  const displayList = [...todoList]
    .sort((a, b) => b.due.getTime() - a.due.getTime())
    .filter((t) => t.title.toLowerCase().includes(searchValue.toLowerCase()))
    .filter((t) => t.status.includes(filterStatus))
    .slice(startIndex, endIndex);

  function handleSearch(item?: string) {
    let val;
    if (item) {
      val = item;
    } else {
      val = searchRef.current?.value;
    }
    if (val) setSearchValue(val);
  }

  function handleFilter(filter: string) {
    setFilterStatus(filter);
  }

  return (
    <div className="min-h-[100vh] h-auto w-[100%] flex flex-col justify-center items-center bg-zinc-900 dark:bg-zinc-900 bg-zinc-100 relative">
      <ThemeToggle />
      <div className="h-[80vh] w-[100%] md:w-[60%] md:h-[70vh] flex flex-col justify-start md:flex-row md:justify-center items-center bg-zinc-900">
        <section className="h-auto w-[90%] md:pl-10 md:pr-10 md:h-[100%] flex flex-col md:justify-center">
          <SearchFilterBar
            todoListTitles={todoListTitles}
            searchRef={searchRef}
            handleSearch={handleSearch}
            handleFilter={handleFilter}
          />
          <AddToDo setTodoList={setTodoList} />
        </section>
        <TodoListSection
          todoList={todoList}
          itemsPerPage={itemsPerPage}
          paginationCurrent={paginationCurrent}
          setPaginationCurrent={setPaginationCurrent}
          paginationStart={paginationStart}
          paginationEnd={paginationEnd}
          displayList={displayList}
          setTodoList={setTodoList}
        />
      </div>
    </div>
  );
}
