"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import EditModal from "./EditModal";
import JokeWindowControls from "./JokeWindowControls";
import {
  useDeleteJokeMutation,
  useJoke,
  useVoteMutation,
} from "@/hooks/useJoke";
import { Joke } from "@/types/data.types";
import JokeWindow from "./JokeWindow";
import ErrorWindow from "./ErrorWindow";

export default function JokeCard() {
  const [localJoke, setLocalJoke] = useState<Joke | null>(null); // Local state for joke
  const [isEditing, setIsEditing] = useState(false);
  const { mutate } = useVoteMutation();
  const { mutate: deleteJoke } = useDeleteJokeMutation(); // Get the delete mutation function

  // Fetch random joke from API
  const { data: joke, error, isLoading, refetch } = useJoke();

  // Update local state when a new joke is fetched
  useEffect(() => {
    if (joke) {
      setLocalJoke(joke);
    }
  }, [joke]);

  // Handle voting on a joke and optimistic UI updates
  const handleVote = (id: string, label: string) => {
    if (!localJoke) return;

    // Optimistically update local joke state
    setLocalJoke((prevJoke) => {
      if (!prevJoke) return prevJoke; // Ensure prevJoke is not null

      return {
        ...prevJoke,
        votes: prevJoke.votes.map((v) =>
          v.label === label ? { ...v, value: v.value + 1 } : v
        ),
      };
    });

    // Call mutation and update state with returned joke
    mutate(
      { id, label },
      {
        onSuccess: (data) => {
          if (data.joke) {
            setLocalJoke(data.joke); // Update with API response
          }
        },
        onError: () => {
          // Rollback if API call fails
          setLocalJoke(joke);
        },
      }
    );
  };

  const handleDelete = () => {
    if (localJoke?._id) {
      deleteJoke(localJoke._id); // Trigger delete mutation when delete button is clicked
    }
  };
  // Handle editing the joke and modal saving
  const handleEdit = () => {
    if (!localJoke) return;
    setIsEditing(true);
  };

  const handleNextJoke = async () => {
    const newJoke = await refetch(); // Fetch a new joke

    if (newJoke.data && newJoke.data._id === localJoke?._id) {
      await refetch(); // If it's the same, fetch again
    } else {
      setLocalJoke(newJoke.data); // Otherwise, update the state
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center min-w-screen-sm">
        <Skeleton className="w-full max-w-sm h-56 mb-3" /> {/* Joke Window */}
        <Skeleton className="w-36 h-8" /> {/* Button */}
      </div>
    );
  }

  return (
    <>
      {/* Joke Container */}
      <div className="w-full h-full flex flex-col justify-center items-center gap-8">
        {/* Joke Window */}
        <div>
          <JokeWindowControls
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <div className="w-full p-4 bg-white rounded-bl-lg rounded-br-lg shadow-lg border border-gray-200 mx-auto sm:p-6 md:max-w-3xl">
            {error ? (
              <ErrorWindow error={error} />
            ) : (
              <JokeWindow localJoke={localJoke} handleVote={handleVote} />
            )}
          </div>
        </div>
        {/* Next Joke Button */}
        <div className="w-full h-1 mt-4 flex justify-center items-center">
          <Button
            onClick={() => handleNextJoke()}
            className="text-lg md:text-xl "
          >
            Next Joke
          </Button>
        </div>
      </div>
      {/* Edit Modal */}
      <EditModal
        localJoke={localJoke}
        setLocalJoke={setLocalJoke}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </>
  );
}
