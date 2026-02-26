import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit2Icon, TimerIcon, Loader2Icon, Check } from "lucide-react";

interface StatusDropdownProps {
  changeStatus: (index: number) => void;
}

const StatusDropdown = ({ changeStatus }: StatusDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        size="sm"
        variant="outline"
        className="cursor-pointer text-[12px]"
      >
        <Edit2Icon /> Change Status
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-40" align="start">
      <DropdownMenuGroup>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => changeStatus(1)}>
          todo
          <DropdownMenuShortcut><TimerIcon /></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeStatus(2)}>
          progress
          <DropdownMenuShortcut><Loader2Icon /></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeStatus(3)}>
          done
          <DropdownMenuShortcut><Check /></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default StatusDropdown;
