import Image from "next/image";
import { ModeToggle } from "../components/theme-toggle";
import Quote from "../components/quote";
import { fetchRandomQuote } from "./action";

export default async function Home() {
  const randomQuote = await fetchRandomQuote();

  return (
    <main className="flex min-h-screen flex-col items-center p-14">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <ModeToggle />
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <Quote initialQuote={randomQuote} />
    </main>
  );
}
