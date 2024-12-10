import Image from "next/image";
import { ModeToggle } from "../components/theme-toggle";
import Quote from "../components/quote";
import { fetchRandomQuote } from "./action";

export default async function Home() {
  const randomQuote = await fetchRandomQuote();

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
      <Quote initialQuote={randomQuote} />
    </main>
  );
}
