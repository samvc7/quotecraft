"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "../hooks/use-toast";

export const QUOTE_API_BASE_URL = "https://quoteslate.vercel.app/api";
export const RANDOM_QUOTES_ENDPOINT = `${QUOTE_API_BASE_URL}/quotes/random`;

// TODO: with server action and revalidate path is not working atm.
// currently using this state and inner fetch function
export default function Quote({ initialQuote }: QuoteProps) {
  const { toast } = useToast();

  const [quote, setQuote] = useState<RandomQuote | undefined>(initialQuote);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quoteContainerHeight, setQuoteContainerHeight] = useState<number>(0);

  const quoteContainerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (quoteContainerRef.current) {
      setQuoteContainerHeight(quoteContainerRef.current.offsetHeight);
    }
  }, [quote, isLoading]);

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

  const quoteContainerSizeStyles = "w-[1020px] rounded-3xl";

  // TODO: remove quote?.
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
      {isLoading && quote ? (
        <Skeleton
          className={`${quoteContainerSizeStyles}`}
          style={{ height: quoteContainerHeight }}
        />
      ) : (
        <div
          ref={quoteContainerRef}
          className={`${quoteContainerSizeStyles} border-2 border-gray-200 p-24`}
        >
          <blockquote className="text-lg">
            <p>{quote?.quote}</p>
            <footer className="mt-2">
              <cite className="mt-4 text-right block">- {quote?.author}</cite>
            </footer>
            <p className="mt-8">
              {quote?.tags.map((tag: string) => `#${tag} `)}
            </p>
          </blockquote>
        </div>
      )}
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
