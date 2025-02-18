interface JokeWindowControlsProps {
  handleEdit: () => void;
  handleDelete: () => void;
}

export default function JokeWindowControls({
  handleEdit,
  handleDelete,
}: JokeWindowControlsProps) {
  return <div>Joke Window Controls</div>;
}
