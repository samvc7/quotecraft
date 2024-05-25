"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

// TODO: with server action and revalidate path is not working atm.
// currently using this state and inner fetch function
export default function Quote({ initialQuote }: QuoteProps) {
  const [quote, setQuote] = useState<RandomQuote>(initialQuote);

  const fetchRandomQuote = async () => {
    const response = await fetch("https://api.quotable.io/quotes/random", {
      cache: "no-store",
    });
    const data = (await response.json()) as RandomQuote[];

    setQuote(data[0]);
  };

  return (
    <div className="flex justify-center items-center flex-grow">
      <div className="rounded-3xl border-2 border-gray-200 p-24">
        <div className="flex gap-4">
          <blockquote className="text-lg">
            <p>{quote.content}</p>
            <footer className="mt-2">
              <cite className="mt-4 text-right block">- {quote.author}</cite>
            </footer>
            <p className="mt-8">
              {quote.tags.map((tag: string) => `#${tag} `)}
            </p>
          </blockquote>
          <Button
            className="self-center"
            onClick={fetchRandomQuote}
            variant="outline"
            size="icon"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

type QuoteProps = {
  initialQuote: RandomQuote;
};

export type RandomQuote = {
  content: string;
  author: string;
  tags: string[];
};
