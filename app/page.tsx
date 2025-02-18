import JokeCard from "@/components/JokeCard";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] w-full h-screen">
      <main className="flex flex-col justify-center items-center gap-8 mx-auto w-full h-full max-h-[90%] max-w-screen-lg px-4 py-16 sm:px-6 lg:px-8 ">
        <h1 className="text-5xl font-semibold w-full text-center">
          Voting Game
        </h1>
        <div className="w-full h-full ">
          <JokeCard />
        </div>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center mb-5 w-full">
        <Link
          href="https://github.com/Gareleon"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-700"
        >
          <FaGithub size={30} />
        </Link>
        <Link
          href="https://www.draganignjatovic.com"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-gray-700"
        >
          Made by Dragan Ignjatovic
        </Link>
      </footer>
    </div>
  );
}
