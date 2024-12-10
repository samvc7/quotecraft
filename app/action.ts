import { RandomQuote } from "../components/quote";

export const fetchRandomQuote = async () => {
  // TODO: why can I not use the RANDOM_QUOTES_ENDPOINT here?
  const response = await fetch(
    "https://quoteslate.vercel.app/api/quotes/random"
  );

  const data = (await response.json()) as RandomQuote;
  return data;
};
