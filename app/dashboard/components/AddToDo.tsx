"use client"
import { useState, useRef, useEffect } from "react";
import { Todo } from "../types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePickerPopover from "./DatePickerPopover";

type TodoCardProps = {
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export default function AddToDo({ setTodoList }: TodoCardProps) {
  const [dueDate, setDueDate] = useState<Date>();
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const [requireTitle, setRequireTitle] = useState<boolean>(false);
  const [requireDesc, setRequireDesc] = useState<boolean>(false);
  const [requireDate, setRequireDate] = useState<boolean>(false);

  useEffect(() => {
    console.log(dueDate);
    if (dueDate) {
      setRequireDate(false);
    }
  }, [dueDate]);

  function handleCreateTodo() {
    const titleValue = titleRef.current?.value;
    const descValue = descRef.current?.value;

    if (!titleValue || titleValue.trim().length <= 0) {
      setRequireTitle(true);
    }
    if (!descValue || descValue.trim().length <= 0) {
      setRequireDesc(true);
    }
    if (!dueDate) {
      setRequireDate(true);
    }
    if (titleValue && descValue && dueDate) {
      if (titleValue.length <= 0 && descValue.length <= 0) return;
      const newItem: Todo = {
        id: 0,
        title: titleValue.trim(),
        description: descValue.trim(),
        due: dueDate,
        status: "todo",
      };
      setTodoList((prev) => {
        if(prev.length > 30) return prev
        return [...prev, {...newItem, id: prev.length + 1}]
      });
      setTodoList(prev => prev.sort(
      (a, b) => b.due.getTime() - a.due.getTime(),
       ));
    }
  }

  function handleTitleChange() {
    setRequireTitle(false);
  }

  function handleDescChange() {
    setRequireDesc(false);
  }

  return (
    <div>
      <Card className="p-2 mt-5">
        <CardContent className="p-[0]">
          <CardTitle className="mt-2 pb-2 pl-2 mb-2">Add Todo</CardTitle>
          <Input
            onChange={() => handleTitleChange()}
            ref={titleRef}
            placeholder={
              requireDesc ? "Provide a title..." : "Title of your todo"
            }
            data-require={requireTitle}
            className="data-[require=true]:placeholder:text-red-700 data-[require=true]:border-solid data-[require=true]:border-2px data-[require=true]:border-red-700 mb-2"
          ></Input>
          <Input
            onChange={() => handleDescChange()}
            ref={descRef}
            placeholder={
              requireDesc
                ? "Provide a description..."
                : "Description of your todo"
            }
            data-require={requireDesc}
            className="data-[require=true]:placeholder:text-red-700 data-[require=true]:border-solid data-[require=true]:border-2px data-[require=true]:border-red-700 mb-2"
          ></Input>
          <DatePickerPopover dueDate={dueDate} setDueDate={setDueDate} requireDate={requireDate} />
          <Button
            onClick={() => handleCreateTodo()}
            className="w-[100%] mt-5 cursor-pointer"
          >
            <PlusIcon></PlusIcon>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
