"use client";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Todo } from "./types";

//shadcn components
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//lucide icons
import { SearchIcon } from "lucide-react";

//local components
import AddToDo from "./components/AddToDo";
import TodoCard from "./components/TodoCard";

export default function Dashboard() {
  const router = useRouter();

  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoListTitles, setTodoListTitles] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);
  const [filterStatus, setFilterStatus] = useState<string>("")

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    let defaultTodo: Todo = {
      id: 0,
      title: "Simple Todo",
      description: "This is a simple Todo",
      due: new Date(),
      status: "todo",
    };

    setTodoList([defaultTodo]);
  }, []);

  useEffect(() => {
    let stringArray: string[] = [];
    todoList.map((t) => {
      stringArray = [...stringArray, t.title];
    });
    setTodoListTitles(stringArray);
  }, [todoList]);

  const displayList = [...todoList]
    .sort((a, b) => b.due.getTime() - a.due.getTime())
    .filter((t) => t.title.toLowerCase().includes(searchValue.toLowerCase()))
    .filter((t) => t.status.includes(filterStatus));

  function handleSearch(item?: string) {
    let val;
    if(item) {
       val = item;
    } else {
       val = searchRef.current?.value;
    }
    if(val) setSearchValue(val);
  }

  function handleFilter() {
    
  }

  return (
    <div className="min-h-[100vh] h-auto w-[100%] flex flex-col justify-center items-center bg-zinc-900">
      <div className="h-[80vh] w-[100%] md:w-[60%] md:h-[70vh] flex flex-col justify-start md:flex-row md:justify-center items-center bg-zinc-900">
        <section className="h-auto w-[90%] md:pl-10 md:pr-10 md:h-[100%] flex flex-col md:justify-center">
          <Field>
            <FieldLabel htmlFor="input-search-title" className="text-white">
              SEARCH FOR TODOS
            </FieldLabel>
            <div className="flex">
              <Combobox items={todoListTitles}>
                <ComboboxInput
                  ref={searchRef}
                  onChange={(e) => handleSearch()}
                  placeholder="Search a todo"
                  className="text-white rounded-r-[0]"
                />
                <ComboboxContent>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item, index) => (
                      <ComboboxItem onClick={() => handleSearch(item)} key={index} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <Button
                size="icon"
                aria-label="Submit"
                variant="outline"
                className="rounded-l-[0] cursor-pointer"
              >
                <SearchIcon />
              </Button>
            </div>
            <Select>
              <SelectTrigger className="w-full max-w-48 text-white">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filter by:</SelectLabel>
                  <SelectItem onClick={() => handleFilter("")} value="all">All</SelectItem>
                  <SelectItem onClick={() => handleFilter("todo")} value="todo">Todo</SelectItem>
                  <SelectItem onClick={() => handleFilter("progress")} value="progress">In Progress</SelectItem>
                  <SelectItem onClick={() => handleFilter("done")} value="done">Done</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <AddToDo setTodoList={setTodoList}></AddToDo>
        </section>
        <section className="h-auto w-[100%] md:h-[100%] flex flex-col md:ml-5 bg-zinc-900 md:mask-b-from-black md:mask-b-from-60%">
          <Field className="mt-5 w-[90%]">
            <FieldLabel className="text-md text-white self-start pl-3">
              TODO LIST
            </FieldLabel>
          </Field>
          <div className="mt-5 h-auto w-[90%] self-center md:overflow-y-scroll">
            {displayList.map((item, index) => (
              <TodoCard
                key={index}
                item={item}
                setTodoList={setTodoList}
              ></TodoCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
