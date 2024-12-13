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
}: SelectAuthorsProps) {
  return (
    <Select value={value || ""} onValueChange={onValueChange}>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Select Authors" />
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
};

export type AuthorOption = {
  value: string;
  label: string;
};
