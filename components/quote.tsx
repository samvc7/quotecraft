"use client";

import { RefreshCw, RefreshCwOff, StepForward } from "lucide-react";
import { Button } from "./ui/button";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "../hooks/use-toast";
import { QuoteContent } from "./quote-content";
import { MultiSelect, MultiSelectProps } from "./multi-select";
import { fetchRandomQuote, RandomQuote, searchQuoteBy } from "../app/action";
import { AuthorOption, SelectAuthor } from "./select-author";
import { Toggle } from "./ui/toggle";
import { Skeleton } from "./ui/skeleton";

// TODO: with server action and revalidate path is not working atm.
// currently using this state and inner fetch function
export default function Quote({ tags, authors }: QuoteProps) {
  const { toast } = useToast();

  const [quote, setQuote] = useState<RandomQuote | undefined>();
  const [searchTags, setSearchTags] = useState<string>("");
  const [searchAuthors, setSearchAuthors] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAutoNextEnabled, setIsAutoNextEnabled] = useState<boolean>(false);

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

  useEffect(() => {
    if (!isAutoNextEnabled) return;
    const interval = setInterval(() => {
      searchQuote(debounceSearch, debouncedSearchAuthors);
    }, 10000);
    return () => clearInterval(interval);
  }, [debounceSearch, debouncedSearchAuthors, isAutoNextEnabled, searchQuote]);

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
    <section className="flex flex-col justify-center lg:flex-grow gap-5 relative mx-auto lg:mb-20">
      <div className="flex gap-2 lg:justify-between flex-wrap lg:flex-nowrap">
        {/* re-add when fuzzy search is implemented */}
        {/* <SearchFuzzy setSearch={setSearch} /> */}
        <div className="flex gap-2 w-full">
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
        <div className="flex gap-2 ml-auto">
          <Toggle
            className="self-center"
            name="Auto Next"
            onClick={() => setIsAutoNextEnabled((prev) => !prev)}
            variant="outline"
            size="sm"
          >
            {isAutoNextEnabled ? (
              <RefreshCw className="h-4 w-4" />
            ) : (
              <RefreshCwOff className="h-4 w-4" />
            )}
          </Toggle>

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
            {isLoading ? (
              <Skeleton className="h-4 w-4" />
            ) : (
              <StepForward className="h-4 w-4" />
            )}
          </Button>
        </div>
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
