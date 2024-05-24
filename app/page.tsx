import Image from "next/image";
import { ModeToggle } from "../components/theme-toggle";

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

      <div className="flex justify-center items-center flex-grow">
        <div className="rounded-3xl border-2 border-gray-200 p-24">
          <p>{randomQuote.content}</p>
          <p className="mt-4 text-right">— {randomQuote.author}</p>
          <p className="mt-8">
            {randomQuote.tags.map((tag: string) => `#${tag} `)}
          </p>
        </div>
      </div>
    </main>
  );
}

const fetchRandomQuote = async () => {
  const response = await fetch("https://api.quotable.io/random");
  return response.json();
};
