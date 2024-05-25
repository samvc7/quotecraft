import { RandomQuote } from "../components/quote";

export const fetchRandomQuote = async () => {
  const response = await fetch("https://api.quotable.io/quotes/random", {
    cache: "no-store",
  });
  const data = (await response.json()) as RandomQuote[];

  return data[0];
};
