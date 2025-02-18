import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getJokes,
  Vote,
  updateJoke,
  deleteJoke,
} from "../services/jokeServices";
import { Joke } from "@/types/data.types";

//Fetches a joke from the API using React Query.
export function useJoke() {
  return useQuery({
    queryKey: ["joke"], // Cache key for jokes
    queryFn: getJokes, // Function to fetch jokes
    refetchOnWindowFocus: false, // Avoid refetching when the window is focused
  });
}

//  Handles voting for a joke using a mutation.
export function useVoteMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, label }: { id: string; label: string }) =>
      Vote(id, label),
    onSuccess: (data) => {
      if (data.joke) {
        // Update the local cache with the voted joke data
        queryClient.setQueryData(["joke"], data.joke);
      }
    },
    onError: (error) => {
      console.error("Voting failed:", error);
    },
  });

  return mutation;
}

//Handles updating a joke with optimistic UI updates.
export function useUpdateJokeMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      id,
      updatedJoke,
    }: {
      id: string;
      updatedJoke: Partial<Joke>;
    }) => updateJoke(id, updatedJoke),

    // Optimistic update: Immediately update the cache before the request completes.
    // If the request fails, the cache will roll back to the previous state.
    onMutate: async ({ id, updatedJoke }) => {
      await queryClient.cancelQueries({ queryKey: ["joke"] }); // Prevent conflicts with other ongoing queries.

      const previousJoke = queryClient.getQueryData(["joke"]); // Get current joke from cache.

      // Update the cache optimistically
      if (previousJoke && typeof previousJoke === "object") {
        queryClient.setQueryData(["joke"], {
          ...previousJoke,
          question: updatedJoke.question,
          answer: updatedJoke.answer,
        });
      }

      // Return previous data to allow rollback if needed.
      return { previousJoke };
    },

    // If the request succeeds, ensure the cache contains the updated joke.
    onSuccess: (data) => {
      if (data.joke) {
        queryClient.setQueryData(["joke"], data.joke);
      }
    },

    // If an error occurs, rollback to the previous joke.
    onError: (err, variables, context) => {
      if (context?.previousJoke) {
        queryClient.setQueryData(["joke"], context.previousJoke); // Rollback to previous state
      }
    },
  });

  return mutation;
}

//Handles deleting a joke with an optimistic UI update.
export function useDeleteJokeMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteJoke(id),

    // Optimistic update: Immediately remove the joke from the UI before the API request completes.
    //If the request fails, rollback to the previous state.
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["joke"] });

      const previousJoke = queryClient.getQueryData(["joke"]);

      // Optimistically remove the joke from the cache
      queryClient.setQueryData(["joke"], null); // Clear the joke from the cache

      // Store previous data for potential rollback
      return { previousJoke };
    },

    // If the delete succeeds, invalidate the query to refetch fresh data.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["joke"] });
    },

    // If the delete request fails, rollback the cache.
    onError: (err, variables, context) => {
      if (context?.previousJoke) {
        queryClient.setQueryData(["joke"], context.previousJoke);
      }
    },
  });

  return mutation;
}
