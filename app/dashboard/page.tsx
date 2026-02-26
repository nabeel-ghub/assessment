"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SearchIcon } from "lucide-react";
import { TrashIcon } from "lucide-react";
import { SquareArrowRightEnterIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";

type Todo = {
  title: string;
  description: string;
  status: "todo" | "progress" | "done";
  due: Date;
};

export default function Dashboard() {
  const router = useRouter();

  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoListTitles, setTodoListTitles] = useState<string[]>([])

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    let defaultTodo: Todo = {
        title: "Simple Todo",
        description: "This is a simple Todo",
        due: new Date(),
        status: "todo"
      }

    setTodoList(prev=> [...prev, defaultTodo]);
  }, [])

  useEffect(() => {
    todoList.map((item, index) => {
      setTodoListTitles(prev => [...prev, item.title]);
    })
  }, [todoList])

  return (
    <div className="min-h-[100vh] h-auto w-[100%] flex justify-center items-center bg-zinc-900">
      <div className="h-[80vh] w-[90%] md:w-[60%] md:h-[70vh] flex flex-col justify-start md:flex-row md:justify-center items-center">
        <section className="min-h-[50vh] h-auto w-[100%] md:pl-10 md:pr-10 md:h-[100%] flex flex-col md:justify-center">
          <Field>
            <FieldLabel htmlFor="input-search-title" className="text-white">
              SEARCH FOR TODOS
            </FieldLabel>
            <div className="flex">
              <Combobox items={todoListTitles}>
                <ComboboxInput
                  placeholder="Select a framework"
                  className="text-white rounded-r-[0]"
                />
                <ComboboxContent>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
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
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Card className="p-2 mt-5">
              <CardContent className="p-[0]">
                <CardTitle className="mt-2 pb-2 pl-2 mb-2">Add Todo</CardTitle>
                <Input placeholder="Title of your todo" className="mb-2"></Input>
                <Input placeholder="Description of your todo"></Input>
                <Button className="w-[100%] mt-5 cursor-pointer">
                  <PlusIcon></PlusIcon>
                </Button>
              </CardContent>
            </Card>
        </section>
        <section className="h-[50%] h-auto w-[100%] md:h-[100%] flex flex-col md:ml-5">
          <Field className="mt-5">
            <FieldLabel className="text-md text-white">TODO LIST</FieldLabel>
          </Field>
          <div className="overflowy-scroll"></div>
        </section>
      </div>
    </div>
  );
}
