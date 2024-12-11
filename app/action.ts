import { RandomQuote } from "../components/Quote";

const QUOTES_BASE_URL = "https://quoteslate.vercel.app/api";
const TAGS_ENDPOINT = `${QUOTES_BASE_URL}/tags`;

export const fetchRandomQuote = async () => {
  // TODO: why can I not use the RANDOM_QUOTES_ENDPOINT here?
  const response = await fetch(
    "https://quoteslate.vercel.app/api/quotes/random"
  );

  const data = (await response.json()) as RandomQuote;
  return data;
};

export const fetchTags = async () => {
  const response = await fetch(TAGS_ENDPOINT);
  const data = (await response.json()) as string[];
  return data;
};
