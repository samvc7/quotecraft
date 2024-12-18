import Image from "next/image";
import { ModeToggle } from "../components/theme-toggle";
import Quote from "../components/quote";
import { fetchAuthors, fetchTags, QuoteSlateAuthors } from "./action";
import { MultiSelectProps } from "../components/multi-select";
import { AuthorOption } from "../components/select-author";
import { DescriptionCollapsible } from "../components/description-collapsible";

export default async function Home() {
  const tags = parseTagsToMultiSelectOptions(await fetchTags());
  const authors = parseAuthorsToMultiSelectOptions(await fetchAuthors());

  return (
    <main className="flex min-h-dvh flex-col items-center p-2 lg:p-14">
      <div className="z-10 w-full lg:max-w-5xl items-center justify-between font-mono text-sm flex">
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
      <h1 className="text-4xl font-bold text-center">Quotecraft</h1>
      <DescriptionCollapsible />
      <Quote tags={tags} authors={authors} />
    </main>
  );
}

const parseTagsToMultiSelectOptions = (
  tags: string[] | { error: string }
): MultiSelectProps["options"] => {
  if ("error" in tags) {
    console.error(tags.error);
    return [];
  }
  return tags.map((tag) => ({
    label: tag.charAt(0).toUpperCase() + tag.slice(1),
    value: tag,
  }));
};

const parseAuthorsToMultiSelectOptions = (
  authors: QuoteSlateAuthors | { error: string }
): AuthorOption[] => {
  if ("error" in authors) {
    console.error(authors.error);
    return [];
  }
  return Object.keys(authors).map((author) => ({
    label: author,
    value: author,
  }));
};
