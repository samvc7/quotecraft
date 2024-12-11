import { useEffect, useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { RandomQuote } from "../app/action";

export const QuoteContent = ({
  quote,
  isLoading,
}: {
  quote: RandomQuote | undefined;
  isLoading: boolean;
}) => {
  const quoteContainerRef = useRef<HTMLDivElement>(null);
  const [quoteContainerHeight, setQuoteContainerHeight] = useState<number>(0);

  const quoteContainerSizeStyles = "w-[1020px] rounded-3xl";

  useEffect(() => {
    if (quoteContainerRef.current) {
      setQuoteContainerHeight(quoteContainerRef.current.offsetHeight);
    }
  }, [quote, isLoading]);

  if (isLoading || !quote) {
    return (
      <Skeleton
        className={`${quoteContainerSizeStyles}`}
        style={{ height: quoteContainerHeight }}
      />
    );
  }

  return (
    <div
      ref={quoteContainerRef}
      className={`${quoteContainerSizeStyles} border-2 border-gray-200 p-24`}
    >
      <blockquote className="text-lg">
        <p
          className={`${
            quote.quote.includes("No quotes") ? "text-center" : undefined
          }`}
        >
          {quote.quote}
        </p>
        {quote.author && (
          <footer className="mt-2">
            <cite className="mt-4 text-right block">- {quote.author}</cite>
          </footer>
        )}
        {quote.tags.length > 0 && (
          <p className="mt-8">{quote.tags.map((tag: string) => `#${tag} `)}</p>
        )}
      </blockquote>
    </div>
  );
};
