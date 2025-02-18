import { Joke } from "@/types/data.types";

interface JokeWindowProps {
  localJoke: Joke | null;
  handleVote: (jokeId: string, vote: string) => void;
}

export default function JokeWindow({ localJoke, handleVote }: JokeWindowProps) {
  return <div>Joke Window</div>;
}
