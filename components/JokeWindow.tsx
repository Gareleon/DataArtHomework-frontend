import { Joke } from "@/types/data.types";
import { Button } from "./ui/button";

interface JokeWindowProps {
  localJoke: Joke | null;
  handleVote: (jokeId: string, vote: string) => void;
  hasVoted: (vote: string) => boolean;
}

export default function JokeWindow({
  localJoke,
  handleVote,
  hasVoted,
}: JokeWindowProps) {
  return (
    <>
      <p className="font-bold text-lg md:text-xl lg:text-2xl text-gray-800 mb-2 break-words">
        {localJoke?.question}
      </p>
      <p className="text-gray-600 break-words md:text-lg lg:text-xl text-center">
        {localJoke?.answer}
      </p>
      <div className="pt-6 flex flex-wrap gap-2 justify-center items-center">
        {localJoke?.availableVotes.map((vote: string) => {
          const voteObject = localJoke.votes.find((v) => v.label === vote);
          const voteValue = voteObject ? voteObject.value : 0;

          return (
            <Button
              key={vote}
              onClick={() => handleVote(localJoke._id, vote)}
              aria-disabled={hasVoted(vote)}
              className="flex gap-2 items-center"
            >
              <span className="text-md md:text-lg font-bold">{voteValue}</span>
              <span>{vote}</span>
            </Button>
          );
        })}
      </div>
    </>
  );
}
