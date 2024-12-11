import { SetStateAction } from "react";
import { Input } from "./ui/input";

export const SearchFuzzy = ({ setSearch }: SearchFuzzyProps) => {
  const handleSearchOnChange = (value: string) => {
    const valuesWithoutEmptyValues = value
      .trim()
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val);
    const cleanValue = valuesWithoutEmptyValues.join(",");
    setSearch(cleanValue);
  };

  return (
    <Input
      className="w-96"
      onChange={(event) => handleSearchOnChange(event.target.value)}
      placeholder="e.g. Technology, Life, Love"
    />
  );
};

type SearchFuzzyProps = {
  setSearch: (value: SetStateAction<string>) => void;
};
