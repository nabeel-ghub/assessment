import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { RefObject } from "react";

interface SearchFilterBarProps {
  todoListTitles: string[];
  searchRef: RefObject<HTMLInputElement | null>;
  handleSearch: (item?: string) => void;
  handleFilter: (filter: string) => void;
}

const SearchFilterBar = ({
  todoListTitles,
  searchRef,
  handleSearch,
  handleFilter,
}: SearchFilterBarProps) => (
  <Field>
    <FieldLabel htmlFor="input-search-title" className="text-white">
      SEARCH FOR TODOS
    </FieldLabel>
    <div className="flex">
      <Combobox items={todoListTitles}>
        <ComboboxInput
          ref={searchRef}
          onChange={() => handleSearch()}
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
    <Select onValueChange={(value) => handleFilter(value === "all" ? "" : value)}>
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
);

export default SearchFilterBar;
