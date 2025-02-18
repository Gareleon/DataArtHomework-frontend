import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Button } from "./ui/button";
import { useUpdateJokeMutation } from "@/hooks/useJoke";
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
  const [editedJoke, setEditedJoke] = useState<Partial<Joke>>({
    question: localJoke?.question,
    answer: localJoke?.answer,
  });

  const { mutate: updateJoke } = useUpdateJokeMutation();

  const handleSave = () => {
    if (!localJoke) return;
    setLocalJoke({ ...localJoke, ...editedJoke });
    setIsEditing(false);
    updateJoke({ id: localJoke._id, updatedJoke: editedJoke });
  };

  return (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Joke</DialogTitle>
          <DialogDescription>Modify your joke below</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            value={editedJoke.question || ""}
            onChange={(e) =>
              setEditedJoke({ ...editedJoke, question: e.target.value })
            }
            placeholder="Edit joke question"
          />
          <Textarea
            value={editedJoke.answer || ""}
            onChange={(e) =>
              setEditedJoke({ ...editedJoke, answer: e.target.value })
            }
            placeholder="Edit joke answer"
          />
        </div>
        <DialogFooter>
          <Button onClick={() => setIsEditing(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
