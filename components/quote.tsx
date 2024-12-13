"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "../hooks/use-toast";
import { QuoteContent } from "./quote-content";
import { MultiSelect, MultiSelectProps } from "./multi-select";
import { fetchRandomQuote, RandomQuote, searchQuoteBy } from "../app/action";
import { AuthorOption, SelectAuthor } from "./select-author";

// TODO: with server action and revalidate path is not working atm.
// currently using this state and inner fetch function
export default function Quote({ tags, authors }: QuoteProps) {
  const { toast } = useToast();

  const [quote, setQuote] = useState<RandomQuote | undefined>();
  const [searchTags, setSearchTags] = useState<string>("");
  const [searchAuthors, setSearchAuthors] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debounceSearch = useDebounce(searchTags);
  const debouncedSearchAuthors = useDebounce(searchAuthors);

  const getCorrectedSearchErrorData = useCallback(
    (error: string) => {
      if (error.includes("No quotes")) {
        return { quote: "No quotes found", author: "", tags: [] };
      }

      toast({ title: "Error", description: error });
      return undefined;
    },
    [toast]
  );

  const searchQuote = useCallback(
    async (tags: string, authors: string) => {
      if (!tags && !authors) {
        getRandomQuote();
        return;
      }

      setIsLoading(true);

      const data = await searchQuoteBy(tags, authors);
      const correctedData =
        "error" in data ? getCorrectedSearchErrorData(data.error) : data;

      setQuote(correctedData);
      setIsLoading(false);
    },
    [getCorrectedSearchErrorData]
  );

  useEffect(() => {
    searchQuote(debounceSearch, debouncedSearchAuthors);
  }, [searchQuote, debounceSearch, debouncedSearchAuthors]);

  const getRandomQuote = async () => {
    setIsLoading(true);
    const data = await fetchRandomQuote();

    setQuote(data);
    setIsLoading(false);
  };

  const handleTagsSelectChanged = (values: string[]) => {
    setSearchTags(values.join(","));
  };

  const handleAuthorsSelectChanged = (value: string) => {
    setSearchAuthors(value === "none" ? "" : value);
  };

  return (
    <section className="flex flex-col justify-center flex-grow gap-5 relative mx-auto mt-10 mb-20">
      <div className="flex justify-between w-full">
        {/* re-add when fuzzy search is implemented */}
        {/* <SearchFuzzy setSearch={setSearch} /> */}
        <div className="flex gap-2">
          <MultiSelect
            options={tags}
            onValueChange={handleTagsSelectChanged}
            placeholder="Select Tags"
          />
          <SelectAuthor
            options={authors}
            value={searchAuthors}
            onValueChange={handleAuthorsSelectChanged}
          />
        </div>
        <Button
          className="self-center"
          name="Next Quote"
          onClick={
            searchTags || searchAuthors
              ? () => searchQuote(searchTags, searchAuthors)
              : getRandomQuote
          }
          variant="outline"
          size="icon"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <QuoteContent quote={quote} isLoading={isLoading} />
    </section>
  );
}

type QuoteProps = {
  tags: MultiSelectProps["options"];
  authors: AuthorOption[];
};

const useDebounce = (value: string, delay = 600) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
