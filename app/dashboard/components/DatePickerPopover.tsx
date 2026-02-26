import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";

interface DatePickerPopoverProps {
  dueDate: Date | undefined;
  setDueDate: (date: Date | undefined) => void;
  requireDate?: boolean;
  width?: string;
}

const DatePickerPopover = ({ dueDate, setDueDate, requireDate, width }: DatePickerPopoverProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        data-empty={!dueDate}
        data-require={requireDate}
        className={`data-[empty=true]:text-muted-foreground data-[require=true]:text-red-700 data-[require=true]:border-solid data-[require=true]:border-2px data-[require=true]:border-red-700 ${width || "w-[212px]"} justify-between text-left font-normal cursor-pointer`}
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
);

export default DatePickerPopover;
