import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

interface JokeWindowControlsProps {
  handleEdit: () => void; // Handle editing the joke
  handleDelete: () => void; // Handle deleting the joke
}

export default function JokeWindowControls({
  handleEdit,
  handleDelete,
}: JokeWindowControlsProps) {
  return (
    <div className="flex gap-4 justify-end items-center py-3 px-2 bg-primary rounded-tr-lg rounded-tl-lg relative">
      <p className="absolute top-2 left-3 text-md md:text-lg lg:text-xl text-white">
        Joke
      </p>

      {/* Edit Tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <FaEdit
              className="text-green-500 hover:cursor-pointer hover:text-green-700"
              size={20}
              onClick={handleEdit}
              aria-label="Edit"
            />
          </TooltipTrigger>
          <TooltipContent>Edit Joke</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Delete Tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <FaTrashCan
              className="text-red-500 hover:cursor-pointer hover:text-red-700"
              size={20}
              onClick={handleDelete}
              aria-label="Delete"
            />
          </TooltipTrigger>
          <TooltipContent>Delete Joke</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
