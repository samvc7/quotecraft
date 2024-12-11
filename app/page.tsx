import Image from "next/image";
import { ModeToggle } from "../components/theme-toggle";
import Quote from "../components/Quote";
import {
  fetchAuthors,
  fetchRandomQuote,
  fetchTags,
  QuoteSlateAuthors,
} from "./action";
import { MultiSelectProps } from "../components/multi-select";

export default async function Home() {
  const randomQuote = await fetchRandomQuote();
  const tags = parseTagsToMultiSelectOptions(await fetchTags());
  const authors = parseAuthorsToMultiselectOptions(await fetchAuthors());

  return (
    <main className="flex min-h-screen flex-col items-center p-14">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/cala7.png"
          alt="Cala7 Logo"
          width={80}
          height={37}
          priority
        />
        <ModeToggle />
      </div>
      <Quote initialQuote={randomQuote} tags={tags} authors={authors} />
    </main>
  );
}

const parseTagsToMultiSelectOptions = (
  tags: string[]
): MultiSelectProps["options"] => {
  return tags.map((tag) => ({ label: tag, value: tag }));
};

const parseAuthorsToMultiselectOptions = (
  authors: QuoteSlateAuthors
): MultiSelectProps["options"] => {
  return Object.keys(authors).map((author) => ({
    label: author,
    value: author,
  }));
};
