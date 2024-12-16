import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectAuthor({
  options,
  value,
  onValueChange,
  placeholder = "Select Author",
}: SelectAuthorsProps) {
  return (
    <Select value={value || ""} onValueChange={onValueChange}>
      <SelectTrigger name={placeholder} className="lg:w-64">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="none">None</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

type SelectAuthorsProps = {
  options: AuthorOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
};

export type AuthorOption = {
  value: string;
  label: string;
};
