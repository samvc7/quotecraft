"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "../hooks/use-toast";
import { QuoteContent } from "./QuoteContent";
import { MultiSelect, MultiSelectProps } from "./multi-select";

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

  const debounceSearch = useDebounce(searchTags, 600);
  const debouncedSearchAuthors = useDebounce(searchAuthors, 600);

  const searchQuote = useCallback(async (tags: string, authors: string) => {
    if (!tags && !authors) {
      fetchRandomQuote();
      return;
    }

    setIsLoading(true);
    const tagsQuery = tags ? `tags=${tags}` : "";
    const authorsQuery = authors ? `authors=${authors}` : "";
    const mergedQueries = [tagsQuery, authorsQuery].join("&");
    const response = await fetch(`${RANDOM_QUOTES_ENDPOINT}?${mergedQueries}`);
    const data = (await response.json()) as RandomQuote | { error: string };

    if ("error" in data) {
      toast({ title: "Error", description: data.error });
      setIsLoading(false);
      setQuote(undefined);
      return;
    }

    const randomQuote = data;
    setQuote(randomQuote);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    searchQuote(debounceSearch, debouncedSearchAuthors);
  }, [searchQuote, debounceSearch, debouncedSearchAuthors]);

  const fetchRandomQuote = async () => {
    setIsLoading(true);
    const response = await fetch(RANDOM_QUOTES_ENDPOINT);
    const data = (await response.json()) as RandomQuote;

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
              : fetchRandomQuote
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

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

type QuoteProps = {
  initialQuote: RandomQuote;
  tags: MultiSelectProps["options"];
  authors: MultiSelectProps["options"];
};

export type RandomQuote = {
  quote: string;
  author: string;
  tags: string[];
};
