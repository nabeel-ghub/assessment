import { useState, useRef, useEffect } from "react";
import { Todo } from "../types";
import { format } from "date-fns";

//shadcn components
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
//lucide icons
import { ChevronDownIcon } from "lucide-react";

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
      setTodoList((prev) => [...prev, {...newItem, id: prev.length + 1}]);
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!dueDate}
                data-require={requireDate}
                className="data-[empty=true]:text-muted-foreground data-[require=true]:text-red-700 data-[require=true]:border-solid data-[require=true]:border-2px data-[require=true]:border-red-700 w-[212px] justify-between text-left font-normal cursor-pointer"
              >
                {dueDate ? format(dueDate, "PPP") : <span>Due date</span>}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                defaultMonth={dueDate}
              />
            </PopoverContent>
          </Popover>
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
