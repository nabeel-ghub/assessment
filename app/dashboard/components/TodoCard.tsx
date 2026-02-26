import { useEffect, useRef, useState } from "react";
import { Todo } from "../types";
import { format } from "date-fns";

//shadcn components
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

//lucide icons
import { Edit2Icon } from "lucide-react";
import { Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { SaveIcon } from "lucide-react";
import { ChevronDownIcon } from "lucide-react";

type TodoCardProps = {
  item: Todo;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export default function ({ item, setTodoList }: TodoCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLInputElement | null>(null);
  const [titleHasValue, setTitleHasValue] = useState<boolean>(false);
  const [descHasValue, setDescHasValue] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<Date>();

  function startEditing() {
    setTitleHasValue(true);
    setDescHasValue(true);
    setDueDate(item.due);
    setIsEditing((prev) => !prev);
  }

  function handleTitle() {
    const titleValue = titleRef.current?.value;
    if (titleValue && titleValue.length > 0) {
      setTitleHasValue(true);
    } else {
      setTitleHasValue(false);
    }
  }

  function handleDesc() {
    const descValue = descRef.current?.value;
    if (descValue && descValue.length > 0) {
      setDescHasValue(true);
    } else {
      setDescHasValue(false);
    }
  }

  function handleSave() {
    const titleValue = titleRef.current?.value;
    const descValue = descRef.current?.value;
    if(!titleValue && !descValue && !dueDate) return;
    if(titleValue && titleValue.trim().length >= 0) {
        if(descValue && descValue.trim().length >= 0) {
            if(dueDate) {
                const updatedTodo: Todo = {
                    id: item.id,
                    title: titleValue,
                    description: descValue,
                    due: dueDate,
                    status: item.status
                }
                setTodoList(prev => [...prev, updatedTodo]);
            }
        }
    }
  }

  return (
    <Card className="p-[10] rounded-sm mb-5">
      <CardContent>
        {isEditing ? (
          <>
            <Input
              ref={titleRef}
              onChange={() => handleTitle()}
              className="mb-2"
              placeholder="Enter title"
              defaultValue={item.title}
            ></Input>
            <Input
              ref={descRef}
              onChange={() => handleDesc()}
              className="mb-2"
              placeholder="Enter description"
              defaultValue={item.description}
            ></Input>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!dueDate}
                  className="data-[empty=true]:text-muted-foreground justify-between text-left font-normal cursor-pointer"
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
          </>
        ) : (
          <>
            <CardTitle className="mb-2 capitalize">
              {item.title + " "}
              <span
                data-status={item.status}
                className="data-[status=todo]:bg-red-400 data-[status=progress]:bg-yellow-400 data-[status=done]:bg-green-400 pl-3 pr-3 text-xs text-zinc-900 lowercase"
              >
                {item.status}
              </span>
            </CardTitle>
            <CardDescription className="mb-2">
              {item.description}
            </CardDescription>
            <CardDescription className="text-zinc-900 font-semibold text-xs">
              {format(item.due, "PPP")}
            </CardDescription>
          </>
        )}
        <div className="flex flex-row mt-5 justify-around">
          {isEditing ? (
            <>
              {titleHasValue && descHasValue ? (
                <Button
                  onClick={() => handleSave()}
                  size="sm"
                  variant="outline"
                  className="cursor-pointer text-[12px]"
                >
                  <SaveIcon></SaveIcon> Save
                </Button>
              ) : (
                <Button
                  onClick={() => startEditing()}
                  size="sm"
                  variant="outline"
                  className="cursor-pointer text-[12px]"
                >
                  <XIcon></XIcon> Cancel
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={() => startEditing()}
              size="sm"
              variant="outline"
              className="cursor-pointer text-[12px]"
            >
              <Edit2Icon></Edit2Icon> Edit
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer text-[12px]"
          >
            <Edit2Icon></Edit2Icon> Change Status
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="cursor-pointer text-[12px]"
          >
            <Trash2Icon></Trash2Icon> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
