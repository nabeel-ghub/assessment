import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { RefObject } from "react";
import { Todo } from "../types";

interface TodoEditFormProps {
  titleRef: RefObject<HTMLInputElement | null>;
  descRef: RefObject<HTMLInputElement | null>;
  dueDate: Date | undefined;
  setDueDate: (date: Date | undefined) => void;
  handleTitle: () => void;
  handleDesc: () => void;
  item: Todo;
}

const TodoEditForm = ({
  titleRef,
  descRef,
  dueDate,
  setDueDate,
  handleTitle,
  handleDesc,
  item
}: TodoEditFormProps) => (
  <>
    <Input
      ref={titleRef}
      onChange={handleTitle}
      className="mb-2"
      placeholder="Enter title"
      defaultValue={item.title}
    />
    <Input
      ref={descRef}
      onChange={handleDesc}
      className="mb-2"
      placeholder="Enter description"
      defaultValue={item.description}
    />
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
);

export default TodoEditForm;
