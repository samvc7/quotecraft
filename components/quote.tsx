"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "../hooks/use-toast";
import { QuoteContent } from "./QuoteContent";
import { MultiSelect, MultiSelectProps } from "./multi-select";
import { fetchRandomQuote, RandomQuote, searchQuoteBy } from "../app/action";

export const QUOTE_API_BASE_URL = "https://quoteslate.vercel.app/api";
export const RANDOM_QUOTES_ENDPOINT = `${QUOTE_API_BASE_URL}/quotes/random`;

// TODO: with server action and revalidate path is not working atm.
// currently using this state and inner fetch function
export default function Quote({ initialQuote, tags, authors }: QuoteProps) {
  const { toast } = useToast();

  const [quote, setQuote] = useState<RandomQuote | undefined>(initialQuote);
  const [searchTags, setSearchTags] = useState<string>("");
  const [searchAuthors, setSearchAuthors] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debounceSearch = useDebounce(searchTags);
  const debouncedSearchAuthors = useDebounce(searchAuthors);

  const searchQuote = useCallback(
    async (tags: string, authors: string) => {
      if (!tags && !authors) {
        getRandomQuote();
        return;
      }

      setIsLoading(true);
      const data = await searchQuoteBy(tags, authors);

      if ("error" in data) {
        toast({ title: "Error", description: data.error });
        setIsLoading(false);
        setQuote(undefined);
        return;
      }

      const randomQuote = data;
      setQuote(randomQuote);

      setIsLoading(false);
    },
    [toast]
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
    const joinedValues = values.join(",");
    setSearchTags(joinedValues);
  };

  const handleAuthorsSelectChanged = (values: string[]) => {
    const joinedValues = values.join(",");
    setSearchAuthors(joinedValues);
  };

  return (
    <section className="flex flex-col justify-center flex-grow gap-10 relative mx-auto mt-10">
      <div className="absolute top-6 left-0 flex justify-between w-full">
        {/* re-add when fuzzy search is implemented */}
        {/* <SearchFuzzy setSearch={setSearch} /> */}
        <div className="flex gap-2">
          <MultiSelect
            options={tags}
            onValueChange={handleTagsSelectChanged}
            placeholder="Select Tags"
          />
          <MultiSelect
            options={authors}
            onValueChange={handleAuthorsSelectChanged}
            placeholder="Select Authors"
          />
        </div>
        <Button
          className="self-center"
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
  initialQuote: RandomQuote;
  tags: MultiSelectProps["options"];
  authors: MultiSelectProps["options"];
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
