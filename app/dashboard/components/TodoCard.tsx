"use client";
import { useRef, useState } from "react";
import { Todo } from "../types";
import { Status } from "../types";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2Icon } from "lucide-react";
import { Trash2Icon } from "lucide-react";
import TodoEditForm from "./TodoEditForm";
import StatusDropdown from "./StatusDropdown";
import { XIcon, SaveIcon } from "lucide-react";

type TodoCardProps = {
  item: Todo;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export default function TodoCard({ item, setTodoList }: TodoCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const [titleHasValue, setTitleHasValue] = useState<boolean>(false);
  const [descHasValue, setDescHasValue] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<Date>();

  function startEditing() {
    setTitleHasValue(true);
    setDescHasValue(true);
    setDueDate(item.due);
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
    setTitleHasValue(false);
    setDescHasValue(false);
    setDueDate(item.due);
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
    if (!titleValue && !descValue && !dueDate) return;
    if (titleValue && titleValue.trim().length >= 0) {
      if (descValue && descValue.trim().length >= 0) {
        if (dueDate) {
          setTodoList((prev) => {
            const updatedItem = {
              id: item.id,
              title: titleValue,
              description: descValue,
              due: dueDate,
              status: item.status,
            };
            const newList: Todo[] = prev.map((t) =>
              t.id === item.id ? updatedItem : t,
            );
            return newList;
          });
          setIsEditing(false);
        }
      }
    }
  }

  function changeStatus(index: number) {
    let newStatus: Status = "todo";
    if (index === 1) newStatus = "todo";
    else if (index === 2) newStatus = "progress";
    else if (index === 3) newStatus = "done";

    setTodoList((prev) => {
      const updatedItem = {
        id: item.id,
        title: item.title,
        description: item.description,
        due: item.due,
        status: newStatus,
      };
      const newList: Todo[] = prev.map((t) =>
        t.id === item.id ? updatedItem : t,
      );
      return newList;
    });
  }

  function deleteTodo() {
    setTodoList((prev) => prev.filter((t) => t.id !== item.id));
  }

  return (
    <Card className="p-[10] rounded-sm mb-5">
      <CardContent>
        {isEditing ? (
          <>
            <TodoEditForm
              titleRef={titleRef}
              descRef={descRef}
              dueDate={dueDate}
              setDueDate={setDueDate}
              handleTitle={handleTitle}
              handleDesc={handleDesc}
              item={item}
            />
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
            <CardDescription className="text-zinc-900 dark:text-white font-semibold text-xs">
              {format(item.due, "PPP")}
            </CardDescription>
          </>
        )}
        <div className="flex flex-row mt-5 justify-around">
          {isEditing ? (
            <>
              {titleHasValue && descHasValue && dueDate ? (
                <Button
                  onClick={handleSave}
                  size="sm"
                  variant="outline"
                  className="cursor-pointer text-[12px]"
                >
                  <SaveIcon /> Save
                </Button>
              ) : (
                <Button
                  onClick={handleCancel}
                  size="sm"
                  variant="outline"
                  className="cursor-pointer text-[12px]"
                >
                  <XIcon /> Cancel
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
              <Edit2Icon /> Edit
            </Button>
          )}
          <StatusDropdown changeStatus={changeStatus} />
          <Button
            size="sm"
            variant="destructive"
            className="cursor-pointer text-[12px]"
            onClick={() => deleteTodo()}
          >
            <Trash2Icon /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
