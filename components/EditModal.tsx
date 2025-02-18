import { Joke } from "@/types/data.types";

interface EditModalProps {
  localJoke: Joke | null;
  setLocalJoke: (joke: Joke) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export default function EditModal({
  localJoke,
  setLocalJoke,
  isEditing,
  setIsEditing,
}: EditModalProps) {
  return <div>Edit Modal</div>;
}
