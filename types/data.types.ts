export type Joke = {
  _id: string;
  question: string;
  answer: string;
  availableVotes: string[];
  votes: {
    label: string;
    value: number;
  }[];
};
