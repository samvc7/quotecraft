"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useToast } from "../hooks/use-toast";
import { QuoteContent } from "./QuoteContent";

export const QUOTE_API_BASE_URL = "https://quoteslate.vercel.app/api";
export const RANDOM_QUOTES_ENDPOINT = `${QUOTE_API_BASE_URL}/quotes/random`;

// TODO: with server action and revalidate path is not working atm.
// currently using this state and inner fetch function
export default function Quote({ initialQuote }: QuoteProps) {
  const { toast } = useToast();

  const [quote, setQuote] = useState<RandomQuote | undefined>(initialQuote);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debounceSearch = useDebounce(search, 600);

  const searchQuote = useCallback(async (query: string) => {
    if (!query) {
      fetchRandomQuote();
      return;
    }

    setIsLoading(true);
    const response = await fetch(`${RANDOM_QUOTES_ENDPOINT}?tags=${query}`);
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
    searchQuote(debounceSearch);
  }, [searchQuote, debounceSearch]);

  const fetchRandomQuote = async () => {
    setIsLoading(true);
    const response = await fetch(RANDOM_QUOTES_ENDPOINT);
    const data = (await response.json()) as RandomQuote;

    setQuote(data);
    setIsLoading(false);
  };

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
    <section className="flex flex-col justify-center flex-grow gap-10 relative mx-auto mt-10">
      <div className="absolute top-6 left-0 flex justify-between w-full">
        <Input
          className="w-96"
          onChange={(event) => handleSearchOnChange(event.target.value)}
          placeholder="e.g. Technology, Life, Love"
        />
        <Button
          className="self-center"
          onClick={search ? () => searchQuote(search) : fetchRandomQuote}
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
};

export type RandomQuote = {
  quote: string;
  author: string;
  tags: string[];
};
