import { RandomQuote } from "../components/Quote";

const QUOTES_BASE_URL = "https://quoteslate.vercel.app/api";
const TAGS_ENDPOINT = `${QUOTES_BASE_URL}/tags`;

export const fetchRandomQuote = async () => {
  // TODO: why can I not use the RANDOM_QUOTES_ENDPOINT here?
  const response = await fetch(`${QUOTES_BASE_URL}/quotes/random`);

  const data = (await response.json()) as RandomQuote;
  return data;
};

export const fetchTags = async () => {
  const response = await fetch(TAGS_ENDPOINT);
  const data = (await response.json()) as string[];
  return data;
};

export const fetchAuthors = async () => {
  const response = await fetch(`${QUOTES_BASE_URL}/authors`);
  const data = (await response.json()) as QuoteSlateAuthors;
  return data;
};

export type QuoteSlateAuthors = Record<string, number>;
