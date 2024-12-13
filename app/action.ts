const QUOTES_BASE_URL = "https://quoteslate.vercel.app/api";
const RANDOM_QUOTES_ENDPOINT = `${QUOTES_BASE_URL}/quotes/random`;
const TAGS_ENDPOINT = `${QUOTES_BASE_URL}/tags`;
const AUTHORS_ENDPOINT = `${QUOTES_BASE_URL}/authors`;

export const fetchRandomQuote = async (): Promise<RandomQuote> => {
  const response = await fetch(RANDOM_QUOTES_ENDPOINT);
  return response.json();
};

export const fetchTags = async (): Promise<string[] | { error: string }> => {
  const response = await fetch(TAGS_ENDPOINT);
  return response.json();
};

export const fetchAuthors = async (): Promise<
  QuoteSlateAuthors | { error: string }
> => {
  const response = await fetch(AUTHORS_ENDPOINT);
  return response.json();
};

export const searchQuoteBy = async (
  tags: string,
  authors: string
): Promise<RandomQuote | { error: string }> => {
  const tagsQuery = tags ? `tags=${tags}` : "";
  const authorsQuery = authors ? `authors=${authors}` : "";
  const mergedQueries = [tagsQuery, authorsQuery].join("&");

  const response = await fetch(`${RANDOM_QUOTES_ENDPOINT}?${mergedQueries}`);
  return response.json();
};

export type QuoteSlateAuthors = Record<string, number>;

export type RandomQuote = {
  quote: string;
  author: string;
  tags: string[];
};
