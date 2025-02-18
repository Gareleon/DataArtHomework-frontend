"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

// Define types for the session data
interface VoteHistory {
  [jokeId: string]: {
    [label: string]: boolean;
  };
}

interface SessionContextType {
  voteHistory: VoteHistory;
  setVoteHistory: React.Dispatch<React.SetStateAction<VoteHistory>>;
  currentJokeId: string | null;
  setCurrentJokeId: React.Dispatch<React.SetStateAction<string | null>>;
  voteForJoke: (label: string, jokeId: string) => void;
}

// Correctly type the props of SessionProvider
interface SessionProviderProps {
  children: React.ReactNode;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [voteHistory, setVoteHistory] = useState<VoteHistory>({});
  const [currentJokeId, setCurrentJokeId] = useState<string | null>(null);

  // Access localStorage only on the client side (inside useEffect)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedVoteHistory = localStorage.getItem("voteHistory");
      if (storedVoteHistory) {
        setVoteHistory(JSON.parse(storedVoteHistory));
      }
    }
  }, []); // Empty dependency array ensures this runs only once, after the component mounts

  // Save voteHistory to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("voteHistory", JSON.stringify(voteHistory));
    }
  }, [voteHistory]);

  // Function to handle voting
  const voteForJoke = (label: string, jokeId: string) => {
    // Check if user has already voted for this joke with the same emoji
    if (voteHistory[jokeId]?.[label]) {
      return; // Prevent voting again on the same emoji for this joke
    }

    // Update vote history with the new vote
    setVoteHistory((prevHistory) => ({
      ...prevHistory,
      [jokeId]: {
        ...prevHistory[jokeId],
        [label]: true,
      },
    }));
  };

  return (
    <SessionContext.Provider
      value={{
        voteHistory,
        setVoteHistory,
        currentJokeId,
        setCurrentJokeId,
        voteForJoke,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
